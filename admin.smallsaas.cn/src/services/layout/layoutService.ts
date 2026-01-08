// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加 POST /api/adm/layout/config/add */
export async function layoutConfigAdd(body: API.LayoutConfigDTO, options?: { [key: string]: any }) {
  return request<API.ApiResultLong>('/api/adm/layout/config/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 布局位置 POST /api/adm/layout/config/convert */
export async function layoutConfigConvert(
  body: API.WeightLayout,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultListWeightCellPosition>('/api/adm/layout/config/convert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 DELETE /api/adm/layout/config/delete */
export async function layoutConfigDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.layoutConfigDeleteParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/adm/layout/config/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 详情 GET /api/adm/layout/config/get */
export async function layoutConfigGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.layoutConfigGetParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultLayoutConfigDTO>('/api/adm/layout/config/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 列表 GET /api/adm/layout/config/list */
export async function layoutConfigList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.layoutConfigListParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultListLayoutConfigDTO>('/api/adm/layout/config/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页 GET /api/adm/layout/config/page */
export async function layoutConfigPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.layoutConfigPageParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultPageLayoutConfigDTO>('/api/adm/layout/config/page', {
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

/** 复制布局配置 POST /api/adm/layout/config/copy */
export async function layoutConfigCopy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.layoutConfigCopyParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultLong>('/api/adm/layout/config/copy', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新 PUT /api/adm/layout/config/update */
export async function layoutConfigUpdate(
  body: API.LayoutConfigDTO,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/adm/layout/config/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
