import { request } from '@umijs/max';

/**
 * 应用列表
 * @param data 请求参数
 * @returns
 */

export async function getAppsList(data: any) {
  return request('/v2/api/adm/newconf/apps', {
    method: 'GET',
    params: data,
  });
}

/**
 * 应用上传
 * @param data 请求参数
 * @returns
 */

export async function getAppsAdd(data: any) {
  return request('/v2/api/adm/newconf/apps/upload', {
    method: 'POST',
    data: data,
  });
}

// /api/adm/newconf/apps/upload/description
/**
 * 应用提交
 * @param data 请求参数
 * @returns
 */

export async function getAppsUpload(data: any) {
  return request('/v2/api/adm/newconf/apps/upload/description', {
    method: 'PUT',
    data: data,
  });
}

/**
 * 应用编辑
 * @param data 请求参数
 * @returns
 */

export async function getAppsEdit(data: any, appId: string) {
  return request(`/v2/api/adm/newconf/apps/${appId}`, {
    method: 'PUT',
    data: data,
  });
}

/**
 * 应用删除
 * @param data 请求参数
 * @returns
 */

export async function getAppsDel(appId: number) {
  return request(`/v2/api/adm/newconf/apps/${appId}`, {
    method: 'DELETE',
  });
}

/**
 * 应用查询
 * @param data 请求参数
 * @returns
 */

export async function getAppsDetails(appId?: string) {
  return request(`/v2/api/adm/newconf/apps/${appId}`, {
    method: 'GET',
  });
}

/**
 * 包管理-查询
 * @param data 请求参数
 * @returns
 */

export async function getReleasesList(data: any, appId?: string) {
  return request(`/v2/api/adm/newconf/releases/${appId}`, {
    method: 'GET',
    params: data,
  });
}

/**
 * 包管理-删除
 * @param data 请求参数
 * @returns
 */

export async function getReleasesDel(packageId?: string) {
  return request(`/v2/api/adm/newconf/releases/${packageId}`, {
    method: 'DELETE',
  });
}

/**
 * 包管理-编辑
 * @param data 请求参数
 * @returns
 */

export async function getAppsReleasesEdit(data: any, packageId: string) {
  return request(`/v2/api/adm/newconf/releases/${packageId}`, {
    method: 'PUT',
    data: data,
  });
}

// ops管理
/**
 * ops提交
 * @param data 请求参数
 * @returns
 */

export async function getAddOpsRelease(data: any) {
  return request('/v2/api/adm/opsRelease', {
    method: 'POST',
    data: data,
  });
}

/**
 * ops编辑
 * @param data 请求参数
 * @returns
 */

export async function getOpsReleaseEdit(data: any, id: string) {
  return request(`/v2/api/adm/opsRelease/${id}`, {
    method: 'PUT',
    data: data,
  });
}

/**
 * ops删除
 * @param data 请求参数
 * @returns
 */

export async function getOpsReleaseDel(id: number) {
  return request(`/v2/api/adm/opsRelease/${id}`, {
    method: 'DELETE',
  });
}

/**
 * ops查询
 * @param data 请求参数
 * @returns
 */

export async function getOpsReleaseList(params?: any) {
  return request(`/v2/api/adm/opsRelease`, {
    method: 'GET',
    params,
  });
}

// /api/adm/newconf/apps/customUpload
/**
 * 自定义上传
 * @param data 请求参数
 * @returns
 */
export async function getCustomUpload(data: any) {
  return request('/v2/api/adm/newconf/apps/customUpload', {
    method: 'POST',
    data: data,
  });
}
