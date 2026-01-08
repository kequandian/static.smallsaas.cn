import { request } from '@umijs/max';

/**
 * 表单实体相关接口
 */

/**
 * 获取实体列表
 * @param params 查询参数
 * @returns 实体列表数据
 */
export async function getEntitiesList(params?: any) {
  return request('/api/adm/cfg/entities', {
    method: 'GET',
    params,
  });
}

/**
 * 获取实体详情
 * @param entityName 实体名称
 * @returns 实体详情数据
 */
export async function getEntityDetail(entityName: string) {
  return request(`/api/adm/cfg/entities/${entityName}`, {
    method: 'GET',
  });
}

/**
 * 创建实体
 * @param data 实体数据
 * @returns 创建结果
 */
export async function createEntity(data: any) {
  return request('/api/adm/cfg/entities', {
    method: 'POST',
    data,
  });
}

/**
 * 更新实体
 * @param entityName 实体名称
 * @param data 更新数据
 * @returns 更新结果
 */
export async function updateEntity(entityName: string, data: any) {
  return request(`/api/adm/cfg/entities/${entityName}`, {
    method: 'PUT',
    data,
  });
}

/**
 * 删除实体
 * @param entityName 实体名称
 * @returns 删除结果
 */
export async function deleteEntity(entityName: string) {
  return request(`/api/adm/cfg/entities/${entityName}`, {
    method: 'DELETE',
  });
}

/**
 * 表单字段相关接口
 */

/**
 * 获取实体字段列表
 * @param entityName 实体名称
 * @returns 字段列表数据
 */
export async function getEntityFields(entityName: string) {
  return request(`/api/adm/cfg/attribute/${entityName}`, {
    method: 'GET',
  });
}

/**
 * 添加实体字段
 * @param entityName 实体名称
 * @param data 字段数据
 * @returns 添加结果
 */
export async function addEntityField(entityName: string, data: any) {
  return request(`/api/adm/cfg/attribute/${entityName}`, {
    method: 'POST',
    data,
  });
}

/**
 * 批量添加实体字段
 * @param entityName 实体名称
 * @param data 字段数据数组
 * @returns 添加结果
 */
export async function addEntityFieldsBatch(entityName: string, data: any[]) {
  return request(`/api/adm/cfg/attribute/${entityName}/list`, {
    method: 'POST',
    data,
  });
}

/**
 * 更新实体字段
 * @param entityName 实体名称
 * @param attributeName 字段名称
 * @param data 更新数据
 * @returns 更新结果
 */
export async function updateEntityField(entityName: string, attributeName: string, data: any) {
  return request(`/api/adm/cfg/attribute/${entityName}/attributes/${attributeName}`, {
    method: 'PUT',
    data,
  });
}

/**
 * 删除实体字段
 * @param entityName 实体名称
 * @param attributeName 字段名称
 * @returns 删除结果
 */
export async function deleteEntityField(entityName: string, attributeName: string) {
  return request(`/api/adm/cfg/attribute/${entityName}/attributes/${attributeName}`, {
    method: 'DELETE',
  });
}

/**
 * 表单数据相关接口
 */

/**
 * 获取表单数据列表
 * @param entityName 实体名称
 * @param params 查询参数
 * @returns 数据列表
 */
export async function getFormDataList(entityName: string, params?: any) {
  return request(`/api/pub/data/services/${entityName}`, {
    method: 'GET',
    params,
  });
}

/**
 * 获取表单数据详情
 * @param entityName 实体名称
 * @param id 数据ID
 * @returns 数据详情
 */
export async function getFormDataDetail(entityName: string, id: string) {
  return request(`/api/pub/data/services/${entityName}/${id}`, {
    method: 'GET',
  });
}

/**
 * 添加表单数据
 * @param entityName 实体名称
 * @param data 表单数据
 * @returns 添加结果
 */
export async function addFormData(entityName: string, data: any) {
  return request(`/api/pub/data/services/${entityName}`, {
    method: 'POST',
    data,
  });
}

/**
 * 更新表单数据
 * @param entityName 实体名称
 * @param id 数据ID
 * @param data 更新数据
 * @returns 更新结果
 */
export async function updateFormData(entityName: string, id: string, data: any) {
  return request(`/api/pub/data/services/${entityName}/${id}`, {
    method: 'PUT',
    data,
  });
}

/**
 * 删除表单数据
 * @param entityName 实体名称
 * @param id 数据ID
 * @returns 删除结果
 */
export async function deleteFormData(entityName: string, id: string) {
  return request(`/api/pub/data/services/${entityName}/${id}`, {
    method: 'DELETE',
  });
}
