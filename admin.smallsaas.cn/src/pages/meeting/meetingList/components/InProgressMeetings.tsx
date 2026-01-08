import { getInProgressMeetingList } from '@/api/meeting';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import { useRef } from 'react';
import { history } from '@umijs/max';

export type TableListItem = {
  id: number;
  title: string;
  meetingNumber: string;
  creatorUserName: string;
  meetingStartTime: string;
  elapsedTime: number;
  status: string;
};

const InProgressMeetings: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '会议主题',
      dataIndex: 'title',
      ellipsis: true,
      width: 200,
      render: (_, record) => (
        <a onClick={() => history.push(`/launcher/meetingManager/meetingList/detail/${record.id}`)}>{record.title}</a>
      ),
    },
    {
      title: '会议号',
      dataIndex: 'meetingNumber',
      ellipsis: true,
      width: 120,
      render: (_, record) => (
        record.meetingNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3')
      ),
    },
    {
      title: '创建人',
      dataIndex: 'creatorUserName',
      ellipsis: true,
      hideInSearch: true,
      width: 120,
    },
    {
      title: '开始时间',
      dataIndex: 'meetingStartTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 180,
    },
    {
      title: '已进行时长',
      dataIndex: 'elapsedTime',
      hideInSearch: true,
      width: 120,
      render: (_, record) => {
        // 将毫秒转换为小时:分钟:秒格式
        const ms = record.elapsedTime || 0;
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      width: 100,
      render: () => (
        <Tag color="green">进行中</Tag>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 60,
      fixed: 'right',
      render: (_, record) => (
        <Space size={20}>
          <Button
            type="link"
            onClick={() => history.push(`/launcher/meetingManager/meetingList/detail/${record.id}`)}
          >
            详情
          </Button>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    const { data } = await getInProgressMeetingList({
      pageNum: params.current || 1,
      pageSize: params.pageSize || 10,
      title: params.title || '',
      meetingNumber: params.meetingNumber || '',
    });

    return {
      data: data?.records || [],
      total: data?.total || 0,
      success: true,
    };
  };

  return (
    <>
      <ProTable<TableListItem>
        actionRef={actionRef}
        columns={columns}
        request={request}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        headerTitle="进行中会议"
      />
    </>
  );
};

export default InProgressMeetings;