import { useLauncher } from '@/hooks/useLauncher';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Modal, Tooltip, Input } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';
import { getMeetingMinutesPage, postMeetingMinutesApprove, postMeetingMinutesEditText } from '@/api/meeting';
import markdownit from 'markdown-it';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const md = markdownit({ html: true, breaks: true });

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen } = useLauncher();
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  const [editContent, setEditContent] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');

  // 更新预览内容
  useEffect(() => {
    setPreviewHtml(md.render(editContent));
  }, [editContent]);

  // 查看会议纪要
  const handleView = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  // 编辑会议纪要
  const handleEdit = (record: any) => {
    setCurrentRecord(record);
    setEditContent(record.completeRecognizedText || '');
    setIsEditModalVisible(true);
  };

  // 保存编辑内容
  const handleSaveEdit = async () => {
    const { code } = await postMeetingMinutesEditText(
      {
        id: currentRecord?.id,
        completeRecognizedText: editContent,
      }
    );
    if (code === 200) {
      message.success('保存成功');
      setIsEditModalVisible(false);
      if (proTableV1Ref.current) {
        proTableV1Ref.current.reload();
      }
    }


    // try {
    //   const response = await fetch('/api/adm/newconf/meetingMinutes/editText', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       id: currentRecord?.id,
    //       content: editContent,
    //     }),
    //   });

    //   if (response.ok) {
    //     message.success('保存成功');
    //     setIsEditModalVisible(false);
    //     if (proTableV1Ref.current) {
    //       proTableV1Ref.current.reload();
    //     }
    //   } else {
    //     message.error('保存失败');
    //   }
    // } catch (error) {
    //   message.error('保存失败');
    // }
  };


  // 审批
  const onExamine = async (data: any, b: any) => {
    const { code } = await postMeetingMinutesApprove({
      id: data?.id,
      approvalStatus: b,
    });

    if (code === 200) {
      message.success('修改成功');
    }
    // 刷新
    if (proTableV1Ref) {
      // 手动调用刷新
      proTableV1Ref.current?.reload();
    }
  };

  const columns: ProColumns<any>[] = [
    {
      title: '纪要名称',
      dataIndex: 'name',
      ellipsis: true,
      // hideInSearch: true,
    },
    {
      title: '日期',
      dataIndex: 'createTime',
      hideInSearch: true,
      ellipsis: true,
      valueType: 'date',
    },


    {
      title: '纪要内容',
      dataIndex: 'completeRecognizedText',
      hideInSearch: true,
      ellipsis: true,
      render: (_, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="查看/编辑">
            <a
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#1890ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '';
              }}
              onClick={(e) => e.preventDefault()}
            >
              会议纪要
            </a>
          </Tooltip>
          <Space size="small" style={{ marginLeft: 8 }}>
            <Tooltip title="查看">
              <EyeOutlined onClick={() => handleView(record)} style={{ cursor: 'pointer' }} />
            </Tooltip>
            <Tooltip title="编辑">
              <EditOutlined onClick={() => handleEdit(record)} style={{ cursor: 'pointer' }} />
            </Tooltip>
          </Space>
        </div>
      ),
    },
    {
      title: '会议ID',
      dataIndex: 'meetingId',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '会议时长(分钟)',
      dataIndex: 'meetingDuration',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '纪要类型',
      dataIndex: 'minutesType',
      hideInSearch: true,
      ellipsis: true,
      valueEnum: {
        1: {
          text: 'AI纪要',

        },
        2: {
          text: '会议录音',

        },
      },

    },
    {
      title: '审批状态',
      dataIndex: 'approvalStatus',
      ellipsis: true,
      hideInSearch: true,
      valueEnum: {
        0: {
          text: '未审批',
          status: 'Default',
        },
        1: {
          text: '待审批',
          status: 'Default',
        },
        10: {
          text: '已通过',
          status: 'Success',
        },
        11: {
          text: '拒绝',
          status: 'Error',
        },
      },

    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 60,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Popconfirm

            title="是否通过审批？"
            key="examine"
            okText="通过"
            onConfirm={() => onExamine(record, 10)}
            cancelText="拒绝"
            onCancel={() => onExamine(record, 11)}
          >
            <Button disabled={record?.approvalStatus === 10} type="link">审批</Button>
          </Popconfirm>


        </Space>
      ),
    },
  ];
  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-TOPICS', () => {
      // 刷新
      if (proTableV1Ref) {
        // 手动调用刷新
        proTableV1Ref.current?.reload();
      }
    });
    return () => {
      Pubsub.unsubscribe(updataListPub);
    };
  }, []);
  const request = async (params: any) => {
    const { data } = await getMeetingMinutesPage({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      name: params.name,
    });
    return {
      data: data?.records || [], // 数据列表
      total: data?.total, // 数据总数
    };
  };

  return (
    <>
      <ProTable<any>

        actionRef={proTableV1Ref}
        columns={columns}
        request={request}
        scroll={{ x: 1300 }}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        // search={false}
        headerTitle="会议纪要列表"
      // toolBarRender={() => [
      //   <Button
      //     key={'add'}
      //     onClick={() => {
      //       setModelType(EModelType.ADD);
      //       setFormData(null);
      //       setCreateModalOpen(true);
      //     }}
      //     type="primary"
      //   >
      //     添加
      //   </Button>,
      // ]}
      />

      {/* 查看/编辑/添加 */}
      <EditModel
        type={modelType}
        formData={formData}
        setCreateModalOpen={setCreateModalOpen}
        createModalOpen={createModalOpen}
      />
      {/* end */}

      {/* 查看对话框 */}
      <Modal
        title="查看会议纪要内容"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={null}
        width={800}
      >
        <div
          className="markdown-content markdown-main prism-code language-jsx"
          dangerouslySetInnerHTML={{
            __html: md.render(currentRecord?.completeRecognizedText || ''),
          }}
        />
      </Modal>

      {/* 编辑对话框 */}
      <Modal
        title="编辑会议纪要内容"
        open={isEditModalVisible}
        onOk={handleSaveEdit}
        onCancel={() => setIsEditModalVisible(false)}
        width={800}
      >
        <div style={{
          display: 'flex', gap: '20px', height: '500px',
          marginBottom: '50px'

        }}>
          {/* 编辑区 */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '8px' }}>编辑区 (Markdown格式)</div>
            <TextArea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              style={{ height: '100%', resize: 'none' }}
              placeholder="请输入Markdown格式的内容..."
            />
          </div>

          {/* 预览区 */}
          <div style={{
            flex: 1,


          }}>
            <div style={{ marginBottom: '8px' }}>预览区</div>
            <div
              className="markdown-content markdown-main prism-code language-jsx"
              style={{
                height: '100%',
                overflow: 'auto',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                padding: '4px 11px',
              }}
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ProTableV1;
