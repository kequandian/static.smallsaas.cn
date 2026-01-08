import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import MeetingTabs from './components/ProTable';

const MeetingList: React.FC = () => {
  return (
    <PageContainer title={false}>
      <MeetingTabs />
    </PageContainer>
  );
};

export default MeetingList;
