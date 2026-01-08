import { Card, Flex, message, Select, Tooltip } from 'antd';
import * as React from 'react';
import { useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { SocketEvent } from './data';
import './index.scss';
interface IAppProps {
  socket: any;
  roomInfo: any;
  onMeetingRoomsInfo: () => void;
}

const RoomServer: React.FC<IAppProps> = (props) => {
  const { socket, roomInfo, onMeetingRoomsInfo } = props;
  const [socketOnData, setsocketOnData] = useState<any>();
  const [socketEmitData, setSocketEmitData] = useState<any>();
  // const [socketEmitEvent, setSocketEmitEvent] = useState<any>();

  useEffect(() => {
    setSocketEmitData(SocketEvent[0]);

    // 监听socket的所有返回

    SocketEvent.forEach((event) => {
      socket.on(event.label, (data: any) => {
        console.log(data, event.label);
        setsocketOnData((prevData: any) => ({
          ...prevData,
          [event.label]: data,
        }));
      });
    });

    socket.on('RECEIVE_ROOM_INFO', (data: any) => {
      setsocketOnData((prevData: any) => ({
        ...prevData, // 展开之前的状态
        RECEIVE_ROOM_INFO: data, // 更新 RECEIVE_ROOM_INFO 的值
      }));
    });

    socket.on('message', (data: any) => {
      setsocketOnData((prevData: any) => ({
        ...prevData,
        message: data,
      }));
    });
  }, []);

  const emitSocketEvent = () => {
    try {
      const parsedData = JSON.parse(socketEmitData.value);
      if (!parsedData) {
        message.error('格式错误');
        return;
      }
      socket.emit(socketEmitData.label, parsedData);
      message.success('发送成功');
      // onMeetingRoomsInfo();
    } catch (error) {
      message.error('发送失败');
    }
  };
  useEffect(() => {
    console.log(socketEmitData);
  }, [socketEmitData]);
  return (
    <div>
      <Card
        className="card1"
        title="房间用户"
        extra={
          <div>
            <a href="#" onClick={() => onMeetingRoomsInfo()}>
              刷新房间（房间数:{roomInfo && Object.entries(roomInfo).length}）
            </a>
          </div>
        }
      >
        <pre>
          <code>{JSON.stringify(roomInfo, null, 2)}</code>
        </pre>
      </Card>
      <Flex>
        <Card
          className="card2"
          //
          title={
            <Tooltip title="发送无响应时，尝试LEAVE_ROO退出房间重新加入">
              <span>socket.emit</span>
            </Tooltip>
          }
          extra={
            <a href="#" onClick={emitSocketEvent}>
              发送
            </a>
          }
        >
          <Select
            style={{ width: 200 }}
            options={SocketEvent}
            value={socketEmitData}
            onChange={(value: any, v: any) => {
              // setSocketSelectData(value);
              setSocketEmitData(v);
              setsocketOnData(null);
            }}
          />
          <span className=" pl-6 f12999">每个消息体均为示例，实际发送请复制真实参数</span>
          <MonacoEditor
            className={'MonacoEditor'}
            // language="javascript"
            theme="vs-dark"
            height={'300px'}
            value={socketEmitData?.value}
            options={{
              minimap: {
                enabled: false,
              },
              wordWrap: 'on',
              // 其他你需要的选项...
            }}
            onChange={(newValue, e) => {
              console.log(newValue, e);
              setSocketEmitData({ ...socketEmitData, value: newValue });
              // console.log(JSON.parse(newValue));
            }}
          />
        </Card>
        {/* <pre>
          <code>{socketEmitData?.value}</code>
        </pre> */}
        <Card
          className="card2"
          title="socket.on"
          extra={
            <a
              href="#"
              onClick={() => {
                setsocketOnData(null);
              }}
            >
              清空
            </a>
          }
        >
          <pre>
            <code>{socketOnData && JSON.stringify(socketOnData, null, 2)}</code>
          </pre>
        </Card>
      </Flex>
    </div>
  );
};

export default RoomServer;
