import { request } from '@umijs/max';

/** 获取词条分页列表 */
export async function getEntryList(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/entry/getList`, {
    method: 'POST',
    data,
  });
}

/** 获取词条详情 */
export async function getEntryDetail(id: number | string) {
  return request(`${LAUNCHER_API_URL}/portal/entry/getDetail/${id}`, {
    method: 'GET',
  });
}

/** 保存或更新词条 */
export async function saveEntry(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/entry/save`, {
    method: 'POST',
    data,
  });
}

/** 启用/停用词条 */
export async function updateEntryStatus(params: { id: number | string; status: number }) {
  return request(`${LAUNCHER_API_URL}/portal/entry/updateStatus`, {
    method: 'PUT',
    params,
  });
}
