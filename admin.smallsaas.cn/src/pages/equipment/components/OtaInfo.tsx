import { applicationHistoryPage } from '@/services/mdm/applicationHistory';
import { firmwareOtaHistoryPage } from '@/services/mdm/firmwareOtaHistory';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';

interface IAppProps {
  deviceId: string;
}

const ProTableV1: React.FC<IAppProps> = ({ deviceId }) => {
  const proTableV1Ref = useRef<ActionType>();

  const filterColumns = (type: 'firmware' | 'app') => {
    return [
      {
        title: type === 'firmware' ? '模块标识' : '应用包名',
        dataIndex: type === 'firmware' ? 'moduleIdentify' : 'appPackage',
        ellipsis: true,
      },

      {
        title: '升级前版本',
        dataIndex: 'beforeVersion',
        hideInSearch: true,
        ellipsis: true,
      },
      {
        title: '升级后版本',
        dataIndex: 'afterVersion',
        hideInSearch: true,
        ellipsis: true,
      },
      {
        title: '升级时间',
        dataIndex: 'updateTime',
        hideInSearch: true,
        ellipsis: true,
      },

      {
        title: '是否升级成功',
        dataIndex: 'upgradeSuccess',
        hideInSearch: true,
        ellipsis: true,
        valueEnum: {
          true: {
            text: '成功',
            status: 'success',
          },
          false: {
            text: '失败',
            status: 'error',
          },
        },
      },

      {
        title: '失败原因',
        dataIndex: 'failReason',
        hideInSearch: true,
        ellipsis: true,
      },
    ];
  };

  const request = async (params: any) => {
    const { data } = await firmwareOtaHistoryPage({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      // deviceName: params?.deviceName,
      // deviceSn: params?.deviceSn,
      deviceId: deviceId,
    });
    return {
      data: data?.records || [], // 数据列表
      total: data?.total, // 数据总数
    };
  };
  const requestApp = async (params: any) => {
    const { data } = await applicationHistoryPage({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      // deviceName: params?.deviceName,
      // deviceSn: params?.deviceSn,
      deviceId: deviceId,
    });
    return {
      data: data?.records || [], // 数据列表
      total: data?.total, // 数据总数
    };
  };

  return (
    <>
      <ProTable<any>
        actionRef={proTableV1Ref}
        columns={filterColumns('firmware') as any}
        request={request}
        scroll={{ x: 1300 }}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        search={false}
        headerTitle="固件ota历史"
      />
      <div style={{ height: 20 }} />
      <ProTable<any>
        actionRef={proTableV1Ref}
        columns={filterColumns('app') as any}
        request={requestApp}
        scroll={{ x: 1300 }}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        search={false}
        headerTitle="应用ota历史"
      />
    </>
  );
};
export default ProTableV1;
