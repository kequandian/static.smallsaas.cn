import { request } from '@umijs/max';

/**
 * 获取渠道列表
 * @param data 请求参数
 * @returns 返回用户账号列表
 */

export async function getOperatorsList(data: any) {
  return request('/v2/api/adm/newconf/channels', {
    method: 'GET',
    params: data,
  });
}

/**
 * 创建渠道
 * @param id 请求参数
 * @returns 返回结果
 */
export async function postAddOperators(data: any) {
  return request(`/v2/api/adm/newconf/channels`, {
    method: 'POST',
    data,
  });
}

/**
 * 编辑渠道
 * @param data 请求参数
 * @returns 返回结果
 */
export async function putEditOperators(data: any, id: string) {
  return request(`/v2/api/adm/newconf/channels/${id}`, {
    method: 'PUT',
    data: data,
  });
}
/**
 * 删除渠道
 * @param data 请求参数
 * @returns 返回结果
 */
export async function putDelOperators(id: number) {
  return request(`/v2/api/adm/newconf/channels/${id}`, {
    method: 'DELETE',
  });
}
