import {
  getDeviceAppAuthorize,
  getDeviceAppCancelDisable,
  getDeviceAppDisable,
  getDeviceAppList,
} from '@/api/equipment';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, message, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import AppAuthorizationEditModel from './AppAuthorizationEditModel';

interface IAppProps {
  deviceId: string;
}
const { state } = history.location as any;

const ProTableV1: React.FC<IAppProps> = () => {
  const proTableV1Ref = useRef<ActionType>();
  const [formData, setFormData] = useState<any>();
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const onDeviceAppAuthorize = async (id: number) => {
    // 根据sq的值决定调用授权还是取消授权的接口
    const { code } = await getDeviceAppAuthorize(id);
    if (code === 200) {
      message.success('设置成功！');
      proTableV1Ref.current?.reload();
    }
  };
  //是否禁用
  const onDevicesAppDisable = async (id: number, isDisable?: boolean) => {
    const { code } = isDisable
      ? await getDeviceAppCancelDisable(id)
      : await getDeviceAppDisable(id);
    if (code === 200) {
      message.success('设置成功！');
      proTableV1Ref.current?.reload();
    }
  };
  // 编辑回显
  const onEdit = (data: any) => {
    setFormData(data);
    setCreateModalOpen(true);
  };

  const columns: ProColumns<any>[] = [
    {
      title: '应用名称',
      dataIndex: 'appName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: 'APPID',
      dataIndex: 'appId',
      hideInSearch: true,
      ellipsis: true,
    },

    {
      title: '禁用状态',
      hideInSearch: true,
      dataIndex: 'disabled',

      ellipsis: true,
      // width: 120,
      valueEnum: {
        0: { text: '未禁用', status: 'Success' },
        1: { text: '已禁用', status: 'Error' },
      },
    },
    {
      title: '授权状态状态',
      dataIndex: 'authStatus',
      hideInSearch: true,
      ellipsis: true,
      // width: 120,
      valueEnum: {
        0: { text: '未授权', status: 'Error' },
        1: { text: '已授权', status: 'Success' },
      },
    },
    {
      title: '锁定状态',
      dataIndex: 'locked',
      hideInSearch: true,
      ellipsis: true,
      // width: 120,
      valueEnum: {
        0: { text: '未锁定', status: 'Error' },
        1: { text: '已锁定', status: 'Success' },
      },
    },
    {
      title: '授权截止时间',
      dataIndex: 'authExpireTime',
      hideInSearch: true,
      ellipsis: true,
      valueType: 'date',
    },


    {
      title: '操作',
      dataIndex: 'option',
      hideInSearch: true,
      width: 250,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button
            type="link"
            onClick={() => onDeviceAppAuthorize(record.id)}
            key="authorization"
            disabled={!!record.authStatus}
          >
            应用授权
          </Button>
          <Button
            type="link"
            onClick={() => onDevicesAppDisable(record.id, record.disabled)}
            key="disabled"
          >
            {!record.disabled ? '禁用' : '启用'}
          </Button>
          <Button type="link" key="edit" onClick={() => onEdit(record)}>
          授权截止时间
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-APPAUTHORIZATION', () => {
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
    const data = await getDeviceAppList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      deviceId: state?.id,
    });

    return {
      data: data?.data || [], // 数据列表
    };
  };

  return (
    <>
      <ProTable<any>
        actionRef={proTableV1Ref}
        columns={columns}
        request={request}
        rowKey="id"
        pagination={false}
        search={false}
        headerTitle="应用授权"
        options={false}
      />
      {/* 查看/编辑/新增 */}
      <AppAuthorizationEditModel
        formData={formData}
        setCreateModalOpen={setCreateModalOpen}
        createModalOpen={createModalOpen}
      />
      {/* end */}
    </>
  );
};
export default ProTableV1;
