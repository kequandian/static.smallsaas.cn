// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加-设备端接口 POST /api/adm/mdm/appOtaHistory/add */
export async function applicationHistoryAdd(
  body: API.MdmAppOtaHistoryDTO,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultLong>('/api/adm/mdm/appOtaHistory/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 DELETE /api/adm/mdm/appOtaHistory/delete */
export async function applicationHistoryDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete8Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/adm/mdm/appOtaHistory/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页 GET /api/adm/mdm/appOtaHistory/page */
export async function applicationHistoryPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.page8Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultPageMdmAppOtaHistoryDTO>('/api/adm/mdm/appOtaHistory/page', {
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
