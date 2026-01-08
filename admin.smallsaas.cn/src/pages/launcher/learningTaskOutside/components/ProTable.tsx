import { learningTaskOutsideList } from '@/api/learningTaskOutside';
import Confirmation from '@/components/Confirmation';
import { useLauncher } from '@/hooks/useLauncher';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Space, Switch } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}
const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const {
    createModalOpen,
    setCreateModalOpen,
    onLearningTaskOutsideDelete,
    onLearningTaskOutsidUpdateStatus,
  } = useLauncher();

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
    const updataListPub = Pubsub.subscribe('UPDATE-LEARNINGTASKOUTSIDE', () => {
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
      title: '任务名称',
      dataIndex: 'taskName',
      ellipsis: true,
      render: (_, record: any) => {
        return (
          <a
            onClick={() => {
              history.push('/launcher/learningCenter/learningTaskOutside/content', record);
            }}
          >
            {record.taskName}
          </a>
        );
      },
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '积分',
      dataIndex: 'points',
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
      title: '组织',
      dataIndex: 'orgList',
      hideInSearch: true,
      render: (_, record: any) => {
        return record.orgList.map((item: any) => item?.orgName).join('、');
      },
      ellipsis: true,
    },
    {
      title: '说明',
      dataIndex: 'info',
      hideInSearch: true,
      ellipsis: true,
    },

    {
      title: '是否启用',
      tooltip: '禁用/启用当前学习专题',
      dataIndex: 'status',
      ellipsis: true,
      width: 100,
      align: 'center',
      fixed: 'right',
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
      render: (_, record: any) => {
        return (
          <Switch
            checked={!!record.status}
            onChange={(b: boolean) => onLearningTaskOutsidUpdateStatus(b, record.id)}
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
          <Confirmation onConfirm={() => onLearningTaskOutsideDelete(record.id)} key="del">
            <Button type="link">删除</Button>
          </Confirmation>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize

    const { data } = await learningTaskOutsideList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      // 你可以添加其他需要的查询参数
      taskName: params?.taskName,
      status: params?.status,

      // 你可以添加其他需要的查询参数
    });

    return {
      data: data?.list, // 数据列表
      total: data?.total, // 数据总数
      // 如果有其他分页信息，也可以在这里返回
    };
  };

  return (
    <>
      <ProTable<any>
        actionRef={proTableV1Ref}
        columns={columns}
        request={request}
        rowKey="id"
        scroll={{ x: 1300 }}
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          labelWidth: 'auto',
        }}
        headerTitle="学习任务表"
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
