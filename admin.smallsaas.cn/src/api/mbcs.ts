import { request } from '@umijs/max';

const baseUrl = REACT_APP_ENV === 'prod' ? '' : '/adminV1';

/** 查看所有meta entity patch配置 */
export async function getMachines(data: any) {
  return request(`${baseUrl}/api/meta/patch/config/machines`, {
    method: 'GET',
    params: data,
  });
}

/** 添加meta entity patch配置 */
export async function getAddMachines(data: any) {
  return request(`${baseUrl}/api/meta/patch/config/machines`, {
    method: 'POST',
    data,
  });
}

/** 更新meta entity patch配置 */
export async function getUpMachines(data: any, entity: any) {
  return request(`${baseUrl}/api/meta/patch/config/machines/${entity}`, {
    method: 'PUT',
    data,
  });
}

export async function getdelMachines(params: any) {
  return request(
    `${baseUrl}/api/meta/entity/${params.entity}/entities/${params.id}/action/logicDelete`,
    {
      method: 'GET',
    },
  );
}

// sql分页查
export async function getDosqlList(params: any) {
  return request(`${baseUrl}/api/adm/lc/apis`, {
    method: 'GET',
    params,
  });
}

// sql增
export async function getAddDosqlList(data: any) {
  return request(`${baseUrl}/api/adm/lc/apis`, {
    method: 'POST',
    data,
  });
}

// sql改
export async function getEditDosqlList(data: any, id: any) {
  return request(`${baseUrl}/api/adm/lc/apis/${id}`, {
    method: 'PUT',
    data,
  });
}

// sql删
export async function getDelDosqlList(id: any) {
  return request(`${baseUrl}/api/adm/lc/apis/${id}`, {
    method: 'DELETE',
  });
}

// 查询tables1
export async function getTables1List() {
  return request(`${baseUrl}/api/lc/apis/tables`, {
    method: 'GET',
  });
}

export async function getTables2List(name: any) {
  return request(`${baseUrl}/api/lc/apis/fields?tableName=${name}`, {
    method: 'GET',
  });
}

// 查看详情：/api/adm/lc/apis/{id}/detail
export async function getSqlDetail(id: any) {
  return request(`${baseUrl}/api/adm/lc/apis/${id}/detail`, {
    method: 'GET',
  });
}
