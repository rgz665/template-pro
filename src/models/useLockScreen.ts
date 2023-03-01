import {
  getLocalInfo,
  getLocalLockScreen,
  removeLocalLockScreen,
  setLocalLockScreen,
} from '@/utils';
import { useCallback, useState } from 'react';

export interface IlockScreenState {
  isLock?: boolean;
  lockUrl?: string;
  lockTime?: string;
  username?: string;
  avatar?: string;
}

export default function useLockScreen() {
  const [lockScreenState, setLockScreenState] = useState<IlockScreenState | null>(() => {
    const cacheState = getLocalLockScreen();
    if (cacheState?.lockTime && cacheState?.lockUrl) {
      return cacheState;
    }
    return null;
  });

  const saveLockScreen = useCallback((lockState: IlockScreenState) => {
    const localUser = getLocalInfo();
    const newLocalState = {
      ...lockState,
      username: localUser?.username ?? '',
      avatar: localUser?.avatar ?? '',
    };
    // update lock implementation
    setLockScreenState(newLocalState);
    setLocalLockScreen(newLocalState);
  }, []);

  const clearLockScreen = useCallback(() => {
    // clear lock implementation
    setLockScreenState(null);
    removeLocalLockScreen();
  }, []);

  return {
    lockScreenState,
    saveLockScreen,
    clearLockScreen,
  };
}
