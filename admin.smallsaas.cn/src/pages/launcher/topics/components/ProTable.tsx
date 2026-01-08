import Confirmation from '@/components/Confirmation';
import { useLauncher } from '@/hooks/useLauncher';
import { deleteUsingDelete4, pageUsingGet3 } from '@/services/topics/pingtaiyitiguanli';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';
import { sendIssueApprove } from '@/services/topics/pingtaiyitimoban';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen } = useLauncher();
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  // 删除
  const onDel = async (id: any) => {
    const { code } = await deleteUsingDelete4({ id: id });

    if (code === 200) {
      message.success('删除成功');
    }
    // 刷新
    if (proTableV1Ref) {
      // 手动调用刷新
      proTableV1Ref.current?.reload();
    }
  };


  // 审批
  const onExamine = async (data: any, b: any) => {
    const { code } = await sendIssueApprove({
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
  // 编辑回现
  const onEdit = (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(data);
    setCreateModalOpen(true);
  };
  const columns: ProColumns<any>[] = [
    {
      title: '议题名称',
      dataIndex: 'title',
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
      title: '支部',
      dataIndex: 'orgName',
      hideInSearch: true,
      ellipsis: true,
    },

    {
      title: '提交人',
      dataIndex: 'createUserName',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '议题模版',
      dataIndex: 'template',
      hideInSearch: true,
      ellipsis: true,
      render: (_, record: any) => {
        // a标签下载链接
        return (
          <a href={record?.template?.fileUrl} download={record?.template?.name}>
            {record.template?.name}
          </a>
        );
      },
    },
    {
      title: '审批状态',
      dataIndex: 'approvalStatus',
      ellipsis: true,
      // hideInSearch: true,
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
      width: 220,
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
          <Button disabled={record?.approvalStatus === 10} type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Confirmation onConfirm={() => onDel(record.id)} key="del">
            <a>删除</a>
          </Confirmation>

          <a href={record?.attachmentUrl}>下载</a>
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
    const { data } = await pageUsingGet3({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      approvalStatus: params.approvalStatus || null,
      title: params.title || null,
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
        // scroll={{ x: 1300 }}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        // search={false}
        headerTitle="议题管理列表"
        toolBarRender={() => [
          <Button
            key={'add'}
            onClick={() => {
              setModelType(EModelType.ADD);
              setFormData(null);
              setCreateModalOpen(true);
            }}
            type="primary"
          >
            添加
          </Button>,
        ]}
      />

      {/* 查看/编辑/添加 */}
      <EditModel
        type={modelType}
        formData={formData}
        setCreateModalOpen={setCreateModalOpen}
        createModalOpen={createModalOpen}
      />
      {/* end */}
    </>
  );
};
export default ProTableV1;
