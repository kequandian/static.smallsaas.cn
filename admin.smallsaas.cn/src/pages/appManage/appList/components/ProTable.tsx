import { getAppsList } from '@/api/appManage';
import Confirmation from '@/components/Confirmation';
import { useManage } from '@/hooks/useManage';
import { QrcodeOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { Button, Popover, QRCode, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';
import OtheEditModel from './OtheEditModel';

export type TableListItem = {
  key: number;
  name: string;
  status: string;
  createTime: number;
  meetingNumber: string;
  meetingServerIp: string;
};

export enum EModelType {
  ADD = '上传',
  EDIT = '编辑',
  CHECK = '查看',
  PACKAGEEDIT = '版本编辑',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const {
    createModalOpen,
    setCreateModalOpen,
    setOtherCreateModalOpen,
    othercreateModalOpen,
    onAppsDel,
  } = useManage();

  // item
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  // 编辑回现
  const onEdit = (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(data);
    setCreateModalOpen(true);
  };

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-APPMANAGELIST', () => {
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '别名',
      dataIndex: 'alias',
      ellipsis: true,
      width: 120,
      fixed: 'left',
      render: (_, record: any) => {
        return <Link to={`./appDetails/${record.appId}`}>{record.alias}</Link>;
      },
    },
    {
      title: '应用名称',
      dataIndex: 'name',
      ellipsis: true,
      width: 120,
      fixed: 'left',
      // render: (_, record: any) => {
      //   return <Link to={`./appDetails/${record.appId}`}>{record.name}</Link>;
      // },
    },
    {
      title: '版本号',
      dataIndex: 'versionCode',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
      render: (_, record: any) => {
        return record?.latestRelease?.versionCode || '-';
      },
    },
    {
      title: '应用包名',
      dataIndex: 'appPackage',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '应用描述',
      dataIndex: 'description',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },

    {
      title: '更新时间',
      key: 'since',
      hideInSearch: true,
      dataIndex: 'latestRelease',
      width: 200,
      sorter: (a, b) => {
        const aTime = new Date(a.createTime).getTime(); // 需要先转换成时间戳
        const bTime = new Date(b.createTime).getTime();
        return aTime - bTime;
      },
      ellipsis: true,
      render: (_, record: any) => {
        return <div>{record.latestRelease?.updateTime}</div>;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 140,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" key="qrcode" disabled={!record?.latestRelease?.downloadUrl}>
            <Popover
              content={<QRCode value={record?.latestRelease?.downloadUrl} bordered={false} />}
            >
              <QrcodeOutlined />
            </Popover>
          </Button>

          <Button type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Confirmation onConfirm={() => onAppsDel(record.appId)} key="del">
            <Button type="link">删除</Button>
          </Confirmation>
          <Button type="link" key="download" disabled={!record?.latestRelease?.downloadUrl}>
            <a href={record?.latestRelease?.downloadUrl}>下载</a>
          </Button>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize

    const { data } = await getAppsList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      name: params.name,
      alias: params.alias,

      // 你可以添加其他需要的查询参数
    });
    return {
      data: data.records, // 数据列表
      total: data.total, // 数据总数
      // 如果有其他分页信息，也可以在这里返回
    };
  };

  return (
    <>
      <ProTable<TableListItem>
        actionRef={proTableV1Ref}
        columns={columns}
        request={request}
        rowKey="appId"
        scroll={{ x: 1300 }}
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          labelWidth: 'auto',
        }}
        headerTitle="应用列表"
        toolBarRender={() => [
          <Button
            onClick={() => {
              setModelType(EModelType.ADD);
              setFormData(null);
              setCreateModalOpen(true);
            }}
            type="primary"
            key="primary"
          >
            上传安卓应用
          </Button>,
          <Button
            onClick={() => {
              setModelType(EModelType.ADD);
              setFormData(null);
              setOtherCreateModalOpen(true);
            }}
            type="default"
            key="default"
          >
            上传其他应用
          </Button>,
        ]}
      />

      {/* 查看/编辑/新增 */}
      <EditModel
        type={modelType}
        formData={formData}
        setCreateModalOpen={setCreateModalOpen}
        createModalOpen={createModalOpen}
      />
      {/* end */}
      {/* 查看/编辑/新增 */}
      <OtheEditModel
        type={modelType}
        formData={formData}
        setCreateModalOpen={setOtherCreateModalOpen}
        createModalOpen={othercreateModalOpen}
      />
      {/* end */}
    </>
  );
};
export default ProTableV1;
