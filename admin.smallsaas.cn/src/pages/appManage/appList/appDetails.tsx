import { getAppsDetails } from '@/api/appManage';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Descriptions, Typography, Badge } from 'antd';
import React, { useEffect, useState } from 'react';
import PackageTable from './components/PackageTable';

const AppDetails: React.FC = () => {
  const { Paragraph } = Typography;
  const params = useParams();
  const [appsDetailsData, setAppsDetailsData] = useState<any>();

  //  应用详情
  const onAppsDetails = async () => {
    const res = await getAppsDetails(params.id);
    if (res.code === 200) {
      console.log(res.data);
      setAppsDetailsData(res.data);
    }
  };

  useEffect(() => {
    onAppsDetails();
  }, []);

  return (
    <PageContainer title={appsDetailsData?.title}>
      <ProCard
        title="基本信息"
        className="mb-5"
        style={{
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          marginBottom: 24,
          background: '#fff',
        }}
        bodyStyle={{ padding: 32 }}
      >
        <Descriptions column={3}>
          <Descriptions.Item label="应用包名">
            <Paragraph copyable>{appsDetailsData?.appPackage}</Paragraph>
          </Descriptions.Item>
          <Descriptions.Item label="应用名称">
            <Paragraph>{appsDetailsData?.name}</Paragraph>
          </Descriptions.Item>
          <Descriptions.Item label="应用描述">
            <Paragraph>{appsDetailsData?.description}</Paragraph>
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {appsDetailsData?.createTime || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {appsDetailsData?.updateTime || '-'}
          </Descriptions.Item>
        </Descriptions>
      </ProCard>

      {appsDetailsData?.appId && <PackageTable appId={appsDetailsData?.appId} />}
    </PageContainer>
  );
};

export default AppDetails;
