import { request } from '@umijs/max';

/** 获取所有省 */
// /api/aip / adm / pcd;
export async function getProvince() {
  return request('/v2/api/adm/pcd', {
    method: 'GET',
  });
}

// /api/adm/pcd/level/{{pid}}
export async function getCity(pid: any) {
  return request(`/v2/api/adm/pcd/level/${pid}`, {
    method: 'GET',
  });
}

// /api/adm / pcd / by / group;
// export async function getGroup() {
//   return request(`/v2/api/adm/pcd/by/group/${36}`, {
//     method: 'GET',
//   });
// }
