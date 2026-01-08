// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建议题 创建新的议题及其子议题 POST /api/adm/newconf/issue/add */
export async function addUsingPost1(body: API.IssueReqDTO, options?: { [key: string]: any }) {
  return request<API.ApiResultLong_>('/api/adm/newconf/issue/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除议题 删除指定议题及其子议题 DELETE /api/adm/newconf/issue/delete */
export async function deleteUsingDelete4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingDELETE4Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultLong_>('/api/adm/newconf/issue/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 议题详情 获取指定议题的详细信息 GET /api/adm/newconf/issue/get */
export async function getUsingGet1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultIssueRespDTO_>('/api/adm/newconf/issue/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询议题 分页获取议题列表 GET /api/adm/newconf/issue/page */
export async function pageUsingGet3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: any,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultPageResultIssueRespDTO_>('/api/adm/newconf/issue/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑议题 更新议题及其子议题信息 PUT /api/adm/newconf/issue/update */
export async function updateUsingPut4(body: API.IssueReqDTO, options?: { [key: string]: any }) {
  return request<API.ApiResultLong_>('/api/adm/newconf/issue/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
