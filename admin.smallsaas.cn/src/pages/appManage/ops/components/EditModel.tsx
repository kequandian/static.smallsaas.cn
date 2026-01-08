import { getAddOpsRelease, getOpsReleaseEdit } from '@/api/appManage';
import { ModalForm, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
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
        title={`${type}`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (!!formData?.id) {
            // 编辑
            const data = await getOpsReleaseEdit(value, formData?.id);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-OPSLIST');
            }
          } else {
            // 新增
            const data = await getAddOpsRelease(value);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-OPSLIST');
            }
          }
        }}
      >
        <ProFormText
          name="osVersion"
          label="系统版本"
          initialValue={formData?.osVersion}
          rules={[
            {
              required: true,
              message: '请输入系统版本',
            },
          ]}
        />
        <ProFormText
          name="osUrl"
          label="下载路径"
          initialValue={formData?.osUrl}
          rules={[
            {
              required: true,
              message: '请输入下载路径',
            },
          ]}
        />

        <ProFormText name="model" label="模块" initialValue={formData?.model} />
        <ProFormText name="checkSum" label="校验" initialValue={formData?.checkSum} />
        <ProFormSwitch
          name="currentVersion"
          label="是否当前版本"
          initialValue={formData?.currentVersion}
        />
        <ProFormTextArea name="description" label="描述" initialValue={formData?.description} />

        {/* <PermissionTree /> */}
      </ModalForm>
    </>
  );
};

export default App;
