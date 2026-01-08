import { deviceExecStrategy, deviceStrategy } from '@/services/mdm/device';
import { ProCard } from '@ant-design/pro-components';
import { Row, Col, Tag, Button, message, Space, Typography, Tooltip, Table, Spin } from 'antd';
import { SyncOutlined, PlayCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import * as React from 'react';
import { useEffect, useState } from 'react';

const { Text } = Typography;

interface IAppProps {
  deviceId: string;
}

// App whitelist interface
interface AppWhitelistItem {
  appName: string;
  packageName: string;
}

// Device whitelist interface
interface DeviceWhitelistItem {
  deviceName: string;
  deviceId: string;
  manufacturerName?: string;
  serialNumber?: string;
  productName?: string;
}

// Params interface
interface ParamsInfo {
  disabledModules?: string[];
  setPowerTime?: {
    powerOffTime?: string;
    powerOnTime?: string;
  };
  appWhitelist?: AppWhitelistItem[];
  deviceWhitelist?: DeviceWhitelistItem[];
}

const ApplicationStrategy: React.FC<IAppProps> = ({ deviceId }) => {
  const [strategydata, setStrategydata] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  
  // 数据聚合
  const datAggregation = (data: any) => {
    let paramsObj: ParamsInfo = {};
    
    // Parse params JSON string if it exists
    if (data?.strategy?.params && typeof data.strategy.params === 'string') {
      try {
        paramsObj = JSON.parse(data.strategy.params) as ParamsInfo;
      } catch (error) {
        console.error('Failed to parse strategy params:', error);
      }
    }
    
    setStrategydata({
      execTime: data?.execTime,
      strategyItems: data?.strategyItems,
      strategy: data?.strategy,
      disabledModules: paramsObj?.disabledModules || [],
      powerTimes: paramsObj?.setPowerTime || {},
      appWhitelist: paramsObj?.appWhitelist || [],
      deviceWhitelist: paramsObj?.deviceWhitelist || [],
    });
  };

  //  获取策略信息
  const onDeviceStrategy = async (forceRefresh?: boolean) => {
    if(forceRefresh) {
      setLoading(true)
    }
    const res = await deviceStrategy({
      deviceId,
      forceRefresh,
    });
    setLoading(false)
    if (res.code === 200) {
      datAggregation(res?.data);
      if(forceRefresh) {
        message.success("刷新成功");
      }
    }
  };

  // 执行策略
  const onDeviceExecStrategy = async () => {
    setLoading(true)
    const res = await deviceExecStrategy({
      deviceId,
      strategyId: strategydata?.strategy?.id,
    });
    setLoading(false)
    if (res.code === 200) {
      onDeviceStrategy();
      message.success("执行成功");
    }
  };
  
  useEffect(() => {
    onDeviceStrategy(false);
  }, []);

  const formatTime = (timestamp: number) => {
    return timestamp ? dayjs(Number(timestamp)).format('YYYY-MM-DD HH:mm:ss') : '-';
  };

  // App whitelist columns
  const appColumns = [
    {
      title: '应用名称',
      dataIndex: 'appName',
      key: 'appName',
      ellipsis: true,
    },
    {
      title: '应用包名',
      dataIndex: 'packageName',
      key: 'packageName',
      ellipsis: true,
    },
  ];

  // Device whitelist columns
  const deviceColumns = [
    {
      title: '外设名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
      ellipsis: true,
    },
    {
      title: '外设ID',
      dataIndex: 'deviceId',
      key: 'deviceId',
      ellipsis: true,
    },
    {
      title: '厂商',
      dataIndex: 'manufacturerName',
      key: 'manufacturerName',
      ellipsis: true,
    },
    {
      title: '序列号',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      ellipsis: true,
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      ellipsis: true,
    },
  ];

  return (
    <Spin spinning={loading}>
      <div className="strategy-container">
        <ProCard
          title={
            <Space size={12}>
              <Text strong style={{ fontSize: 16 }}>策略管控</Text>
              {strategydata?.strategy?.name && (
                <Tag color="blue" style={{ fontSize: 14 }}>
                  {strategydata.strategy.name}
                </Tag>
              )}
            </Space>
          }
          className="mb-5"
          headerBordered
          extra={
            <Space size={16}>
              <Text type="secondary">
                最后同步时间：{formatTime(strategydata?.execTime)}
              </Text>
              <Button 
                type="primary" 
                onClick={onDeviceExecStrategy}
              >
                同步策略
              </Button>
            </Space>
          }
        >
          {/* 策略项 */}
          {strategydata?.strategyItems?.length > 0 ? (
            <ProCard title='禁用模块' bordered headerBordered style={{ marginBottom: 10 }}>
              <Row gutter={[16, 16]}>
                {strategydata.strategyItems.map((item: any, idx: number) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={`strategy-${idx}`}>
                  <ProCard 
                    bordered
                    hoverable
                    style={{ borderRadius: 8 }}
                    bodyStyle={{ 
                      minHeight: 100,
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between',
                      padding: 16
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      {item.category && (
                        <Tag 
                          color="#f0f0f0" 
                          style={{ 
                            position: 'absolute', 
                            top: 0, 
                            right: 0, 
                            color: '#666', 
                            fontWeight: 500,
                          }}
                        >
                          {item.category}
                        </Tag>
                      )}
                      
                      <div style={{ paddingRight: item.category ? 80 : 0 }}>
                        <Tooltip title={item.name || item.identify}>
                          <div style={{ 
                            fontWeight: 600, 
                            fontSize: 16, 
                            marginBottom: 12,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {item.name || item.identify}
                          </div>
                        </Tooltip>
                        <div>
                          <Tag color={item.status === '已同步' || item.status === '同步' ? 'success' : 'warning'}>
                            {item.status || '未同步'}
                          </Tag>
                        </div>
                      </div>
                    </div>
                  </ProCard>
                </Col>
              ))}
              </Row>
            </ProCard>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
              暂无策略数据
            </div>
          )}
        </ProCard>
        
        {/* 开关机时间 */}
        <ProCard title="开关机时间" bordered headerBordered style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ flex: 1 }}>
              <Text type="secondary">自动开机时间：</Text>
              <Text strong>{strategydata?.powerTimes?.powerOnTime || '-'}</Text>
            </div>
            <div style={{ flex: 1 }}>
              <Text type="secondary">自动关机时间：</Text>
              <Text strong>{strategydata?.powerTimes?.powerOffTime || '-'}</Text>
            </div>
          </div>
        </ProCard>
        
        {/* 应用白名单 */}
        <ProCard title="应用白名单" bordered headerBordered style={{ marginBottom: 24 }}>
          <Table
            columns={appColumns}
            dataSource={strategydata?.appWhitelist || []}
            rowKey={(record, index) => `app-${index}`}
            pagination={false}
            size="middle"
            style={{ width: '100%' }}
            locale={{ emptyText: '暂无应用白名单数据' }}
          />
        </ProCard>
        
        {/* 外设白名单 */}
        <ProCard title="外设白名单" bordered headerBordered style={{ marginBottom: 24 }}>
          <Table
            columns={deviceColumns}
            dataSource={strategydata?.deviceWhitelist || []}
            rowKey="deviceId"
            pagination={false}
            locale={{ emptyText: '暂无外设数据' }}
          />
        </ProCard>
      </div>
    </Spin>
  );
};

export default ApplicationStrategy;
