import { getMeetingChatRecords, getMeetingDetails, getMeetingInstances, getMeetingParticipants } from '@/api/meeting';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Badge, Descriptions, Spin, Tabs, Typography, Row, Col, List, Card, Empty, Timeline, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from '@umijs/max';

const { Text, Paragraph } = Typography;

interface MeetingDetailData {
  id: number;
  title: string;
  meetingNumber: string;
  creatorUserName: string;
  agendaStartTime: string;
  agendaEndTime: string;
  meetingStartTime: string;
  meetingEndTime: string;
  description: string;
  status: string;
  meetingPw: string;
  inviteValid: number;
  mcsServerName: string;
  hostpartyUserName: string;
  confUuid: string;
}

interface Participant {
  userId: number;
  name: string;
  avatar: string;
  invited: boolean;
  joined: boolean;
  lastJoinTime: string;
  lastExitTime: string;
  totalTime: number;
}

interface ChatRecord {
  meetingId: string;
  userName: string;
  userAvatar: string;
  content: string;
  chatTime: string;
}

interface MeetingInstance {
  id: number;
  meetingId: number;
  confUuid: string;
  startTime: string;
  endTime: string;
  status: number;
  createTime: string;
  updateTime: string;
}

const MeetingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [meetingDetail, setMeetingDetail] = useState<MeetingDetailData | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [chatRecords, setChatRecords] = useState<ChatRecord[]>([]);
  const [instances, setInstances] = useState<MeetingInstance[]>([]);
  const [activeTab, setActiveTab] = useState<string>('participants');
  const [loadingTab, setLoadingTab] = useState<boolean>(false);

  // 参会人表格列定义
  const participantColumns = [
    {
      title: '参会人',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Participant) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {record.avatar ? (
            <img src={record.avatar} alt="avatar" style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }} />
          ) : (
            <div style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#f0f0f0', marginRight: 8 }} />
          )}
          {text}
        </div>
      ),
    },
    {
      title: '入会状态',
      dataIndex: 'joined',
      key: 'status',
      render: (joined: boolean) => (
        joined ? <Badge status="success" text="已入会" /> : <Badge status="default" text="未入会" />
      ),
    },
    {
      title: '最近入会时间',
      dataIndex: 'lastJoinTime',
      key: 'lastJoinTime',
      render: (text: string) => text || '-',
    },
    {
      title: '最近退会时间',
      dataIndex: 'lastExitTime',
      key: 'lastExitTime',
      render: (text: string) => text || '-',
    },
    {
      title: '总在会时长（分钟）',
      dataIndex: 'totalTime',
      key: 'totalTime',
      render: (text: number) => text || '-',
    },
  ];

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        setLoading(true);
        // 只获取会议详情
        const detailRes = await getMeetingDetails(Number(id));
        if (detailRes?.code === 200 && detailRes?.data) {
          setMeetingDetail(detailRes.data);
        }
      } catch (error) {
        console.error('获取会议详情失败:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMeetingDetails();
    }
  }, [id]);

  // 根据激活的标签页加载对应数据
  useEffect(() => {
    const fetchTabData = async () => {
      if (!id) return;

      setLoadingTab(true);
      try {
        if (activeTab === 'participants') {
          const participantsRes = await getMeetingParticipants(Number(id));
          if (participantsRes?.code === 200 && participantsRes?.data) {
            setParticipants(participantsRes.data);
          }
        } else if (activeTab === 'chatRecords') {
          const chatRes = await getMeetingChatRecords(Number(id));
          if (chatRes?.code === 200 && chatRes?.data) {
            setChatRecords(chatRes.data);
          }
        } else if (activeTab === 'instances') {
          const instanceRes = await getMeetingInstances(Number(id));
          if (instanceRes?.code === 200 && instanceRes?.data) {
            setInstances(instanceRes.data);
          }
        }
      } catch (error) {
        console.error(`获取${activeTab}数据失败:`, error);
      } finally {
        setLoadingTab(false);
      }
    };

    fetchTabData();
  }, [id, activeTab]);

  // 获取会议状态标签
  const getStatusBadge = () => {
    if (!meetingDetail) return null;

    if (meetingDetail.meetingStartTime && !meetingDetail.meetingEndTime) {
      return <Badge status="success" text="进行中" style={{ fontWeight: 500 }} />;
    } else if (meetingDetail.meetingEndTime) {
      return <Badge status="default" text="已结束" />;
    } else {
      return <Badge status="processing" text="未开始" />;
    }
  };

  const tabItems = [
    {
      key: 'participants',
      label: '参会人',
      children: (
        <Spin spinning={loadingTab}>
          <div style={{ padding: '16px 0' }}>
            {participants.length > 0 ? (
              <Table
                dataSource={participants}
                columns={participantColumns}
                rowKey="userId"
                pagination={{
                  defaultPageSize: 10,
                  // showSizeChanger: true,
                  // showTotal: (total) => `第 1-2 条/总共 ${total} 条`,
                  size: 'small'
                }}
              />
            ) : (
              <Empty description="暂无参会人员" />
            )}
          </div>
        </Spin>
      ),
    },
    {
      key: 'chatRecords',
      label: '聊天记录',
      children: (
        <Spin spinning={loadingTab}>
          <div style={{ padding: '16px 0' }}>
            {chatRecords.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={chatRecords}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={item.userAvatar ? <img src={item.userAvatar} alt="avatar" style={{ width: 40, height: 40, borderRadius: '50%' }} /> : null}
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text strong>{item.userName}</Text>
                          <Text type="secondary" style={{ fontSize: 12 }}>{item.chatTime}</Text>
                        </div>
                      }
                      description={item.content}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty description="暂无聊天记录" />
            )}
          </div>
        </Spin>
      ),
    },
    {
      key: 'instances',
      label: '会议实例',
      children: (
        <Spin spinning={loadingTab}>
          <div style={{ padding: '16px 0' }}>
            {instances.length > 0 ? (
              <Timeline>
                {instances.map((instance) => (
                  <Timeline.Item key={instance.id}>
                    <Card size="small" title={`实例ID: ${instance.confUuid || instance.id}`} style={{ marginBottom: 16 }}>
                      <Row gutter={[16, 8]}>
                        <Col span={12}>
                          <Text type="secondary">开始时间:</Text> {instance.startTime || '-'}
                        </Col>
                        <Col span={12}>
                          <Text type="secondary">结束时间:</Text> {instance.endTime || '-'}
                        </Col>
                        <Col span={12}>
                          <Text type="secondary">状态:</Text> {instance.status === 1 ? <Badge status="success" text="进行中" /> : <Badge status="default" text="已结束" />}
                        </Col>
                      </Row>
                    </Card>
                  </Timeline.Item>
                ))}
              </Timeline>
            ) : (
              <Empty description="暂无会议实例" />
            )}
          </div>
        </Spin>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <PageContainer title={false}>
        <ProCard
          title="基本信息"
          style={{
            marginBottom: 24,
          }}
        >
          {meetingDetail && (
            <Descriptions column={3}>
              <Descriptions.Item label="会议主题">
                <Paragraph copyable ellipsis={{ rows: 1, tooltip: meetingDetail.title }}>{meetingDetail.title}</Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="会议号">
                <Paragraph
                  copyable={{ text: meetingDetail.meetingNumber }}
                  ellipsis={{ rows: 1, tooltip: meetingDetail.meetingNumber }}
                >
                  {meetingDetail.meetingNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3')}
                </Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="创建人">
                <Paragraph ellipsis={{ rows: 1, tooltip: meetingDetail.creatorUserName }}>{meetingDetail.creatorUserName}</Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="预约开始时间">
                <Paragraph ellipsis={{ rows: 1, tooltip: meetingDetail.agendaStartTime }}>{meetingDetail.agendaStartTime}</Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="预约结束时间">
                <Paragraph ellipsis={{ rows: 1, tooltip: meetingDetail.agendaEndTime }}>{meetingDetail.agendaEndTime}</Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="会议状态">{getStatusBadge()}</Descriptions.Item>
            </Descriptions>
          )}
        </ProCard>

        <ProCard

        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            tabBarStyle={{ marginBottom: 0, paddingLeft: 24 }}
          />
        </ProCard>
      </PageContainer>
    </Spin>
  );
};

export default MeetingDetail;
