import React, { useState, useEffect } from 'react';
import { Card, DatePicker, Empty, message, Button, Space, Spin, Select } from 'antd';
import dayjs from 'dayjs';
import { deviceLog } from '@/services/mdm/device';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';

const { Option } = Select;

// 日志类型选项
const LOG_TYPES = [
  { value: 'log', label: '普通日志' },
  { value: 'crash', label: '宕机日志' }
];

interface DeviceLogProps {
  deviceId?: string;
}

const DeviceLog: React.FC<DeviceLogProps> = ({ deviceId }) => {
  const [logContent, setLogContent] = useState<string>('请选择日期查看日志');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [logType, setLogType] = useState<string>('log');

  const fetchLogs = async (date: string, type: string) => {
    if (!deviceId) {
      setLogContent('');
      return;
    }
    
    setLoading(true);
    try {
      const res = await deviceLog({
        deviceId,
        logType: type,
        date,
      });
      
      // Check if response has message (error case)
      if (res.code !== 200) {
        setLogContent('');
      } else {
        setLogContent(String(res.data));
      }
    } catch (error) {
      console.error('Failed to fetch device logs:', error);
      message.error('获取设备日志失败');
      setLogContent('');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setSelectedDate(date);
      if (deviceId) {
        fetchLogs(date.format('YYYY-MM-DD'), logType);
      }
    }
  };

  const handleLogTypeChange = (value: string) => {
    setLogType(value);
    if (deviceId) {
      fetchLogs(selectedDate.format('YYYY-MM-DD'), value);
    }
  };

  const handleDownload = () => {
    if (!logContent || logContent === '请选择日期查看日志') {
      message.warning('没有日志内容可下载');
      return;
    }
    
    // Create a blob with the log content
    const blob = new Blob([logContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    // Create a link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `device-${logType}-${deviceId}-${selectedDate.format('YYYY-MM-DD')}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  };

  const refreshLogs = () => {
    if (deviceId) {
      fetchLogs(selectedDate.format('YYYY-MM-DD'), logType);
    }
  };

  return (
    <Card 
      title="设备日志" 
      extra={
        <Space>
          <Select
            value={logType}
            onChange={handleLogTypeChange}
            style={{ width: 120 }}
          >
            {LOG_TYPES.map(type => (
              <Option key={type.value} value={type.value}>{type.label}</Option>
            ))}
          </Select>
          <DatePicker 
            value={selectedDate} 
            onChange={handleDateChange} 
            disabledDate={(current) => current > dayjs().endOf('day')}
          />
          <Button 
            type="primary" 
            onClick={refreshLogs}
            loading={loading}
          >
            查看日志
          </Button>
        </Space>
      }
    >
      {!deviceId ? (
        <Empty description="请选择设备查看日志" />
      ) : (
        <Spin spinning={loading}>
          <div style={{ position: 'relative' }}>
            <pre 
              style={{ 
                maxHeight: '500px', 
                overflowY: 'auto', 
                backgroundColor: '#f5f5f5',
                padding: '16px',
                borderRadius: '4px',
                fontSize: '12px',
                lineHeight: '1.5',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word'
              }}
            >
              {logContent || '该日期没有日志记录'}
            </pre>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              style={{ 
                position: 'absolute',
                top: '8px',
                right: '8px',
              }}
              onClick={handleDownload}
              disabled={!logContent || logContent === '请选择日期查看日志'}
            >
              下载日志
            </Button>
          </div>
        </Spin>
      )}
    </Card>
  );
};

export default DeviceLog;
