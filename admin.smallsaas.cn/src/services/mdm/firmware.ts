// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 固件列表 GET /api/adm/mdm/firmware/list */
export async function firmwareList(options?: { [key: string]: any }) {
  return request<API.ApiResultListMdmFirmwareDTO>('/api/adm/mdm/firmware/list', {
    method: 'GET',
    ...(options || {}),
  });
}
