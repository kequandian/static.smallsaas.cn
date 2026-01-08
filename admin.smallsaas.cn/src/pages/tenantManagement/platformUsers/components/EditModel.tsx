import { getRolesList, postAdmUsers, postEditAdmUsers } from '@/api/tenantManagement';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import React from 'react';
import { EModelType } from './ProTable';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
  orgId?: string;
}

// 用户类型有四种：用户类型 1管理员 2普通用户 3组织负责人 4组织成员
export const typeOptions = [
  {
    label: '组织负责人',
    value: 3,
  },
  {
    label: '组织成员',
    value: 4,
  },
];

const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type, orgId }) => {
  return (
    <>
      <ModalForm
        width={'30%'}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={`${type}平台用户`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          value.isDepartmentManger = value.isDepartmentManger ? 1 : 0;
          value.orgId = orgId;

          if (!!formData?.id) {
            // 编辑
            const data = await postEditAdmUsers(value, formData?.id);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-ADMUSERSLIST');
            }
          } else {
            // 新增
            const data = await postAdmUsers(value);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-ADMUSERSLIST');
            }
          }
        }}
      >
        <ProFormText
          name="account"
          label="登录账号"
          initialValue={formData?.account}
          rules={[
            {
              required: true,
              message: '请输入登录账号',
            },
          ]}
        />
        <ProFormText
          name="name"
          label="用户名"
          initialValue={formData?.name}
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        />
        {/* <ProFormSwitch
          name="isDepartmentManger"
          label="是否部门经理"
          initialValue={formData?.isDepartmentManger ?? false}
        /> */}

        <ProFormSelect
          options={typeOptions}
          name="userType"
          label="用户类型"
          initialValue={formData?.userType}
          rules={[
            {
              required: true,
              message: '用户类型',
            },
          ]}
        />
        {/* <ProFormSelect
          debounceTime={500}
          request={async (params) => {
            const { data } = await getOrgList({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 10, // 每页条数
            });
            return data.records.map((item: any) => ({
              label: item.name,
              value: item.id,
            }));
          }}
          fieldProps={{
            showSearch: true,
            labelInValue: false,
          }}
          rules={[
            {
              required: true,
              message: '请选择组织',
            },
          ]}
          name="orgId"
          label="组织"
          initialValue={formData?.orgId}
        /> */}
        {type === EModelType.ADD && <ProFormText name="password" label="密码" initialValue={[]} />}
        <ProFormSelect
          debounceTime={500}
          mode="multiple"
          request={async (params) => {
            const { data } = await getRolesList({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 10, // 每页条数
            });
            return data.map((item: any) => ({
              label: item.name,
              value: item.id,
            }));
          }}
          // fieldProps={{
          //   showSearch: true,
          //   labelInValue: false,
          // }}
          rules={[
            {
              required: true,
              message: '请选择角色',
            },
          ]}
          name="roleIds"
          label="角色"
          initialValue={formData?.roleIds?.map(String)}
        />
      </ModalForm>
    </>
  );
};

export default App;
