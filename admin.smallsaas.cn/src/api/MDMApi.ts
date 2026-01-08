import { request } from '@umijs/max';

// launcher服务端接口
// const LAUNCHER_API_URL = REACT_APP_ENV === 'prod' ? LAUNCHER_API_URL : '/launcherV1';
// const LAUNCHER_API_URL = LAUNCHER_API_URL;

/**
 * 预装应用列表
 * @param data 请求参数
 * @returns
 */

export async function mdmAppInstallList(data: any) {
  return request(`${LAUNCHER_API_URL}/master-data/mdmAppInstall/getList`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 新增/编辑预装应用
 * @param data 请求参数
 * @returns
 */

export async function mdmAppInstallUpdate(data: any) {
  return request(`${LAUNCHER_API_URL}/master-data/mdmAppInstall/saveOrUpdate`, {
    method: 'POST',
    data: data,
  });
}
/**
 * 应用上传
 * @param data 请求参数
 * @returns
 */

export async function uploadApkUpload(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/uploadApk`, {
    method: 'POST',
    data: data,
    timeout: 600000,
  });
}

/**
 * 预设应用状态
 * @param data 请求参数
 * @returns
 */

export async function mdmAppInstallUpdateStatus(data: any) {
  return request(`${LAUNCHER_API_URL}/master-data/mdmAppInstall/updateStatus`, {
    method: 'GET',
    params: data,
  });
}

/**
 * 预设应用是否强制安装
 * @param data 请求参数
 * @returns
 */

export async function mdmAppInstallUpdateMustStatus(data: any) {
  return request(`${LAUNCHER_API_URL}/master-data/mdmAppInstall/updateMustStatus`, {
    method: 'GET',
    params: data,
  });
}

/**
 * 预设应用删除
 * @param data 请求参数
 * @returns
 */

export async function mdmAppInstallDelete(data: any) {
  return request(`${LAUNCHER_API_URL}/master-data/mdmAppInstall/delete`, {
    method: 'GET',
    params: data,
  });
}
/**
 * 预设应用删除
 * @param data 请求参数
 * @returns
 */

export async function mdmAppDeleteVersion(data: any) {
  return request(`${LAUNCHER_API_URL}/master-data/mdmAppInstall/deleteVersion`, {
    method: 'GET',
    params: data,
  });
}
/**
 * 新增/编辑版本
 * @param data 请求参数
 * @returns
 */

export async function mdmAddVersion(data: any) {
  return request(`${LAUNCHER_API_URL}/master-data/mdmAppInstall/addVersion`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 管理员一键推送预装应用安装与更新
 * @param data 请求参数
 * @returns
 */

export async function mdmAddInstallAll() {
  return request(`${LAUNCHER_API_URL}/master-data/mdmAppInstall/installAll`, {
    method: 'GET',
  });
}
