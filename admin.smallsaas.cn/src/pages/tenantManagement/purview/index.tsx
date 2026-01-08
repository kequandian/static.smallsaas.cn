import { PageContainer } from '@ant-design/pro-components';
import * as React from 'react';
import { useState } from 'react';
import ProTable from './components/ProTable';

const MeetingNumRouting: React.FC = () => {
  const [tabActive, setTabActive] = useState('perm');
  // return <ProTable />;
  return (
    <PageContainer
      className="pageContainerP0"
      title={false}
      tabList={[
        {
          tab: '权限管理',
          key: 'perm',
        },
        {
          tab: '权限分组管理',
          key: 'group',
        },
      ]}
      onTabChange={(key) => {
        setTabActive(key);
      }}
    >
      <ProTable type={tabActive} />
    </PageContainer>
  );
};

export default MeetingNumRouting;
