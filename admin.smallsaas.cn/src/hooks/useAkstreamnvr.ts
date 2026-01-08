import { getStartRecordApi, getStopRecordApi, getStreamStopApi } from '@/api/akstreamnvr';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import { useState } from 'react';

export const useAkstreamnvr = () => {
  // from open
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  const getStartRecord = (channel: any) => {
    const query = {
      mediaServerId: channel.mediaServerId,
      mainId: channel.mainId,
      secret: ZlMediaKit_Secret,
    };
    getStartRecordApi(query).then((res) => {
      // if (res.code === 200) {
      //   message.success('开始录制!');
      // } else {
      //   message.error('录制失败!');
      //   console.error(res.Message);
      // }
      if (res.result) {
        message.success('开始录制!');
      } else {
        message.error('录制失败!');
      }
    });
  };

  //暂停录制
  const getStopRecord = (channel: any) => {
    const query = {
      mediaServerId: channel.mediaServerId,
      mainId: channel.mainId,
      secret: ZlMediaKit_Secret,
    };
    getStopRecordApi(query).then((res) => {
      // if (res.code === 200) {
      //   message.success('暂停成功!');
      // } else {
      //   message.error('暂停失败!');
      //   console.error(res.Message);
      // }
      if (res.result) {
        message.success('暂停成功!');
      } else {
        message.error('暂停失败!');
      }
    });
  };
  // 结束推流
  const getStreamStop = (channel: any) => {
    const query = {
      mediaServerId: channel.mediaServerId,
      mainId: channel.mainId,
      secret: ZlMediaKit_Secret,
    };
    getStreamStopApi(query).then((res) => {
      // if (res.code === 200) {
      //   Pubsub.publish('UPDATE-AKSTREAMNVRLIST');
      //   message.info('结束推流!');
      // } else {
      //   message.error(res.Message);
      // }
      Pubsub.publish('UPDATE-AKSTREAMNVRLIST');
      if (res) message.info('结束推流!');
    });
  };
  // 激活设备
  // const activeVideoChannel = (channel: any) => {
  //   const query = {
  //     ...channel,
  //   };
  //   activeVideoChannelApi(query, channel.mainId).then((res) => {
  //     if (res.code === 200) {
  //       message.info('激活设备成功!');
  //       // activeCnuterRef.current.onClose();
  //       Pubsub.publish('UPDATE-AKSTREAMNVRLIST');
  //     } else {
  //       console.error(res.Message);
  //     }
  //   });
  // };

  return {
    setCreateModalOpen,
    createModalOpen,
    getStartRecord,
    getStopRecord,
    getStreamStop,
    // activeVideoChannel,
  };
};
