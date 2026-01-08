// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加 POST /api/adm/mdm/channel/add */
export async function channelAdd(body: API.MdmChannelDTO, options?: { [key: string]: any }) {
  return request<API.ApiResultLong>('/api/adm/mdm/channel/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 DELETE /api/adm/mdm/channel/delete */
export async function channelDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete6Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/adm/mdm/channel/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 详情 GET /api/adm/mdm/channel/get */
export async function channelGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.get3Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultMdmChannelDTO>('/api/adm/mdm/channel/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 列表 GET /api/adm/mdm/channel/list */
export async function channelList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.list4Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultListMdmChannelDTO>('/api/adm/mdm/channel/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页 GET /api/adm/mdm/channel/page */
export async function channelPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.page6Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultPageMdmChannelDTO>('/api/adm/mdm/channel/page', {
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

/** 更新 PUT /api/adm/mdm/channel/update */
export async function channelUpdate(body: API.MdmChannelDTO, options?: { [key: string]: any }) {
  return request<API.ApiResultBoolean>('/api/adm/mdm/channel/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
