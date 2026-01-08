import { request } from '@umijs/max';

/**
 * 学习任务表
 * @param data 请求参数
 * @returns
 */

export async function learningTaskOutsideList(data: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/learningTask/getPageList`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 学习任务表新增/编辑
 * @param data 请求参数
 * @returns
 */

export async function learningTaskOutsideUpdate(data: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/learningTask/saveOrUpdate`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 学习任务表删除
 * @param data 请求参数
 * @returns
 */

export async function learningTaskOutsideDelete(id: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/learningTask/delete`, {
    method: 'GET',
    params: { id: id },
  });
}
/**
 * 学习任务表启用,禁用
 * @param data 请求参数
 * @returns
 */

export async function learningTaskOutsidUpdateStatus(params: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/learningTask/updateStatus`, {
    method: 'GET',
    params,
  });
}

// 学习任务表=>学习任务内容

// 学习任务内容列表
export async function learningTaskOutsideContentList(data: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/learningTask/getContentPageList`, {
    method: 'POST',
    data: data,
  });
}
// 添加学习任务内容/编辑
export async function learningTaskOutsideContentUpdate(params: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/learningTask/addContent`, {
    method: 'GET',
    params,
  });
}

// 删除学习任务内容
export async function learningTaskOutsideContentDelete(id: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/learningTask/deleteContent`, {
    method: 'GET',
    params: { id: id },
  });
}

//  课程预定
/**
 * 课程预定列表
 * @param data 请求参数
 * @returns
 */

export async function courseBuyApplyList(data: any) {
  return request(`${LAUNCHER_API_URL}/course/courseBuyApply/getPageList`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 课程预定新增编辑
 * @param data 请求参数
 * @returns
 */

export async function courseBuyApplyUpdate(data: any) {
  return request(`${LAUNCHER_API_URL}/course/courseBuyApply/saveOrUpdate`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 课程预定修改状态
 * 修改状态 状态0 申请处理中  状态1 已购买    状态2 已取消申请
 * @param data 请求参数
 * @returns
 */

export async function courseBuyApplyUpdateStatus(params: any) {
  return request(`${LAUNCHER_API_URL}/course/courseBuyApply/updateStatus`, {
    method: 'GET',
    params,
  });
}
