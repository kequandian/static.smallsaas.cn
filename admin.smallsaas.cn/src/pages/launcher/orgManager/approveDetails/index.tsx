import { getOrgChangeDetails } from '@/api/partyOrg';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import { Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { getStatuText } from '../helper';
import './index.scss';

const ApproveDetails: React.FC = () => {
  const [details, setDetails] = useState<any>({});
  const params = useParams();

  useEffect(() => {
    (async () => {
      const res = await getOrgChangeDetails({
        id: params.id,
      });
      if (res.code === 0) {
        setDetails(res.data);
      }
    })();
  }, []);

  return (
    <PageContainer title={false}>
      <ProCard title="组织信息" className="org-details-card">
        <Row gutter={[0, 10]}>
          <Col span={12}>
            <span className="labels">姓名</span>
            <span className="value">{details?.name}</span>
          </Col>
          <Col span={12}>
            <span className="labels">党员编号</span>
            <span className="value">{details?.memberCode}</span>
          </Col>
        </Row>
        <Row gutter={[0, 10]}>
          <Col span={12}>
            <span className="labels">转出党组织名称</span>
            <span className="value">{details?.sourcePartyOrganizationName}</span>
          </Col>
          <Col span={12}>
            <span className="labels">转入党组织名称</span>
            <span className="value">{details?.targetPartyOrganizationName}</span>
          </Col>
        </Row>
        <Row gutter={[0, 10]}>
          <Col span={12}>
            <span className="labels">状态</span>
            <span className="value">{getStatuText(details?.status)}</span>
            {(details?.status === 5 || details?.status === 8) && (
              <Button
                type="primary"
                size="small"
                className="ml-5"
                onClick={() => {
                  history.push(`/launcher/orgManager`);
                }}
              >
                重新申请
              </Button>
            )}
          </Col>
          <Col span={12}>
            <span className="labels">意见</span>
            <span className="value">{details?.info}</span>
          </Col>
        </Row>
      </ProCard>
    </PageContainer>
  );
};

export default ApproveDetails;
