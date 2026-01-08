// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加 POST /api/adm/mdm/firmwareOtaPlan/add */
export async function firmwareOtaPlanAdd(
  body: API.MdmFirmwareOtaPlanDTO,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultLong>('/api/adm/mdm/firmwareOtaPlan/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 DELETE /api/adm/mdm/firmwareOtaPlan/delete */
export async function firmwareOtaPlanDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete2Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/adm/mdm/firmwareOtaPlan/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 执行 PUT /api/adm/mdm/firmwareOtaPlan/exec */
export async function firmwareOtaPlanExec(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.execParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/adm/mdm/firmwareOtaPlan/exec', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 详情 GET /api/adm/mdm/firmwareOtaPlan/get */
export async function firmwareOtaPlanGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.get2Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultMdmFirmwareOtaPlanDTO>('/api/adm/mdm/firmwareOtaPlan/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 列表 GET /api/adm/mdm/firmwareOtaPlan/list */
export async function firmwareOtaPlanList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.list2Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultListMdmFirmwareOtaPlanDTO>('/api/adm/mdm/firmwareOtaPlan/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页 GET /api/adm/mdm/firmwareOtaPlan/page */
export async function firmwareOtaPlanPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.page2Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultPageMdmFirmwareOtaPlanDTO>('/api/adm/mdm/firmwareOtaPlan/page', {
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

/** 更新 PUT /api/adm/mdm/firmwareOtaPlan/update */
export async function firmwareOtaPlanUpdate(
  body: API.MdmFirmwareOtaPlanDTO,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/adm/mdm/firmwareOtaPlan/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
