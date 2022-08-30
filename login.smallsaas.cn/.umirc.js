
// ref: https://umijs.org/config/
export default {
  title: 'login',
  links: [
    // href的图片你可以放在public里面，直接./图片名.png 就可以了，也可以是cdn链接
     { rel: 'icon', href: 'https://static.smallsaas.cn/house/2022/image/SmallSaaS/SmallSaaS.png' },
   ],

  hash: true,
  history: {
    type: 'hash',
  },
  // dynamicImport: {
  //   loading: '@/components/loading'
  // },
  devtool: false,
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  antd: {},
  //配置model, 禁用即 dva:true
  dva: {
    hmr: true,
    immer: false,
  },

  ignoreMomentLocale: true, // 忽略 moment 的 locale 文件

  chainWebpack (memo, { env, webpack, createCSSRule }) {
    memo.output.set('path', require('path').resolve(__dirname, 'dist/model-smallsaas'))
    memo.output.set('filename', 'bundle.js')
  },

  // outputPath: '/dist/dev-logs',
  publicPath: process.env.NODE_ENV === 'production' ? './model-smallsaas/' : '/',  //设置 dist/index.html 访问 js和css路径
}
