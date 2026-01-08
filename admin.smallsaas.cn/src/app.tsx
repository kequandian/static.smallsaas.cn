import { AvatarDropdown, AvatarName, Footer } from '@/components';
import type { Settings as LayoutSettings, MenuDataItem } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { getUserInfo } from './api/login';
import { errorConfig } from './requestErrorConfig';
import cache from './utils/cache';
// const isDev = process.env.NODE_ENV === 'development';
import logo from '@/assets/logo.png';
import { App } from 'antd';
import { getCustomMenusList } from './api/menu';
import fixMenuItemIcon from './utils/fixMenuItemIcon';

// import 'amis-editor-core/lib/style.css';
// import 'amis/lib/helper.css';
// import 'amis/lib/themes/cxd.css';
// import 'amis/sdk/iconfont.css';
const loginPath = '/landing';
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  menu?: any;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  fetchMenu?: () => Promise<API.Menu | undefined>;
}> {
  const fetchMenu = async () => {
    try {
      const { data } = await getCustomMenusList();

      return data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  const fetchUserInfo = async () => {
    try {
      const { data } = await getUserInfo();

      return data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath && cache.getToken() && !location.pathname.includes('/nm/')) {
    return {
      fetchMenu,
      fetchUserInfo,
      menu: await fetchMenu(),
      currentUser: await fetchUserInfo(),
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    // menu: await fetchMenu(),
    fetchMenu,
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

const removeLayoutParam = (menuData: any) => {
  return menuData.map((item: any) => {
    const newItem = { ...item };

    if (newItem.layout) {
      delete newItem.layout;
    }
    if (newItem.routes) {
      newItem.routes = removeLayoutParam(newItem.routes);
    }
    return newItem;
  });
};

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    avatarProps: {
      src: initialState?.currentUser?.avatarUrl, //1654482438997报错src
      title: <AvatarName />,
      render: (_: any, avatarChildren: any) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    // breakpoint: false,
    // defaultCollapsed: true,
    footerRender: () => <Footer />,
    // footerRender: () => null,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && cache.getToken() && location.pathname !== loginPath) {

        console.log('location.pathname', initialState, location.pathname, cache.getToken());

        history.push(loginPath);
      }
    },
    logo: logo,
    // layout: 'mix',
    menu: {
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        menu: initialState?.menu,
      },
      request: () => {
        const menuData = initialState?.menu ? removeLayoutParam(initialState.menu) : [];
        console.log(menuData);

        return menuData;
      },
    },

    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    menuHeaderRender: undefined,
    menuDataRender: (menuData: MenuDataItem[]) => fixMenuItemIcon(menuData),

    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <App>
          {/* <BreadcrumbLayout /> */}
          {children}
          {/* {isDev && ( */}
          {
            <SettingDrawer
              disableUrlParams
              hideHintAlert
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings: Partial<LayoutSettings>) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          }
        </App>
      );
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
  ...errorConfig,
};
