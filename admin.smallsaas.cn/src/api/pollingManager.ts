import { request } from '@umijs/max';

// const LAUNCHER_API_URL = REACT_APP_ENV === 'prod' ? LAUNCHER_API_URL : '/launcherV1';

/** 获取投票活动列表 */
export async function getPollingActivityList(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/pollingActivity/getActivityList`, {
    method: 'POST',
    data,
  });
}

/** 创建投票活动 */
export async function createPollingActivity(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/pollingActivity/createActivity`, {
    method: 'POST',
    data,
  });
}

/** 修改投票活动状态 */
export async function changePollingActivityStatus(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/pollingActivity/changeStatus`, {
    method: 'GET',
    params: data,
  });
}

/** 获取投票活动报名列表 */
export async function getPollingActivitySignUp(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/pollingActivity/getActivitySignUp`, {
    method: 'POST',
    data,
  });
}

export async function getPollingActivityDelete(id: any) {
  return request(`${LAUNCHER_API_URL}/portal/pollingActivity/delete`, {
    method: 'GET',
    params: { id: id },
  });
}
