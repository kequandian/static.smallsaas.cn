import { request } from '@umijs/max';

/** 获取组织平铺列表 */
export async function getOrgList(data: any) {
  return request('/v2/api/adm/org', {
    method: 'GET',
    params: data,
  });
}

/** 新增子组织 */
export async function postOrgChildren(data: any, id: any) {
  return request(`/v2/api/adm/org/${id}/children`, {
    method: 'POST',
    data: data,
  });
}

/** 编辑子组织 */
export async function postEditOrgChildren(data: any, id: any) {
  return request(`/v2/api/adm/org/${id}`, {
    method: 'PUT',
    data: data,
  });
}
/** 删除子组织 */
export async function delOrg(id: any) {
  return request(`/v2/api/adm/org/${id}`, {
    method: 'DELETE',
    data: id,
  });
}

/** 获取租户列表 */
export async function getTenantsList(data: any) {
  return request('/v2/api/adm/tenants', {
    method: 'GET',
    params: data,
  });
}
/** 获取租户详情 */
export async function getTenantsItem(id: any) {
  return request(`/v2/api/adm/tenants/${id}`, {
    method: 'GET',
  });
}
/** 新增租户 */
export async function postAddTenants(data: any) {
  return request(`/v2/api/adm/tenants`, {
    method: 'POST',
    data: data,
  });
}

/** 编辑租户 */
export async function postEditTenants(data: any, id: any) {
  return request(`/v2/api/adm/tenants/${id}`, {
    method: 'PUT',
    data: data,
  });
}

/** 删除租户 */
export async function delTenants(id: any) {
  return request(`/v2/api/adm/tenants/${id}`, {
    method: 'DELETE',
    data: id,
  });
}

/** 获取所有权限 */
export async function getPerms(params: any) {
  return request(`/v2/api/adm/perm/perms/page`, {
    method: 'GET',
    params,
  });
}

/** 创建权限 */
export async function postPerms(data: any) {
  return request(`/v2/api/adm/perm/perms`, {
    method: 'POST',
    data: data,
  });
}

/** 编辑权限 */
export async function postEditPerms(data: any, id: any) {
  return request(`/v2/api/adm/perm/perms/${id}`, {
    method: 'PUT',
    data: data,
  });
}
/** 删除权限 */
export async function delPerms(id: any) {
  return request(`/v2/api/adm/perm/perms/${id}`, {
    method: 'DELETE',
    data: id,
  });
}

/** 获取所有权限分组 */
export async function getPermGroups(params: any) {
  console.log(123);

  return request(`/v2/api/adm/perm/groups/page`, {
    method: 'GET',
    params,
  });
}

/** 创建权限分组 */
export async function postPermGroups(data: any) {
  return request(`/v2/api/adm/perm/groups`, {
    method: 'POST',
    data: data,
  });
}

/** 编辑权限分组 */
export async function postEditPermGroups(data: any, id: any) {
  return request(`/v2/api/adm/perm/groups/${id}`, {
    method: 'PUT',
    data: data,
  });
}
/** 删除权限分组 */
export async function delPermGroups(id: any) {
  return request(`/v2/api/adm/perm/groups/${id}`, {
    method: 'DELETE',
    data: id,
  });
}

/** 获取平台用户 */
export async function getAdmUsers(data: any) {
  return request(`/v2/api/adm/sys/users`, {
    method: 'GET',
    params: data,
  });
}

/** 创建平台用户 */
export async function postAdmUsers(data: any) {
  return request(`/v2/api/adm/sys/users`, {
    method: 'POST',
    data: data,
  });
}

/** 编辑平台用户 */
export async function postEditAdmUsers(data: any, id: any) {
  return request(`/v2/api/adm/sys/users/${id}`, {
    method: 'PUT',
    data: data,
  });
}
/** 删除平台用户 */
export async function delAdmUsers(id: any) {
  return request(`/v2/api/adm/sys/users/${id}`, {
    method: 'DELETE',
    data: id,
  });
}

// 角色

export async function getRolesList(data: any) {
  return request('/v2/api/adm/roles', {
    method: 'GET',
    params: data,
  });
}

// 修改密码

export async function getUpdataPassword(data: any, id: any) {
  return request(`/v2/api/adm/sys/users/${id}/password`, {
    method: 'PUT',
    data: data,
  });
}

// /api/adm/tenants/updateOrgCode 变更组织代码
export async function getUpdateOrgCode(data: any) {
  return request('/v2/api/adm/tenants/updateOrgCode', {
    method: 'PUT',
    params: data,
  });
}
