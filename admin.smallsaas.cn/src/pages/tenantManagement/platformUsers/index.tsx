import { OrgTreeV2 } from '@/components';
import { PageContainer } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import * as React from 'react';
import { useState } from 'react';
import ProTable from './components/ProTable';

const MeetingNumRouting: React.FC = () => {
  const [orgId, setOrgId] = useState<string>('');
  const onSelect = (orgId: any, item: any) => setOrgId(item.node.id);

  return (
    <PageContainer title={false}>
      <Row gutter={[16, 0]} wrap={false}>
        <Col>
          <OrgTreeV2 onSelect={onSelect} />
        </Col>
        <Col style={{ flex: '1 1 auto', minWidth: 0 }}>
          <ProTable orgId={orgId} />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default MeetingNumRouting;
