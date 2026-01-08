import { getVideoChannelList } from '@/api/akstreamnvr';
import { useAkstreamnvr } from '@/hooks/useAkstreamnvr';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import Pubsub from 'pubsub-js';
import React, { createRef, useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';
import PlayFormModal from './playForm';
export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
  CHECK = '查看',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { getStreamStop, createModalOpen, setCreateModalOpen } = useAkstreamnvr();
  let playCnuterRef: any = createRef();

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
    const updataListPub = Pubsub.subscribe('UPDATE-AKSTREAMNVRLIST', () => {
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
  //播放视频
  const getStreamLive = (channel: any) => {
    console.log(playCnuterRef, 'playCnuterRef');

    playCnuterRef?.current.onShow(channel);
  };
  //编辑
  // const editVideoRecord = (record: any) => {
  //   setFormData(record);
  //   setCreateModalOpen(true);
  // };
  const columns: ProColumns<any>[] = [
    {
      title: '设备编号',
      dataIndex: 'mainId',
      key: 'mainId',
      width: 160,
    },
    {
      title: '设备名称',
      dataIndex: 'channelName',
      key: 'channelName',
      width: 160,
    },
    {
      title: '设备类型',
      dataIndex: 'videoDeviceType',
      key: 'videoDeviceType',
      width: 160,
    },
    // {
    //   title: '流媒体服务器',
    //   dataIndex: 'mediaServerId',
    //   key: 'mediaServerId',
    //   width: 160,
    // },
    {
      title: '接入类型',
      dataIndex: 'deviceStreamType',
      key: 'deviceStreamType',
      width: 160,
    },
    // {
    //   title: '网络类型',
    //   dataIndex: 'deviceNetworkType',
    //   key: 'deviceNetworkType',
    //   width: 160,
    // },
    // {
    //   title: 'ipV4地址',
    //   dataIndex: 'ipV4Address',
    //   key: 'ipV4Address',
    //   width: 160,
    // },
    // {
    //   title: '推拉流方式',
    //   dataIndex: 'methodByGetStream',
    //   key: 'methodByGetStream',
    //   width: 160,
    // },
    {
      title: '自动推流',
      dataIndex: 'autoVideo',
      key: 'autoVideo',
      width: 160,
      render: (text) => (
        <span>{text ? <Tag color="#f50">开启</Tag> : <Tag color="volcano">关闭</Tag>}</span>
      ),
    },
    {
      title: '通道ID',
      dataIndex: 'channelId',
      key: 'channelId',
      width: 200,
    },
    {
      title: '设备ID',
      dataIndex: 'deviceId',
      key: 'deviceId',
      width: 200,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 150,
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button>

          <Button type="link" key="streamLive" onClick={() => getStreamLive(record)}>
            播放
          </Button>
          {/* <Confirmation onConfirm={() => onDel(record.id)} key="del">
            <Button type="link">删除</Button>
          </Confirmation> */}
          <Button type="link" key="streamStop" onClick={() => getStreamStop(record)}>
            结束推流
          </Button>
          {/* <Button type="link" key="startRecord" onClick={() => getStartRecord(record)}>
            录制文件
          </Button>
          <Button type="link" key="stopRecord" onClick={() => getStopRecord(record)}>
            暂停录制
          </Button> */}
        </Space>
      ),
    },
  ];

  const request = async () => {
    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize

    const res = await getVideoChannelList({
      pageSize: 10,
      pageNum: 1,
      secret: ZlMediaKit_Secret,
      orderBy: [{ fieldName: 'mediaServerId', orderByDir: 0 }],
      // 你可以添加其他需要的查询参数
    });
    console.log(res);

    return {
      data: res.videoChannelList, // 数据列表
      total: res.total, // 数据总数
      // 如果有其他分页信息，也可以在这里返回
    };
  };

  return (
    <>
      <ProTable
        actionRef={proTableV1Ref}
        columns={columns}
        request={request}
        rowKey="id"
        scroll={{ x: 1300 }}
        pagination={{
          defaultPageSize: 10,
        }}
        search={false}
        headerTitle="设备列表"
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
            创建设备
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
      <PlayFormModal onRef={playCnuterRef} />
    </>
  );
};
export default ProTableV1;
