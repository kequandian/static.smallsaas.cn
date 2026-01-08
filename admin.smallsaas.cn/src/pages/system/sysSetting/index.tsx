import { PageContainer } from '@ant-design/pro-components';
import * as React from 'react';
import { useState } from 'react';
import SystemConfiguration from './systemConfiguration';
const MeetingNumRouting: React.FC = () => {
  const [tabActive, setTabActive] = useState('systemConfiguration');
  // return <ProTable />;
  return (
    <PageContainer
      className="pageContainerP0"
      title={false}
      tabList={[
        {
          tab: '系统配置',
          key: 'systemConfiguration',
        },
        {
          tab: '数据字典',
          key: 'dataDictionary',
        },
      ]}
      onTabChange={(key) => {
        setTabActive(key);
      }}
    >
      {tabActive === 'systemConfiguration' && <SystemConfiguration />}
    </PageContainer>
  );
};

export default MeetingNumRouting;
