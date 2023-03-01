import { loginOut } from '@/services';
import { useClearInfo } from '@/utils/hooks';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Modal } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import HeaderDropdown from '../HeaderDropdown';
const { confirm } = Modal;

import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return <span className={styles.username}>{currentUser?.username}</span>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  const { clearInfo } = useClearInfo();

  // const { reset } = useMusicPlayer(); // TODO:增加播放器

  const showConfirm = useCallback(() => {
    confirm({
      title: '是否确认退出系统?',
      onOk: async () => {
        const res = await loginOut();
        if (res?.code === 200) {
          // 清除播放器数据
          // reset();
          clearInfo('/');
        }
      },
      closable: true,
      autoFocusButton: null,
    });
  }, [clearInfo]);

  const onMenuClick = useCallback((event: MenuInfo) => {
    const { key } = event;
    if (key === 'logout') {
      showConfirm();
      return;
    }
  }, []);

  const menuItems = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown>
  );
};
