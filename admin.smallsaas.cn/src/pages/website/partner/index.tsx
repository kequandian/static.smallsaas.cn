import { PageContainer } from '@ant-design/pro-components';
import * as React from 'react';
import ProTable from './components/ProTable';

const Partner: React.FC = () => {
    return (
        <PageContainer title={false}>
            <ProTable />
        </PageContainer>
    );
};

export default Partner;
