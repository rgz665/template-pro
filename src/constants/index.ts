// 用户个人中心路由
export const APP_CENTER = '/app/center';

// 用户登录页路由
export const LOGIN_PATH = '/';

// 用户锁屏路由
export const LOCK_SCREEN_PATH = '/lock';

// 用户首页路由
export const APP_INDEX = '/index';

// 接口请求前缀
export const REQUEST_PREFIX = '/api/admin';

// 系统异常提示
export const SYSTEM_ERROR = '系统异常，请联系管理员';

// oss文件预览地址前缀
export const OSS_PREFIX_DEV = 'http://karakal-csp-dev.karakal.cn/';
export const OSS_PREFIX_TEST = 'http://karakal-csp-dev.karakal.cn/';
export const OSS_PREFIX_PRO = 'https://karakal-csp-production.karakal.cn/';
export const OSS_PREFIX =
  REACT_APP_ENV === 'test'
    ? OSS_PREFIX_TEST
    : REACT_APP_ENV === 'pro'
    ? OSS_PREFIX_PRO
    : OSS_PREFIX_DEV;
