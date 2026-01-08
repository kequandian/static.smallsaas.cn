import { OrgTreeV2 } from '@/components';
import { PageContainer } from '@ant-design/pro-components';
import { Row, Col } from 'antd';
import React, { useState } from 'react';
import ProTable from './components/ProTable';

const EndUser: React.FC = () => {
  const [orgId, setOrgId] = useState<string>('');
  const onSelect = (orgId: any, item: any) => setOrgId(item.node.id);

  // 固定宽度值
  // const treeWidth = 300;

  return (
    <PageContainer title={false}>
      <Row gutter={[16, 0]} wrap={false}>
        <Col >
          <OrgTreeV2
            onSelect={onSelect}
            title="组织用户"
          />
        </Col>
        <Col style={{ flex: '1 1 auto', minWidth: 0 }}>
          <ProTable orgId={orgId} />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default EndUser;
