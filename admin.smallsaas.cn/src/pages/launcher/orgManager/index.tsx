import { usePartyOrg } from '@/hooks/usePartyOrg';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Col, Row } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect } from 'react';
import ProTable from './components/ProTable';
import './index.scss';
import { getOrgTypeItem } from './staticData';
const PartyManager: React.FC = () => {
  const { orgDetails, getOrgDetailApi } = usePartyOrg();

  useEffect(() => {
    const updataListPub1 = Pubsub.subscribe('UPDATE-PARTYMEMBER', () => {
      getOrgDetailApi({});
    });
    getOrgDetailApi({});
    return () => {
      Pubsub.unsubscribe(updataListPub1);
    };
  }, []);

  const onViewStructure = () => {
    history.push(`/launcher/party/orgManager/structure/${orgDetails?.id}`);
  };

  const onTabChange = (val: number) => {
    console.log(val);
  };

  return (
    <PageContainer title="组织管理" className="org-manager">
      <div className="manager-content">
        <ProCard title="组织信息" className="name-card">
          <Row gutter={[0, 10]}>
            <Col span={8}>
              <span className="labels">组织全称</span>
              <span className="">{orgDetails?.name}</span>
            </Col>
            <Col span={8}>
              <span className="labels">所属地区</span>
              <span className="">{orgDetails?.orgUnit}</span>
            </Col>
            <Col span={8}>
              <div className="text-a" onClick={onViewStructure}>
                查看组织架构
              </div>
            </Col>
          </Row>
        </ProCard>
        <ProCard title="基础信息" className="base-card">
          <Row gutter={[0, 10]}>
            <Col span={4} className="labels">
              组织简称
            </Col>
            <Col span={4} className="value">
              {orgDetails?.shortName}
            </Col>
            <Col span={4} className="labels">
              组织类别
            </Col>
            <Col span={4} className="value">
              {getOrgTypeItem(orgDetails?.type)?.label}
            </Col>

            <Col span={4} className="labels">
              组织书记
            </Col>
            <Col span={4} className="value">
              {orgDetails?.contacts}
            </Col>
            <Col span={4} className="labels">
              组织所在单位情况
            </Col>
            <Col span={4} className="value">
              {orgDetails?.orgUnit}
            </Col>

            <Col span={4} className="labels">
              联系电话
            </Col>
            <Col span={4} className="value">
              {orgDetails?.contactPhone}
            </Col>
            <Col span={4} className="labels">
              成立时间
            </Col>
            <Col span={4} className="value">
              {orgDetails?.becomeDate}
            </Col>
          </Row>
        </ProCard>
        <ProCard title="组织数据" className="group-card">
          <Row gutter={[0, 10]}>
            <Col span={3}>
              <div className="labels">党委总数</div>
              <div className="value">{orgDetails?.memberCount}人</div>
            </Col>
            <Col span={3}>
              <div className="labels">发展党员数</div>
              <div className="value">{orgDetails?.developMemberCount}人</div>
            </Col>
            <Col span={3}>
              <div className="labels">转入党员</div>
              <div className="value">{orgDetails?.changeMemberCount}人</div>
            </Col>
            <Col span={3}>
              <div className="labels">转出党员</div>
              <div className="value">{orgDetails?.outMemberCount}人</div>
            </Col>
          </Row>
        </ProCard>
        <ProTable members={orgDetails?.members || []} onTabChange={onTabChange} />
      </div>
    </PageContainer>
  );
};

export default PartyManager;
