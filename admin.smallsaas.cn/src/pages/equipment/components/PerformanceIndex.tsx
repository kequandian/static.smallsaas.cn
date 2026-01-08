import { deviceCommand } from '@/services/mdm/device';
import { devicePerformance } from '@/services/mdm/deviceApplication';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Input, InputNumber, message, Space, Row, Col, Card, Statistic, Progress } from 'antd';
import dayjs from 'dayjs';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';

interface IAppProps {
  deviceId: string;
}

const ProTableV1: React.FC<IAppProps> = ({ deviceId }) => {
  const proTableV1Ref = useRef<ActionType>();
  const [intervalDate, setIntervalDate] = useState<any>(); // 明确指定为 number 类型
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // 新增定时器状态
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false); // 添加监控状态
  const [currentPerformance, setCurrentPerformance] = useState<any>(null); // 当前性能指标

  const columns: ProColumns<any>[] = [
    {
      title: '上报时间',
      dataIndex: 'timestamp',
      hideInSearch: true,
      ellipsis: true,
      render: (_, record) => {
        return dayjs(Number(record?.timestamp)).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: 'cpu使用率',
      dataIndex: 'cpu',
      hideInSearch: true,
      ellipsis: true,
      render: (_, record) => {
        return `${record?.cpu.cpuUsagePercent}%`;
      },
    },
    {
      title: 'cpu温度',
      dataIndex: 'cpu',
      hideInSearch: true,
      ellipsis: true,
      render: (_, record) => {
        return `${record?.cpu.cpuAvgTemp}°C`;
      },
    },
    {
      title: '内存占用率',
      dataIndex: 'memory',
      hideInSearch: true,
      ellipsis: true,
      render: (_, record) => {
        const memoryUsed = Number(record?.memory.memoryUsedBytes);
        const memoryTotal = Number(record?.memory.memoryTotalBytes);
        const memoryUsagePercent = ((memoryUsed / memoryTotal) * 100).toFixed(2); // 保留两位小数
        return `${memoryUsagePercent}%`;
      },
    },
    {
      title: '储存使用率',
      dataIndex: 'storage',
      hideInSearch: true,
      ellipsis: true,
      render: (_, record) => {
        const storageUsed = Number(record?.storage.storageUsedBytes);
        const storageTotal = Number(record?.storage.storageTotalBytes);
        const storageUsagePercent = ((storageUsed / storageTotal) * 100).toFixed(2); // 保留两位小数
        return `${storageUsagePercent}%`;
      },
    },
    {
      title: '网络',
      dataIndex: 'network',
      hideInSearch: true,
      ellipsis: true,
      render: (_, record) => {
        const networkRxBytesSec = Number(record?.network.networkRxBytesSec) / 1024;
        const networkTxBytesSec = Number(record?.network.networkTxBytesSec) / 1024;
        return (
          <div>
            <p>上行: {networkRxBytesSec.toFixed(2)} KB/s</p>
            <p>下行: {networkTxBytesSec.toFixed(2)} KB/s</p>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-DEVICEAPPLICATION', () => {
      // 刷新
      if (proTableV1Ref) {
        // 手动调用刷新
        proTableV1Ref.current?.reload();
      }
    });
    return () => {
      Pubsub.unsubscribe(updataListPub);
    };
  }, []);

  const request = async (params: any) => {
    const data = await devicePerformance({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      // deviceName: params?.deviceName,
      // deviceSn: params?.deviceSn,
      deviceId: deviceId,
    });

    // 获取第一条数据作为当前性能指标
    if (data?.data && data.data.length > 0) {
      setCurrentPerformance(data.data[0]);
    }

    return {
      data: data?.data || [], // 数据列表
    };
  };

  // 开始监控
  const onStartMonitor = async () => {
    if (isMonitoring) {
      message.warning('监控已经在运行中');
      return;
    }

    const params = {
      deviceId: deviceId,
      command: 'COMMAND_PERFORMANCE_METRICS',
      payload: {
        "interval": intervalDate,
        "metrics": ["cpu", "memory", "network", "storage"]
      }
    };

    try {
      const res = await deviceCommand(params);
      if (res.code === 200) {
        const newTimer = window.setInterval(async () => {
          await proTableV1Ref.current?.reload();
        }, intervalDate * 1000);

        setTimer(newTimer as unknown as NodeJS.Timeout);
        setIsMonitoring(true);
        message.success('监控已开始');
      }
    } catch (error) {
      message.error('开启监控发生错误');
    }
  };

  // 停止监控
  const onStopMonitor = async () => {
    if (!isMonitoring || !timer) {
      message.warning('没有正在运行的监控');
      return;
    }

    const params = {
      deviceId,
      command: 'COMMAND_STOP_PERFORMANCE_METRICS',
      payload: {},
    };

    try {
      const res = await deviceCommand(params);
      if (res.code === 200) {
        clearInterval(timer);
        setTimer(null);
        setIsMonitoring(false);
        message.success('监控已停止');
      }
    } catch (error) {
      message.error('停止监控发生错误');
    }
  };

  // 渲染性能指标饼图
  const renderPerformanceCharts = () => {
    if (!currentPerformance) return null;

    // CPU使用率
    const cpuUsagePercent = parseFloat(currentPerformance.cpu.cpuUsagePercent);
    
    // CPU温度
    const cpuTemp = parseFloat(currentPerformance.cpu.cpuAvgTemp);
    
    // 内存使用率
    const memoryUsed = Number(currentPerformance.memory.memoryUsedBytes);
    const memoryTotal = Number(currentPerformance.memory.memoryTotalBytes);
    const memoryUsagePercent = parseFloat(((memoryUsed / memoryTotal) * 100).toFixed(2));
    
    // 存储使用率
    const storageUsed = Number(currentPerformance.storage.storageUsedBytes);
    const storageTotal = Number(currentPerformance.storage.storageTotalBytes);
    const storageUsagePercent = parseFloat(((storageUsed / storageTotal) * 100).toFixed(2));

    // 获取CPU使用率的状态颜色
    const getCpuColor = (percent: number) => {
      if (percent < 50) return '#52c41a';
      if (percent < 80) return '#faad14';
      return '#f5222d';
    };

    // 获取CPU温度的状态颜色
    const getCpuTempColor = (temp: number) => {
      if (temp < 50) return '#52c41a';
      if (temp < 70) return '#faad14';
      return '#f5222d';
    };

    return (
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card title="CPU使用率" bordered={false}>
            <Progress
              type="dashboard"
              percent={cpuUsagePercent}
              strokeColor={getCpuColor(cpuUsagePercent)}
              format={(percent) => `${percent?.toFixed(1)}%`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="CPU温度" bordered={false}>
            <Statistic 
              value={cpuTemp} 
              suffix="°C" 
              valueStyle={{ color: getCpuTempColor(cpuTemp), fontSize: 36 }}
              style={{ textAlign: 'center', paddingTop: 30 }}
            />
            <Progress 
              percent={(cpuTemp / 100) * 100} 
              showInfo={false} 
              strokeColor={getCpuTempColor(cpuTemp)}
              style={{ marginTop: 20 }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="内存占用率" bordered={false}>
            <Progress
              type="dashboard"
              percent={memoryUsagePercent}
              strokeColor={memoryUsagePercent > 80 ? '#f5222d' : memoryUsagePercent > 60 ? '#faad14' : '#52c41a'}
              format={(percent) => `${percent?.toFixed(1)}%`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="储存使用率" bordered={false}>
            <Progress
              type="dashboard"
              percent={storageUsagePercent}
              strokeColor={storageUsagePercent > 80 ? '#f5222d' : storageUsagePercent > 60 ? '#faad14' : '#52c41a'}
              format={(percent) => `${percent?.toFixed(1)}%`}
            />
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <>
      {currentPerformance && renderPerformanceCharts()}
      <ProTable<any>
        actionRef={proTableV1Ref}
        columns={columns}
        request={request}
        rowKey="id"
        pagination={false}
        search={false}
        headerTitle="性能指标"
        options={false}
        toolBarRender={() => [
          <Space size={20} key={'space'}>
            {/* 上报间隔 */}
            <InputNumber value={intervalDate}
              onChange={setIntervalDate}
              placeholder='请输入上报间隔(单位/秒)' style={{ width: 200 }} />
            <Button
              disabled={isMonitoring || !intervalDate}
              onClick={onStartMonitor}
              type="primary"
            >
              开始监控
            </Button>
            <Button
              disabled={!isMonitoring}
              onClick={onStopMonitor}
              type="primary"
            >
              停止监控
            </Button>
          </Space>,
        ]}
      />
    </>
  );
};
export default ProTableV1;
