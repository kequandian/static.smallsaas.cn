import { PageContainer } from '@ant-design/pro-components';
import { Tabs } from 'antd';
import * as React from 'react';
import { useState } from 'react';
import PolicyControl from './components/PolicyControl';
import PolicyConfig from './components/PolicyConfig';

const PolicyManage: React.FC = () => {
  const [policyControlModalOpen, setPolicyControlModalOpen] = useState<boolean>(false);
  const [policyConfigModalOpen, setPolicyConfigModalOpen] = useState<boolean>(false);

  const items = [
    {
      key: 'policy',
      label: '策略管控',
      children: (
        <PolicyControl 
          modalOpen={policyControlModalOpen} 
          setModalOpen={setPolicyControlModalOpen} 
        />
      ),
    },
    {
      key: 'policyContent',
      label: '禁用配置',
      children: (
        <PolicyConfig 
          modalOpen={policyConfigModalOpen} 
          setModalOpen={setPolicyConfigModalOpen} 
        />
      ),
    },
  ];

  return (
    <PageContainer title={false}>
      <Tabs
        defaultActiveKey="policy"
        items={items}
        type="card"
        size="large"
        style={{ marginTop: 8 }} // Adjust margin to fix overlap with title
        className="policy-manage-tabs"
      />
    </PageContainer>
  );
};

export default PolicyManage; 