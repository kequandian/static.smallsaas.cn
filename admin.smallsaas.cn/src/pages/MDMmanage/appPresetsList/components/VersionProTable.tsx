import { mdmAppInstallList } from '@/api/MDMApi';
import Confirmation from '@/components/Confirmation';
import { useMDMmanage } from '@/hooks/useMDMmanage';
import { QrcodeOutlined } from '@ant-design/icons';
import { ActionType, ProTable, type ProColumns } from '@ant-design/pro-components';
import { Button, Modal, Popover, QRCode, Space } from 'antd';
import Pubsub from 'pubsub-js';
import React, { useEffect, useRef, useState } from 'react';
import { EModelType } from './ProTable';
import VersionEditModel from './VersionEditModel';

interface Props {
  item: any;
  versionModalOpen: boolean;
  setVersionModalOpen: (b: boolean) => void;
}

const App: React.FC<Props> = ({ item, versionModalOpen, setVersionModalOpen }) => {
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);
  const proTableV1Ref = useRef<ActionType>();

  // const [formData, setFormData] = useState<any>();
  const { createModalOpen, setCreateModalOpen, onMdmAppDeleteVersion } = useMDMmanage();
  const columns: ProColumns[] = [
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
      title: '版本号',
      dataIndex: 'versionCode',
      ellipsis: true,
      width: 120,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 50,

      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" key="qrcode" disabled={!record?.appUrl}>
            <Popover content={<QRCode value={record?.appUrl} bordered={false} />}>
              <QrcodeOutlined />
            </Popover>
          </Button>

          <Confirmation onConfirm={() => onMdmAppDeleteVersion(record.id)} key="del">
            <Button type="link">删除</Button>
          </Confirmation>
          <Button type="link" key="download" disabled={!record?.appUrl}>
            <a href={record?.appUrl}>下载</a>
          </Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-MDMMANAGEVERSIONLIST', () => {
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
    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize
    const { data } = await mdmAppInstallList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      name: params.name,
      status: params.status,
      controList: params.controList,
      // 你可以添加其他需要的查询参数
    });
    const list = data.list.filter((i: any) => i.id === item.id);
    console.log(list);

    return {
      data: list[0]?.versionList, // 数据列表
      total: data.total, // 数据总数
      // 如果有其他分页信息，也可以在这里返回
    };
  };

  return (
    <Modal
      footer={null}
      width={'80%'}
      title="版本列表"
      open={versionModalOpen}
      onCancel={() => setVersionModalOpen(false)}
    >
      <ProTable
        actionRef={proTableV1Ref}
        ghost
        columns={columns}
        request={request}
        rowKey="id"
        // dataSource={item?.versionList} //这里使用传入的数据会无法实时更新
        scroll={{ x: 1000 }}
        pagination={false}
        search={false}
        options={false}
        toolBarRender={() => [
          <Button
            onClick={() => {
              setModelType(EModelType.ADD);
              setCreateModalOpen(true);
            }}
            type="primary"
            key="primary"
          >
            添加
          </Button>,
        ]}
      />

      <VersionEditModel
        type={modelType}
        item={item}
        setCreateModalOpen={setCreateModalOpen}
        createModalOpen={createModalOpen}
      />
    </Modal>
  );
};

export default App;
