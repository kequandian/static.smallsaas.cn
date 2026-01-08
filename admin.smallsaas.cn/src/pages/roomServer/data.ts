const MeetingEvents = {
  ERROR: 'error', // 发生错误时的事件

  JOIN_ROOM: 'JOIN_ROOM', // 参会人加入会议房间

  // 8.16新增
  KICK_OUT_PARTY: 'KICK_OUT_PARTY', // 踢出参会人事件
  CHANGE_HOST: 'CHANGE_HOST', // 切换会议主持人的事件
  MUTECHAT: 'MUTECHAT', // 禁止聊天事件
  REQUEST_HOST: 'REQUEST_HOST', // 请求成为主持人的事件
  // end

  LEAVE_ROOM: 'LEAVE_ROOM', // 参会人离开会议房间

  REQUEST_SYNC_ROOM_INFO: 'REQUEST_SYNC_ROOM_INFO', // 请求同步会议房间信息的事件
  RECEIVE_ROOM_INFO: 'RECEIVE_ROOM_INFO', // 接收到会议房间信息的事件

  NOTIFY_TO_UPDATE_PARTY_INFO: 'NOTIFY_TO_UPDATE_PARTY_INFO', // 通知更新参会人信息的事件
  UPDATE_PARTY_INFO: 'UPDATE_PARTY_INFO', // 更新参会人信息的事件

  MUTE_ALL_MIC: 'MUTE_ALL_MIC', // 禁用所有麦克风的事件
  MUTE_PARTY_MIC: 'MUTE_PARTY_MIC', // 禁用指定参会人麦克风的事件 //muteMic
  UNMUTE_ALL_MIC: 'UNMUTE_ALL_MIC', // 启用所有麦克风的事件

  MUTE_ALL_CAMERAS: 'MUTE_ALL_CAMERAS', // 禁用所有摄像头的事件
  MUTE_PARTY_CAMERA: 'MUTE_PARTY_CAMERA', // 禁用指定参会人摄像头的事件
  UNMUTE_ALL_CAMERAS: 'UNMUTE_ALL_CAMERAS', // 启用所有摄像头的事件

  MUTE_MIC: 'MUTE_MIC', // 禁用当前参会人麦克风的事件 //muteMic

  MUTE_CAMERA: 'MUTE_CAMERA', // 禁用当前参会人摄像头的事件
  MUTE_VIDEO: 'MUTE_VIDEO', // 禁用当前参会人视频的事件
  MUTE: 'MUTE', // 禁用当前参会人的所有音视频的事件

  MUTE_SPEAKER: 'MUTE_SPEAKER', // 禁用当前参会人的扬声器的事件

  DISCONNECT: 'disconnect', // 参会人断开连接的事件

  TALKING_USER: 'TALKING_USER',
};

