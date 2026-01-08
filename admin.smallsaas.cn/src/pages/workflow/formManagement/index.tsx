import { PageContainer } from '@ant-design/pro-components';
import * as React from 'react';
import FormList from './components/FormList';

const FormManagement: React.FC = () => {
  return (
    <PageContainer title={false}>
      <FormList />
    </PageContainer>
  );
};

export default FormManagement;
