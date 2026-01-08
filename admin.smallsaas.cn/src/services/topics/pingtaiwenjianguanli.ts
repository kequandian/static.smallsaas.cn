// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建 创建新的文件管理记录 POST /api/adm/newconf/fileManagement/add */
export async function addUsingPost(
  body: API.FileManagementReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultLong_>('/api/adm/newconf/fileManagement/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 删除指定的文件管理记录 DELETE /api/adm/newconf/fileManagement/delete */
export async function deleteUsingDelete3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingDELETE3Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultInt_>('/api/adm/newconf/fileManagement/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 详情 获取指定文件的详细信息 GET /api/adm/newconf/fileManagement/get */
export async function getUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultFileManagementRespDTO_>('/api/adm/newconf/fileManagement/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询 分页获取文件管理记录列表 GET /api/adm/newconf/fileManagement/page */
export async function pageUsingGet2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageUsingGET2Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultPageResultFileManagementRespDTO_>(
    '/api/adm/newconf/fileManagement/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 编辑 更新文件管理记录的信息 PUT /api/adm/newconf/fileManagement/update */
export async function updateUsingPut3(
  body: API.FileManagementReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultInt_>('/api/adm/newconf/fileManagement/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
