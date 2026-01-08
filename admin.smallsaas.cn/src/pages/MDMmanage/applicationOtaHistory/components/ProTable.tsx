import Confirmation from '@/components/Confirmation';
import {
  applicationHistoryDelete,
  applicationHistoryPage,
} from '@/services/mdm/applicationHistory';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef } from 'react';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();

  // 删除
  const onDel = async (id: any) => {
    const { code } = await applicationHistoryDelete({ id: id });

    if (code === 200) {
      message.success('删除成功');
    }
    // 刷新
    if (proTableV1Ref) {
      // 手动调用刷新
      proTableV1Ref.current?.reload();
    }
  };

  const columns: ProColumns<any>[] = [
    {
      title: '设备ID',
      dataIndex: 'deviceId',
      ellipsis: true,
    },
    {
      title: '任务名称',
      dataIndex: 'name',
      ellipsis: true,
    },

    {
      title: '应用包名',
      dataIndex: 'appPackage',
      ellipsis: true,
    },

    {
      title: '升级前版本',
      dataIndex: 'beforeVersion',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '升级后版本',
      dataIndex: 'afterVersion',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '执行时间',
      dataIndex: 'execTime',
      hideInSearch: true,
      ellipsis: true,
    },

    {
      title: '是否升级成功',
      dataIndex: 'upgradeSuccess',
      hideInSearch: true,
      ellipsis: true,
      valueEnum: {
        true: {
          text: '成功',
          status: 'success',
        },
        false: {
          text: '失败',
          status: 'error',
        },
      },
    },

    {
      title: '失败原因',
      dataIndex: 'failReason',
      hideInSearch: true,
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
      width: 60,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Confirmation onConfirm={() => onDel(record.id)} key="del">
            <a>删除</a>
          </Confirmation>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-APPLICATIONHISTORY', () => {
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
    const { data } = await applicationHistoryPage({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      name: params?.name,
      appPackage: params?.appPackage,
      deviceId: params?.deviceId,
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
      />
    </>
  );
};
export default ProTableV1;
