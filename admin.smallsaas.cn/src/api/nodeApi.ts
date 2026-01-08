import { request } from '@umijs/max';

/** 获取服会议预约列表 */
export async function getMeetingRoomsInfo(roomId?: string) {
  const url = roomId
    ? `${roomUrlPro}/api/v1/adm/rooms/${roomId}`
    : `${roomUrlPro}/api/v1/adm/rooms`;

  return request(url, {
    method: 'GET',
    // headers: {
    //   X_PLATFORM: 'admin',
    // },
    params: {
      client: 'dev',
      key: '2768a14c-6414-11ef-8e5c-4ba3417e9b4f',
    },
  });
}

/** 全体静音 */
export async function setMuteAllMic(data: any) {
  return request(`${roomUrlPro}/api/v1/adm/rooms/muteAllMic`, {
    method: 'POST',
    // headers: {
    //   X_PLATFORM: 'admin',
    // },
    params: {
      client: 'dev',
      key: '2768a14c-6414-11ef-8e5c-4ba3417e9b4f',
      ...data,
    },
  });
}

/** 全体摄像头 */
export async function setMuteAllCameras(data: any) {
  return request(`${roomUrlPro}/api/v1/adm/rooms/muteAllCameras`, {
    method: 'POST',
    // headers: {
    //   X_PLATFORM: 'admin',
    // },
    params: {
      client: 'dev',
      key: '2768a14c-6414-11ef-8e5c-4ba3417e9b4f',
      ...data,
    },
  });
}

/** 指定参会人静音 */
export async function setMutePartMic(data: any) {
  return request(`${roomUrlPro}/api/v1/adm/rooms/muteParty`, {
    method: 'POST',
    // headers: {
    //   X_PLATFORM: 'admin',
    // },
    params: {
      client: 'dev',
      key: '2768a14c-6414-11ef-8e5c-4ba3417e9b4f',
      ...data,
    },
  });
}

/** 指定参会人视频开关 */
export async function setMutePartCamera(data: any) {
  return request(`${roomUrlPro}/api/v1/adm/rooms/muteAllCameras`, {
    method: 'POST',
    // headers: {
    //   X_PLATFORM: 'admin',
    // },
    params: {
      client: 'dev',
      key: '2768a14c-6414-11ef-8e5c-4ba3417e9b4f',
      ...data,
    },
  });
}

/** 指定人离会 */
export async function setLeaveRoom(data: any) {
  return request(`${roomUrlPro}/api/v1/adm/rooms/leaveRoom`, {
    method: 'POST',
    // headers: {
    //   X_PLATFORM: 'admin',
    // },
    params: {
      client: 'dev',
      key: '2768a14c-6414-11ef-8e5c-4ba3417e9b4f',
      ...data,
    },
  });
}
