import { OSS_PREFIX } from '@/constants';
import CryptoJS from 'crypto-js';

/* localStorage操作 */
// 获取用户信息
export const getLocalInfo = () => {
  const baseInfo = localStorage.getItem('baseUserInfo');
  return baseInfo ? JSON.parse(baseInfo as string) : undefined;
};

// 设置用户信息
export const setLocalInfo = (info: Record<string, any>) => {
  localStorage.setItem('baseUserInfo', JSON.stringify(info));
};

// 获取token
export const getToken = () => {
  return localStorage.getItem('Authorization') || '';
};

// 设置token
export const setToken = (value: string) => {
  if (!value) return;
  localStorage.setItem('Authorization', value);
};

// 删除token
export const removeToken = () => {
  localStorage.removeItem('Authorization');
};

// 删除用户信息
export const removeLocalInfo = () => {
  localStorage.removeItem('baseUserInfo');
};

// 退出登录删除用户相关存储
export const removeLocalUser = () => {
  removeToken();
  removeLocalInfo();
};

// 设置锁屏信息
export const setLocalLockScreen = (info: Record<string, any>) => {
  sessionStorage.setItem('isLockedPathName', JSON.stringify(info));
};

// 删除锁屏信息
export const removeLocalLockScreen = () => {
  sessionStorage.removeItem('isLockedPathName');
};

// 获取锁屏信息
export const getLocalLockScreen = () => {
  const lockInfo = sessionStorage.getItem('isLockedPathName');
  return lockInfo ? JSON.parse(lockInfo as string) : undefined;
};

// AES加密
export function encryptByAES(data: string) {
  const AESKey = 'uoLt8wlEyEIhFrUb'; // 此处为密钥
  const key = CryptoJS.enc.Utf8.parse(AESKey);
  const word = CryptoJS.enc.Utf8.parse(data);
  const cipherText = CryptoJS.AES.encrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return cipherText.toString();
}

// 拼接文件预览 oss 地址：image/2022/xxx.png => http://ossxxx.com/image/2022/xxxx,png
export const splicingOSSUrl = (path?: string) => {
  return path && typeof path === 'string'
    ? path?.startsWith('http')
      ? path
      : OSS_PREFIX + path
    : '';
};

// 获取头像
export const getAvatar = (path?: string, defaultImg?: any) => {
  const url = splicingOSSUrl(path);
  return url ? url : defaultImg ? defaultImg : require('@/assets/avatar.png');
};
