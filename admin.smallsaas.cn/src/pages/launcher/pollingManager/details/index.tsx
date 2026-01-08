import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Row, Col } from 'antd';
import { useLocation } from '@umijs/max';
import * as React from 'react';
import ProTable from './components/ProTable';
import './index.scss';

const statusMap: { [key: number]: string } = {
  1: '即将开始',
  2: '进行中',
  3: '已结束',
};

const ActivityDetails: React.FC = () => {
  const location = useLocation();
  const details: any = location.state || {};

  return (
    <PageContainer title={false}>
      <ProCard title="投票信息" className="activity-details-card">
          <Row gutter={[0, 10]}>
            <Col span={12}>
              <span className="labels">名称</span>
              <span className="value">{details?.title}</span>
            </Col>
            <Col span={12}>
              <span className="labels">投票内容</span>
              <span className="value">{details?.content}</span>
            </Col>
          </Row>
          <Row gutter={[0, 10]}>
            <Col span={12}>
              <span className="labels">当前票数</span>
              <span className="value">{details?.currentNum}</span>
            </Col>
            <Col span={12}>
              <span className="labels">单人最大投票数</span>
              <span className="value">{details?.pollingMaxNum}</span>
            </Col>
          </Row>
          <Row gutter={[0, 10]}>
            <Col span={12}>
              <span className="labels">结束时间</span>
              <span className="value">{details?.endDate}</span>
            </Col>
            <Col span={12}>
              <span className="labels">活动状态</span>
              <span className="value">{statusMap[details?.status]}</span>
            </Col>
          </Row>
        </ProCard>
      <ProTable />
    </PageContainer>
  );
};

export default ActivityDetails;
