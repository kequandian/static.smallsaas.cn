import { getTheServerList } from '@/api/theServer';
import Confirmation from '@/components/Confirmation';
import { useTheServer } from '@/hooks/useTheServer';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';

export type TableListItem = {
  key: number;
  name: string;
  status: string;
  createTime: number;
  meetingNumber: string;
  meetingServerIp: string;
};

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
  CHECK = '查看',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen, onDel } = useTheServer();

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
    const updataListPub = Pubsub.subscribe('UPDATE-THESERVERLIST', () => {
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
  // 查看
  // const onCheck = (data: any) => {
  //   setModelType(EModelType.CHECK);
  //   data.notes = '';
  //   setFormData(data);
  //   setCreateModalOpen(true);
  // };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '服务器名称',
      dataIndex: 'name',
      fixed: 'left',
      ellipsis: true,
      width: 120,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '管理端口',
      dataIndex: 'sipPort',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '媒体端口',
      dataIndex: 'portalPort',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '多方会议前缀',
      dataIndex: 'multiMtgPref',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '机房',
      dataIndex: 'location',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '服务器域名',
      dataIndex: 'hostname',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },

    {
      title: '创建时间',
      key: 'since',
      hideInSearch: true,
      dataIndex: 'createTime',
      width: 200,
      sorter: (a, b) => {
        const aTime = new Date(a.createTime).getTime(); // 需要先转换成时间戳
        const bTime = new Date(b.createTime).getTime();
        return aTime - bTime;
      },
      ellipsis: true,
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
          <Confirmation onConfirm={() => onDel(record.id)} key="del">
            <Button type="link">删除</Button>
          </Confirmation>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize

    const { data } = await getTheServerList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      search: `${params.name || ''}`,

      // 你可以添加其他需要的查询参数
    });
    return {
      data: data.records, // 数据列表
      total: data.total, // 数据总数
      // 如果有其他分页信息，也可以在这里返回
    };
  };

  return (
    <>
      <ProTable<TableListItem>
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
        headerTitle="服务器列表"
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
            创建服务器
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
