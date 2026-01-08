import Confirmation from '@/components/Confirmation';
import { getCategoryList, deleteCategory } from '@/api/workflow';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  // 删除分类
  const onDel = async (id: any) => {
    const res = await deleteCategory(id);

    if (res?.code === 200) {
      message.success('删除成功');
      // 刷新
      if (proTableV1Ref) {
        // 手动调用刷新
        proTableV1Ref.current?.reload();
      }
    }
  }

  // 编辑回现
  const onEdit = (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(data);
    setCreateModalOpen(true);
  };

  const columns: ProColumns<any>[] = [

    {
      title: '分类名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '分类编码',
      dataIndex: 'code',
      ellipsis: true,
    },
    {
      title: '父级分类',
      dataIndex: 'pName',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => record.pName || '-',
    },
    {
      title: '排序',
      dataIndex: 'sortorder',
      hideInSearch: true,
      width: 80,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 160,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Confirmation onConfirm={() => onDel(record.id)} key="del">
            <a>删除</a>
          </Confirmation>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-CATEGORY', () => {
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
    const res = await getCategoryList({
      page: params.current || 1, // 当前页码
      size: params.pageSize || 10, // 每页条数
      identifier: 'workflow', // 标识这是工作流分类
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
        headerTitle="工作流分类"
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
            添加分类
          </Button>,
        ]}
      />

      {/* 添加/编辑分类 */}
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
