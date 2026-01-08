import { ProLayoutProps } from '@ant-design/pro-components';
/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  // colorPrimary: '#c3181f',
  layout: 'mix',
  splitMenus: true,

  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  // collapsed: true,
  title: '智慧大屏运营平台',
  pwa: true,
  // logo: logo_1,
  iconfontUrl: '',

  token: {
    //   // 参见ts声明，demo 见文档，通过token 修改样式
    //   //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
    // bgLayout: '#f5f5f5',
    sider: {
      // 菜单背景
      // colorMenuBackground: '#fff',
      // colorBgMenuItemActive: '#f9e8e9',
      // colorBgMenuItemHover: '#f9e8e9',
      // colorBgMenuItemSelected: '#f9e8e9',
    },

    header: {
      // 顶部栏颜色
      // colorBgHeader: '#fff',
    },
    pageContainer: {
      paddingInlinePageContainerContent: 24,
      paddingBlockPageContainerContent: 20,
    },
  },
};

export default Settings;
