import { getReviewConference } from '@/api/baseWork';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProFormSelect, ProTable } from '@ant-design/pro-components';
import { Tag } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef } from 'react';
import { typeOptions } from './components/EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();

  //

  const columns: ProColumns<any>[] = [
    {
      title: '类型',
      dataIndex: 'type',
      render: (_, i: any) => <Tag color={typeOptions.find((k: any) => k.value === i.type)?.color}>{typeOptions.find((k: any) => k.value === i.type)?.label}</Tag>,
      renderFormItem: () => {
        return <ProFormSelect options={typeOptions} />;
      },
      hideInSearch: true,
    },
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '内容',
      dataIndex: 'content',
      hideInSearch: true,
    },

    {
      title: '发布机关',
      dataIndex: 'publisher',
      hideInSearch: true,
    },
    {
      title: '发布时间',
      dataIndex: 'createDate',
      hideInSearch: true,
    },
  ];
  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-REVIEWCONFERENCE', () => {
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
    const { data } = await getReviewConference({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      type: 1,
      title: params?.title,
      delFlag: 1,
    });
    return {
      data: data?.list || [], // 数据列表
      total: data.total, // 数据总数
    };
  };

  return (
    <PageContainer title={false}>
      <ProTable<any>
        actionRef={proTableV1Ref}
        columns={columns}
        request={request}
        scroll={{ x: 1300 }}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        search={false}
        headerTitle="历史公告列表"
      />
    </PageContainer>
  );
};
export default ProTableV1;
