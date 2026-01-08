import { getAddAdminList, getPlaceContentList } from '@/api/launcher';
import Confirmation from '@/components/Confirmation';
import { useLauncher } from '@/hooks/useLauncher';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProFormSelect, ProTable } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { Button, Space, Switch, Tooltip } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen, onPlaceContentDelete, onPlaceContentUpdateStatus } =
    useLauncher();

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
    const updataListPub = Pubsub.subscribe('UPDATE-REGIONALCONTENT', () => {
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
      ellipsis: true,
      key: 'image',
      hideInSearch: true,
      valueType: 'image',
      className: 'image-100',
      width: 100,
    },
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '来源',
      dataIndex: 'showSource',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '学习源',
      dataIndex: 'xuexiSourceId',
      ellipsis: true,
      hideInTable: true,
      render: (_, record: any) => {
        return <Link to={`/launcher/learningSource`}>{record.xuexiSourceName}</Link>;
      },
      renderFormItem: () => {
        return (
          <ProFormSelect
            debounceTime={500}
            request={async (params) => {
              // 使用 request 获取选项数据
              const { data } = await getAddAdminList({
                pageNum: params.current || 1, // 当前页码
                pageSize: params.pageSize || 10, // 每页条数
                // title: params.keyWords,
                // 你可以添加其他需要的查询参数
              });
              return data.list.map((item: any) => ({
                label: item.name,
                value: item.id,
              }));
            }}
          />
        );
      },
    },
    {
      title: '类型',
      dataIndex: 'itemTypeName',
      hideInSearch: true,
      ellipsis: true,
    },


    {
      title: '排序',
      dataIndex: 'sort',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '推荐类别',
      dataIndex: 'suggestionTypeName',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '发布时间',
      dataIndex: 'publishDate',
      hideInSearch: true,
      ellipsis: true,
      width: 200,
    },
    {
      title: '是否启用',
      tooltip: '禁用/启用当前地区内容',
      dataIndex: 'status',
      ellipsis: true,
      width: 100,
      align: 'center',
      fixed: 'right',
      valueEnum: {
        0: {
          text: '否',
          status: 'Error',
        },
        1: {
          text: '是',
          status: 'Success',
        },
      },
      render: (_, record: any) => {
        return (
          <Switch
            checked={!!record.status}
            onChange={(b: boolean) => onPlaceContentUpdateStatus(b, record.id)}
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
          <Confirmation onConfirm={() => onPlaceContentDelete(record.id)} key="del">
            <Button type="link">删除</Button>
          </Confirmation>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize

    const { data } = await getPlaceContentList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      xuexiSourceId: params.xuexiSourceId,
      title: params.title,
      status: params.status,
      // 你可以添加其他需要的查询参数
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
        headerTitle="地区内容列表"
        toolBarRender={() => [
          <Tooltip title="用户添加数据源时查询未绑定的列表" key="primary">
            <Button
              onClick={() => {
                setModelType(EModelType.ADD);
                setFormData(null);
                setCreateModalOpen(true);
              }}
              type="primary"
            >
              添加
            </Button>
          </Tooltip>,
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
