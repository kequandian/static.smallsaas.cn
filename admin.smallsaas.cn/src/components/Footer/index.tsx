import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  // ©2012-2021 JEECG开源社区 版权所有 — All Rights Reserved （京ICP备12013567号-3）

  return (
    <DefaultFooter
      copyright="2025 新质数创"
      style={{ background: 'none' }}
      links={[
        {
          key: '底部信息',
          title: '京ICP备2024084650号-5',
          href: 'https://beian.miit.gov.cn/#/Integrated/index',
        },
      ]}
    />
  );
};

export default Footer;
