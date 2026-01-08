// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加 POST /api/adm/mdm/strategy/add */
export async function policyAdd(body: API.MdmStrategyDTO, options?: { [key: string]: any }) {
  return request<API.ApiResultLong>('/api/adm/mdm/strategy/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 DELETE /api/adm/mdm/strategy/delete */
export async function policyDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete1Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/adm/mdm/strategy/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 详情 GET /api/adm/mdm/strategy/get */
export async function policyGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.get1Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultMdmStrategyDTO>('/api/adm/mdm/strategy/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 列表 GET /api/adm/mdm/strategy/list */
export async function policyList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.list1Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultListMdmStrategyDTO>('/api/adm/mdm/strategy/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页 GET /api/adm/mdm/strategy/page */
export async function policyPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.page1Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultPageMdmStrategyDTO>('/api/adm/mdm/strategy/page', {
    method: 'GET',
    params: {
      // pageNum has a default value: 1
      pageNum: '1',
      // pageSize has a default value: 10
      pageSize: '10',

      ...params,
    },
    ...(options || {}),
  });
}

/** 更新 PUT /api/adm/mdm/strategy/update */
export async function policyUpdate(body: API.MdmStrategyDTO, options?: { [key: string]: any }) {
  return request<API.ApiResultBoolean>('/api/adm/mdm/strategy/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
