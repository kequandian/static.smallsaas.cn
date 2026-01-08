// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /health */
export async function health(options?: { [key: string]: any }) {
  return request<string>('/health', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /stop */
export async function stop(options?: { [key: string]: any }) {
  return request<string>('/stop', {
    method: 'GET',
    ...(options || {}),
  });
}
