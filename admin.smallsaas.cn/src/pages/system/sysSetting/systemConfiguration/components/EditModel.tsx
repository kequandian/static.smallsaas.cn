import { getPermGroups, postEditPerms, postPerms } from '@/api/tenantManagement';
import { ModalForm, ProFormSelect, ProFormSwitch, ProFormText } from '@ant-design/pro-components';
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
        width={'30%'}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={`${type}权限`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (!!formData?.id) {
            // 编辑
            const data = await postEditPerms(value, formData?.id);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-PERMLIST');
            }
          } else {
            // 新增
            const data = await postPerms(value);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-PERMLIST');
            }
          }
        }}
      >
        <ProFormText
          name="name"
          label="权限名称"
          initialValue={formData?.name}
          rules={[
            {
              required: true,
              message: '请输入权限名称',
            },
          ]}
        />
        <ProFormText
          name="identifier"
          label="识别字符"
          initialValue={formData?.identifier}
          rules={[
            {
              required: true,
              message: '请输入识别字符',
            },
          ]}
        />
        <ProFormSelect
          width="md"
          // options={theServerLis}
          request={async () => {
            const { data } = await getPermGroups({});
            return data.records.map((item: any) => {
              return {
                label: item.name,
                value: item.id,
              };
            });
          }}
          // rules={[
          //   {
          //     required: true,
          //     message: '请选择父级权限组！',
          //   },
          // ]}
          name="groupId"
          label="权限组"
          initialValue={formData?.groupId}
        />
        <ProFormSwitch name="publicFlag" label="是否公共" initialValue={formData?.publicFlag} />
      </ModalForm>
    </>
  );
};

export default App;
