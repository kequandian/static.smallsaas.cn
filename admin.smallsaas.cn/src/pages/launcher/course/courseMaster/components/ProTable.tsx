import { getAddAdminList, getCourseMasterList } from '@/api/launcher';
import Confirmation from '@/components/Confirmation';
import { useLauncher } from '@/hooks/useLauncher';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProFormSelect, ProTable } from '@ant-design/pro-components';
import { history, Link } from '@umijs/max';
import { Button, Space, Switch, Tooltip } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';

export enum EModelType {
  ADD_USER = '添加',
  EDIT = '编辑',
  ADD_ADMIN = '管理源添加',
}
const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen, onCourseMasterDelete, onCourseMasterUpdateStatus } =
    useLauncher();

  // item
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD_ADMIN);

  // 编辑回现
  const onEdit = (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(data);
    setCreateModalOpen(true);
  };

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-COURSEMASTER', () => {
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
      className: 'image-100',
      width: 100,
      valueType: 'image',
    },
    {
      title: '专题名称',
      dataIndex: 'name',
      ellipsis: true,
      render: (_, record: any) => {
        return (
          <a
            onClick={() => {
              history.push('./courseMaster/courseContent', record);
            }}
          >
            {record.name}
          </a>
        );
      },
    },
    {
      title: '学习源',
      dataIndex: 'xuexiSourceName',
      ellipsis: true,
      // hideInSearch: true,
      render: (_, record: any) => {
        return <Link to={`/launcher/newsManagement/learningSource`}>{record.xuexiSourceName}</Link>;
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
      title: '推荐类别',
      dataIndex: 'suggestionTypeName',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '价格',
      dataIndex: 'price',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '课时数',
      tooltip: '内容数量',
      dataIndex: 'taskNum',
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
      title: '是否启用',
      tooltip: '禁用/启用当前课程专题',
      dataIndex: 'status',
      valueType: 'select',
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
      // hideInSearch: true,
      ellipsis: true,
      width: 100,
      align: 'center',
      fixed: 'right',
      render: (_, record: any) => {
        return (
          <Switch
            defaultChecked={!!record.status}
            onChange={(b: boolean) => onCourseMasterUpdateStatus(b, record.id)}
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
          <Confirmation onConfirm={() => onCourseMasterDelete(record.id)} key="del">
            <Button type="link">删除</Button>
          </Confirmation>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize
    const { data } = await getCourseMasterList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      status: params.status,
      name: params.name,
      xuexiSourceId: params.xuexiSourceName,
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
        headerTitle="课程专题列表"
        toolBarRender={() => [
          <Tooltip title="用户添加数据源时查询未绑定的列表" key="primary">
            <Button
              onClick={() => {
                setModelType(EModelType.ADD_USER);
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
