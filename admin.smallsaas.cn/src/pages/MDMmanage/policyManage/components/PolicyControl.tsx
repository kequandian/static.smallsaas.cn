import Confirmation from '@/components/Confirmation';
import { policyDelete, policyPage } from '@/services/mdm/policy';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef } from 'react';
import { history } from '@umijs/max';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const PolicyControl: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();

  // 删除
  const onDel = async (id: any) => {
    const { code } = await policyDelete({ id: id });

    if (code === 200) {
      message.success('删除成功');
    }
    // 刷新
    if (proTableV1Ref) {
      // 手动调用刷新
      proTableV1Ref.current?.reload();
    }
  };
  
  // 编辑 - 使用路由导航
  const onEdit = (data: any) => {
    history.push(`/MDMmanage/policyManage/edit/${data.id}`);
  };

  const columns: ProColumns<any>[] = [
    {
      title: '策略名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '策略编号',
      dataIndex: 'num',
      ellipsis: true,
    },
    {
      search: false,
      title: '应用渠道数',
      dataIndex: 'channelCount',
      ellipsis: true,
    },
    {
      search: false,
      title: '应用设备数',
      dataIndex: 'deviceCount',
      ellipsis: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
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
          <Confirmation onConfirm={() => onDel(record.id)} key="del">
            <a>删除</a>
          </Confirmation>
        </Space>
      ),
    },
  ];
  
  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-POLICY', () => {
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
    const { data } = await policyPage({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      name: params?.name,
      num: params?.num,
    });
    return {
      data: data?.records || [], // 数据列表
      total: data?.total, // 数据总数
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
        headerTitle="列表"
        toolBarRender={() => [
          <Button
            key={'add'}
            onClick={() => {
              history.push('/MDMmanage/policyManage/add');
            }}
            type="primary"
          >
            创建策略
          </Button>,
        ]}
      />
    </>
  );
};
export default PolicyControl; 