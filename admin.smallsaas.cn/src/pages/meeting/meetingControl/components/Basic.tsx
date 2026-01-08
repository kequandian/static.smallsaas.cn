// @flow
import {
  getMeetingRoomsInfo,
  setMuteAllCameras,
  setMuteAllMic,
  setMutePartCamera,
  setMutePartMic,
} from '@/api/nodeApi';
import { AudioOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Avatar, Badge, Col, Flex, List, message, Row } from 'antd';
import Countdown, { CountdownProps } from 'antd/es/statistic/Countdown';
import { useEffect, useState } from 'react';
import '../index.scss';
import ChatList from './ChatList';
// import ChatList from './ChatList';
import dayjs from 'dayjs';

interface Props {
  meetingData: any;
}

export const Basic: React.FC<Props> = (props) => {
  const { chatRecord, meetingStartTime, creatorUserName, hostpartyUserName, meetingNumber } =
    props.meetingData;
  const [roomInfo, setRoomInfo] = useState<any>();
  // const [chatRecord, setChatRecord] = useState<any>();
  // 查询当前参会人
  const onMeetingRoomsInfo = async () => {
    const res = await getMeetingRoomsInfo(meetingNumber);
    if (res.code === 200) {
      setRoomInfo(res.data);
    }
  };
  const newChatRecord = chatRecord?.map((item: any) => {
    const diffMinutes = dayjs(item.chatTime).diff(dayjs(Number(meetingStartTime)), 'minute');
    // 将分钟差转换为小时和分钟
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    // 根据分钟差决定显示格式
    const formattedTime = hours > 0 ? `${hours}小时${minutes}分钟` : `${minutes}分钟`;
    return {
      ...item,
      time: formattedTime, // 格式化后的时间
    };
  });

  // 查询当前会议聊天记录
  // const onMeetingIdChatRecord = async () => {
  //   const res = await getMeetingIdChatRecord(meetingId);

  //   if (res.code === 200) {
  //     setChatRecord(res.data);
  //   }
  // };

  useEffect(() => {
    onMeetingRoomsInfo();
    // onMeetingIdChatRecord();
  }, []);

  // const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK
  const onFinish: CountdownProps['onFinish'] = () => {
    console.log('finished!');
  };

  //全体静音开关
  const onMuteAllMic = async () => {
    let params = {
      roomId: meetingNumber,
      allowLocalUnmute: 0,
    };
    const res = await setMuteAllMic(params);
    if (res.code === 200) {
      console.log(res);
      if (typeof res.data === 'string') {
        message.info(res.data);
      }
    }
  };

  // 全体摄像头开关
  const onMuteAllCameras = async () => {
    let params = {
      roomId: meetingNumber,
      mute: 0,
    };
    const res = await setMuteAllCameras(params);
    if (res.code === 200) {
      console.log(res);
      if (typeof res.data === 'string') {
        message.info(res.data);
      }
      onMeetingRoomsInfo();
    }
  };

  // 指定人静音
  const onMutePartyMic = async (item: any, mute: number) => {
    let params = {
      roomId: meetingNumber,
      partyNumber: item.partyNumber,
      mute: mute,
    };
    const res = await setMutePartMic(params);
    if (res.code === 200) {
      if (item.muteMic) {
        message.info('静音开启');
      } else {
        message.info('静音关闭');
      }
      console.log(res);
      if (typeof res.data === 'string') {
        message.info(res.data);
      }
      onMeetingRoomsInfo();
    }
  };

  // 指定人视频开关
  const onMutePartCamera = async (item: any, mute: number) => {
    let params = {
      roomId: meetingNumber,
      partyNumber: item.partyNumber,
      mute: mute,
    };
    const res = await setMutePartCamera(params);
    if (res.code === 200) {
      console.log(res);
      if (item.muteCamera) {
        message.info('摄像头开启');
      } else {
        message.info('摄像头关闭');
      }
      if (typeof res.data === 'string') {
        message.info(res.data);
      }
      onMeetingRoomsInfo();
    }
  };

  // 离会
  const onLeaveRoom = async (item: any) => {
    let params = {
      roomId: meetingNumber,
      partyNumber: item.partyNumber,
    };
    const res = await setMutePartCamera(params);
    if (res.code === 200) {
      console.log(res);
      if (typeof res.data === 'string') {
        message.info(res.data);
      }
      onMeetingRoomsInfo();
    }
  };
  return (
    <div>
      <Row className="pageProCard">
        {/*  */}
        <Col span={16}>
          <Row>
            <Col span={12}>
              <div className="meeting-status">
                <Countdown
                  title={<Badge status="success" text="进行中" />}
                  // value={deadline}
                  onFinish={onFinish}
                />
                <div className="f12999">剩余时间</div>
              </div>
            </Col>
            {/*  */}
            <Col span={12} className="pageStart">
              <Row>
                <Col className="colLeft" span={8}>
                  主持人
                </Col>
                <Col span={8}>{hostpartyUserName}</Col>
              </Row>
              <Row justify="start">
                <Col className="colLeft" span={8}>
                  创建人
                </Col>
                <Col span={8}>{creatorUserName}</Col>
              </Row>
              <Row justify="start">
                <Col className="colLeft" span={8}>
                  会议ID
                </Col>
                <Col span={8}>{meetingNumber}</Col>
              </Row>
              <Row justify="start">
                <Col className="colLeft" span={8}>
                  会议密码
                </Col>
                <Col span={8}>-</Col>
              </Row>
            </Col>
          </Row>

          <ProCard ghost title="参会人">
            <List
              itemLayout="horizontal"
              split={false}
              dataSource={roomInfo?.partyList}
              renderItem={(item: any) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.userInfo.avatar} />}
                    title={item.userInfo.name}
                    description={item.userInfo.id}
                  />
                  <div className="mic">
                    <div className="icon">
                      {!!item.muteMic ? (
                        <i
                          className="iconfont icon-microphone"
                          onClick={() => onMutePartyMic(item, 0)}
                        />
                      ) : (
                        <i
                          className="iconfont icon-microphoneoff"
                          onClick={() => onMutePartyMic(item, 1)}
                        />
                      )}
                    </div>
                    <div className="icon">
                      {!!item.muteCamera ? (
                        <i
                          className="iconfont icon-video"
                          onClick={() => onMutePartCamera(item, 0)}
                        />
                      ) : (
                        <i
                          className="iconfont icon-videooff"
                          onClick={() => onMutePartCamera(item, 1)}
                        />
                      )}
                    </div>
                    <div className="icon" onClick={() => onLeaveRoom(item)}>
                      <i className="iconfont icon-power" />
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </ProCard>
        </Col>

        <Col span={8}>
          <ChatList list={newChatRecord} />
        </Col>
      </Row>

      {/*  */}
      <Flex justify="space-between" gap="middle" className="pageGrid">
        <div className="ant-col">
          <AudioOutlined onClick={() => onMuteAllMic()} />
          <div>MUTE_ALL_MIC</div>
        </div>
        <div className="ant-col" onClick={() => onMuteAllCameras()}>
          <VideoCameraOutlined />
          <div>MUTE_ALL_CAMERAS</div>
        </div>
        {/* <div className="ant-col">
          <div>123</div>
          <div>123</div>
        </div>
        <div className="ant-col">
          <div>123</div>
          <div>123</div>
        </div> */}
      </Flex>
    </div>
  );
};
