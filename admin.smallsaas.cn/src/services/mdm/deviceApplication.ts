// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加 POST /api/adm/mdm/deviceApp/add */
export async function deviceApplicationAdd(
  body: API.MdmDeviceAppDTO,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultLong>('/api/adm/mdm/deviceApp/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 DELETE /api/adm/mdm/deviceApp/delete */
export async function deviceApplicationDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete5Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/adm/mdm/deviceApp/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页 GET /api/adm/mdm/deviceApp/page */
export async function deviceApplicationPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.page5Params,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultPageMdmDeviceAppDTO>('/api/adm/mdm/deviceApp/page', {
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

/** 激活-设备端 PUT /api/mdm/deviceApp/activate */
export async function deviceApplicationActivate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.activateParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/mdm/deviceApp/activate', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 检查应用激活状态-设备端 GET /api/mdm/deviceApp/checkActivate */
export async function deviceApplicationCheckActivate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkActivateParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/mdm/deviceApp/checkActivate', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

// 获取已安装应用
export async function deviceAppInstallApp(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: any,
) {
  return request('/api/adm/mdm/device/installApp', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

// /api/adm / mdm / device / performance;
// 获取性能指标
export async function devicePerformance(params: any) {
  return request('/api/adm/mdm/device/performance', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
