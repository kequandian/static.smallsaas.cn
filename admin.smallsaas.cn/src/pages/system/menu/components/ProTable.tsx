import { getCustomMenusList, getMenuList } from '@/api/menu';
import Confirmation from '@/components/Confirmation';
import { useSystem } from '@/hooks/useSystem';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
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
  CHILD_ADD = '子菜单新增',
  CHECK = '查看',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen, onDel } = useSystem();
  // const access = useAccess();
  // console.log(access, 'access', access.hasPerms('Express.new'));
  const { initialState, setInitialState } = useModel('@@initialState');

  // item
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  // 编辑回现
  const onEdit = (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(data);
    setCreateModalOpen(true);
  };
  // 添加子菜单
  const onAppMenuRoutes = (data: any) => {
    setModelType(`${data?.name}子菜单编辑` as any);
    setFormData({ pid: data.id });
    setCreateModalOpen(true);
  };

  // 获取菜单
  const upDataMenu = async () => {
    const { data } = await getCustomMenusList();
    setInitialState((s) => ({ ...s, menu: data }));
  };

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-MENULIST', async () => {
      upDataMenu();
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
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
      width: 120,
    },
    {
      title: 'path路径',
      dataIndex: 'path',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: 'component路径',
      dataIndex: 'component',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
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
          <Button type="link" key="appMenu" onClick={() => onAppMenuRoutes(record)}>
            添加子菜单
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

    const { data } = await getMenuList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      // 你可以添加其他需要的查询参数
    });
    return {
      data: data, // 数据列表
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
        headerTitle="菜单列表"
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
            创建菜单
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
