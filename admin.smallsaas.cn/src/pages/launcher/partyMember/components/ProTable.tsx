import { getMemberList } from '@/api/launcher';
import { getParytOrgTree } from '@/api/partyOrg';
import Confirmation from '@/components/Confirmation';
import { useLauncher } from '@/hooks/useLauncher';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProFormTreeSelect, ProTable } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { Avatar, Button, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen, onPartyMemberDelete } = useLauncher();

  // item
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  // 编辑回现
  const onEdit = (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(data);
    setCreateModalOpen(true);
  };

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-PARTYMEMBER', () => {
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

  const columns: ProColumns<any>[] = [

    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={record.headUrl} />
          <span style={{ marginLeft: 10 }}>{record.name}</span>
        </div>
      ),
    },

    {
      title: '手机号',
      dataIndex: 'phone',
      ellipsis: true,
    },

    {
      title: '性别',
      dataIndex: 'sex',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record: any) => {
        return record.sex === 1 ? '男' : '女';
      },
    },

    {
      title: '所属党支部',
      dataIndex: 'partyOrganizationName',
      // hideInSearch: true,
      ellipsis: true,
      renderFormItem: () => {
        return (
          <ProFormTreeSelect
            debounceTime={500}
            request={async (params) => {
              const { data } = await getParytOrgTree({
                pageNum: params.current || 1, // 当前页码
                pageSize: params.pageSize || 10, // 每页条数
              });
              return data;
            }}
            fieldProps={{
              fieldNames: {
                label: 'name',
                value: 'id',
                children: 'childes',
              },
              variant: 'outlined', // 使用 variant 替代 bordered
            }}
          />
        );
      },
    },
    {
      title: '党内职务',
      dataIndex: 'profession',
      ellipsis: true,
      hideInSearch: true,

      // render: (_, record: any) => {
      //   return record.professionList?.map((e: any, i: number) => (
      //     <Tag key={i}>{e?.profession}</Tag>
      //   ));
      // },
    },

    {
      title: '民族',
      dataIndex: 'nation',
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: '党龄',
      dataIndex: 'partyAge',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record: any) => {
        return record.partyAge + '年';
      },
    },

    {
      title: '入党时间',
      dataIndex: 'joinDate',
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 160,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Link key="view" to={`./details/${record.id}`}>
            查看
          </Link>
          <Button type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Confirmation onConfirm={() => onPartyMemberDelete(record.id)} key="del">
            <Button type="link">删除</Button>
          </Confirmation>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize
    const { data } = await getMemberList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      partyOrganizationId: params?.partyOrganizationName,
      partyMemberName: params?.name,
      phone: params?.phone,

      // 你可以添加其他需要的查询参数
    });
    return {
      data: data.list, // 数据列表
      total: data.total, // 数据总数

      // 如果有其他分页信息，也可以在这里返回
    };
  };

  return (
    <>
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
        headerTitle="党员列表"
        toolBarRender={() => [
          <Button
            key={'add'}
            onClick={() => {
              setModelType(EModelType.ADD);
              setFormData(null);
              setCreateModalOpen(true);
            }}
            type="primary"
          >
            添加
          </Button>,
        ]}
      />

      {/* 查看/编辑/添加 */}
      <EditModel
        type={modelType}
        formData={formData}
        setCreateModalOpen={setCreateModalOpen}
        createModalOpen={createModalOpen}
      />
      {/* end */}
    </>
  );
};
export default ProTableV1;
