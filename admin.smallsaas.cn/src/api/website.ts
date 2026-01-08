import { request } from '@umijs/max';

/**
 * 获取招聘列表
 * @param params 请求参数
 * @returns
 */
export async function getRecruitmentList(params: any) {
  return request(`${LAUNCHER_API_URL}/portal/external/recruitment/getList`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 添加招聘信息
 * @param data 请求参数
 * @returns
 */
export async function addRecruitment(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/external/recruitment/add`, {
    method: 'POST',
    data,
  });
}

/**
 * 更新招聘信息
 * @param data 请求参数
 * @returns
 */
export async function updateRecruitment(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/external/recruitment/add`, {
    method: 'POST',
    data,
  });
}

/**
 * 删除招聘信息
 * @param params 请求参数
 * @returns
 */
export async function deleteRecruitment(params: any) {
  return request(`${LAUNCHER_API_URL}/portal/external/recruitment/delete`, {
    method: 'GET',
    params,
  });
}

/**
 * 获取客户列表
 * @param params 请求参数
 * @returns
 */
export async function getClientList(params: any) {
  return request(`${LAUNCHER_API_URL}/portal/external/client/getList`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取合作伙伴列表
 * @param params 请求参数
 * @returns
 */
export async function getPartnerList(params: any) {
  return request(`${LAUNCHER_API_URL}/portal/external/partner/getList`, {
    method: 'POST',
    data: params,
  });
}
