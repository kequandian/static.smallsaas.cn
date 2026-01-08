// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 应用列表 GET /api/adm/mdm/app/list */
export async function applicationList(options?: { [key: string]: any }) {
  return request<API.ApiResultListMdmAppDTO>('/api/adm/mdm/app/list', {
    method: 'GET',
    ...(options || {}),
  });
}
