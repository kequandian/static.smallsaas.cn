import { getSysCardGetPageList } from '@/api/launcher';
import Confirmation from '@/components/Confirmation';
import { useLauncher } from '@/hooks/useLauncher';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space, Switch, Tag } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel, { bannerSelectType } from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const bannerSelectTypeMap = new Map(bannerSelectType.map((item) => [item.value, item]));

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen, onDelBanner, onUpdateStatus } = useLauncher();

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
    const updataListPub = Pubsub.subscribe('UPDATE-BANNERLIST', () => {
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
      title: '图片',
      dataIndex: 'imgUrl',
      hideInSearch: true,
      key: 'image',
      valueType: 'image',
      className: 'image-100',
      width: 100,
    },
    {
      title: '名称',
      dataIndex: 'name',
      // hideInSearch: true,
      ellipsis: true,
    },

    {
      title: '类型',
      dataIndex: 'type',
      hideInSearch: true,
      ellipsis: true,
      render: (_, i: any) => (
        <Tag color={bannerSelectTypeMap.get(i.type)?.color}>
          {bannerSelectTypeMap.get(i.type)?.label}
        </Tag>
      ),
    },

    {
      title: '路径',
      dataIndex: 'route',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '来源',
      dataIndex: 'showSource',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '备注',
      dataIndex: 'info',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateDate',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '是否启用',
      tooltip: '禁用/启用当前轮播卡片',
      dataIndex: 'status',
      hideInSearch: true,
      ellipsis: true,
      width: 100,
      align: 'center',
      fixed: 'right',
      render: (_, record: any) => {
        return (
          <Switch
            checked={!!record.status}
            onChange={(b: boolean) => onUpdateStatus(b, record.id)}
          />
        );
      },
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
          <Confirmation onConfirm={() => onDelBanner(record.id)} key="del">
            <Button type="link">删除</Button>
          </Confirmation>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize

    const { data } = await getSysCardGetPageList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      // 你可以添加其他需要的查询参数
      name: params.name,
    });
    return {
      data: data.list, // 数据列表
      total: data.total, // 数据总数
      // 如果有其他分页信息，也可以在这里返回
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
        headerTitle="轮播列表"
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
