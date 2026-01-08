import { getReleasesList } from '@/api/appManage';
import Confirmation from '@/components/Confirmation';
import { useManage } from '@/hooks/useManage';
import { QrcodeOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popover, QRCode, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import PackageEditModel from './PackageEditModel';
import { EModelType } from './ProTable';

interface Props {
  appId?: string;
}
const ProTableV1: React.FC<Props> = ({ appId }) => {
  const proTableV1Ref = useRef<ActionType>();
  const { onReleasesDel } = useManage();

  // item
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>();
  // item
  const { createModalOpen, setCreateModalOpen } = useManage();

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-APPPACKAGELIST', () => {
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

  // 编辑回现
  const onEdit = (data: any) => {
    setModelType(EModelType.PACKAGEEDIT);
    setFormData(data);
    setCreateModalOpen(true);
  };

  const columns: ProColumns<any>[] = [
    {
      title: '应用包名',
      dataIndex: 'appPackage',
      ellipsis: true,
      width: 120,
      hideInSearch: true,
    },
    {
      title: '版本',
      dataIndex: 'versionName',
      ellipsis: true,
      width: 120,
      hideInSearch: true,
    },
    {
      title: '版本号',
      dataIndex: 'versionCode',
      ellipsis: true,
      width: 120,
      hideInSearch: true,
    },
    {
      title: '大小',
      dataIndex: 'size',
      ellipsis: true,
      width: 120,
      hideInSearch: true,
      render: (text, record) => <div>{(record.size / 1024 / 1024).toFixed(2)}MB</div>,
    },
    {
      title: '包描述',
      dataIndex: 'description',
      ellipsis: true,
      width: 120,
      hideInSearch: true,
    },

    {
      title: '强制更新',
      dataIndex: 'mandatory',
      ellipsis: true,
      width: 120,
      hideInSearch: true,
      valueEnum: {
        false: { text: '否', status: 'Default' },
        true: { text: '是', status: 'Success' },
      },
    },
    {
      title: '静默更新',
      dataIndex: 'mandatory',
      ellipsis: true,
      width: 120,
      hideInSearch: true,
      valueEnum: {
        false: { text: '否', status: 'Default' },
        true: { text: '是', status: 'Success' },
      },
    },

    {
      title: '更新时间',
      hideInSearch: true,
      dataIndex: 'updateTime',
      width: 200,
      sorter: (a, b) => {
        const aTime = new Date(a.createTime).getTime(); // 需要先转换成时间戳
        const bTime = new Date(b.createTime).getTime();
        return aTime - bTime;
      },
      ellipsis: true,
    },
    {
      title: '创建时间',
      hideInSearch: true,
      dataIndex: 'createTime',
      width: 200,
      sorter: (a, b) => {
        const aTime = new Date(a.createTime).getTime(); // 需要先转换成时间戳
        const bTime = new Date(b.createTime).getTime();
        return aTime - bTime;
      },
      ellipsis: true,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 180,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" key="qrcode" disabled={!record?.downloadUrl}>
            <Popover content={<QRCode value={record?.downloadUrl} bordered={false} />}>
              <QrcodeOutlined />
            </Popover>
          </Button>

          <Button type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Confirmation onConfirm={() => onReleasesDel(record.packageId)} key="del">
            <Button type="link">删除</Button>
          </Confirmation>
          <Button type="link" key="download" disabled={!record?.downloadUrl}>
            <a href={record?.downloadUrl}>下载</a>
          </Button>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    console.log(params, appId, 'appId');

    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize

    const { data } = await getReleasesList(
      {
        pageNum: params.current || 1, // 当前页码
        pageSize: params.pageSize || 10, // 每页条数
      },
      appId,
    );
    console.log(data, '12');

    return {
      data: data.records, // 数据列表
      total: data.total, // 数据总数
      // 如果有其他分页信息，也可以在这里返回
    };
  };

  return (
    <>
      <ProTable<any>
        options={false}
        actionRef={proTableV1Ref}
        columns={columns}
        request={request}
        rowKey="packageId"
        scroll={{ x: 1300 }}
        pagination={{
          pageSize: 5,
        }}
        search={false}
        headerTitle="版本列表"
      />
      <PackageEditModel
        type={modelType}
        formData={formData}
        setCreateModalOpen={setCreateModalOpen}
        createModalOpen={createModalOpen}
      />
    </>
  );
};
export default ProTableV1;
