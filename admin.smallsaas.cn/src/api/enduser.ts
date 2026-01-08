import { request } from '@umijs/max';

/**
 * 获取终端用户账号列表
 * @param data 请求参数
 * @returns 返回用户账号列表
 */

export async function getUserAccountsList(data: any) {
  return request('/v2/api/adm/users', {
    method: 'GET',
    params: data,
  });
}

/**
 * 获取终端用户账号列表（新版本，支持统一搜索）
 * @param data 请求参数
 * @returns 返回用户账号列表
 */
export async function getUserAccountsListWithSearch(data: any) {
  return request('/api/adm/users', {
    method: 'GET',
    params: data,
  });
}

/**
 * 获取终端用户类型
 * @param data 请求参数
 * @returns 返回列表
 */
export async function getUserType(data: any, id: string) {
  return request(`/v2/api/adm/users/type/${id}`, {
    method: 'PUT',
    data: data,
  });
}

/**
 * 获取终端用户编辑
 * @param data 请求参数
 * @returns 返回结果
 */
export async function getUsersEdit(data: any, id: string) {
  return request(`/v2/api/adm/users/${id}`, {
    method: 'PUT',
    data: data,
  });
}

/**
 * 编辑登陆用户信息
 * @param data 请求参数
 * @returns 返回结果
 */

export async function getEditAdmin(data: any) {
  return request(`/v2/api/adm/sys/users/self`, {
    method: 'PUT',
    data: data,
  });
}

/**
 * 随机头像
 * @param id 请求参数
 * @returns 返回结果
 */
export async function getAvatarEefresh(id: string) {
  return request(`/v2/api/adm/users/${id}/avatar/refresh`, {
    method: 'PUT',
  });
}

/** 终端用户删除 */
/**
 * 重置用户密码
 * @param resetId 用户ID
 * @returns 返回重置结果
 */
export async function resetUserPassword(resetId: string) {
  return request(`/api/adm/user/password/reset?resetId=${resetId}`, {
    method: 'GET',
  });
}

export async function getEndUserDel(id: any) {
  return request(`/v2/api/adm/users/${id}`, {
    method: 'DELETE',
  });
}
