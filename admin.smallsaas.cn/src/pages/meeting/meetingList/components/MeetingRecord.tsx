import { getMeetingChatRecords, getMeetingDetails, getMeetingInstances } from '@/api/meeting';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Empty, List, Row, Spin, Tabs, Timeline, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams, history } from '@umijs/max';

const { Text } = Typography;

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

interface MeetingInfo {
  id: number;
  title: string;
  meetingNumber: string;
}

const MeetingRecord: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo | null>(null);
  const [chatRecords, setChatRecords] = useState<ChatRecord[]>([]);
  const [instances, setInstances] = useState<MeetingInstance[]>([]);
  const [activeTab, setActiveTab] = useState<string>('chat');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 获取会议基本信息
        const meetingRes = await getMeetingDetails(Number(id));
        if (meetingRes?.code === 200 && meetingRes?.data) {
          setMeetingInfo({
            id: meetingRes.data.id,
            title: meetingRes.data.title,
            meetingNumber: meetingRes.data.meetingNumber,
          });
        }

        // 获取聊天记录
        const chatRes = await getMeetingChatRecords(Number(id));
        if (chatRes?.code === 200 && chatRes?.data) {
          setChatRecords(chatRes.data);
        }

        // 获取会议实例
        const instanceRes = await getMeetingInstances(Number(id));
        if (instanceRes?.code === 200 && instanceRes?.data) {
          setInstances(instanceRes.data);
        }
      } catch (error) {
        console.error('获取会议记录失败:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const tabItems = [
    {
      key: 'chat',
      label: '聊天记录',
      children: (
        <Card bordered={false}>
          {chatRecords.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={chatRecords}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={item.userAvatar ? <img src={item.userAvatar} alt="avatar" style={{ width: 40, height: 40, borderRadius: '50%' }} /> : null}
                    title={<Text strong>{item.userName}</Text>}
                    description={
                      <>
                        <div>{item.content}</div>
                        <div style={{ fontSize: 12, color: '#999' }}>{item.chatTime}</div>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty description="暂无聊天记录" />
          )}
        </Card>
      ),
    },
    {
      key: 'instances',
      label: '会议实例',
      children: (
        <Card bordered={false}>
          {instances.length > 0 ? (
            <Timeline>
              {instances.map((instance) => (
                <Timeline.Item key={instance.id}>
                  <Card size="small" title={`实例ID: ${instance.id}`} style={{ marginBottom: 16 }}>
                    <Row gutter={[16, 8]}>
                      <Col span={12}>
                        <Text type="secondary">开始时间:</Text> {instance.startTime}
                      </Col>
                      <Col span={12}>
                        <Text type="secondary">结束时间:</Text> {instance.endTime || '-'}
                      </Col>
                      <Col span={12}>
                        <Text type="secondary">状态:</Text> {instance.status === 1 ? '进行中' : '已结束'}
                      </Col>
                      <Col span={12}>
                        <Text type="secondary">会议服务器ID:</Text> {instance.confUuid}
                      </Col>
                    </Row>
                  </Card>
                </Timeline.Item>
              ))}
            </Timeline>
          ) : (
            <Empty description="暂无会议实例" />
          )}
        </Card>
      ),
    },
  ];

  return (
    <PageContainer
      title={meetingInfo ? `会议记录 - ${meetingInfo.title}` : '会议记录'}
      subTitle={meetingInfo ? `会议号: ${meetingInfo.meetingNumber}` : ''}
      onBack={() => history.back()}
    >
      <Spin spinning={loading}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          tabBarStyle={{ marginBottom: 24 }}
        />
      </Spin>
    </PageContainer>
  );
};

export default MeetingRecord;
