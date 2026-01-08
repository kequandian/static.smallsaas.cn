import { getApproveList } from '@/api/partyOrg';
import Confirmation from '@/components/Confirmation';
import { useLauncher } from '@/hooks/useLauncher';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Radio, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import { getProfessionText, getStatuText } from '../helper';
import ApproveModel from './ApproveModel';
import './proTable.scss';
import TransferModel from './TransferModel';

interface Props {
  members: any[];
  onTabChange: (val: number) => void;
}

const ProTableV1: React.FC<Props> = ({ members, onTabChange }) => {
  const [formData, setFormData] = useState<any>();
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [curDataSource, setCurDataSource] = useState<any[]>([]);
  const [tabValue, setTabValue] = useState(1);
  const [transferTitle, setTransferTitle] = useState('');
  const proTableV1Ref = useRef<ActionType>();
  const proTableV3Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen, onPartyMembeOrgDel, onPartyMemberDelete } =
    useLauncher();

  const filterDataSource = (members: any[], searchParams: any = {}) => {
    let data = [];
    const searchKeys = Object.keys(searchParams);
    for (let i = 0; i < members.length; i++) {
      if (searchKeys.length === 0) {
        data = JSON.parse(JSON.stringify(members));
        break;
      } else {
        const item = members[i];
        let flag = true;
        searchKeys.forEach((k) => {
          if (searchParams[k] && item[k].indexOf(searchParams[k]) === -1) {
            flag = false;
          }
        });
        if (flag) {
          data.push(JSON.parse(JSON.stringify(item)));
        }
      }
    }
    setCurDataSource(data);
  };

  useEffect(() => {
    setDataSource(members);
    filterDataSource(members, {});
  }, [members]);

  // const onView = (data: any) => {
  //   setFormData(data);
  // };

  const onViewApprove = (data: any) => {
    console.log(data);
    history.push(`./orgManager/approveDetails/${data?.id}`);
  };

  const onApplyForTransfer = (data: any) => {
    setTransferTitle('申请转移');
    setFormData(data);
    setCreateModalOpen(true);
  };

  // const onApprove = (data: any) => {
  //   setFormData(data);
  //   setCreateModalOpen(true);
  // }

  const columns1: ProColumns<any>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '党支部',
      dataIndex: 'partyOrganizationName',
    },
    {
      title: '职务',
      dataIndex: 'professionList',
      hideInSearch: true,
      render: (_, record: any) => {
        return getProfessionText(record.professionList);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          {/* <Button type="link" key="edit" onClick={() => onView(record)}>
            查看
          </Button> */}
          <Button type="link" onClick={() => onApplyForTransfer(record)}>
            申请转移
          </Button>
          <Confirmation onConfirm={() => onPartyMemberDelete(record.id)} key="del">
            <Button type="link">删除</Button>
          </Confirmation>
        </Space>
      ),
    },
  ];
  const columns3: ProColumns<any>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '转出党组织名称',
      dataIndex: 'sourcePartyOrganizationName',
      hideInSearch: true,
    },
    {
      title: '转入党组织名称',
      dataIndex: 'targetPartyOrganizationName',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_, record: any) => {
        return getStatuText(record.status);
      },
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 140,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" key="1" onClick={() => onViewApprove(record)}>
            查看
          </Button>
          <Confirmation onConfirm={() => onPartyMembeOrgDel(record.id)} key="del">
            <Button type="link">删除</Button>
          </Confirmation>
          {/* <Button type="link" key="3" onClick={() => onApprove(record)}>审批</Button> */}
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const updataListPub3 = Pubsub.subscribe('UPDATE-ORGANIZATIONALTRANSFER', () => {
      // 刷新
      if (proTableV3Ref) {
        // 手动调用刷新
        proTableV3Ref.current?.reload();
      }
    });
    return () => {
      Pubsub.unsubscribe(updataListPub3);
    };
  }, []);
  const handleSearch = (params?: any) => {
    filterDataSource(dataSource, params || {});
  };

  const handleTabChange = (e: any) => {
    setTabValue(e.target.value);
    onTabChange(e.target.value);
    if (e.target.value === 3) {
      setTimeout(() => {
        proTableV3Ref.current?.reload();
      }, 10);
    }
  };

  const request3 = async (params: any) => {
    const { data } = await getApproveList({
      pageNum: params.current || 1,
      pageSize: params.pageSize || 10,
      type: 0,
    });
    return {
      data: data.list || [], // 数据列表
      total: data.total, // 数据总数
    };
  };

  const getTable = () => {

    if (tabValue === 1) {
      return (
        <ProTable
          actionRef={proTableV1Ref}
          columns={columns1}
          // dataSource={curDataSource}
          request={(params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            // console.log(params, sorter, filter);
            console.log(curDataSource);

            return Promise.resolve({
              data: curDataSource,
              success: true,
            });
          }}
          rowKey="id"
          className="org-table"
          pagination={{
            pageSize: 10,
          }}
          search={false}

          params={members}
          onSubmit={handleSearch}
          onReset={handleSearch}
          headerTitle="组织成员"
          toolBarRender={() => [
            <div key="group" className="tab-group">
              <Radio.Group
                options={[
                  { label: '组织成员', value: 1 },
                  // { label: '组织详情', value: 2 },
                  { label: '组织转移', value: 3 },
                ]}
                optionType="button"
                buttonStyle="solid"
                onChange={handleTabChange}
                value={tabValue}
              />
            </div>,
          ]}
        />
      );
    }
    if (tabValue === 3) {
      return (
        <ProTable
          actionRef={proTableV3Ref}
          columns={columns3}
          request={request3}
          rowKey={(record) => {
            return `${record.id}-${record.memberCode}-${record.name}`;
          }}
          className="org-table"
          pagination={{
            pageSize: 10,
          }}
          search={false}
          onSubmit={handleSearch}
          onReset={handleSearch}
          headerTitle="组织成员"
          toolBarRender={() => [
            <div key="group" className="tab-group">
              <Radio.Group
                options={[
                  { label: '组织成员', value: 1 },
                  // { label: '组织详情', value: 2 },
                  { label: '组织转移', value: 3 },
                ]}
                optionType="button"
                buttonStyle="solid"
                onChange={handleTabChange}
                value={tabValue}
              />
            </div>,
          ]}
        />
      );
    }
    return null;
  };

  const getModel = () => {
    if (tabValue === 1) {
      return (
        <TransferModel
          title={transferTitle}
          formData={formData}
          createModalOpen={createModalOpen}
          setCreateModalOpen={setCreateModalOpen}
        />
      );
    }
    if (tabValue === 3) {
      return (
        <ApproveModel
          formData={formData}
          createModalOpen={createModalOpen}
          setCreateModalOpen={setCreateModalOpen}
        />
      );
    }
    return null;
  };

  return (
    <>
      {getTable()}
      {getModel()}
    </>
  );
};
export default ProTableV1;
