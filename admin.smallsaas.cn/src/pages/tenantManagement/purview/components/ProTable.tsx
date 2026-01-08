import { getPermGroups, getPerms } from '@/api/tenantManagement';
import Confirmation from '@/components/Confirmation';
import { useTenantManagement } from '@/hooks/useTenantManagement';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';
import EditModelGroup from './EditModelGroup';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}
interface IProps {
  type: string;
}

const ProTableV1: React.FC<IProps> = ({ type }) => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen, onDelPerms, onDelPermGroups } =
    useTenantManagement();

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
    console.log('type', type);
    proTableV1Ref.current?.reload();

    const updataListPub = Pubsub.subscribe('UPDATE-PERMLIST', () => {
      // 刷新
      if (proTableV1Ref) {
        // 手动调用刷新
        proTableV1Ref.current?.reload();
      }
    });
    return () => {
      Pubsub.unsubscribe(updataListPub);
    };
  }, [type]);

  const columns: ProColumns<any>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: type === 'perm' ? '权限名称' : '权限分组名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '识别字符',
      dataIndex: 'identifier',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '是否公共',
      dataIndex: 'publicFlag',
      hideInSearch: true,
      ellipsis: true,
      valueEnum: {
        false: { text: '否', status: 'Default' },
        true: { text: '是', status: 'Success' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Confirmation
            onConfirm={() => (type === 'perm' ? onDelPerms(record.id) : onDelPermGroups(record.id))}
            key="del"
          >
            <Button type="link">删除</Button>
          </Confirmation>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    let response;
    if (type === 'perm') {
      response = await getPerms({
        pageNum: params.current || 1,
        pageSize: params.pageSize || 10,
        name: params?.name,
      });
    } else {
      console.log('getPermGroups');

      response = await getPermGroups({
        pageNum: params.current || 1,
        pageSize: params.pageSize || 10,
        name: params?.name,
      });
    }
    return {
      data: response?.data?.records,
      total: response?.data.total,
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
        headerTitle={type === 'perm' ? '权限列表' : '权限分组列表'}
        toolBarRender={() => [
          <Button
            onClick={() => {
              setModelType(EModelType.ADD);
              setFormData(null);
              setCreateModalOpen(true);
            }}
            type="primary"
            key="primary"
          >
            添加{type === 'perm' ? '权限' : '权限分组'}
          </Button>,
        ]}
      />
      {/* 查看/编辑/新增 */}
      {type === 'perm' ? (
        <EditModel
          type={modelType}
          formData={formData}
          setCreateModalOpen={setCreateModalOpen}
          createModalOpen={createModalOpen}
        />
      ) : (
        <EditModelGroup
          type={modelType}
          formData={formData}
          setCreateModalOpen={setCreateModalOpen}
          createModalOpen={createModalOpen}
        />
      )}

      {/* end */}
    </>
  );
};
export default ProTableV1;
