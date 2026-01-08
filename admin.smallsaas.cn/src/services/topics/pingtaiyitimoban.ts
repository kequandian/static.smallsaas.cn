// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建议题模板 创建新的议题模板 POST /api/adm/newconf/issueTemplate/add */
export async function addUsingPost2(
  body: API.IssueTemplateReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultLong_>('/api/adm/newconf/issueTemplate/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除议题模板 删除指定的议题模板 DELETE /api/adm/newconf/issueTemplate/delete */
export async function deleteUsingDelete5(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingDELETE5Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultInt_>('/api/adm/newconf/issueTemplate/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 议题模板详情 获取指定议题模板的详细信息 GET /api/adm/newconf/issueTemplate/get */
export async function getUsingGet2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsingGET2Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultIssueTemplateRespDTO_>('/api/adm/newconf/issueTemplate/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询议题模板 分页获取议题模板列表 GET /api/adm/newconf/issueTemplate/page */
export async function pageUsingGet4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageUsingGET4Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultPageResultIssueTemplateRespDTO_>(
    '/api/adm/newconf/issueTemplate/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 编辑议题模板 更新议题模板信息 PUT /api/adm/newconf/issueTemplate/update */
export async function updateUsingPut5(
  body: API.IssueTemplateReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultInt_>('/api/adm/newconf/issueTemplate/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

///api/adm/newconf/issue/approve
export async function sendIssueApprove(body: any) {
  return request<any>('/api/adm/newconf/issue/approve', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: body,
  });
}
