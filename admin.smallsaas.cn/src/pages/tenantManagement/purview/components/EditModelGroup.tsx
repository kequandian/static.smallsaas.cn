import { getPermGroups, postEditPermGroups, postPermGroups } from '@/api/tenantManagement';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
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
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  return (
    <>
      <ModalForm
        width={'30%'}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={`${type}权限分组`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (!!formData?.id) {
            // 编辑
            const data = await postEditPermGroups(value, formData?.id);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-PERMLIST');
            }
          } else {
            // 新增
            const data = await postPermGroups({ ...value, org_id: currentUser?.id });
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
          label="权限分组名称"
          initialValue={formData?.name}
          rules={[
            {
              required: true,
              message: '请输入权限分组名称',
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
          name="pid"
          label="父级权限组"
          initialValue={formData?.pid}
        />
      </ModalForm>
    </>
  );
};

export default App;
