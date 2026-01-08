/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name //移除！！！配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/launcher',
    name: '党建管理',
    icon: 'WalletFilled',
    routes: [
      { path: '/launcher', redirect: './newsManagement/banner' },

      // 资讯管理
      {
        path: '/launcher/newsManagement',
        name: '资讯管理',
        icon: 'NotificationOutlined',
        routes: [
          { path: '', redirect: './learningSource' },

          {
            path: 'banner',
            name: '轮播管理',
            component: './launcher/banner',
          },
          {
            path: 'homeRecommend',
            name: '首页推荐',
            component: './launcher/homeRecommend',
          },
          {
            path: 'learningSource',
            name: '资讯配置', //原学习源
            component: './launcher/learningSource',
          },
        ],
      },

      // 学习中心
      {
        path: '/launcher/learningCenter',
        name: '学习中心',
        icon: 'ReadOutlined',
        routes: [
          { path: '', redirect: './learningTopic' },

          {
            path: 'learningTopic',
            name: '学习专题',
            component: './launcher/learningTopic',
          },
          {
            path: 'learningTopic/learningTasks',
            name: '学习任务',
            component: './launcher/learningTasks',
            hideInMenu: true,
          },
          {
            path: 'courseBuyApply',
            name: '课程订单', //原课程预定
            // icon: 'ShoppingCartOutlined',
            component: './launcher/courseBuyApply',
          },

          {
            path: 'courseMaster',
            name: '课程专题',
            component: './launcher/course/courseMaster',
          },
          {
            path: 'courseMaster/courseContent',
            name: '课程内容',
            component: './launcher/course/courseContent',
            hideInMenu: true,
          },

          {
            path: 'regionalContent',
            name: '地方推荐', //原地方内容
            component: './launcher/regionalContent',
          },
          {
            path: 'learningTaskOutside',
            name: '学习任务表',
            component: './launcher/learningTaskOutside',
          },
          {
            path: 'learningTaskOutside/content',
            name: '学习任务表内容',
            hideInMenu: true,
            component: './launcher/learningTaskOutsideContent',
          },
        ],
      },

      // 党务管理
      {
        path: '/launcher/party',
        name: '党务管理',
        icon: 'UserOutlined',
        routes: [
          { path: '', redirect: './partyMember' },

          {
            path: 'partyMember',
            name: '党员管理',
            component: './launcher/partyMember',
          },
          {
            path: 'partyMember/details/:id',
            name: '党员信息',
            hideInMenu: true,
            component: './launcher/partyMember/details',
          },
          {
            path: 'partyMemberAuthority',
            name: '党员角色',
            component: './launcher/partyMemberAuthority',
          },
          {
            path: 'orgManager',
            name: '党组织管理',
            component: './launcher/orgManager',
          },
          {
            path: 'orgManager/structure/:id',
            name: '组织架构',
            hideInMenu: true,
            component: './launcher/orgManager/structure',
          },
          {
            path: 'orgManager/approveDetails/:id',
            name: '组织转移详情',
            hideInMenu: true,
            component: './launcher/orgManager/approveDetails',
          },

          {
            path: 'democraticReview',
            name: '通知公告',
            icon: 'NotificationOutlined',
            routes: [
              {
                path: 'notice',
                name: '通知公告',
                component: './launcher/notice',
              },
              {
                path: 'democraticReviewNotice',
                name: '公告通知',
                component: './launcher/democraticReview/notice',
              },
              {
                path: 'historyNotice',
                name: '历史公告',
                component: './launcher/democraticReview/notice/historyNotice',
                hideInMenu: true,
              },
              {
                path: 'meeting',
                name: '会议通知',
                component: './launcher/democraticReview/meeting',
              },
            ],
          },

          {
            path: 'baseWork',
            name: '基础工作',
            component: './launcher/baseWork',
          },
          {
            path: 'definitionPoints',
            name: '积分定义',
            component: './launcher/definitionPoints',
          },
          {
            path: 'pioneerDeeds',
            name: '先锋事迹',
            component: './launcher/pioneerDeeds',
          },
        ],
      },

      // 活动管理
      {
        path: '/launcher/activity',
        name: '活动管理',
        icon: 'TeamOutlined',
        routes: [
          { path: '', redirect: './activityManager' },

          {
            path: 'activityManager',
            name: '志愿活动',
            component: './launcher/activityManager',
          },
          {
            path: 'activityManager/details/:id',
            name: '活动详情',
            hideInMenu: true,
            component: './launcher/activityManager/details',
          },
          {
            path: 'organizationalLife',
            name: '组织生活',
            component: './launcher/organizationalLife',
          },
          {
            path: 'organizationalLife/details/:id',
            name: '活动详情',
            hideInMenu: true,
            component: './launcher/organizationalLife/details',
          },
          {
            path: 'pollingManager',
            name: '投票管理',
            component: './launcher/pollingManager',
          },
          {
            path: 'pollingManager/details/:id',
            name: '投票详情',
            hideInMenu: true,
            component: './launcher/pollingManager/details',
          },
        ],
      },

      // 会议管理
      {
        path: '/launcher/meetingManager',
        name: '会议管理',
        icon: 'HistoryOutlined',

        routes: [
          { path: '', redirect: './theServer' },
          {
            path: 'meetingEquipment',
            name: '会议设备',
            component: './meeting/meetingEquipment',
          },
          {
            path: 'settings',
            name: '会议设置',
            routes: [
              {
                path: 'theServer',
                name: '会议服务器',
                component: './theServer',
              },
              {
                path: 'meetingNumRouting',
                name: '会议号配置',
                component: './meeting/meetingNumRouting',
              },
              {
                path: 'exclusiveMeetingNumbers',
                name: '专属会议号',
                component: './meeting/exclusiveMeetingNumbers',
              },
            ],
          },
          {
            path: 'meetingList',
            name: '会议列表',
            component: './meeting/meetingList',
          },
          {
            path: 'meetingList/detail/:id',
            name: '会议详情',
            component: './meeting/meetingList/components/MeetingDetail',
            hideInMenu: true,
          },
          // {
          //   path: 'record',
          //   name: '会议记录',
          //   routes: [
          //     {
          //       path: 'meetingOrderList',
          //       name: '会议预约',
          //       component: './meeting/meetingOrderList',
          //     },
          //     { path: 'meetingList', name: '会议列表', component: './meeting/meetingList' },
          //     {
          //       path: 'meetingList/meetingControl',
          //       name: '会议控制',
          //       hideInMenu: true,
          //       component: './meeting/meetingControl',
          //     },
          //   ],
          // },
          {
            path: 'topics',
            name: '议题管理',
            routes: [
              {
                path: 'list',
                name: '议题列表',
                component: './launcher/topics',
              },
              { path: 'topicTemplate', name: '议题模版', component: './launcher/topicTemplate' },
            ],
          },
          {
            path: 'meetingApproval',
            name: '会议审批',
            routes: [
              {
                path: 'vote',
                name: '投票审批',
                component: './meeting/meetingApproval/vote',
              },
              {
                path: 'resolve',
                name: '表决审批',
                component: './meeting/meetingApproval/resolve',
              },
              {
                path: 'summary',
                name: '纪要审批',
                component: './meeting/meetingApproval/summary',
              },
            ],
          },
        ],
      },

      // 云存储
      {
        path: '/launcher/cloudStorage',
        name: '文档管理',
        icon: 'FileOutlined',
        routes: [
          { path: '', redirect: './fileManagement' },

          {
            path: 'fileManagement',
            name: '文档管理',
            component: './launcher/fileManagement',
          },
        ],
      },
      {
        path: '/launcher/entry',
        name: '词条管理',
        icon: 'BookOutlined',
        component: './launcher/entry',
      },
    ],
  },

  {
    path: '/MDMmanage',
    name: 'MDM管理',
    icon: 'HddFilled',
    routes: [
      { path: '/MDMmanage', redirect: './equipment' },
      {
        path: 'equipment',
        name: '设备列表',
        icon: 'UnorderedListOutlined',
        component: './equipment',
      },
      {
        path: 'equipment/details/:deviceId',
        name: '设备详情',
        component: './equipment/details',
        hideInMenu: true,
      },
      {
        path: 'appPresetsList',
        name: '应用预设列表',
        icon: 'AppstoreOutlined',
        component: './MDMmanage/appPresetsList',
      },
      {
        path: 'policyManage',
        name: '策略管理',
        icon: 'ProfileOutlined',
        component: './MDMmanage/policyManage',
      },
      {
        path: 'policyManage/add',
        name: '添加策略',
        component: './MDMmanage/policyManage/components/PolicyControlEditModel',
        hideInMenu: true,
      },
      {
        path: 'policyManage/edit/:id',
        name: '编辑策略',
        component: './MDMmanage/policyManage/components/PolicyControlEditModel',
        hideInMenu: true,
      },
      {
        path: 'channel',
        name: '渠道管理',
        icon: 'BranchesOutlined',
        component: './MDMmanage/channel',
      },
      {
        path: 'firmwareOtaPlan',
        name: '固件ota计划',
        icon: 'CloudUploadOutlined',
        component: './MDMmanage/firmwareOtaPlan',
      },

      {
        path: 'applicationOtaPlan',
        name: '应用ota计划',
        icon: 'CloudUploadOutlined',
        component: './MDMmanage/applicationOtaPlan',
      },

      {
        path: 'deviceApplication',
        name: '设备应用',
        icon: 'MobileOutlined',
        component: './MDMmanage/deviceApplication',
      },
    ],
  },
  {
    path: '/operation',
    name: '运维管理',
    icon: 'SettingFilled',
    routes: [
      { path: '/operation', redirect: './appManage' },

      {
        path: '/operation/appManage',
        name: 'App管理',
        icon: 'AndroidOutlined',
        routes: [
          { path: '/operation/appManage', redirect: './appList' },
          {
            path: '/operation/appManage/appList',
            name: '应用列表',
            icon: 'AppstoreOutlined',
            component: './appManage/appList',
          },
          {
            path: '/operation/appManage/appList/appDetails/:id',
            name: '应用详情',
            icon: 'InfoCircleOutlined',
            component: './appManage/appList/appDetails',
            hideInMenu: true,
          },
          {
            path: '/operation/appManage/ops',
            name: 'ops管理',
            icon: 'ToolOutlined',
            component: './appManage/ops',
          },
        ],
      },

      {
        path: '/operation/other',
        name: '其他管理',
        icon: 'AuditOutlined',
        routes: [
          { path: '/operation/other', redirect: './akstreamnvr/driveManage' },
          {
            path: '/operation/other/akstreamnvr',
            name: 'IPC管理',
            icon: 'VideoCameraOutlined',
            routes: [
              {
                path: '/operation/other/akstreamnvr/driveManage',
                name: '设备管理',
                icon: 'FileOutlined',
                component: './akstreamnvr/driveManage',
              },
            ],
          },
          {
            path: '/operation/other/operation/channel',
            name: '运营商渠道',
            icon: 'BranchesOutlined',
            component: './operation/channel',
          },
          {
            name: '会控服务调试',
            path: '/operation/other/roomServer',
            icon: 'BugOutlined',
            component: './roomServer',
          },
          {
            name: 'chat',
            path: '/operation/other/chat',
            icon: 'MessageOutlined',
            component: './chat',
          },
        ],
      },
      {
        path: '/operation/system',
        name: '系统管理',
        icon: 'SettingOutlined',
        routes: [
          { path: '/operation/system', redirect: './menu' },
          {
            path: '/operation/system/menu',
            name: '菜单管理',
            icon: 'MenuOutlined',
            component: './system/menu',
          },
          {
            path: '/operation/system/role',
            name: '角色管理',
            icon: 'UserSwitchOutlined',
            component: './system/role',
          },
          {
            path: '/operation/system/platformUsers',
            name: '平台用户',
            icon: 'UsergroupAddOutlined',
            component: './tenantManagement/platformUsers',
          },
          {
            path: '/operation/system/purview',
            name: '权限管理',
            icon: 'SafetyOutlined',
            component: './tenantManagement/purview',
          },
          {
            path: '/operation/system/sysSetting',
            name: '配置管理',
            icon: 'ToolOutlined',
            component: './system/sysSetting',
          },
          {
            path: '/operation/system/area',
            name: '行政区域',
            icon: 'SendOutlined',
            component: './system/area',
          },
        ],
      },
      {
        path: '/operation/tenantManagement',
        name: '租户管理',
        icon: 'DeploymentUnitOutlined',
        routes: [
          { path: '/operation/tenantManagement', redirect: './organization' },
          {
            path: '/operation/tenantManagement/organization',
            name: '组织管理',
            icon: 'TeamOutlined',
            component: './tenantManagement/organization',
          },
          {
            path: '/operation/tenantManagement/organizeUsers/endUser',
            name: '终端用户',
            icon: 'UserOutlined',
            component: './organizeUsers/endUser',
          },
          {
            path: '/operation/tenantManagement/tenant',
            name: '租户管理',
            icon: 'HomeOutlined',
            component: './tenantManagement/tenant',
          },
        ],
      },
      {
        path: 'lowCode',
        name: '低码相关',
        icon: 'ConsoleSqlOutlined',
        routes: [
          {
            path: 'apis',
            name: '自定义接口',
            component: './mbcs/nativeSQL',
          },
          {
            path: 'metaField',
            name: '元字段接口',
            component: './mbcs/metaField',
          },
          { name: 'lowEdit', path: 'lowEdit', component: './test/lowPage' },
          { name: 'lowPage', path: 'lowPage/:name', component: './lowPage' },
        ],
      },
      {
        // 官网相关
        path: 'website',
        name: '官网相关',
        routes: [
          // 内容编辑
          {
            path: 'content',
            name: '内容编辑',
            component: './website/content',
          },
          // 招聘编辑
          {
            path: 'recruitment',
            name: '招聘编辑',
            component: './website/recruitment',
          },

          // 合作伙伴
          {
            path: 'partner',
            name: '合作伙伴',
            component: './website/partner',
          },
          // 意向客户
          {
            path: 'client',
            name: '意向客户',
            component: './website/client',
          },
          {
            path: 'smartsee',
            name: 'Smartsee官网编辑',
            component: './website/smartsee',
          },
        ],
      },
      {
        path: 'workflow',
        name: '工作流管理',
        icon: 'ApiOutlined',
        routes: [
          { path: 'workflow', redirect: './category' },
          {
            path: 'category',
            name: '工作流分类',
            component: './workflow/category',
          },
          {
            path: 'process',
            name: '工作流',
            component: './workflow/process',
          },
          {
            path: 'instance',
            name: '工作流实例',
            component: './workflow/instance',
          },
          // 表单管理
          {
            path: 'formManagement',
            name: '表单管理',
            component: './workflow/formManagement',
          },
        ],
      },
      {
        path: 'vlayout',
        name: '布局管理',
        icon: 'MergeCellsOutlined',
        routes: [
          {
            path: 'vconfig',
            name: '布局配置',
            component: './vlayout/vconfig',
          },
          {
            path: 'frontConfig',
            name: '前端布局配置',
            component: './vlayout/frontconfig',
          },
        ],
      },
    ],
  },
  {
    path: '/account',

    routes: [
      {
        path: '/account/editUser',
        name: '个人消息',
        component: './account/editUser',
        icon: 'UserOutlined',
      },
    ],
  },
  { path: '/', redirect: '/launcher' },
  { path: '*', layout: false, component: './404' },
  { path: '/rooms', layout: false, component: './roomServer' },
  { path: '/chat', layout: false, component: './chat' },
  { path: '/lowPage/edit/:id', layout: false, component: './test/lowPage' },
  { path: '/amis-editor', layout: false, component: './test/lowPage' },
  { path: '/nm/:meetingId', layout: false, component: './other/meetingInvites' }, //会议邀请

  {
    path: '/landing',
    layout: false,
    component: './landing',
  },
  {
    path: '/home',
    name: '首页占位',
    component: './home/indexchat',
    hideInMenu: true,
  },
];
