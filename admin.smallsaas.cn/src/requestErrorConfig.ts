import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { message, notification } from 'antd';
import cache from './utils/cache';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // baseURL: API_URL, // 添加 baseURL 配置

  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      const { success, data, errorCode, errorMessage, showType } =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          console.log(errorCode, 'errorCode');

          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        let errorMessage = '';
        switch (error.response.status) {
          case 400:
            errorMessage = '错误请求(400)';
            break;
          case 401:
            errorMessage = '未授权，请重新登录(401)';
            history.push('/landing');

            break;
          case 403:
            errorMessage = '拒绝访问(403)';
            break;
          case 404:
            errorMessage = '请求网址域名错误,未找到该网页资源(404 not found)';
            break;
          case 405:
            errorMessage = '请求类型未允许(405 Method not allowed)';
            break;
          case 406:
            errorMessage = '(请求不接受 406)无法使用请求的内容特性响应请求的网页';
            break;
          case 407:
            errorMessage = '该IP服务被禁止(407),请开启代理授权';
            break;
          case 408:
            errorMessage = '请求超时(408)';
            break;
          case 409:
            errorMessage =
              '(服务器冲突 409) 服务器在完成请求时发生冲突。服务器必须在响应中包含有关冲突的信息';
            break;
          case 410:
            errorMessage = '（服务器资源不存在 410）请求的资源已永久删除';
            break;
          case 411:
            errorMessage = '(需要有效长度 411） 服务器不接受不含有效内容长度标头字段的请求';
            break;
          case 412:
            errorMessage = '(未满足前提条件 412） 服务器未满足请求者在请求中设置的其中一个前提条件';
            break;
          case 413:
            errorMessage =
              '（请求实体过大 413） 服务器无法处理请求，因为请求实体过大，超出服务器的处理能力';
            break;
          case 414:
            errorMessage = '（请求的URI过长 414） 请求的URI过长，服务器无法处理。';
            break;
          case 415:
            errorMessage = '（不支持的媒体类型 415） 请求的格式不受请求页面的支持';
            break;
          case 416:
            errorMessage =
              '（请求范围不符合要求 416） 如果页面无法提供请求的范围，则服务器会返回此状态代码';
            break;
          case 417:
            errorMessage = '（未满足期望值 417） 服务器未满足”期望”请求标头字段的要求';
            break;
          case 500:
            errorMessage = '服务器端出错(500)';
            break;
          case 501:
            errorMessage = '服务器不具备完成请求的功能(501)';
            break;
          case 502:
            errorMessage = '网络错误,服务器端无响应(502)';
            break;
          case 503:
            errorMessage = '服务不可用(503)';
            break;
          case 504:
            errorMessage = '网关超时(504)';
            break;
          case 505:
            errorMessage = '（HTTP版本不受支持 505)服务器不支持请求中所用的HTTP协议版本';
            break;
          default:
            errorMessage = `连接错误${error.response.status}`;
        }

        message.error(
          error.response.data.message ||
            error.response.data.Message ||
            errorMessage ||
            `Response status:${error.response.status}`,
        );
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。

      const url = config?.url;
      // const url = config?.url?.concat('?token = 123');
      const token = cache.getToken();
      if (token && config.headers) {
        // 如果token存在，则在请求头中设置token
        config.headers.Authorization = `Bearer ${token}`;
      }
      return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;
      console.log(data, 'response data');
      if (data?.code === 401) {
        // token过期，清除token
        cache.removeToken();
        cache.removeUser();
        history.push('/landing');
      }
      if (data?.success === false) {
        message.error('请求失败！');
      }

      if (data?.code && data?.code !== 200 && data?.code !== 0) {
        message.error(data?.message || data?.msg);
      }
      return response;
    },
  ],
};
