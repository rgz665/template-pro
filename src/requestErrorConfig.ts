import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';
import { SYSTEM_ERROR } from './constants';
import { getToken, removeLocalUser, setToken } from './utils';

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: () => {},
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;

      const { response } = error;

      const codeMaps: Record<number, string> = {
        201: '新建或修改数据成功。',
        202: '一个请求已经进入后台排队（异步任务）。',
        204: '删除数据成功。',
        400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
        401: '用户没有权限。',
        403: '用户得到授权，但是访问是被禁止的。',
        404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
        406: '请求的格式不可得。',
        410: '请求的资源被永久删除，且不会再得到的。',
        422: '当创建一个对象时，发生一个验证错误。',
        500: '服务器发生错误，请检查服务器。',
        502: '网关错误。',
        503: '服务不可用，服务器暂时过载或维护。',
        504: '网关超时。',
      };

      if (response?.status === 401) {
        removeLocalUser();
        window.location.replace('/');
      }

      const errMsg = !navigator.onLine
        ? '网络异常：请检查网络连接！'
        : codeMaps[response?.status] || SYSTEM_ERROR;

      if (errMsg) {
        message.error({
          content: errMsg,
          key: errMsg,
        });
      }

      throw new Error(JSON.stringify(error));
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      return {
        ...config,
        headers: {
          ...(config?.headers ?? {}),
          ...(config?.headers?.noToken ? {} : { Authorization: getToken() }),
        },
      };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      const { headers, status, data } = response as any;

      setToken(headers?.authorization || '');

      if (status === 200 && data && data?.code === 500) {
        message.error({
          content: data?.message || SYSTEM_ERROR,
          key: data?.message || SYSTEM_ERROR,
        });
      }

      return response;
    },
  ],
};
