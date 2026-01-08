import { PageContainer } from '@ant-design/pro-components';
import { Tabs } from 'antd';
import { useParams } from '@umijs/max';
import React, { useState } from 'react';
import AppAuthorization from './components/AppAuthorization';
import AppInfo from './components/AppInfo';
import ApplicationStrategy from './components/ApplicationStrategy';
import BasicInformation from './components/BasicInformation';
import DeviceControl from './components/DeviceControl';
import NetworkInfo from './components/NetworkInfo';
import PerformanceIndex from './components/PerformanceIndex';
import DeviceLog from './components/DeviceLog';
const AppDetails: React.FC = () => {
  const [tabActive, setTabActive] = useState('2');
  const params = useParams();

  return (
    <PageContainer title="设备详情">
      {/* 基本信息卡片 */}
      {params?.deviceId && <BasicInformation deviceId={params.deviceId} />}
      {/* Tabs栏 */}
      <Tabs
        activeKey={tabActive}
        onChange={setTabActive}
        style={{ marginTop: 24 }}
        items={[
          { label: '应用授权', key: '2' },
          { label: '应用信息', key: '3' },
          { label: '网络信息', key: '4' },
          { label: '管控策略', key: '5' },
          { label: '设备控制', key: '7' },
          { label: '性能指标', key: '8' },
          { label: '设备日志', key: '9' },
        ]}
      />
      {/* tab内容 */}
      {tabActive === '2' && params?.deviceId && <AppAuthorization deviceId={params.deviceId} />}
      {tabActive === '3' && params?.deviceId && <AppInfo deviceId={params.deviceId} />}
      {tabActive === '4' && params?.deviceId && <NetworkInfo deviceId={params.deviceId} />}
      {tabActive === '5' && params?.deviceId && <ApplicationStrategy deviceId={params.deviceId} />}
      {tabActive === '7' && params?.deviceId && <DeviceControl deviceId={params.deviceId} />}
      {tabActive === '8' && params?.deviceId && <PerformanceIndex deviceId={params.deviceId} />}
      {tabActive === '9' && params?.deviceId && <DeviceLog deviceId={params.deviceId} />}
    </PageContainer>
  );
};

export default AppDetails;