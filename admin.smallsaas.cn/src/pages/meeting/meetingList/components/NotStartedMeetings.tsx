import { getNotStartedMeetingList, cancelMeeting } from '@/api/meeting';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space, Tag, message } from 'antd';
import { useRef, useState } from 'react';
import { history } from '@umijs/max';
import Confirmation from '@/components/Confirmation';
import EditModel from './EditModel';

export type TableListItem = {
  id: number;
  title: string;
  meetingNumber: string;
  creatorUserName: string;
  agendaStartTime: string;
  agendaEndTime: string;
  status: string;
};

const NotStartedMeetings: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [currentMeeting, setCurrentMeeting] = useState<TableListItem | null>(null);

  const handleCancelMeeting = async (id: number) => {
    try {
      // 示例API调用
      const res = await cancelMeeting(id);
      if (res.code === 200) {
        message.success('取消会议成功');
        if (actionRef.current) {
          actionRef.current.reload();
        }
      } else {
        message.error(res.message || '取消会议失败');
      }
    } catch (error) {
      console.error('取消会议失败:', error);
      message.error('取消会议失败');
    }
  };

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
      title: '预约开始时间',
      dataIndex: 'agendaStartTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 180,
    },
    {
      title: '预约结束时间',
      dataIndex: 'agendaEndTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 180,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      width: 100,
      render: () => (
        <Tag color="blue">未开始</Tag>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 180,
      fixed: 'right',
      render: (_, record) => (
        <Space size={20}>
          <Button
            type="link"
            onClick={() => history.push(`/launcher/meetingManager/meetingList/detail/${record.id}`)}
          >
            详情
          </Button>
          <Button
            type="link"
            onClick={() => {
              setCurrentMeeting(record);
              setEditModalVisible(true);
            }}
          >
            修改会议
          </Button>
          <Confirmation
            onConfirm={() => handleCancelMeeting(record.id)}
          >
            <Button type="link" danger>取消会议</Button>
          </Confirmation>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    const { data } = await getNotStartedMeetingList({
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
        headerTitle="未开始会议"
        toolBarRender={() => [
          <Button
            key="create"
            onClick={() => setCreateModalVisible(true)}
            type="primary"
          >
            预约会议
          </Button>,
        ]}
      />

      <EditModel
        createModalOpen={editModalVisible}
        setCreateModalOpen={setEditModalVisible}
        formData={currentMeeting}
        type="修改"
        onSuccess={() => {
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
      />

      <EditModel
        createModalOpen={createModalVisible}
        setCreateModalOpen={setCreateModalVisible}
        type="预约"
        onSuccess={() => {
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
      />
    </>
  );
};

export default NotStartedMeetings;
