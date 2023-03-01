import { request } from '@umijs/max';

/*账号密码登录*/
export const accountLogin = (data: Record<string, string>): any => {
  return request('/user/login/byPassword', {
    method: 'POST',
    data,
  });
};

/* 个人中心：当前账号基础信息 */
export const getBaseInfo = () => {
  return request(`/personal-center/detail`);
};

/*登出*/
export const loginOut = (): any => {
  return request('/user/logout');
};
