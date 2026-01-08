import { mdmAppInstallList } from '@/api/MDMApi';
import { getOperatorsList } from '@/api/operation';
import Confirmation from '@/components/Confirmation';
import { useMDMmanage } from '@/hooks/useMDMmanage';
import { QrcodeOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProFormSelect, ProTable } from '@ant-design/pro-components';
import { Button, Popover, QRCode, Space, Switch, Tag } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel, { ControlLevelType } from './EditModel';
import VersionProTable from './VersionProTable';

export type TableListItem = {
  key: number;
  name: string;
  status: string;
  createTime: number;
  meetingNumber: string;
  meetingServerIp: string;
};

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
  CHECK = '查看',
  PACKAGEEDIT = '版本编辑',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const {
    createModalOpen,
    setCreateModalOpen,
    onMdmAppInstallDelete,
    onMdmAppInstallUpdateStatus,
    onMdmAppInstallUpdateMustStatus,
    onMdmAddInstallAll,
  } = useMDMmanage();

  // item
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  const [versionModalOpen, setVersionModalOpen] = useState<boolean>(false);
  const [versionData, setVersionData] = useState<any>();

  // 编辑回现
  const onEdit = (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(data);
    setCreateModalOpen(true);
  };

  // 版本弹窗
  const onVersion = (data: any) => {
    setVersionData(data);
    setVersionModalOpen(true);

    Pubsub.publish('UPDATE-MDMMANAGEVERSIONLIST');
  };
  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-MDMMANAGELIST', () => {
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
      title: '应用名称',
      dataIndex: 'name',
      ellipsis: true,
      width: 120,
    },
    {
      title: '应用包名',
      dataIndex: 'packageName',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },

    {
      title: '应用描述',
      dataIndex: 'info',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '应用管控级别',
      tooltip: '应用控制（所有-所有设备/渠道-所有渠道/组织-所有组织）',
      dataIndex: 'controlLevel',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
      render: (_, i: any) => (
        <Tag color={ControlLevelType[i.controlLevel].color}>
          {ControlLevelType[i.controlLevel].label}
        </Tag>
      ),
    },
    {
      title: '渠道编号',
      dataIndex: 'controList',
      // hideInSearch: true,
      ellipsis: true,
      width: 120,
      renderFormItem: () => {
        return (
          <ProFormSelect
            mode="multiple"
            debounceTime={500}
            request={async (params) => {
              // 使用 request 获取选项数据
              const { data } = await getOperatorsList({
                pageNum: params.current || 1, // 当前页码
                pageSize: params.pageSize || 10, // 每页条数
              });
              return data.records.map((item: any) => ({
                label: item.name,
                value: item.channelNumber,
              }));
            }}
          />
        );
      },
      render: (_, i: any) => {
        return (
          i.controList && i.controList.map((item: any) => <Tag color="#108ee9" key={item.id}>{item.controlId}</Tag>)
        );
      },
    },

    {
      title: '是否预装App',
      tooltip: '是否预装App',
      dataIndex: 'isMust',
      hideInSearch: true,
      ellipsis: true,
      width: 76,
      align: 'center',
      fixed: 'right',

      render: (_, record: any) => {
        return (
          <Switch
            defaultChecked={record.isMust}
            onChange={(b: boolean) => onMdmAppInstallUpdateMustStatus(b, record.id)}
          />
        );
      },
    },
    {
      title: '状态',
      tooltip: '禁用/启用当前应用',
      dataIndex: 'status',
      // hideInSearch: true,
      valueEnum: {
        0: {
          text: '禁用',
          status: 'Error',
        },
        1: {
          text: '启用',
          status: 'Success',
        },
      },
      ellipsis: true,
      width: 50,
      align: 'center',
      fixed: 'right',
      render: (_, record: any) => {
        return (
          <Switch
            checked={!!record.status}
            onChange={(b: boolean) => onMdmAppInstallUpdateStatus(b, record.id)}
          />
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 160,

      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" key="qrcode" disabled={!record?.appUrl}>
            <Popover content={<QRCode value={record?.appUrl} bordered={false} />}>
              <QrcodeOutlined />
            </Popover>
          </Button>
          {/* <Button type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button> */}
          <Button type="link" key="version" onClick={() => onVersion(record)}>
            版本
          </Button>
          <Confirmation onConfirm={() => onMdmAppInstallDelete(record.id)} key="del">
            <Button type="link">删除</Button>
          </Confirmation>
          <Button type="link" key="download" disabled={!record?.latestRelease?.appUrl}>
            <a href={record?.latestRelease?.appUrl}>下载</a>
          </Button>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize

    const { data } = await mdmAppInstallList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      name: params.name,
      status: params.status,
      controList: params.controList,
      // 你可以添加其他需要的查询参数
    });
    return {
      data: data.list, // 数据列表
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
        rowKey="id"
        scroll={{ x: 1300 }}
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          labelWidth: 'auto',
        }}
        headerTitle="预设应用列表"
        tooltip="设备应用白名单列表"
        toolBarRender={() => [
          <Button onClick={() => onMdmAddInstallAll()} key="installAll">
            一键安装
          </Button>,
          <Button
            onClick={() => {
              setModelType(EModelType.ADD);
              setFormData(null);
              setCreateModalOpen(true);
            }}
            type="primary"
            key="primary"
          >
            添加
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
      <VersionProTable
        item={versionData}
        setVersionModalOpen={setVersionModalOpen}
        versionModalOpen={versionModalOpen}
      />
    </>
  );
};
export default ProTableV1;
