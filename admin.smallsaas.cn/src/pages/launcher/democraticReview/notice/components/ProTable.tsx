import { getReviewNoticeList } from '@/api/baseWork';
import Confirmation from '@/components/Confirmation';
import { useLauncher } from '@/hooks/useLauncher';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProFormSelect, ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Space, Tag } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel, { typeOptions } from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen, onDemocraticReviewNoticeDel } = useLauncher();
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  // 编辑回现
  const onEdit = (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(data);
    setCreateModalOpen(true);
  };
  // 查询历史公告
  const onHistory = () => {
    // Pubsub.publish('SHOW-HISTORY-NOTICE', data);
    history.push(`./historyNotice`);
  };
  const columns: ProColumns<any>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (_, i: any) => <Tag
        color={typeOptions.find((k: any) => k.value === i.type)?.color}
      >{typeOptions.find((k: any) => k.value === i.type)?.label}</Tag>,
      renderFormItem: () => {
        return <ProFormSelect options={typeOptions} />;
      },
    },

    {
      title: '内容',
      dataIndex: 'content',
      hideInSearch: true,
      ellipsis: true,
    },

    {
      title: '发布机关',
      dataIndex: 'publisher',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '发布时间',
      dataIndex: 'createDate',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button>
          {record.type === 1 && (
            <Button type="link" key="history" onClick={() => onHistory()}>
              查询历史公告
            </Button>
          )}
          <Confirmation onConfirm={() => onDemocraticReviewNoticeDel(record.id)} key="del">
            <Button type="link">删除</Button>
          </Confirmation>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-REVIEWNOTICE', () => {
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
    const { data } = await getReviewNoticeList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      type: params?.type,
    });
    return {
      data: data?.list || [], // 数据列表
      total: data.total, // 数据总数
    };
  };

  return (
    <>
      <ProTable<any>
        actionRef={proTableV1Ref}
        columns={columns}
        request={request}
        scroll={{ x: 1300 }}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          labelWidth: 'auto',
        }}
        headerTitle="公通知告列表"
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
