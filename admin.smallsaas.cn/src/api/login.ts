// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function login(body: API.LoginParams) {
  return request<API.LoginResult>('/v2/api/sys/oauth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

/** 登陆 */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>('/api/login/captcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

// 获取用户信息
export async function getUserInfo() {
  return request<API.CurrentUser>('/v2/api/adm/sys/users/userInfo', {
    method: 'GET',
    // ...(options || {}),
  });
}

// 发送日志
export async function getCollectorLog(data: any) {
  const baseUrl = REACT_APP_ENV === 'prod' ? 'http://202.63.172.178:18080' : '/logV1';
  return request(`${baseUrl}/api/collector/log.add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `ad8045ec-37a3-075b-1f83-53a6ebcae9c1`,
    },
    data,
  });
}
