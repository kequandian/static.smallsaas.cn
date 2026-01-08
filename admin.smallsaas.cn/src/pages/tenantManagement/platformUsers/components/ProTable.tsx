import { getAdmUsers, getUpdataPassword } from '@/api/tenantManagement';
import Confirmation from '@/components/Confirmation';
import { useTenantManagement } from '@/hooks/useTenantManagement';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Input, message, Modal, Space, Tag } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel, { typeOptions } from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTableV1: React.FC<{
  orgId: string;
}> = ({ orgId }) => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen, onDelAdmUsers } = useTenantManagement();

  // item
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);
  const clientPw = useRef<any>();

  // const getPermission = async (id: any) => {
  //   if (!id) return;
  //   const res = await getPermissionUsers(id);
  //   return res?.data;
  // };
  // 编辑回现
  const onEdit = async (data: any) => {
    setModelType(EModelType.EDIT);
    // setFormData(await getPermission(data.id));
    setFormData(data);
    setCreateModalOpen(true);
  };

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-ADMUSERSLIST', () => {
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

  // 修改登录密码
  const onEditPassword = async (id: number) => {
    Modal.confirm({
      title: '修改密码',
      destroyOnClose: true,
      content: (
        <div>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>新密码</div> {/* 手动添加标签 */}
        <Input 
          placeholder="请输入新密码" 
          onChange={(ev) => (clientPw.current = ev.target.value)}
        />
      </div>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk() {
        return new Promise((resolve, reject) => {
          const params = {
            password: clientPw.current,
          };

          if (!clientPw.current) {
            message.error('请输入新密码');
            reject();
            return;
          }

          getUpdataPassword(params, id)
            .then((res) => {
              if (res.code === 200) {
                message.success('修改成功');
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
        console.log('Cancel');
      },
    });
  };
  const columns: ProColumns<any>[] = [
    {
      title: '用户名',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '登录账号',
      dataIndex: 'account',
      ellipsis: true,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '组织',
      dataIndex: 'orgName',
      ellipsis: true,
      hideInSearch: true,
      render: (_, i: any) => i?.org?.name || '无组织',
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
      ellipsis: true,
      hideInSearch: true,
      render: (_, i: any) => (
        <Tag>
          {
            [
              {
                label: '管理员',
                value: 1,
              },
              ...typeOptions,
            ]?.find((k: any) => k.value === i.userType)?.label
          }
        </Tag>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 180,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" key="pw" onClick={() => onEditPassword(record?.id)}>
            修改密码
          </Button>
          <Button
            disabled={record.userType === 1}
            type="link"
            key="edit"
            onClick={() => onEdit(record)}
          >
            编辑
          </Button>
          <Confirmation onConfirm={() => onDelAdmUsers(record.id)} key="del">
            <Button type="link" disabled={record.userType === 1}>
              删除
            </Button>
          </Confirmation>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize

    const { data } = await getAdmUsers({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      name: params?.name,
      account: params?.account,
      orgId: params?.orgId,
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
        params={{ orgId: orgId }}
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          labelWidth: 'auto',
        }}
        headerTitle="平台用户列表"
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
            创建平台用户
          </Button>,
        ]}
      />

      {/* 查看/编辑/新增 */}
      <EditModel
        type={modelType}
        formData={formData}
        setCreateModalOpen={setCreateModalOpen}
        createModalOpen={createModalOpen}
        orgId={orgId}
      />
      {/* end */}
    </>
  );
};
export default ProTableV1;
