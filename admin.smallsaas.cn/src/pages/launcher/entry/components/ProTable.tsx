import { ActionType, ProColumns, ProFormSelect, ProTable as AntProTable } from '@ant-design/pro-components';
import { Button, Space, Tag, Switch, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Pubsub from 'pubsub-js';
import { getEntryList, saveEntry, updateEntryStatus } from '@/api/zhuihuidangjian';
import EditModel, { statusOptions } from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTable: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [formData, setFormData] = useState<any>();
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  const onEdit = (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(data);
    setCreateModalOpen(true);
  };

  const onStatusChange = async (checked: boolean, record: any) => {
    const res = await updateEntryStatus({ id: record.id, status: checked ? 1 : 0 });
    if ((res as any)?.code === 0) {
      message.success('状态已更新');
      actionRef.current?.reload();
    }
  };

  const columns: ProColumns<any>[] = [
    {
      title: '词条名称',
      dataIndex: 'entryName',
      ellipsis: true,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '释义',
      dataIndex: 'definition',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '可信指数',
      dataIndex: 'trustScore',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, r: any) => <Tag color={r.status === 1 ? 'green' : 'red'}>{r.status === 1 ? '启用' : '停用'}</Tag>,
      renderFormItem: () => <ProFormSelect options={statusOptions} />,
    },
    {
      title: '更新时间',
      dataIndex: 'updateDate',
      hideInSearch: true,
    },
    {
      title: '是否启用',
      tooltip: '禁用/启用当前词条',
      dataIndex: 'status',
      hideInSearch: true,
      ellipsis: true,
      width: 100,
      align: 'center',
      fixed: 'right',
      render: (_, record: any) => {
        return (
          <Switch checked={record.status === 1} onChange={(c) => onStatusChange(c, record)} />

        );
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 80,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={16}>
          <Button type="link" onClick={() => onEdit(record)}>编辑</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const token = Pubsub.subscribe('UPDATE-ENTRY', () => {
      actionRef.current?.reload();
    });
    return () => {
      Pubsub.unsubscribe(token);
    };
  }, []);

  const request = async (params: any) => {
    const { data } = await getEntryList({
      pageNum: params.current || 1,
      pageSize: params.pageSize || 10,
      entryName: params?.entryName,
      tag: params?.tag,
      status: params?.status,
    });
    return {
      data: data?.list || [],
      total: data?.total || 0,
    };
  };

  return (
    <>
      <AntProTable<any>
        actionRef={actionRef}
        columns={columns}
        request={request}
        scroll={{ x: 1200 }}
        rowKey="id"
        pagination={{ defaultPageSize: 10 }}
        search={{ labelWidth: 'auto' }}
        headerTitle="词条列表"
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => { setModelType(EModelType.ADD); setFormData(null); setCreateModalOpen(true); }}>添加</Button>,
        ]}
      />

      <EditModel
        type={modelType}
        formData={formData}
        createModalOpen={createModalOpen}
        setCreateModalOpen={setCreateModalOpen}
        onSubmit={async (values: any) => {
          const res = await saveEntry(values);
          if ((res as any)?.code === 0) {
            message.success('保存成功');
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-ENTRY');
          }
        }}
      />
    </>
  );
};

export default ProTable;
