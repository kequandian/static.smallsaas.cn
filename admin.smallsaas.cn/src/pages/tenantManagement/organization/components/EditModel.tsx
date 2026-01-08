import { postEditOrgChildren, postOrgChildren } from '@/api/tenantManagement';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import React from 'react';
import { EModelType } from './ProTable';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  const orgTypeList = [
    { label: '平台', value: 0, disabled: true },
    { label: '租户', value: 1, disabled: true },
    { label: '公司', value: 2 },
    { label: '分公司', value: 3 },
    { label: '部门', value: 4 },
    { label: '工作组', value: 5 },
  ];
  return (
    <>
      <ModalForm
        width={'30%'}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={`${type}路由配置`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (type === EModelType.EDIT) {
            // 编辑
            const data = await postEditOrgChildren(value, formData?.id);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-ORGANIZATION');
            }
          } else if (type === EModelType.ADD) {
            // 新增子组织
            console.log(formData);

            const data = await postOrgChildren(value, formData.id);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-ORGANIZATION');
            }
          }
        }}
      >
        <ProFormText
          name="name"
          label="组织名称"
          initialValue={formData?.name}
          rules={[
            {
              required: true,
              message: '请输入组织名称',
            },
          ]}
        />

        <ProFormSelect
          width="md"
          options={orgTypeList}
          rules={[
            {
              required: true,
              message: '请选择组织类型',
            },
          ]}
          name="orgType"
          label="组织类型"
          initialValue={formData?.orgType}
        />
        <ProFormText name="orgCode" label="组织代码" initialValue={formData?.orgCode} />
        <ProFormText name="fullName" label="全称" initialValue={formData?.fullName} />
        <ProFormTextArea name="note" label="备注" initialValue={formData?.note} />
      </ModalForm>
    </>
  );
};

export default App;
