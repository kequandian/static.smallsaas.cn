// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
// 应用ota计划
/** 添加 POST /api/adm/mdm/appOtaPlan/add */
export async function applicationOtaPlanAdd(
  body: API.MdmAppOtaPlanDTO,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultLong>('/api/adm/mdm/appOtaPlan/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 DELETE /api/adm/mdm/appOtaPlan/delete */
export async function applicationOtaPlanDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete7Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/adm/mdm/appOtaPlan/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 执行 PUT /api/adm/mdm/appOtaPlan/exec */
export async function applicationOtaPlanExec(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.exec1Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/adm/mdm/appOtaPlan/exec', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 详情 GET /api/adm/mdm/appOtaPlan/get */
export async function applicationOtaPlanGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.get4Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultMdmAppOtaPlanDTO>('/api/adm/mdm/appOtaPlan/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 列表 GET /api/adm/mdm/appOtaPlan/list */
export async function applicationOtaPlanList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.list5Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultListMdmAppOtaPlanDTO>('/api/adm/mdm/appOtaPlan/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页 GET /api/adm/mdm/appOtaPlan/page */
export async function applicationOtaPlanPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.page7Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultPageMdmAppOtaPlanDTO>('/api/adm/mdm/appOtaPlan/page', {
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

/** 更新 PUT /api/adm/mdm/appOtaPlan/update */
export async function applicationOtaPlanUpdate(
  body: API.MdmAppOtaPlanDTO,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/adm/mdm/appOtaPlan/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
