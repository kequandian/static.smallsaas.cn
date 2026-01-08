import { getOrgTreeList } from '@/api/organization';
import { getGroupByList } from '@/api/roles';
import { postAddTenants, postEditTenants } from '@/api/tenantManagement';
import { ModalForm, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import React from 'react';
import { EModelType } from './ProTable';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
  domain?: string;
}

const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type, domain }) => {
  return (
    <>
      <ModalForm
        width={'30%'}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={`${type}租户`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (!!formData?.id) {
            // 编辑
            const data = await postEditTenants(value, formData?.id);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-TENANTS');
            }
          } else {
            // 新增
            const data = await postAddTenants(value);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-TENANTS');
            }
          }
        }}
      >
        <ProFormText
          name="name"
          label="租户名称"
          initialValue={formData?.name}
          rules={[
            {
              required: true,
              message: '请输入租户名称',
            },
          ]}
        />
        <ProFormText
          name="domain"
          label="域名地址"
          initialValue={formData?.domain}
          fieldProps={{ suffix: domain, allowClear: false }}
          rules={[
            {
              required: true,
              message: '请输入域名地址',
            },
          ]}
        />
        <ProFormTreeSelect
          disabled={formData?.id}
          debounceTime={500}
          request={async (params) => {
            const { data } = await getOrgTreeList({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 100, // 每页条数
            });
            const setLabelAndValue = (nodes: any) => {
              return nodes.map((node: any) => ({
                ...node,
                label: node.fullName,
                value: node.id,
                disabled: node.orgType < 2,
                children: node.children ? setLabelAndValue(node.children) : [],
              }));
            };
            return setLabelAndValue(data.children);
          }}
          fieldProps={{
            treeDefaultExpandAll: true,
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
        />
        <ProFormTreeSelect
          label="权限设置"
          name="permIds"
          allowClear
          secondary
          rules={[
            {
              required: true,
              message: '请选择权限',
            },
          ]}
          request={async () => {
            const res = await getGroupByList();

            return res?.data?.children;
          }}
          fieldProps={{
            // labelInValue: true,
            treeDefaultExpandAll: true,
            treeCheckable: true,
            multiple: true,
            fieldNames: {
              label: 'name',
              value: 'id',
            },
          }}
          initialValue={formData?.permIds?.map(String)}
        />
      </ModalForm>
    </>
  );
};

export default App;
