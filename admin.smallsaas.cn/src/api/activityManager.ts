import { request } from '@umijs/max';

// const LAUNCHER_API_URL = REACT_APP_ENV === 'prod' ? LAUNCHER_API_URL : '/launcherV1';

/** 获取活动列表 */
export async function getActivityList(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/volunteerActivity/getActivityList`, {
    method: 'POST',
    data,
  });
}

/** 创建活动 */
export async function createActivity(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/volunteerActivity/createActivity`, {
    method: 'POST',
    data,
  });
}
/** 删除活动 */

export async function volunteerActivityDel(id: any) {
  return request(
    `${LAUNCHER_API_URL}/portal/volunteerActivity/delete
`,
    {
      method: 'GET',
      params: { id: id },
    },
  );
}

/** 修改活动状态 */
export async function changeActivityStatus(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/volunteerActivity/changeStatus`, {
    method: 'GET',
    params: data,
  });
}

/** 获取活动报名列表 */
export async function getActivitySignUp(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/volunteerActivity/getActivitySignUp`, {
    method: 'POST',
    data,
  });
}
