import { deviceAttribute, refreshAttribute } from '@/services/mdm/device';
import { ProCard } from '@ant-design/pro-components';
import { Button, Descriptions, message, Space, Row, Col, Tag, Spin } from 'antd';
import dayjs from 'dayjs';
import * as React from 'react';
import { useEffect, useState } from 'react';

interface IAppProps {
  deviceId: string;
}

// 网络信息卡片组件
interface NetworkCardProps {
  title: string;
  icon?: React.ReactNode;
  status?: string;
  connected?: boolean;
  children: React.ReactNode;
}

const NetworkCard: React.FC<NetworkCardProps> = ({ title, icon, status, connected, children }) => {
  return (
    <ProCard
      bordered
      style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
      bodyStyle={{ minHeight: 180 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
          <span style={{ fontWeight: 600, fontSize: 16 }}>{title}</span>
        </div>
        {connected && status && (
          <Tag color="#52c41a">{status}</Tag>
        )}
      </div>
      {children}
    </ProCard>
  );
};

// 信息项组件
interface InfoItemProps {
  label: string;
  value: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div style={{ display: 'flex', marginBottom: 12 }}>
      <div style={{ color: '#666', width: '120px' }}>{label}:</div>
      <div style={{ fontWeight: 500, flex: 1 }}>{value || '-'}</div>
    </div>
  );
};

const App: React.FC<IAppProps> = ({ deviceId }) => {
  const [deviceData, setDeviceData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  //  网络信息
  const onAppsDetails = async () => {
    const res = await deviceAttribute({
      deviceId,
    });
    if (res.code === 200) {
      setDeviceData(res?.data?.attributes?.network);
    }
  };
  // 刷新
  const onRefreshTime = async () => {
    setLoading(true);
    try {
      const params = {
        deviceId,
        forceRefresh: true,
        payload: {
          parts: ['network'],
        },
      };
      const res = await refreshAttribute(params);
      if (res.code === 200) {
        setDeviceData(res?.data?.attributes?.network);
        message.success("刷新成功");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // onReleasesList();
    onAppsDetails();
  }, []);
  return (
    <Spin spinning={loading}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>网络信息</h2>
          </div>
          <Space size={20}>
            <span>
              刷新时间：
              {deviceData?.refreshTime
                ? dayjs(Number(deviceData?.refreshTime)).format('YYYY-MM-DD HH:mm:ss')
                : '-'}
            </span>
            <Button onClick={onRefreshTime} type="primary">刷新</Button>
          </Space>
        </div>

        <Row gutter={[24, 24]}>
          <Col span={24}>
            <NetworkCard 
              title="WiFi信息" 
              icon={<span className="anticon anticon-wifi" style={{ fontSize: 18 }} />}
              status="已连接"
              connected={deviceData?.connected}
            >
              <Row>
                <Col span={24}>
                  <InfoItem label="SSID" value={deviceData?.ssid} />
                  <InfoItem label="MAC地址" value={deviceData?.mac} />
                  <InfoItem label="IP地址" value={deviceData?.ip} />
                  {deviceData?.gateway && (
                    <InfoItem label="网关" value={deviceData?.gateway} />
                  )}
                  {deviceData?.dns && (
                    <InfoItem label="DNS" value={deviceData?.dns} />
                  )}
                  {deviceData?.signalStrength !== undefined && (
                    <InfoItem label="信号强度" value={`${deviceData?.signalStrength}%`} />
                  )}
                </Col>
              </Row>
            </NetworkCard>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default App;
