// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// 策略内容相关api
/** 添加 POST /api/adm/mdm/strategyItem/add */
export async function policyContentAdd(
  body: API.MdmStrategyItemDTO,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultLong>('/api/adm/mdm/strategyItem/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分类列表 GET /api/adm/mdm/strategyItem/category */
export async function policyContentCategory(options?: { [key: string]: any }) {
  return request<API.ApiResultListNameAndCodeItemDTO>('/api/adm/mdm/strategyItem/category', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除 DELETE /api/adm/mdm/strategyItem/delete */
export async function policyContentDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingDELETEParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/adm/mdm/strategyItem/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 详情 GET /api/adm/mdm/strategyItem/get */
export async function policyContentGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultMdmStrategyItemDTO>('/api/adm/mdm/strategyItem/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 列表 GET /api/adm/mdm/strategyItem/list */
export async function policyContentList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultListMdmStrategyItemDTO>('/api/adm/mdm/strategyItem/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页 GET /api/adm/mdm/strategyItem/page */
export async function policyContentPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultPageMdmStrategyItemDTO>('/api/adm/mdm/strategyItem/page', {
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

/** 更新 PUT /api/adm/mdm/strategyItem/update */
export async function policyContentUpdate(
  body: API.MdmStrategyItemDTO,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/adm/mdm/strategyItem/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
