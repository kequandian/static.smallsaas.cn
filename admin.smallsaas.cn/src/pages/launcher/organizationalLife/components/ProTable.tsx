import { getOrgActivityList, getOrgChangeStatus } from '@/api/baseWork';
import Confirmation from '@/components/Confirmation';
import { useLauncher } from '@/hooks/useLauncher';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Space, Tag } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel, { typeOptions } from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen, onOrganizationalLifeDel } = useLauncher();
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-ORGANIZATIONALLIFE', () => {
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

  const onView = (data: any) => {
    history.push(`/launcher/activity/organizationalLife/details/${data?.id}`, data);
  };

  const onAdd = () => {
    setModelType(EModelType.ADD);
    setFormData(null);
    setCreateModalOpen(true);
  };
  const onEdit = (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(data);
    setCreateModalOpen(true);
  };

  const onStart = async (data: any) => {
    const res = await getOrgChangeStatus({
      activityId: data.id,
      status: 2,
    });
    if (res.code === 0) {
      proTableV1Ref.current?.reload();
    }
  };

  const onEnd = async (data: any) => {
    const res = await getOrgChangeStatus({
      activityId: data.id,
      status: 3,
    });
    if (res.code === 0) {
      proTableV1Ref.current?.reload();
    }
  };

  const columns: ProColumns<any>[] = [
    {
      title: '活动名称',
      dataIndex: 'activityName',
      hideInSearch: true,
    },
    {
      title: '活动类型',
      dataIndex: 'type',
      render: (_, i: any) => <Tag color="#108ee9">{typeOptions.find((k: any) => k?.value === i?.type)?.label}</Tag>,
      valueEnum: {
        1: { text: '党员谈心会', status: '1' },
        2: { text: '党课', status: '2' },
        3: { text: '组织生活会', status: '3' },
        4: { text: '主题党日', status: '4' },
        5: { text: '其他', status: '5' },
      },
    },
    {
      title: '开始时间',
      dataIndex: 'activityDateStart',
      hideInSearch: true,
    },
    {
      title: '结束时间',
      dataIndex: 'activityDateEnd',
      hideInSearch: true,
    },
    {
      title: '活动状态',
      dataIndex: 'status',
      valueEnum: {
        1: { text: '即将开始', status: '1' },
        2: { text: '进行中', status: '2' },
        3: { text: '已结束', status: '3' },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_, record: any) => {
        const statusMap: { [key: number]: string } = {
          1: '即将开始',
          2: '进行中',
          3: '已结束',
        };
        return <span style={{ color: '#FF7D00' }}>{statusMap[record.status]}</span>;
      },
    },
    {
      title: '活动内容',
      dataIndex: 'content',
      hideInSearch: true,
    },
    {
      title: '活动地址',
      dataIndex: 'address',
      hideInSearch: true,
    },
    {
      title: '最大人数',
      dataIndex: 'maxNum',
      hideInSearch: true,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={10}>
          <Button type="link" key="view" onClick={() => onView(record)}>
            查看
          </Button>
          <Button type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button>
          {record.status === 1 && (
            <Button type="link" key="start" onClick={() => onStart(record)}>
              开始
            </Button>
          )}
          {record.status === 2 && (
            <Button type="link" key="end" onClick={() => onEnd(record)}>
              结束
            </Button>
          )}
          {record.status === 3 && (
            <Confirmation onConfirm={() => onOrganizationalLifeDel(record.id)} key="del">
              <Button type="link">删除</Button>
            </Confirmation>
          )}
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    const { data } = await getOrgActivityList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      status: params.status ? Number(params.status) : undefined,
      type: params?.type,
    });
    return {
      data: data?.list || [], // 数据列表
      total: data.total, // 数据总数
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
        search={{
          labelWidth: 'auto',
        }}
        headerTitle="活动列表"
        toolBarRender={() => [
          <Button key={'add'} onClick={onAdd} type="primary">
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
