import { deviceAttribute } from '@/services/mdm/device';
import { ProCard } from '@ant-design/pro-components';
import { Descriptions, Typography, Badge } from 'antd';
import dayjs from 'dayjs';
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

interface IAppProps {
  deviceId: string;
}

const BasicInformation: React.FC<IAppProps> = ({ deviceId }) => {
  const { Paragraph } = Typography;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [deviceData, setDeviceData] = useState<any>();

  //  设备基本信息
  const onAppsDetails = async () => {
    const res = await deviceAttribute({ deviceId: deviceId });
    if (res.code === 200) {
      setDeviceData(res.data);
    }
  };

  useEffect(() => {
    // 首次加载数据
    onAppsDetails();
    
    // 设置5秒刷新定时器
    timerRef.current = setInterval(() => {
      onAppsDetails();
    }, 5000);
    
    // 组件卸载时清除定时器
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [deviceId]);

  // 添加格式化函数
  const formatDuration = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}天${hours}时${minutes}分`;
  };

  return (
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
      <Descriptions column={4}>
        <Descriptions.Item label="设备名称">
          <Paragraph copyable> {deviceData?.deviceName}</Paragraph>
        </Descriptions.Item>
        <Descriptions.Item label="SN">
          <Paragraph copyable> {deviceData?.hwSn}</Paragraph>
        </Descriptions.Item>
        <Descriptions.Item label="制造商/型号">
          <Paragraph> {deviceData?.manufacturer} / {deviceData?.model}</Paragraph>
        </Descriptions.Item>
        <Descriptions.Item label="渠道">
          {deviceData?.channelName ? <Paragraph> {deviceData?.channelName}</Paragraph> : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="所属组织">{deviceData?.orgName}</Descriptions.Item>
        <Descriptions.Item label="设备状态">
          <Badge 
            status={deviceData?.online ? 'success' : 'error'} 
            text={deviceData?.online ? '在线' : '离线'} 
            style={{ fontWeight: deviceData?.online ? 500 : 400 }}
          />
        </Descriptions.Item>
        <Descriptions.Item label={`最后${deviceData?.online ? '上线' : '离线'}时间`}>
          {deviceData?.lastUpdateTime
            ? dayjs(Number(deviceData.lastUpdateTime)).format('YYYY-MM-DD HH:mm:ss')
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item label={`${deviceData?.online ? '已在线' : '已离线'}时长`}>
          {deviceData?.durationSecond ? formatDuration(Number(deviceData.durationSecond)) : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="机器ID">
          {deviceData?.attributes?.deviceInfo?.machineId || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="主板">
          {deviceData?.attributes?.deviceInfo?.mainBoard || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="主机">
          {deviceData?.attributes?.deviceInfo?.hostBuild || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="指纹">
          {deviceData?.attributes?.deviceInfo?.fingerprint || '-'}
        </Descriptions.Item>
      </Descriptions>
      {/* 固件列表 */}
    </ProCard>
  );
};

export default BasicInformation;

