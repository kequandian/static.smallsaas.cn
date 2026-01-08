import { toast } from 'amis';
import axios from 'axios';
import copy from 'copy-to-clipboard';
import cache from './cache';

const amisEnv = {
  // 下面三个接口必须实现
  fetcher: ({
    url, // 接口地址
    method, // 请求方法 get、post、put、delete
    data, // 请求数据
    responseType,
    config, // 其他配置
    headers, // 请求头
  }: any) => {
    config.withCredentials = true;

    if (responseType) {
      config.responseType = responseType;
    }

    if (config.cancelExecutor) {
      config.cancelToken = new axios.CancelToken(config.cancelExecutor);
    }

    config.headers = headers || {};
    const token = cache.getToken();

    const baseUrl = REACT_APP_ENV === 'prod' ? API_URL : '';

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = baseUrl + url;
    }
    // if(){
    // config.headers['Authorization'] = `Bearer ${token}`;

    // }

    // config.headers['Authorization'] = `Bearer ${token}`;

    if (method !== 'post' && method !== 'put' && method !== 'patch') {
      if (data) {
        config.params = data;
      }
      return axios[method](url, config);
    } else if (data && data instanceof FormData) {
      // config.headers['Content-Type'] = 'multipart/form-data';
    } else if (
      data &&
      typeof data !== 'string' &&
      !(data instanceof Blob) &&
      !(data instanceof ArrayBuffer)
    ) {
      data = JSON.stringify(data);
      config.headers['Content-Type'] = 'application/json';
    }

    return axios[method](url, data, config);
  },
  isCancel: (value: any) => (axios as any).isCancel(value),
  copy: (content: any) => {
    copy(content);
    toast.success('内容已复制到粘贴板');
  },

  // 后面这些接口可以不用实现

  // 默认是地址跳转
  jumpTo: (location: string /*目标地址*/, action: any /* action对象*/) => {
    console.log(location, action);

    // 用来实现页面跳转, actionType:link、url 都会进来。
  },

  updateLocation: (location: string /*目标地址*/, replace: boolean /*是replace，还是push？*/) => {
    console.log(location, replace);

    // 地址替换，跟 jumpTo 类似
  },

  isCurrentUrl: (url: string /*url地址*/) => {
    // 用来判断是否目标地址当前地址
    console.log(url);
  },

  notify: (type: 'error' | 'success' | 'info' | 'warning', msg: string) => {
    if (toast[type]) {
      toast[type](msg, type === 'error' ? '系统错误' : '系统消息');
    } else {
      console.warn('[Notify]', type, msg);
    }
  },
  alert,
  confirm,
};
export default amisEnv;
