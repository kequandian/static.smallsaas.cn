import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import ProTable from './components/ProTable';
const Equipment: React.FC = () => {
  return (
    <PageContainer title={false}>
      <ProTable />
    </PageContainer>
  );
};

export default Equipment;
