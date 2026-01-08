# 大屏后台管理系统

web 后台系统

## 部署路径

1. [测试环境] (http://202.63.172.178:8000)
2. [生产环境] 待定

#### 运行环境

1.  node >= 18

#### 基本命令

```#
yarn //安装依赖
yarn start  //运行
yarn build  //打包
```

#### 测试环境

1. [测试](http:?)
   - 账号: admin
   - 密码: 111111

#### 核心技术栈

1. [antd@5.13.2](https://ant-design.antgroup.com/)
2. [react@18.2.0](https://react.docschina.org/)
3. [typescript@5.3.3](https://react.docschina.org/)
4. [umi@4.1.1](https://umijs.org/)

#### 问题记录

...

#### 目录结构

```#
config ---------------------------------------- umi 配置，包含路由，构建等配置
mock ------------------------------------------ 本地模拟数据
public ---------------------------------------- 静态资源
src ------------------------------------------- 项目目录
|-- assets ------------------------------------ 资源目录
|-- components -------------------------------- 业务通用组件
|-- hooks ------------------------------------- 自定义hooks
|-- models ------------------------------------ 数据流
|-- pages ------------------------------------- 业务页面
|-- api --------------------------------------- HTTP 服务
|-- utils ------------------------------------- 函数工具
|-- App.less ---------------------------------- 全局 CSS
|-- App.tsx ----------------------------------- 入口加载
package.json ---------------------------------- 依赖包
README.md ------------------------------------- 描述文件
eslintrc.js ----------------------------------- eslint规则
tsconfig.json --------------------------------- TS 配置
```

#### 接口代理配置

配置 路径 config/(config.dev.ts/config.prod.ts)

1. 公共配置 baseUrl（线上）

- 平台：全局使用变量 API_URL=> http://localhost:8000/api
- LAUNCHER：全局使用变量 LAUNCHER_API_URL http://spbs.xinzhisc.com

1. 代理配置（本地）

- 平台：/v2/ => http://202.63.172.178:8000 (api 路径加/v2/即可代理)
- 平台：/launcherV1/ => http://spbs.xinzhisc.com (api 路径加/launcherV1/即可代理)

#### 后台 ui 目前规范

参考

1. semi.desi (https://semi.design)

- 主题配置 https://semi.design/dsm_store/theme?dsmID=17301

2. Arco Pro（飞书后台） (https://react-pro.arco.design/list/search-table)

1. 字体

- 标题一 20px
- 标题二 18px
- 标题二 16px
- 正文一 14px
- 正文二 12px
- 菜单字体？

  ![alt text](/public/mdImg/image-3.png)

2. 主题颜色

- 暗黑

  - 主题色 #232324
  - 背景 rgba(0, 0, 0, 0.08)
  - 字体颜色 #ffffff
  - 菜单默认 #ebebeb
  - 菜单 hover rgb(232 232 232 / 5%)
  - 菜单激活 background-color：#151f33；color: ##4c88ff

  ![alt text](/public/mdImg/image-1.png)

- 默认

  - 主题色 #ffffff
  - 背景 #f2f3f5
  - 字体颜色 #1d2129
  - 菜单默认 #ebebeb
  - 菜单 hover rgb(46 50 56 / 5%)
  - 菜单激活 background-color：#eaf5ff；color: #0064fa

    ![alt text](/public/mdImg/image.png)

3. 按钮待定

   1.semi![alt text](/public/mdImg/image-4.png) 2.飞书后台![alt text](/public/mdImg/image-5.png)

4. 菜单图标待定

   1.实底

   ![alt text](/public/mdImg/image-8.png)

   2.彩色

   ![alt text](/public/mdImg/image-9.png)

5. card

   1.semi ![alt text](/public/mdImg/image-6.png)

   2.飞书后台 ![alt text](/public/mdImg/image-7.png)

ps: 采用飞书后台整体布局（边距/卡片等），采用 semi 的主题色（默认白色，内容背景灰色，内容卡片状态带阴影，包括彩色菜单，hover 颜色，按钮类型）

跟随版本更新

```

```
