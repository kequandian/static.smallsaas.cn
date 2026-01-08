import { getIntegralPublish } from '@/api/baseWork';
import { ModalForm, ProFormDigit, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Form, message } from 'antd';
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
  const [form] = Form.useForm(); // 创建表单实例

  return (
    <>
      <ModalForm
        form={form} // 传递表单实例
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
          const params = {
            ...value,
            // status: formData?.id ? formData.status : 1,
            id: formData?.id || undefined,
          };
          const res = await getIntegralPublish(params);
          if (res.code === 0) {
            message.success(res.msg);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-INTEGRALACQUISITIONMETHOD');
          }
        }}
      >
        <ProFormText
          name="item"
          label="积分事项"
          initialValue={formData?.item}
          rules={[
            {
              required: true,
              message: '请输入积分事项',
            },
          ]}
        />

        <ProFormTextArea
          name="content"
          label="内容"
          initialValue={formData?.content}
          rules={[
            {
              required: true,
              message: '请输入内容',
            },
          ]}
        />

        <ProFormDigit
          name="integralNum"
          label="积分数"
          initialValue={formData?.integralNum}
          rules={[
            {
              required: true,
              message: '请输入积分数',
            },
          ]}
        />
      </ModalForm>
    </>
  );
};

export default App;
