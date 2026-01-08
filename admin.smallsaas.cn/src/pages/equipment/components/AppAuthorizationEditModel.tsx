import { getDeviceAppUpdate } from '@/api/equipment';
import { ModalForm, ProFormDatePicker } from '@ant-design/pro-components';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import React from 'react';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
}
const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData }) => {
  return (
    <>
      <ModalForm
        modalProps={{
          destroyOnClose: true,
          // onCancel: () => console.log('run'),
        }}
        width={'30%'}
        title={`设置授权截止时间`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value) => {
          value.id = formData?.id;
          // 编辑
          const data = await getDeviceAppUpdate(value);
          if (data.code === 200) {
            message.success(data.message);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-APPAUTHORIZATION');
          }
        }}
      >
        <ProFormDatePicker
          width={'md'}
          name="authExpireTime"
          fieldProps={{ format: 'YYYY-MM-DD' }}
          label="授权截止时间"
          initialValue={formData?.authExpireTime}

        />
      </ModalForm>
    </>
  );
};

export default App;
