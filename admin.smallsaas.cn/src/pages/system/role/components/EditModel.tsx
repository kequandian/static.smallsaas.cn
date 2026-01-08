import { getAddroles, getEditroles, getGroupByList } from '@/api/roles';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
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
  return (
    <>
      <ModalForm
        width={'40%'}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={`${type}角色`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (!!formData?.id) {
            // 编辑
            const data = await getEditroles(value, formData?.id);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-ROLELIST');
            }
          } else {
            // 新增
            const data = await getAddroles(value);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-ROLELIST');
            }
          }
        }}
      >
        <ProFormText
          name="name"
          label="角色名称"
          initialValue={formData?.name}
          rules={[
            {
              required: true,
              message: '请输入角色名称',
            },
          ]}
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
        <ProFormTextArea name="tips" label="描述" initialValue={formData?.tips} />

        {/* <PermissionTree /> */}
      </ModalForm>
    </>
  );
};

export default App;
