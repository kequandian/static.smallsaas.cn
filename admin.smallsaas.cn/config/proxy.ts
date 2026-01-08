/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  // 如果需要自定义本地开发服务器  请取消注释按需调整
  dev: {
    // '/api/adm/mdm': {
    //   target: 'http://localhost:8080',
    //   changeOrigin: true,
    // },
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/v2/': {
      target: 'http://meeting-test.xinzhisc.com',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
    },
    '/api/': {
      target: 'http://meeting-test.xinzhisc.com',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
    },
    '/adminV1/': {
      target: 'http://meeting-test.xinzhisc.com',
      changeOrigin: true,
      pathRewrite: { '^/adminV1': '' },
    },

    '/mc/': {
      target: 'http://202.63.172.185:28286',
      changeOrigin: true,
    },
    '/login/': {
      target: 'http://202.63.172.185:60000',
      changeOrigin: true,
    },

    '/launcherV1/': {
      target: 'http://spbs.xinzhisc.com/',
      changeOrigin: true,
      pathRewrite: { '^/launcherV1': '' },
    },

    '/logV1/': {
      target: 'http://202.63.172.178:18080',
      changeOrigin: true,
      pathRewrite: { '^/logV1': '' },
    },
    '/admpb': {
      target: 'http://spbs-test.xinzhisc.com/',
      changeOrigin: true,
      pathRewrite: { '^/admpb': '' },
    },
    '/deepseekApi': {
      target: 'http://llm.shareagi.com:62111',
      changeOrigin: true,
      pathRewrite: { '^/deepseekApi': '' },
    },
    '/rag/': {
      target: 'http://192.168.3.23:8000',
      changeOrigin: true,
      pathRewrite: { '^/rag': '' },
    },
  },

  prod: {
    '/v2/': {
      target: 'http://meeting-test.xinzhisc.com',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
    },
    '/adminV1/': {
      target: 'http://meeting-test.xinzhisc.com',
      changeOrigin: true,
      pathRewrite: { '^/adminV1': '' },
    },
    '/admpb': {
      target: 'http://spbs-test.xinzhisc.com/',
      changeOrigin: true,
      pathRewrite: { '^/admpb': '' },
    },
  },
};
