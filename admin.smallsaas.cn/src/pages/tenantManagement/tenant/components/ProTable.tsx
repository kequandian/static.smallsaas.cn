import { getSysDomain } from '@/api/roles';
import { getTenantsItem, getTenantsList, getUpdateOrgCode } from '@/api/tenantManagement';
import Confirmation from '@/components/Confirmation';
import { useTenantManagement } from '@/hooks/useTenantManagement';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Input, message, Modal, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen, onDelTenants } = useTenantManagement();

  // item
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  const [domain, setDomain] = useState<any>(null);
  const clientPw = useRef<any>();
  const sysDomain = async () => {
    if (!domain) {
      const { data } = await getSysDomain();
      setDomain(`.${data}`);
    }
  };
  useEffect(() => {
    sysDomain();
  }, []);
  // 查询详细信息
  const onTenantsItem = async (id: any) => {
    if (!id) return;
    const res = await getTenantsItem(id);
    return res?.data;
  };

  // 编辑回现
  const onEdit = async (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(await onTenantsItem(data?.id));
    setCreateModalOpen(true);
  };

  // 变更组织代码
  const editCode = async (data: any) => {
    // 修改登录密码
    Modal.confirm({
      title: '修改组织代码',
      destroyOnClose: true,
      content: (
        <div>
          <div style={{ marginBottom: 8, fontWeight: 500 }}>新组织代码</div> {/* 手动添加标签 */}
          <Input
            placeholder="请输入新的组织代码"
            onChange={(ev) => (clientPw.current = ev.target.value)}
          />
        </div>

      ),
      okText: '确认',
      cancelText: '取消',
      onOk() {
        return new Promise((resolve, reject) => {
          const params = {
            id: data?.id,
            orgCode: clientPw.current,
          };

          if (!clientPw.current) {
            message.error('请输入新组织代码');
            reject();
            return;
          }

          getUpdateOrgCode(params)
            .then((res) => {
              if (res.code === 200) {
                message.success('修改成功');
                proTableV1Ref.current?.reload();

                clientPw.current = '';
              }
              resolve(true);
            })
            .catch(() => {
              reject();
            });
        });
      },
      onCancel() {
        clientPw.current = '';
      },
    });
  };

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-TENANTS', () => {
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
      title: '租户名',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '域名地址',
      dataIndex: 'domain',
      ellipsis: true,
      render: (_, record: any) => `${record.domain}${domain}`,
    },
    {
      title: '组织代码',
      dataIndex: 'orgCode',
      ellipsis: true,
    },
    {
      title: '登陆用户',
      dataIndex: 'loginUser',
      ellipsis: true,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" key="editCode" onClick={() => editCode(record)}>
            变更组织代码
          </Button>
          <Button type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button>

          <Confirmation onConfirm={() => onDelTenants(record.id)} key="del">
            <Button type="link">删除</Button>
          </Confirmation>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize

    const { data } = await getTenantsList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      name: `${params.name || ''}`,
      domain: `${params.domain || ''}`,
      // 你可以添加其他需要的查询参数
    });
    return {
      data: data.records, // 数据列表
      total: data.total, // 数据总数
      // 如果有其他分页信息，也可以在这里返回
    };
  };

  return (
    <>
      <ProTable<any>
        actionRef={proTableV1Ref}
        columns={columns}
        rowKey="id"
        request={request}
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          labelWidth: 'auto',
        }}
        headerTitle="租户列表"
        toolBarRender={() => [
          <Button
            onClick={() => {
              setModelType(EModelType.ADD);
              setFormData(null);
              setCreateModalOpen(true);
            }}
            type="primary"
            key="primary"
          >
            创建租户
          </Button>,
        ]}
      />

      {/* 查看/编辑/新增 */}
      <EditModel
        type={modelType}
        formData={formData}
        setCreateModalOpen={setCreateModalOpen}
        createModalOpen={createModalOpen}
        domain={domain}
      />
      {/* end */}
    </>
  );
};
export default ProTableV1;
