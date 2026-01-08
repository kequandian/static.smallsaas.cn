import { getMeetingRoomsInfo } from '@/api/nodeApi';
import { PageContainer } from '@ant-design/pro-components';
import * as React from 'react';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import Debug from './debug';
import Log from './log';
import SocketAdmin from './socketAdmin';

const MeetingNumRouting: React.FC = () => {
  const [tabActive, setTabActive] = useState('perm');
  const [socketIo, setSocketIo] = useState<Socket>();
  const [roomInfo, setRoomInfo] = useState<any>();
  // 查询当前参会人
  const onMeetingRoomsInfo = async () => {
    const res = await getMeetingRoomsInfo();
    if (res.code === 200) {
      setRoomInfo(res.rooms);
    }
  };
  useEffect(() => {
    onMeetingRoomsInfo();
    // const socket = io(`${roomUrlPro}/rooom`, {
    const socket = io('http://202.63.172.178:5002/room', {
      // const socket = io('http://192.168.3.22:3000/room', {
      transports: ['websocket'],
      query: {
        // 可选参数
        // 任何需要传递给服务器的查询参数
      },
    });

    socket.on('connect', () => {
      console.log('连接成功', socket.id);
    });
    socket.on('disconnect', () => {
      console.log('断开连接', socket.id);
    });
    // 监听所有事件
    // socket.on('*', (eventName: string, data: any) => {
    //   console.log(`Received event: ${eventName}`, data);
    // });
    setSocketIo(socket);
    return () => {
      if (socket) {
        socket.disconnect();
        console.log('Socket 断开并清理');
      }
    };
  }, []);

  // return <ProTable />;
  return (
    <PageContainer
      className="pageContainerP0"
      title={false}
      tabList={[
        {
          tab: '入离会日志',
          key: 'perm',
        },
        {
          tab: '服务调试',
          key: 'group',
        },
        {
          tab: 'socketAdmin',
          key: 'socketAdmin',
        },
      ]}
      onTabChange={(key) => {
        setTabActive(key);
      }}
    >
      <div style={{ display: tabActive === 'perm' ? '' : 'none' }}>
        {socketIo && <Log socket={socketIo} />}
      </div>
      <div style={{ display: tabActive === 'group' ? '' : 'none' }}>
        {socketIo && (
          <Debug socket={socketIo} roomInfo={roomInfo} onMeetingRoomsInfo={onMeetingRoomsInfo} />
        )}
      </div>
      <div style={{ display: tabActive === 'socketAdmin' ? '' : 'none' }}>
        {socketIo && <SocketAdmin />}
      </div>
    </PageContainer>
  );
};

export default MeetingNumRouting;
