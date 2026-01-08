// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { List } from 'antd';

/** 设备属性 GET /api/adm/mdm/device/attribute */
export async function deviceAttribute(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.attributeParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultDeviceAttributeDTOResp>('/api/adm/mdm/device/attribute', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 指令控制 POST /api/adm/mdm/device/command */
export async function deviceCommand(
  body: API.DeviceCommandDTOReq,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultObject>('/api/adm/mdm/device/command', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 执行策略 POST /api/adm/mdm/device/execStrategy */
export async function deviceExecStrategy(
  body: API.DeviceExecStrategyDTOReq,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultBoolean>('/api/adm/mdm/device/execStrategy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 消息通知 POST /api/adm/mdm/device/notify */
export async function deviceNotify(
  body: API.DeviceCommandDTOReq,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultObject>('/api/adm/mdm/device/notify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取策略 GET /api/adm/mdm/device/strategy */
export async function deviceStrategy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.strategyParams,
  options?: { [key: string]: any },
) {
  return request<API.ApiResultDeviceStrategyDTOResp>('/api/adm/mdm/device/strategy', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

//
export async function refreshAttribute(params: any) {
  return request('/api/adm/mdm/device/refreshAttribute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      ...params,
    },
  });
}

/** 获取设备日志 GET /api/pub/mdm/device/log */
export async function deviceLog(
  params: {
    deviceId: string;
    logType: string;
    date: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ApiResult>('/api/adm/mdm/device/logString', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

  /** 同步外设列表  /api/adm/mdm/device/syncPeripheral */
export async function syncPeripheral(
  params: {
    deviceId: string;
  },
  options?: { [key: string]: any },
) {
    return request<API.ApiResult>('/api/adm/mdm/device/syncPeripheral', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 获取外设列表  /api/adm/mdm/device/peripheral */
export async function getPeripheral(
  params: {
  },
  options?: { [key: string]: any },
) {
  return request<API.ApiResult>('/api/adm/mdm/device/peripheral', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 获取设备列表  /api/adm/mdm/device/list */
export async function getDeviceList(
  params: {
  },
  options?: { [key: string]: any },
) {
  return request<API.ApiResult>('/api/adm/mdm/device/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}