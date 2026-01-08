import { getOpsReleaseList } from '@/api/appManage';
import Confirmation from '@/components/Confirmation';
import { useManage } from '@/hooks/useManage';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen, onOpsDel } = useManage();

  // item
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  // 编辑回现
  const onEdit = async (data: any) => {
    setModelType(EModelType.EDIT);

    setFormData(data);
    setCreateModalOpen(true);
  };

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-OPSLIST', () => {
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

  const columns: ProColumns<any>[] = [
    {
      title: '系统版本',
      dataIndex: 'osVersion',
      ellipsis: true,
      width: 200,
    },
    {
      title: '下载路径',
      dataIndex: 'osUrl',
      ellipsis: true,
      hideInSearch: true,
      copyable: true,
      width: 300,
    },
    {
      title: '模块',
      dataIndex: 'model',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '校验',
      dataIndex: 'checkSum',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '是否当前版本',
      dataIndex: 'currentVersion',
      ellipsis: true,
      hideInSearch: true,
      render(dom, entity) {
        return (
          <Tag color={entity.currentVersion ? '#52c41a' : '#ff4d4f'}>
            {entity.currentVersion ? '是' : '否'}
          </Tag>
        );
      },
    },

    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
      hideInSearch: true,
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
          <Confirmation onConfirm={() => onOpsDel(record.id)} key="del">
            <Button type="link">删除</Button>
          </Confirmation>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize

    const { data } = await getOpsReleaseList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      osVersion: params?.osVersion,

      // 你可以添加其他需要的查询参数
    });
    return {
      data: data.records, // 数据列表
      // total: data.total, // 数据总数
      // 如果有其他分页信息，也可以在这里返回
    };
  };

  return (
    <>
      <ProTable<any>
        actionRef={proTableV1Ref}
        columns={columns}
        rowKey="id"
        request={request}
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          labelWidth: 'auto',
        }}
        headerTitle="ops列表"
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
            添加
          </Button>,
        ]}
      />

      {/* 查看/编辑/新增 */}
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
