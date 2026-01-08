import { OrgTreeV2 } from '@/components';
import { PageContainer } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import ProTable from './components/ProTable';

// 其他设备参数
const unknown = {
  id: '-1',
  name: '其他设备',
  parentName: '其他设备',
};
//
const Equipment: React.FC = () => {
  const [orgId, setOrgId] = useState<string>('');
  const onSelect = (orgId: any, item: any) => setOrgId(item.node.id);

  return (
    <PageContainer title={false}>
      <Row justify={'center'} className="Equipment" gutter={[16, 0]} wrap={false}>
        <Col >
          <OrgTreeV2 unknown={unknown} onSelect={onSelect} />
        </Col>
        <Col style={{ flex: '1 1 auto', minWidth: 0 }}>
          <ProTable orgId={orgId} />
        </Col>
      </Row>
    </PageContainer>

    // <PageContainer title={false}>
    //   <ProCard split="vertical">
    //     <ProCard colSpan="20%">
    //       <OrgTreeV2 unknown={unknown} onSelect={onSelect} />
    //     </ProCard>
    //     <ProCard ghost>
    //       <ProTable orgId={orgId} />
    //     </ProCard>
    //   </ProCard>
    // </PageContainer>
  );
};

export default Equipment;
