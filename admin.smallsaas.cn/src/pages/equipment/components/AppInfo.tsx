import { deviceCommand } from '@/services/mdm/device';
import { deviceAppInstallApp } from '@/services/mdm/deviceApplication';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import dayjs from 'dayjs';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';

interface IAppProps {
  deviceId: string;
}

const ProTableV1: React.FC<IAppProps> = ({ deviceId }) => {
  const proTableV1Ref = useRef<ActionType>();

  const [forceRefresh, setForceRefresh] = useState<boolean>(false);
  const [appInfo, setAppInfo] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);


  // 设备指令执行通用方法
  const executeDeviceCommand = async (command: string, appPackage: string) => {
    setLoading(true)
    const params = {
      deviceId,
      command,
      timeout: (command === 'COMMAND_APP_OTA' || command === 'COMMAND_UPLOAD_APK') ? 300 : 10,
      payload: {
        appPackage
      }
    };

    try {
      const res = await deviceCommand(params);
      setLoading(false) 

      if (res.code === 200) {
        message.success('操作成功');
        proTableV1Ref.current?.reload();
        if (command === 'COMMAND_UPLOAD_APK') {
          window.open(res?.data?.url)
        }
      }
    } catch (error) {
      setLoading(false)

      message.error('操作失败');
    }
  };

  // 下载应用
  const handleDownload = async (record: any) => {
    await executeDeviceCommand('COMMAND_UPLOAD_APK', record.appPackage);
  };

  // 清除应用缓存
  const handleClearCache = async (record: any) => {
    await executeDeviceCommand('COMMAND_CLEAR_APP_CACHE', record.appPackage);
  };

  // 强制停止应用
  const handleForceStop = async (record: any) => {
    await executeDeviceCommand('COMMAND_FORCE_STOP_APP', record.appPackage);
  };

  // 检查应用更新
  const handleCheckUpdate = async (record: any) => {
    await executeDeviceCommand('COMMAND_APP_OTA', record.appPackage);
  };


  const columns: ProColumns<any>[] = [
    {
      title: '应用名称',
      dataIndex: 'appName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '应用包名',
      dataIndex: 'appPackage',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '版本名称',
      dataIndex: 'versionName',
      hideInSearch: true,
      ellipsis: true,
    },

    {
      title: '版本号',
      dataIndex: 'versionCode',
      hideInSearch: true,
      ellipsis: true,
    },
    // status
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      ellipsis: true,
      valueEnum: {
        0: {
          text: '未运行',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Success',
        },

      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 300,
      render: (_, record: any) => (
        <Space size={20}>
          <Button
            type="link"
            key="download"
            onClick={() => handleDownload(record)}
          >
            下载
          </Button>
          <Button
            type="link"
            key="clearCache"
            onClick={() => handleClearCache(record)}
          >
            清除缓存
          </Button>

          <Button
            type="link"
            key="checkUpdate"
            onClick={() => handleCheckUpdate(record)}
          >
            检查更新
          </Button>
          <Button
            type="link"
            key="forceStop"
            onClick={() => handleForceStop(record)}
            // 只有运行中的应用才能关闭
            hidden={!record?.status}
          >
            关闭应用
          </Button>
        </Space>
      ),
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
    if(params?.forceRefresh) {
      setLoading(true)
    }
    const data = await deviceAppInstallApp({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      // deviceName: params?.deviceName,
      // deviceSn: params?.deviceSn,
      deviceId: deviceId,
      forceRefresh: params?.forceRefresh,
    });
    setLoading(false)
    if (data?.code === 200) {
      setAppInfo(data?.data);
      if(params?.forceRefresh) {
        message.success("刷新成功");
      }
    } else {
      message.error(data?.message);
    }
    return {
      data: data?.data?.appList || [], // 数据列表
    };
  };

  return (
    <>
      <ProTable<any>
        loading={loading}
        actionRef={proTableV1Ref}
        columns={columns}
        request={request}
        rowKey="id"
        params={{
          forceRefresh: forceRefresh,
        }}
        pagination={false}
        search={false}
        headerTitle="应用信息"
        options={false}
        toolBarRender={() => [
          <Space size={20} key={'space'}>
            <span>
              刷新时间：
              {appInfo?.refreshTime
                ? dayjs(Number(appInfo?.refreshTime)).format('YYYY-MM-DD HH:mm:ss')
                : '-'}
            </span>

            <Button
              type="primary"
              onClick={() => {
                setForceRefresh(true);
                // 刷新
                if (proTableV1Ref) {
                  // 手动调用刷新
                  proTableV1Ref.current?.reload();
                }
              }}
            >
              刷新
            </Button>
          </Space>,
        ]}
      />
    </>
  );
};
export default ProTableV1;
