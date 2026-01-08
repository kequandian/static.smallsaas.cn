import Confirmation from '@/components/Confirmation';
// import { useLauncher } from '@/hooks/useLauncher';
import { channelDelete } from '@/services/mdm/channel';
import { deviceApplicationPage } from '@/services/mdm/deviceApplication';
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
  // const { createModalOpen, setCreateModalOpen } = useLauncher();
  // const [formData, setFormData] = useState<any>();
  // const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  // 删除
  const onDel = async (id: any) => {
    const { code } = await channelDelete({ id: id });

    if (code === 200) {
      message.success('删除成功');
    }
    // 刷新
    if (proTableV1Ref) {
      // 手动调用刷新
      proTableV1Ref.current?.reload();
    }
  };
  // 编辑回现
  // const onEdit = (data: any) => {
  //   setModelType(EModelType.EDIT);
  //   setFormData(data);
  //   setCreateModalOpen(true);
  // };

  const columns: ProColumns<any>[] = [
    {
      title: '应用名称',
      dataIndex: 'name',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '应用包名',
      dataIndex: 'appPackage',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '应用包名',
      dataIndex: 'appPackage',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      ellipsis: true,
    },
    {
      title: '设备ID',
      dataIndex: 'deviceId',
      ellipsis: true,
    },
    {
      title: '设备SN',
      dataIndex: 'deviceSn',
      ellipsis: true,
    },
    {
      title: '设备激活码',
      dataIndex: 'activateCode',
      hideInSearch: true,
      ellipsis: true,
    },

    {
      title: '激活状态',
      dataIndex: 'activation',
      ellipsis: true,
      // 激活状态 1 激活 2 未激活
      valueEnum: {
        1: {
          text: '激活',
          status: 'Default',
        },
        2: {
          text: '未激活',
          status: 'Default',
        },
      },
    },
    {
      title: '过期时间',
      dataIndex: 'expireTime',
      hideInSearch: true,
      ellipsis: true,
      valueType: 'dateTime',
    },
    {
      title: '是否永久不过期',
      dataIndex: 'neverExpire',
      hideInSearch: true,
      ellipsis: true,
      valueEnum: {
        true: {
          text: '是',
          status: 'Success',
        },
        fales: {
          text: '否',
          status: 'Error',
        },
      },
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
          {/* <Button type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button> */}
          <Confirmation onConfirm={() => onDel(record.id)} key="del">
            <a>删除</a>
          </Confirmation>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-DEVICEAPPLICATION', () => {
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
    const { data } = await deviceApplicationPage({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      deviceName: params?.deviceName,
      deviceSn: params?.deviceSn,
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
        // toolBarRender={() => [
        //   <Button
        //     key={'add'}
        //     onClick={() => {
        //       setModelType(EModelType.ADD);
        //       setFormData(null);
        //       setCreateModalOpen(true);
        //     }}
        //     type="primary"
        //   >
        //     添加
        //   </Button>,
        // ]}
      />

      {/* 查看/编辑/添加 */}
      {/* <EditModel
        type={modelType}
        formData={formData}
        setCreateModalOpen={setCreateModalOpen}
        createModalOpen={createModalOpen}
      /> */}
      {/* end */}
    </>
  );
};
export default ProTableV1;
