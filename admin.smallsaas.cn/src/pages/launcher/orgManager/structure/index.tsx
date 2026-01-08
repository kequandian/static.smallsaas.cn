import { useLauncher } from '@/hooks/useLauncher';
import { usePartyOrg } from '@/hooks/usePartyOrg';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Col, Row } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useState } from 'react';
// @ts-ignore
import OrgTree from 'react-org-tree';
import { findParentById } from '../helper';
import EditModel from './components/EditModel';
import './structure.scss';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const defaultFormData = () => {
  return {
    name: '',
    shortName: '',
    type: '',
    orgNum: '',
    orgUnit: '',
    secretary: '',
    contacts: '',
    contactPhone: '',
    becomeDate: '',
  };
};

const OrgTreeManager: React.FC = () => {
  const params = useParams();
  const { partyOrgTree, getOrgListApi } = usePartyOrg();
  const [searchParams, setSearchParams] = useState({
    name: '',
    type: '',
  });
  const [formData, setFormData] = useState<any>(defaultFormData());
  const [parentNode, setParentNode] = useState<any>(null);
  const [expandAll, setExpandAll] = useState(false);
  const [modelTitle, setModelTitle] = useState('');
  const { createModalOpen, setCreateModalOpen } = useLauncher();

  useEffect(() => {
    (async () => {
      await getOrgListApi(searchParams);
      setExpandAll(true);
    })();
  }, []);

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-ORG-TREE', async () => {
      await getOrgListApi(searchParams);
      setExpandAll(true);
    });
    return () => {
      Pubsub.unsubscribe(updataListPub);
    };
  }, []);

  // eslint-disable-next-line
  const handleFinish = async (value: any) => {
    setSearchParams(value);
    await getOrgListApi(value);
    setExpandAll(true);
  };

  const onEditPartyOrg = (data: any) => {
    const parent = findParentById(partyOrgTree, data.id);
    setParentNode(parent);
    setModelTitle('编辑组织');
    setFormData(data);
    setCreateModalOpen(true);
  };

  const onAddPartyOrg = (data: any) => {
    setParentNode(data);
    setModelTitle('新增组织');
    setFormData(defaultFormData());
    setCreateModalOpen(true);
  };

  // 3.7修改 1.跟节点只能新建子节点/不允许编辑。
  // 2.类型11不允许建子节点/可以编辑。其他都有新增编辑

  // const getNodeDisabled = (data: any) => {
  //   const ids = [...data.parentIds, data.id];
  //   console.log(params, ids);

  //   return ids.includes(Number(params.id));
  // };

  const onClickName = (item: any) => {
    setFormData(item);
  };

  const renderContent = (data: any) => {
    const classNames =
      data.id === formData?.id ? 'org-tree-content org-tree-content-active' : 'org-tree-content';
    return (
      <div className={classNames}>
        <div
          style={{
            // color: data.tenantFlag ? '#52c41a' : data.type === 11 ? '#999' : '',
            color: data.tenantFlag ? '#52c41a' : '',
          }}
          className="name"
          onClick={() => onClickName(data)}
        >
          {data.name}
        </div>
        {/* {getNodeDisabled(data) ? ( */}
        <div>
          {data?.parentId !== 0 && (
            <EditOutlined
              style={{
                color: '#1677ff',
                fontSize: '14px',
                marginLeft: '8px',
                marginRight: '6px',
                cursor: 'pointer',
              }}
              onClick={() => {
                onEditPartyOrg(data);
              }}
            />
          )}
          {data?.type !== 11 && (
            <PlusOutlined
              style={{
                color: '#1677ff',
                fontSize: '14px',
                marginLeft: '4px',
                cursor: 'pointer',
              }}
              onClick={() => {
                onAddPartyOrg(data);
              }}
            />
          )}
        </div>
        {/* ) : null} */}
      </div>
    );
  };
  return (
    <PageContainer title={false}>
      {/* <ProForm layout="horizontal" className="search-form" onFinish={handleFinish}>
        <ProForm.Group>
          <ProFormText name="name" label="党组织名称" placeholder="请输入党组织名称" />
          <ProFormSelect
            options={[
              {
                value: 1,
                label: '党委',
              },
              {
                value: 2,
                label: '党支部',
              },
              {
                value: 11,
                label: '内部办公室',
              },
            ]}
            rules={[
              {
                required: false,
                message: '请选择',
              },
            ]}
            name="type"
            label="类别"
            initialValue={formData.type}
          />
        </ProForm.Group>
      </ProForm> */}
      <ProCard title="组织信息" className="org-name-card">
        <Row gutter={[0, 10]}>
          <Col span={8}>
            <span className="labels">组织全称</span>
            <span className="value">{formData?.name}</span>
          </Col>
          <Col span={8}>
            <span className="labels">所属地区</span>
            <span className="value">{formData?.orgUnit}</span>
          </Col>
          <Col span={4}>
            <span className="labels">成员数量</span>
            <span className="value">{ }</span>
          </Col>
          <Col span={4}>
            <span className="labels">创建时间</span>
            <span className="value">{formData?.becomeDate}</span>
          </Col>
        </Row>

        <div className="org-tree-box">
          {partyOrgTree.length ? (
            <OrgTree
              data={partyOrgTree[0]}
              horizontal={true}
              collapsable={true}
              expandAll={expandAll}
              renderContent={(data: any) => {
                return renderContent(data);
              }}
            />
          ) : null}
        </div>
      </ProCard>

      <EditModel
        title={modelTitle}
        parent={parentNode}
        formData={formData}
        setCreateModalOpen={setCreateModalOpen}
        createModalOpen={createModalOpen}
      />
    </PageContainer>
  );
};

export default OrgTreeManager;
