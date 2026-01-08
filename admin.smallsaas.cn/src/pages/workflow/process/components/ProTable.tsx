import Confirmation from '@/components/Confirmation';
import { getWorkflowList, deleteWorkflow, toggleWorkflowStatus, getCategoryList } from '@/api/workflow';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Space, Tag, Modal } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';
import DetailView from './DetailView';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
  VIEW = '查看',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);



  // 删除工作流
  const onDel = async (id: any) => {
    const res = await deleteWorkflow(id);

    if (res?.code === 200) {
      message.success('删除成功');
      // 刷新
      if (proTableV1Ref) {
        proTableV1Ref.current?.reload();
      }
    } else {
      message.error(res?.message || '删除失败');
    }
  };

  // 切换状态
  const onToggleStatus = async (id: any, status: string) => {
    Modal.confirm({
      title: '确认操作',
      content: `确定要${status === 'ENABLED' ? '禁用' : '启用'}该工作流吗？`,
      onOk: async () => {
        const res = await toggleWorkflowStatus(id);
        if (res?.code === 200) {
          message.success('操作成功');
          // 刷新
          if (proTableV1Ref) {
            proTableV1Ref.current?.reload();
          }
        } else {
          message.error(res?.message || '操作失败');
        }
      },
    });
  };

  // 编辑回现
  const onEdit = (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(data);
    setCreateModalOpen(true);
  };

  // 查看详情
  const onView = (data: any) => {
    setFormData(data);
    setViewModalOpen(true);
  };

  const columns: ProColumns<any>[] = [

    {
      title: '工作流名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '工作流编码',
      dataIndex: 'code',
      ellipsis: true,
    },
    {
      title: '关联表单',
      dataIndex: 'entityName',
      ellipsis: true,
    },
    {
      title: '所属分类',
      dataIndex: 'categoryName',
      ellipsis: true,
      // render: (_, record) => getCategoryName(record.categoryId),
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        ENABLED: { text: '启用', status: 'Success' },
        DISABLED: { text: '禁用', status: 'Error' },
      },
      render: (_, record) => (
        <Tag color={record.status === 'ENABLED' ? '#52c41a' : '#ff4d4f'}>
          {record.status === 'ENABLED' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 240,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" key="view" onClick={() => onView(record)}>
            查看
          </Button>
          <Button type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Button
            type="link"
            key="status"
            onClick={() => onToggleStatus(record.id, record.status)}
          >
            {record.status === 'ENABLED' ? '禁用' : '启用'}
          </Button>
          {record.allowDelete !== false && (
            <Confirmation onConfirm={() => onDel(record.id)} key="del">
              <a>删除</a>
            </Confirmation>
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-WORKFLOW', () => {
      // 刷新
      if (proTableV1Ref) {
        proTableV1Ref.current?.reload();
      }
    });
    return () => {
      Pubsub.unsubscribe(updataListPub);
    };
  }, []);

  const request = async (params: any) => {
    const res = await getWorkflowList({
      page: params.current || 1, // 当前页码
      size: params.pageSize || 10, // 每页条数
    });

    return {
      data: res?.data || [], // 数据列表
      total: res?.total || 0, // 数据总数
      success: res?.code === 200,
    };
  };

  return (
    <>
      <ProTable<any>
        actionRef={proTableV1Ref}
        columns={columns}
        request={request}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          labelWidth: 'auto',
        }}
        headerTitle="工作流列表"
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
            添加工作流
          </Button>,
        ]}
      />

      {/* 添加/编辑工作流 */}
      <EditModel
        type={modelType}
        formData={formData}
        setCreateModalOpen={setCreateModalOpen}
        createModalOpen={createModalOpen}
      />

      {/* 查看工作流 */}
      <DetailView
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        id={formData?.id}
      />
    </>
  );
};
export default ProTableV1;
