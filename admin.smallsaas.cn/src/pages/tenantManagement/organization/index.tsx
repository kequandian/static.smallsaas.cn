import { PageContainer } from '@ant-design/pro-components';
import * as React from 'react';
import { useState } from 'react';
import ProTable from './components/ProTable';
import OrganizationStructure from '../../organizeUsers/organization';

const Organization: React.FC = () => {
  const [tabActive, setTabActive] = useState('management');
  
  const renderContent = () => {
    switch (tabActive) {
      case 'management':
        return <ProTable />;
      case 'structure':
        return <OrganizationStructure />;
      default:
        return <ProTable />;
    }
  };
  
  return (
    <PageContainer
      className="pageContainerP0"
      title={false}
      tabList={[
        {
          tab: '组织管理',
          key: 'management',
        },
        {
          tab: '组织架构',
          key: 'structure',
        },
      ]}
      onTabChange={(key) => {
        setTabActive(key);
      }}
    >
      {renderContent()}
    </PageContainer>
  );
};

export default Organization;
