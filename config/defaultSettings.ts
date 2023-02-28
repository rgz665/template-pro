import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#315EFB',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  pwa: true,
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
    header: {
      colorBgHeader: '#001529',
      colorBgRightActionsItemHover: '#262a3c',
      colorTextRightActionsItem: '#fff',
      heightLayoutHeader: 48,
    },
    sider: {
      // colorBgCollapsedButton: 'yellow',
      // colorTextCollapsedButtonHover: 'yellow',
      // colorTextCollapsedButton: 'yellow',
      colorMenuBackground: '#fff',
      // colorBgMenuItemCollapsedHover: 'yellow',
      // colorBgMenuItemCollapsedSelected: 'yellow',
      // colorBgMenuItemCollapsedElevated: 'yellow',
      // colorMenuItemDivider: 'yellow',
      colorBgMenuItemHover: '#F3F7FF',
      colorBgMenuItemSelected: '#F3F7FF',
      colorTextMenuSelected: '#315EFB',
      colorTextMenuItemHover: '#315EFB',
      colorTextMenuActive: '#315EFB',
      colorTextMenu: 'rgba(30, 28, 35, 0.8)',
      // colorTextMenuSecondary: 'yellow',
      // paddingInlineLayoutMenu: 10,
      // paddingBlockLayoutMenu: 10,
      
      // menu 顶部 title 的字体颜色
      colorTextMenuTitle: 'rgba(30, 28, 35, 0.8)',
      colorTextSubMenuSelected: '#315EFB',
    },
  },
};

export default Settings;
