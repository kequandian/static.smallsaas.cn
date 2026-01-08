// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /error */
export async function error(options?: { [key: string]: any }) {
  return request<API.ApiResult>('/error', {
    method: 'GET',
    ...(options || {}),
  });
}
