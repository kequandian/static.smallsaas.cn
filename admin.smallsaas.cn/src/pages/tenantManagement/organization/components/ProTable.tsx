import { getOrgList } from '@/api/tenantManagement';
import { useTenantManagement } from '@/hooks/useTenantManagement';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑', // 修改为正确的枚举名称
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen, onDelOrg } = useTenantManagement();

  // item
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  // 编辑回现
  const onEdit = (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(data);
    setCreateModalOpen(true);
  };

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-ORGANIZATION', () => {
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

  const onAdd = (data: any) => {
    setModelType(EModelType.ADD);
    setFormData({ id: data.id });
    setCreateModalOpen(true);
  };
  const columns: ProColumns<any>[] = [
    {
      title: '组织全称',
      dataIndex: 'fullName',
      ellipsis: true,
    },
    {
      title: '组织名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '组织类型',
      dataIndex: 'orgType',
      hideInSearch: true,
      ellipsis: true,
      valueEnum: {
        0: { text: '平台', status: 'Error' },
        1: { text: '租户', status: 'Warning' },
        2: { text: '公司', status: 'Default' },
        3: { text: '分公司', status: 'Processing' },
        4: { text: '部门', status: 'Error' },
        5: { text: '工作组', status: 'Success' },
      },
    },
    {
      title: '组织代码',
      dataIndex: 'orgCode',
      hideInSearch: true,
      ellipsis: true,
    },

    {
      title: '备注',
      dataIndex: 'note',
      hideInSearch: true,
      ellipsis: true,
    },
    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   width: 200,
    //   fixed: 'right',
    //   render: (_, record: any) => (
    //     <Space key={'space'} size={20}>
    //       <Button type="link" key={`app-${record.id}`} onClick={() => onAdd(record)}>
    //         创建子组织
    //       </Button>
    //       <Button
    //         // disabled={record?.orgType === 1 || record?.orgType === 0}
    //         type="link"
    //         key={`edit-${record.id}`}
    //         onClick={() => onEdit(record)}
    //       >
    //         编辑
    //       </Button>
    //       <Confirmation onConfirm={() => onDelOrg(record.id)} key={`del-${record.id}`}>
    //         <Button type="link">删除</Button>
    //       </Confirmation>
    //     </Space>
    //   ),
    // },
  ];

  const request = async (params: any) => {
    const { data } = await getOrgList({
      pageNum: params.current || 1,
      pageSize: params.pageSize || 10,
      name: `${params.name || ''}`,
    });
    return {
      data: data.records,
      total: data.total,
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
          pageSize: 50,
        }}
        search={{
          labelWidth: 'auto',
        }}
        headerTitle="组织管理"
      />

      <EditModel
        type={modelType}
        formData={formData}
        setCreateModalOpen={setCreateModalOpen}
        createModalOpen={createModalOpen}
      />
    </>
  );
};

export default ProTableV1;
