import { getPioneeringDeedsList } from '@/api/baseWork';
import Confirmation from '@/components/Confirmation';
import { useLauncher } from '@/hooks/useLauncher';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProFormSelect, ProTable } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel, { secondTypeOptions, typeOptions } from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen, onPioneeringDeedsDel } = useLauncher();
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  // 编辑回现
  const onEdit = (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(data);
    setCreateModalOpen(true);
  };
  const columns: ProColumns<any>[] = [
    {
      title: '图片',
      dataIndex: 'imgUrl',
      hideInSearch: true,
      valueType: 'image',
      ellipsis: true,
      className: 'image-100',
      width: 100,
    },
    {
      title: '栏目',
      dataIndex: 'type',
      ellipsis: true,
      render: (_, i: any) => (
        <Tag
          color={typeOptions.find((k: any) => k.value === i.type)?.color}
        >{typeOptions.find((k: any) => k.value === i.type)?.label}</Tag>
      ),
      renderFormItem: () => {
        return <ProFormSelect options={typeOptions} />;
      },
    },
    {
      title: '类型',
      dataIndex: 'secondType',
      ellipsis: true,
      render: (_, i: any) => <Tag
        color={secondTypeOptions.find((k: any) => k.value === i.type)?.color}
      >{secondTypeOptions.find((k: any) => k.value === i.type)?.label}</Tag>,
      renderFormItem: () => {
        return <ProFormSelect options={secondTypeOptions} />;
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      hideInSearch: true,

    },

    {
      title: '内容',
      dataIndex: 'content',
      hideInSearch: true,
      ellipsis: true,
    },

    {
      title: '发布机关',
      dataIndex: 'publisher',
      hideInSearch: true,
      ellipsis: true,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Confirmation onConfirm={() => onPioneeringDeedsDel(record.id)} key="del">
            <a>删除</a>
          </Confirmation>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-PIONEERDEEDS', () => {
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
    const { data } = await getPioneeringDeedsList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      type: params?.type,
      secondType: params?.secondType,
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
        headerTitle="先锋事迹列表"
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
            添加事迹
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
