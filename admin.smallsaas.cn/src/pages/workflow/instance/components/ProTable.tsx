import Confirmation from '@/components/Confirmation';
import { getInstanceList, deleteInstance, approveInstance, rejectInstance, rollbackInstance } from '@/api/workflow';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Space, Tag, Modal } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import ViewModel from './ViewModel';

const statusMap: Record<string, { color: string, text: string }> = {
  'INITED': { color: 'blue', text: '初始化' },
  'VERIFYING': { color: 'processing', text: '处理中' },
  'HANDLING': { color: 'processing', text: '处理中' },
  'HANDLED_APPROVED': { color: 'success', text: '已同意' },
  'HANDLED_REJECTED': { color: 'error', text: '已拒绝' },
  'HANDLED_ROLLBACK': { color: 'warning', text: '已驳回' },
};

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>();
  const [filterType, setFilterType] = useState<string>('CURRENT');

  // 删除实例
  const onDel = async (id: any) => {
    const res = await deleteInstance(id);

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

  // 查看详情
  const onView = (data: any) => {
    setFormData(data);
    setViewModalOpen(true);
  };

  // 同意
  const onApprove = async (id: any) => {
    Modal.confirm({
      title: '确认同意',
      content: '确定要同意该工作流实例吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const res = await approveInstance(id, { note: '同意' });
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

  // 拒绝
  const onReject = async (id: any) => {
    Modal.confirm({
      title: '确认拒绝',
      content: '拒绝后不可重新提交，确定要拒绝该工作流实例吗？',
      okText: '确认',
      cancelText: '取消',
      okType: 'danger',
      onOk: async () => {
        const res = await rejectInstance(id, { note: '拒绝' });
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

  // 驳回
  const onRollback = async (id: any) => {
    Modal.confirm({
      title: '确认驳回',
      content: '驳回后可以重新提交，确定要驳回该工作流实例吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const res = await rollbackInstance(id, { note: '需要修改' });
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

  const columns: ProColumns<any>[] = [

    {
      title: '实例名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '实例编码',
      dataIndex: 'code',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '当前步骤',
      dataIndex: 'currentStepName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '当前处理人',
      dataIndex: 'currentUserName',
      ellipsis: true,
      hideInSearch: true,

    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        'INITED': { text: '初始化', status: 'Default' },
        'VERIFYING': { text: '处理中', status: 'Processing' },
        'HANDLING': { text: '处理中', status: 'Processing' },
        'HANDLED_APPROVED': { text: '已同意', status: 'Success' },
        'HANDLED_REJECTED': { text: '已拒绝', status: 'Error' },
        'HANDLED_ROLLBACK': { text: '已驳回', status: 'Warning' },
      },
      render: (_, record) => {
        const status = statusMap[record.status] || { color: 'default', text: record.status };
        return <Tag color={status.color}>{status.text}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      ellipsis: true,
      sorter: true,
      hideInSearch: true,

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
          {(record.status === 'VERIFYING' || record.status === 'HANDLING') && (
            <>
              <Button type="link" key="approve" onClick={() => onApprove(record.id)}>
                同意
              </Button>
              <Button type="link" key="reject" danger onClick={() => onReject(record.id)}>
                拒绝
              </Button>
              <Button type="link" key="rollback" onClick={() => onRollback(record.id)}>
                驳回
              </Button>
            </>
          )}
          <Confirmation onConfirm={() => onDel(record.id)} key="del">
            <a>删除</a>
          </Confirmation>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-INSTANCE', () => {
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
    const res = await getInstanceList({
      page: params.current || 1, // 当前页码
      size: params.pageSize || 10, // 每页条数
      type: filterType,
    });

    return {
      data: res?.data?.records || [], // 数据列表
      total: res?.data?.total || 0, // 数据总数
      success: res?.code === 200,
    };
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Space>

          <Button
            type={filterType === 'CURRENT' ? 'primary' : 'default'}
            onClick={() => setFilterType('CURRENT')}
          >
            我的审批
          </Button>
          <Button
            type={filterType === 'CREATOR' ? 'primary' : 'default'}
            onClick={() => setFilterType('CREATOR')}
          >
            我创建的
          </Button>
        </Space>
      </div>

      <ProTable<any>
        actionRef={proTableV1Ref}
        columns={columns}
        request={request}
        rowKey="id"
        params={{
          type: filterType,
        }}
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          labelWidth: 'auto',
        }}
        headerTitle="工作流实例列表"
      />

      {/* 查看工作流实例 */}
      <ViewModel
        formData={formData}
        setViewModalOpen={setViewModalOpen}
        viewModalOpen={viewModalOpen}
        onApprove={onApprove}
        onReject={onReject}
        onRollback={onRollback}
      />
    </>
  );
};
export default ProTableV1;
