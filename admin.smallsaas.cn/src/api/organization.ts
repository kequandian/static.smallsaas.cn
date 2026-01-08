import { request } from '@umijs/max';

/** 获取树列表 */
export async function getOrgTreeList(data: any) {
  return request('/v2/api/adm/org/tree', {
    method: 'GET',
    data: data,
  });
}

/** 增加节点 */
export async function getAddChildren(data: any, orgId: string) {
  return request(`/v2/api/adm/org/${orgId}/children`, {
    method: 'POST',
    data: data,
  });
}
/** 删除节点 */
export async function getOrgDel(orgId: string) {
  return request(`/v2/api/adm/org/${orgId}`, {
    method: 'GET',
  });
}
