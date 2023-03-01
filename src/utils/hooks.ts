import { history, useModel } from '@umijs/max';
import { useCallback } from 'react';
import { flushSync } from 'react-dom';
import { removeLocalUser } from '.';

/* 更新初始数据 */
export const useUpdateInitialState = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const updateInitialState = useCallback(async () => {
    const currentUser: any = (await initialState?.fetchUserInfo?.()) || undefined;
    // 使用flushSync 原因：https://github.com/ant-design/ant-design-pro/issues/10222
    flushSync(() => {
      setInitialState((pre: any) => ({
        ...pre,
        currentUser,
      }));
    });
    return currentUser;
  }, [initialState, setInitialState]);
  return {
    updateInitialState,
    initialState,
  };
};

// 删除local部分数据和初始化数据、锁屏数据，todo：后续增加权限信息
export const useClearInfo = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { clearLockScreen } = useModel('useLockScreen', (model) => ({
    clearLockScreen: model.clearLockScreen,
  }));

  const clearInfo = useCallback(
    async (path: string, saveLock?: boolean) => {
      flushSync(() => {
        setInitialState((s: any) => ({ ...s, currentUser: undefined }));
      });

      removeLocalUser();
      if (!saveLock) {
        clearLockScreen();
      }

      history.push(path);
    },
    [setInitialState, history, clearLockScreen],
  );

  return {
    clearInfo,
    initialState,
  };
};
