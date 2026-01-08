import { request } from '@umijs/max';

/**
 * 获取ipc设备列表
 * @param data 请求参数
 * @returns 返回用户账号列表
 */

export async function getVideoChannelList(data: any) {
  return request('http://202.63.172.43:5800/MediaServer/GetVideoChannelList', {
    method: 'POST',
    headers: {
      AccessKey: AKStream_AccessKey,
    },
    data,
  });
}

// 流媒体服务器的ID
export async function getMediaServerList() {
  return request('http://202.63.172.43:5800/MediaServer/GetMediaServerList', {
    method: 'GET',
    headers: {
      AccessKey: AKStream_AccessKey,
    },
  });
}
// 录制计划模板名称
export async function getRecordPlanList() {
  return request('http://202.63.172.43:5800/RecordPlan/GetRecordPlanList', {
    method: 'GET',
    headers: {
      AccessKey: AKStream_AccessKey,
    },
  });
}
//添加设备
export async function addVideoChannel(data: any) {
  return request('http://202.63.172.43:5800/MediaServer/AddVideoChannel', {
    method: 'POST',
    headers: {
      AccessKey: AKStream_AccessKey,
    },
    data,
  });
}
//编辑设备
export async function editVideoChannel(data: any, id: any) {
  return request(`http://202.63.172.43:5800/MediaServer/ModifyVideoChannel?mainId=${id}`, {
    method: 'POST',
    headers: {
      AccessKey: AKStream_AccessKey,
    },
    data,
  });
}

//开始录制
export async function getStartRecordApi(data: any) {
  return request(`http://202.63.172.43:5800/MediaServer/StartRecord`, {
    method: 'GET',
    headers: {
      AccessKey: AKStream_AccessKey,
    },
    params: data,
  });
}

//暂停录制
export async function getStopRecordApi(data: any) {
  return request(`http://202.63.172.43:5800/MediaServer/StopRecord`, {
    method: 'GET',
    headers: {
      AccessKey: AKStream_AccessKey,
    },
    params: data,
  });
}
//结束推流
export async function getStreamStopApi(data: any) {
  return request(`http://202.63.172.43:5800/MediaServer/StreamStop`, {
    method: 'GET',
    headers: {
      AccessKey: AKStream_AccessKey,
    },
    params: data,
  });
}

//激活设备
export async function activeVideoChannelApi(data: any, id: any) {
  return request(`http://202.63.172.43:5800/MediaServer/ActiveVideoChannel?mainId=${id}`, {
    method: 'POST',
    headers: {
      AccessKey: AKStream_AccessKey,
    },
    data,
  });
}

//播放视频
export async function streamLiveApi(data: any) {
  return request(`http://202.63.172.43:5800/MediaServer/StreamLive`, {
    method: 'GET',
    headers: {
      AccessKey: AKStream_AccessKey,
    },
    params: data,
  });
}
