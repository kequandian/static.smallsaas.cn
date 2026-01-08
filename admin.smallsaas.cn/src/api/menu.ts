import { request } from '@umijs/max';

/** 获取菜单配置 */
export async function getCustomMenusList(appId = 'smartsBigScreen') {
  return request(`/v2/api/adm/menus/${appId}/getMenuConfig`, {
    method: 'GET',
  });
}
/** 获取菜单配置 */
export async function getMenuList(data: any, appId = 'smartsBigScreen') {
  return request(`/v2/api/adm/menus/${appId}/tree`, {
    method: 'GET',
    params: data,
  });
}
/** 菜单删除 */
export async function getMenuDelete(id: any) {
  return request(`/v2/api/adm/menus/${id}`, {
    method: 'DELETE',
  });
}

/** 菜单新增 */
export async function getMenuAdd(data: any) {
  return request(`/v2/api/adm/menus`, {
    method: 'POST',
    data: { ...data, app_id: 'smartsBigScreen' },
  });
}

/** 菜单更新 */
export async function getMenuEdit(data: any, id: string) {
  return request(`/v2/api/adm/menus/${id}`, {
    method: 'PUT',
    data: data,
  });
}

/** 菜单查询 */
export async function getMenuItem(id: any) {
  return request(`/v2/api/adm/menus/${id}`, {
    method: 'GET',
    // data: data,
  });
}
