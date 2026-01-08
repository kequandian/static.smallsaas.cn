import { request } from '@umijs/max';

// const LAUNCHER_API_URL = REACT_APP_ENV === 'prod' ? LAUNCHER_API_URL : '/launcherV1';

// 基层工作
/** 创建基础工作 */
export async function createBaseWork(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/basicWork/publish`, {
    method: 'POST',
    data,
  });
}
/** 获取基础工作列表 */
export async function getBaseWorkList(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/basicWork/getList`, {
    method: 'POST',
    data,
  });
}
// 基础工作删除
export async function getBasicWorkDel(id: any) {
  return request(`${LAUNCHER_API_URL}/portal/basicWork/delete`, {
    method: 'GET',
    params: { id: id },
  });
}
// 先锋事迹
/** 发布 */
export async function getPioneeringDeedsPublish(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/pioneeringDeeds/publish`, {
    method: 'POST',
    data,
  });
}
/** 查询 */
export async function getPioneeringDeedsList(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/pioneeringDeeds/getList`, {
    method: 'POST',
    data,
  });
}
// 先锋事迹删除
export async function getPioneeringDeedsDel(id: any) {
  return request(`${LAUNCHER_API_URL}/portal/pioneeringDeeds/delete`, {
    method: 'GET',
    params: { id: id },
  });
}
// 通知公告
/** 发布 */
export async function getNoticePublish(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/noticeAnnouncement/publish`, {
    method: 'POST',
    data,
  });
}
/** 查询 */
export async function getNoticePublishList(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/noticeAnnouncement/getList`, {
    method: 'POST',
    data,
  });
}
// 通知公告删除
export async function getNoticeAnnouncementDel(id: any) {
  return request(`${LAUNCHER_API_URL}/portal/noticeAnnouncement/delete`, {
    method: 'GET',
    params: { id: id },
  });
}

// 积分定义
/** 提交 */
export async function getIntegralPublish(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/integralAcquisitionMethod/publish`, {
    method: 'POST',
    data,
  });
}
/** 查询 */
export async function getIntegralPublishList(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/integralAcquisitionMethod/getList`, {
    method: 'POST',
    data,
  });
}
// 积分定义删除
export async function getIntegralAcquisitionMethodDel(id: any) {
  return request(`${LAUNCHER_API_URL}/portal/integralAcquisitionMethod/delete`, {
    method: 'GET',
    params: { id: id },
  });
}
// 组织生活活动
/** 创建活动 */
export async function getOrgCreateActivity(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/organizationalLife/createActivity`, {
    method: 'POST',
    data,
  });
}
/** 查询 */
export async function getOrgActivityList(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/organizationalLife/getActivityList`, {
    method: 'POST',
    data,
  });
}
// 组织生活删除
export async function getOrganizationalLifeDel(id: any) {
  return request(`${LAUNCHER_API_URL}/portal/organizationalLife/delete`, {
    method: 'GET',
    params: { id: id },
  });
}

/** 修改活动状态 */
export async function getOrgChangeStatus(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/organizationalLife/changeStatus`, {
    method: 'GET',
    params: data,
  });
}

/** 获取活动报名列表 */
export async function getOrgActivitySignUp(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/organizationalLife/getActivitySignUp`, {
    method: 'POST',
    data,
  });
}

// 民主评义-通知公告
/** 获取列表 */
export async function getReviewNoticeList(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/democraticReviewNoticeAnnouncement/getList`, {
    method: 'POST',
    data,
  });
}
/** 发布 */
export async function getReviewNoticeListPublish(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/democraticReviewNoticeAnnouncement/publish`, {
    method: 'POST',
    data,
  });
}
// 通知公告删除
export async function getDemocraticReviewNoticeDel(id: any) {
  return request(`${LAUNCHER_API_URL}/portal/democraticReviewNoticeAnnouncement/delete`, {
    method: 'GET',
    params: { id: id },
  });
}

// 民主评义-会议信息
/** 获取列表 */
export async function getReviewConference(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/democraticReviewConference/getList`, {
    method: 'POST',
    data,
  });
}
/** 发布 */
export async function getReviewConferencePublish(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/democraticReviewConference/publish`, {
    method: 'POST',
    data,
  });
}
// 会议信息删除
export async function getReviewConferenceDel(id: any) {
  return request(`${LAUNCHER_API_URL}/portal/democraticReviewConference/delete`, {
    method: 'GET',
    params: { id: id },
  });
}
