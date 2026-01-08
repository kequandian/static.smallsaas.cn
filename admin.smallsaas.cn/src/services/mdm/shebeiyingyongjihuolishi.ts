// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除 DELETE /api/adm/mdm/deviceAppActivateHistory/delete */
export async function delete4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete4Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/adm/mdm/deviceAppActivateHistory/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页 GET /api/adm/mdm/deviceAppActivateHistory/page */
export async function page4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.page4Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultPageMdmDeviceAppActivateHistoryDTO>(
    '/api/adm/mdm/deviceAppActivateHistory/page',
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
