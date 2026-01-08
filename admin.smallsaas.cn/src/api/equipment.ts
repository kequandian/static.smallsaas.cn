import { request } from '@umijs/max';

/** 获取设备列表 */
export async function getEquipmentList(data: any) {
  return request('/v2/api/adm/newconf/devices', {
    method: 'GET',
    params: data,
  });
}

/** 设备授权 */
export async function getEquipmentListSq(id: any) {
  return request(`/v2/api/adm/newconf/devices/authorize/${id}`, {
    method: 'POST',
  });
}

/** 设备删除 */
export async function getEquipmentListDel(id: any) {
  return request(`/v2/api/adm/newconf/devices/${id}`, {
    method: 'DELETE',
  });
}

/** 设备新增 */
export async function getEquipmentListAdd(data: any) {
  return request(`/v2/api/adm/newconf/devices`, {
    method: 'POST',
    data: data,
  });
}

/** 设备更新 */
export async function getEquipmentListEdit(data: any, id: string) {
  return request(`/v2/api/adm/newconf/devices/${id}`, {
    method: 'PUT',
    data: data,
  });
}

export async function getBindingUserEdit(id: any) {
  return request(`/v2/api/adm/newconf/devices/bindingUser/${id}`, {
    method: 'PUT',
    // data: data,
  });
}

// 设定设备的登录密码

export async function getEditPassword(data: any, id: any) {
  return request(`/v2/api/adm/newconf/devices/${id}/setLonginPassword`, {
    method: 'PUT',
    data: data,
  });
}

//免密登陆
export async function getEnableNoPWLogin(enablePw: number, id: number) {
  return request(`/v2/api/adm/newconf/devices/${id}/enableNoPWLogin`, {
    method: 'PUT',
    data: { enablePw },
  });
}

/** 取消授权 */
export async function getUnauthorized(id: any) {
  return request(`/v2/api/adm/newconf/devices/unauthorized/${id}`, {
    method: 'POST',
  });
}
//设备禁用 /api/adm/newconf/devices/{id}/disable
export async function getDevicesDisable(id: any) {
  return request(`/v2/api/adm/newconf/devices/${id}/disable`, {
    method: 'PUT',
  });
}
// 取消禁用/api/adm/newconf/devices/{id}/cancelDisable
export async function getDevicesCancelDisable(id: any) {
  return request(`/v2/api/adm/newconf/devices/${id}/cancelDisable`, {
    method: 'PUT',
  });
}

// 2.26新增 应用授权
//设备应用列表 /api/adm/newconf/deviceApp/list

export async function getDeviceAppList(data: any) {
  return request(`/v2/api/adm/newconf/deviceApp/list`, {
    method: 'GET',
    params: data,
  });
}

//设备应用取消禁用 /api/adm/newconf/deviceApp/{id}/cancelDisable
export async function getDeviceAppCancelDisable(id: any) {
  return request(`/v2/api/adm/newconf/deviceApp/${id}/cancelDisable`, {
    method: 'PUT',
  });
}
//设备应用禁用 /api/adm/newconf/deviceApp/{id}/disable
export async function getDeviceAppDisable(id: any) {
  return request(`/v2/api/adm/newconf/deviceApp/${id}/disable`, {
    method: 'PUT',
  });
}
// 设备应用授权 /api/adm/newconf/deviceApp/{id}/authorize
export async function getDeviceAppAuthorize(id: any) {
  return request(`/v2/api/adm/newconf/deviceApp/${id}/authorize`, {
    method: 'PUT',
  });
}
//编辑设备应用 /api/adm/newconf/deviceApp/update
export async function getDeviceAppUpdate(data: any) {
  return request(`/v2/api/adm/newconf/deviceApp/update`, {
    method: 'PUT',
    data,
  });
}