export const SocketEvent = [
  {
    value: JSON.stringify(
      {
        token: 'dummy',
        roomId: '834048026',
        partyNumber: 'a9772448bbe545ecb6923d16f4c187ea',
        partyInfo: {
          allowLocalUnmute: 1,
          hostParty: 1,
          mute: 0,
          muteCamera: 0,
          muteMic: 0,
          muteSpeaker: 0,
          partyNumber: 'a9772448bbe545ecb6923d16f4c187ea',
          socketId: 'jEPBw_KyCcJRpJqBAAAC',
          userInfo: {
            avatar: '/images/avatar/1723173057612.png',
            id: 'a9772448bbe545ecb6923d16f4c187ea',
            name: '2222',
          },
        },
      },
      null,
      2,
    ),
    label: MeetingEvents.JOIN_ROOM,
  },
  {
    value: JSON.stringify(
      {
        roomId: '834048026',
        partyNumber: 'a9772448bbe545ecb6923d16f4c187ea',
      },
      null,
      2,
    ),
    label: MeetingEvents.LEAVE_ROOM,
  },
  {
    value: JSON.stringify(
      {
        roomId: 'KICK_OUT_PARTY',
        partyNumber: 'KICK_OUT_PARTY',
      },
      null,
      2,
    ),
    label: MeetingEvents.KICK_OUT_PARTY,
  },
  {
    value: JSON.stringify(
      {
        roomId: '834048026',
        partyNumber: 'a9772448bbe545ecb6923d16f4c187ea',
        newHostPartyNumber: 'af2926b5d9ba4abebfd6259b9c148bf3',
      },
      null,
      2,
    ),
    label: MeetingEvents.CHANGE_HOST,
  },
  {
    value: JSON.stringify(
      {
        roomId: '834048026',
        partyNumber: 'a9772448bbe545ecb6923d16f4c187ea',
        muteChat: 0,
      },
      null,
      2,
    ),
    label: MeetingEvents.MUTECHAT,
  },
  {
    value: JSON.stringify(
      {
        roomId: 'REQUEST_HOST',
        partyNumber: 'REQUEST_HOST',
      },
      null,
      2,
    ),
    label: MeetingEvents.REQUEST_HOST,
  },

  {
    value: JSON.stringify(
      {
        roomId: 'REQUEST_SYNC_ROOM_INFO',
      },
      null,
      2,
    ),
    label: MeetingEvents.REQUEST_SYNC_ROOM_INFO,
  },

  {
    value: JSON.stringify(
      {
        roomId: 'MUTE_ALL_MIC',
        partyNumber: 'MUTE_ALL_MIC',
      },
      null,
      2,
    ),
    label: MeetingEvents.UPDATE_PARTY_INFO,
  },
  {
    value: JSON.stringify(
      {
        roomId: '834048026',
        allowLocalUnmute: 1,
      },
      null,
      2,
    ),
    label: MeetingEvents.MUTE_ALL_MIC,
  },

  {
    value: JSON.stringify(
      {
        roomId: 'MUTE_PARTY_MIC',
        partyNumber: 'MUTE_PARTY_MIC',
      },
      null,
      2,
    ),
    label: MeetingEvents.MUTE_PARTY_MIC,
  },
  {
    value: JSON.stringify(
      {
        roomId: 'UNMUTE_ALL_MIC',
        partyNumber: 'UNMUTE_ALL_MIC',
      },
      null,
      2,
    ),
    label: MeetingEvents.UNMUTE_ALL_MIC,
  },
  {
    value: JSON.stringify(
      {
        roomId: 'MUTE_ALL_CAMERAS',
        partyNumber: 'MUTE_ALL_CAMERAS',
      },
      null,
      2,
    ),
    label: MeetingEvents.MUTE_ALL_CAMERAS,
  },
  {
    value: JSON.stringify(
      {
        roomId: 'MUTE_PARTY_CAMERA',
        partyNumber: 'MUTE_PARTY_CAMERA',
      },
      null,
      2,
    ),
    label: MeetingEvents.MUTE_PARTY_CAMERA,
  },
  {
    value: JSON.stringify(
      {
        roomId: 'UNMUTE_ALL_CAMERAS',
        partyNumber: 'UNMUTE_ALL_CAMERAS',
      },
      null,
      2,
    ),
    label: MeetingEvents.UNMUTE_ALL_CAMERAS,
  },
  {
    value: JSON.stringify(
      {
        roomId: 'MUTE_MIC',
        partyNumber: 'MUTE_MIC',
      },
      null,
      2,
    ),
    label: MeetingEvents.MUTE_MIC,
  },
  {
    value: JSON.stringify(
      {
        roomId: 'MUTE_CAMERA',
        partyNumber: 'MUTE_CAMERA',
      },
      null,
      2,
    ),
    label: MeetingEvents.MUTE_CAMERA,
  },
  {
    value: JSON.stringify(
      {
        roomId: 'MUTE_VIDEO',
        partyNumber: 'MUTE_VIDEO',
      },
      null,
      2,
    ),
    label: MeetingEvents.MUTE_VIDEO,
  },
  {
    value: JSON.stringify(
      {
        roomId: 'MUTE',
        partyNumber: 'MUTE',
      },
      null,
      2,
    ),
    label: MeetingEvents.MUTE,
  },
  {
    value: JSON.stringify(
      {
        roomId: 'MUTE_SPEAKER',
        partyNumber: 'MUTE_SPEAKER',
      },
      null,
      2,
    ),
    label: MeetingEvents.MUTE_SPEAKER,
  },
  {
    value: JSON.stringify(
      {
        roomId: 'TALKING_USER',
        partyNumber: 'partyNumber',
        talking: 0,
      },
      null,
      2,
    ),
    label: MeetingEvents.TALKING_USER,
  },
];
