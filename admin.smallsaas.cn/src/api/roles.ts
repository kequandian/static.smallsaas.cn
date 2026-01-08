import { request } from '@umijs/max';

// launcher服务端接口
// const baseUrl = '/v2';
// const baseUrl = LAUNCHER_API_URL;

/** 获取角色列表 */
export async function getRolesList() {
  return request(`/v2/api/adm/roles`, {
    method: 'GET',
  });
}

/** 获取权限列表 */
export async function getGroupByList() {
  return request(`/v2/api/adm/perm/group_by`, {
    method: 'GET',
  });
}

/** 角色新增 */
export async function getAddroles(data: any) {
  return request(`/v2/api/adm/roles`, {
    method: 'POST',
    data,
  });
}

/** 角色删除 */
export async function getDelroles(id: any) {
  return request(`/v2/api/adm/roles/${id}`, {
    method: 'DELETE',
  });
}
/** 角色编辑 */
export async function getEditroles(data: any, id: string) {
  return request(`/v2/api/adm/roles/${id}`, {
    method: 'PUT',
    data: data,
  });
}

/** 角色权限查询 */
export async function getPermissionList(id: any) {
  return request(`/v2/api/adm/roles/${id}`, {
    method: 'GET',
  });
}

// 平台用户查询
export async function getPermissionUsers(id: any) {
  return request(`/v2/api/adm/users/${id}`, {
    method: 'GET',
  });
}

// 全局域名
export async function getSysDomain() {
  return request(`/v2/api/adm/tenants/sysDomain`, {
    method: 'GET',
  });
}
