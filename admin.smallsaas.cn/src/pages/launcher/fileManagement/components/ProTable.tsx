import Confirmation from '@/components/Confirmation';
import { useLauncher } from '@/hooks/useLauncher';
import { deleteUsingDelete3, pageUsingGet2 } from '@/services/topics/pingtaiwenjianguanli';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen } = useLauncher();
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  // 删除
  const onDel = async (id: any) => {
    const { code } = await deleteUsingDelete3({ id: id });

    if (code === 200) {
      message.success('删除成功');
    }
    // 刷新
    if (proTableV1Ref) {
      // 手动调用刷新
      proTableV1Ref.current?.reload();
    }
  };

  const columns: ProColumns<any>[] = [
    {
      title: '文件名称',
      dataIndex: 'fileName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '文件大小(kb)',
      dataIndex: 'fileSize',
      hideInSearch: true,
      ellipsis: true,
    },

    {
      title: '文件路径',
      dataIndex: 'fileUrl',
      hideInSearch: true,
      ellipsis: true,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Confirmation onConfirm={() => onDel(record.id)} key="del">
            <a>删除</a>
          </Confirmation>
          <a href={record?.fileUrl}>下载</a>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-FILEMANAGEMENT', () => {
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
    const { data } = await pageUsingGet2({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
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
        columns={columns}
        request={request}
        // scroll={{ x: 1300 }}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        search={false}
        headerTitle="文档管理列表"
        toolBarRender={() => [
          <Button
            key={'add'}
            onClick={() => {
              setModelType(EModelType.ADD);
              setFormData(null);
              setCreateModalOpen(true);
            }}
            type="primary"
          >
            添加
          </Button>,
        ]}
      />

      {/* 查看/编辑/添加 */}
      <EditModel
        type={modelType}
        formData={formData}
        setCreateModalOpen={setCreateModalOpen}
        createModalOpen={createModalOpen}
      />
      {/* end */}
    </>
  );
};
export default ProTableV1;
