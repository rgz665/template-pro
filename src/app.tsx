import HeaderWhiteLogo from '@/assets/logo_white.svg';
import { Question } from '@/components/RightContent';
import { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown';
import { APP_CENTER, APP_INDEX, LOCK_SCREEN_PATH, LOGIN_PATH, REQUEST_PREFIX } from './constants';
import { errorConfig } from './requestErrorConfig';
import { getBaseInfo } from './services';
import { getAvatar, getLocalInfo, getLocalLockScreen, getToken, setLocalInfo } from './utils';

import styles from './app.less';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    let info;
    const result = await getBaseInfo().catch(() => {
      info = getLocalInfo();
    });
    const data = result?.data;
    if (result?.code === 200 && data) {
      info = {
        ...data,
      };
      setLocalInfo(info);
      return info;
    }
    return info || getLocalInfo();
  };
  if (getToken()) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  const { currentUser } = initialState || {};
  return {
    actionsRender: () => [<Question key="doc" />],
    avatarProps: {
      src: getAvatar(currentUser?.avatar),
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        console.log('avatarChildren', avatarChildren);
        return <AvatarDropdown menu>{avatarChildren}</AvatarDropdown>;
      },
    },
    // 水印
    // waterMarkProps: {
    //   content: currentUser?.username,
    // },
    footerRender: false,
    headerTitleRender: (logo, title, props: any) => {
      const { location } = props;
      return (
        <div
          className={styles.title}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <img src={HeaderWhiteLogo} className="header_title_logo" alt="logo" />
          {location?.pathname?.indexOf(APP_CENTER) > -1 && (
            <>
              <div className={styles.line} />
              <div className={styles.sub_title}>个人中心</div>
            </>
          )}
        </div>
      );
    },
    onPageChange: () => {
      const { location } = history;
      // 未登录 && 不是登录页面
      if (!currentUser && ![LOGIN_PATH].includes(location.pathname)) {
        const localScreenInfo = getLocalLockScreen();
        const { username, isLock } = localScreenInfo || {};
        // 有用户名缓存 && 锁屏状态 && 锁屏页面
        if (username && isLock && [LOCK_SCREEN_PATH].includes(location.pathname)) {
          history.push(LOCK_SCREEN_PATH);
        } else {
          history.push(LOGIN_PATH);
        }
      }
      // 已登录 && 是登录页面
      if (currentUser && [LOGIN_PATH].includes(location.pathname)) {
        history.push(APP_INDEX);
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return <>{children}</>;
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  baseURL: REQUEST_PREFIX,
  ...errorConfig,
};

/**
 * 不同路由切换，滚动条滚动到顶部
 */
let prePathname = '';
export function onRouteChange({ location }: any) {
  if (prePathname !== location?.pathname) {
    prePathname = location?.pathname;
    window.scrollTo(0, 0);
  }
}
