import { request } from '@umijs/max';

/** 获取服务器列表 */
export async function getTheServerList(data: any) {
  return request('/v2/api/adm/newconf/servers', {
    method: 'GET',
    params: data,
  });
}

/** 服务器删除 */
export async function getTheServerListDel(id: any) {
  return request(`/v2/api/adm/newconf/servers/${id}`, {
    method: 'DELETE',
  });
}

/** 服务器新增 */
export async function getTheServerAdd(data: any) {
  return request(`/v2/api/adm/newconf/servers`, {
    method: 'POST',
    data: data,
  });
}

/** 服务器更新 */
export async function getTheServerEdit(data: any, id: string) {
  return request(`/v2/api/adm/newconf/servers/${id}`, {
    method: 'PUT',
    data: data,
  });
}

/** 服务器查询 */
export async function getTheServerItem(id: any) {
  return request(`/v2/api/adm/newconf/server/${id}`, {
    method: 'GET',
    // data: data,
  });
}
// 组织列表平铺

export async function getSysOrgList(data: any) {
  return request('/v2/api/adm/org', {
    method: 'GET',
    data: data,
  });
}
