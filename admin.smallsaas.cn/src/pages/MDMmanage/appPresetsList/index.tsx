import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import ProTable from './components/ProTable';
const Equipment: React.FC = () => {
  return (
    <PageContainer title={false}>
      {/* <Row gutter={20}>
        <Col span={4}>
          <ProCard style={{ height: 200 }} />
        </Col>
        <Col span={20}>
          <ProTable />
        </Col>
      </Row> */}

      {/* <ProCard split="vertical">
        <ProCard title="左侧详情" colSpan="15%">
          左侧内容
        </ProCard>
        <ProCard >
          <ProTable />
        </ProCard>
      </ProCard> */}

      {/*  */}
      <ProTable />
    </PageContainer>
  );
};

export default Equipment;
