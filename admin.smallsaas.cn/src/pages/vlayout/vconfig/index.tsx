import { PageContainer } from '@ant-design/pro-components';
import * as React from 'react';
import LayoutConfigTable from './components/LayoutConfigTable';

const LayoutConfig: React.FC = () => {
  return (
    <PageContainer title="布局配置管理">
      <LayoutConfigTable />
    </PageContainer>
  );
};

export default LayoutConfig; 