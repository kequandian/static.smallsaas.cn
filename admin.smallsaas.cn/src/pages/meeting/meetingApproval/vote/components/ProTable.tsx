import { getMeetingVotePage, postMeetingVoteApprove } from '@/api/meeting';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef } from 'react';

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();

  // 审批
  const onExamine = async (data: any, b: any) => {
    const { code } = await postMeetingVoteApprove({
      id: data?.id,
      approvalStatus: b,
    });

    if (code === 200) {
      message.success('修改成功');
    }
    // 刷新
    if (proTableV1Ref) {
      // 手动调用刷新
      proTableV1Ref.current?.reload();
    }
  };

  const columns: ProColumns<any>[] = [
    {
      title: '投票名称',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '多选/单选',
      dataIndex: 'multiple',
      hideInSearch: true,
      ellipsis: true,
      valueEnum: {
        0: '单选',
        1: '多选',
      },
    },

    {
      title: '投票选项',
      dataIndex: 'options',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record: any) => {
        return record.options?.map((item: any) => item?.optionName).join('、');
      },
    },
    {
      title: '是否匿名',
      dataIndex: 'anonymous',
      hideInSearch: true,
      ellipsis: true,
      valueEnum: {
        0: '否',
        1: '是',
      },
    },
    {
      title: '分发状态',
      dataIndex: 'distributeStatus',
      ellipsis: true,
      hideInSearch: true,
      valueEnum: {
        1: {
          text: '未分发',
          status: 'Default',
        },
        2: {
          text: '已分发',
          status: 'Success',
        },
      },
    },
    {
      title: '审批状态',
      dataIndex: 'approvalStatus',
      ellipsis: true,
      hideInSearch: true,
      valueEnum: {
        0: {
          text: '未审批',
          status: 'Default',
        },
        1: {
          text: '待审批',
          status: 'Default',
        },
        10: {
          text: '已通过',
          status: 'Success',
        },
        11: {
          text: '拒绝',
          status: 'Error',
        },
      },
    },

    {
      title: '投票结果',
      dataIndex: 'voteResult',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 60,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Popconfirm
            title="是否通过审批？"
            key="edit"
            okText="通过"
            onConfirm={() => onExamine(record, 10)}
            cancelText="拒绝"
            onCancel={() => onExamine(record, 11)}
          >
            <Button type="link">审批</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-NOTICE', () => {
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
    const { data } = await getMeetingVotePage({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      title: params?.title,
    });
    return {
      data: data?.records || [], // 数据列表
      total: data.total, // 数据总数
    };
  };

  return (
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
      headerTitle="列表"
    />
  );
};
export default ProTableV1;
