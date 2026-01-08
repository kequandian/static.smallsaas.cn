// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加-设备端接口 POST /api/adm/mdm/firmwareOtaHistory/add */
export async function firmwareOtaHistoryAdd(
  body: API.MdmFirmwareOtaHistoryDTO,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultLong>('/api/adm/mdm/firmwareOtaHistory/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 DELETE /api/adm/mdm/firmwareOtaHistory/delete */
export async function firmwareOtaHistoryDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete3Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/adm/mdm/firmwareOtaHistory/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页 GET /api/adm/mdm/firmwareOtaHistory/page */
export async function firmwareOtaHistoryPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.page3Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultPageMdmFirmwareOtaHistoryDTO>(
    '/api/adm/mdm/firmwareOtaHistory/page',
    {
      method: 'GET',
      params: {
        // pageNum has a default value: 1
        pageNum: '1',
        // pageSize has a default value: 10
        pageSize: '10',

        ...params,
      },
      ...(options || {}),
    },
  );
}
