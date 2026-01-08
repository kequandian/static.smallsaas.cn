// config/config.dev.ts dev环境对应的配置文件
import { defineConfig } from 'umi';

/**
 * 导出的多环境变量命名约定：一律大写且采用下划线分割单词
 * 注意：在添加变量后，需要在src/typing.d.ts内添加该变量的声明，否则在使用变量时IDE会报错。
 */
export default defineConfig({
  define: {
    // API_URL: 'http://202.63.172.178:8000', // API地址
    API_URL: '', // API地址
    // LAUNCHER_API_URL: 'http://spbs.xinzhisc.com', // LAUNCHER API地址
    // LAUNCHER_API_URL: 'http://202.63.172.178:8000/admpb', // LAUNCHER API地址
    LAUNCHER_API_URL: '/admpb', // LAUNCHER API地址
    UPLOAD_IMG: '/api/adm/fs/uploadByForm?filePath=/images/partyBuilding/&module=operatingPlatform', //图片上传

    UPLOAD_FILES: '/api/adm/fs/uploadByForm?filePath=/file/&module=operatingPlatform', //文件上传
    UPLOAD_URL: '/api/adm/fs/uploadByForm', //文件上传
  },
});
