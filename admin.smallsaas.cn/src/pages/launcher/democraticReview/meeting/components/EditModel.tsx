import { getReviewConferencePublish } from '@/api/baseWork';
import { ModalForm, ProFormDateTimePicker, ProFormText } from '@ant-design/pro-components';
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
            conferenceTheme: value?.conferenceTheme?.split('、') || [],
          };
          const res = await getReviewConferencePublish(params);
          if (res.code === 0) {
            message.success(res.msg);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-REVIEWCONFERENCE');
          }
        }}
      >
        <ProFormText
          name="title"
          label="标题"
          initialValue={formData?.title}
          rules={[
            {
              required: true,
              message: '请输入标题',
            },
          ]}
        />
        <ProFormDateTimePicker
          fieldProps={{ showTime: { format: 'HH:mm' }, format: 'YYYY-MM-DD HH:mm' }}
          name="startDate"
          label="活动开始时间"
          initialValue={formData?.startDate}
          rules={[
            {
              required: true,
              message: '请选择活动开始时间',
            },
          ]}
        />

        <ProFormDateTimePicker
          fieldProps={{ showTime: { format: 'HH:mm' }, format: 'YYYY-MM-DD HH:mm' }}
          name="endDate"
          label="活动结束时间"
          initialValue={formData?.endDate}
          rules={[
            {
              required: true,
              message: '请选择活动结束时间',
            },
          ]}
        />

        <ProFormText
          name="address"
          label="活动地址"
          initialValue={formData?.address}
          rules={[
            {
              required: true,
              message: '请输入活动地址',
            },
          ]}
        />
        <ProFormText
          name="member"
          label="成员范围"
          initialValue={formData?.member}
          rules={[
            {
              required: true,
              message: '请输入成员范围',
            },
          ]}
        />
        <ProFormText
          name="conferenceTheme"
          label="主要议题"
          tooltip="多个议题请用英文逗号隔开"
          initialValue={formData?.conferenceTheme.join('、')}
          rules={[
            {
              required: true,
              message: '请输入主要议题',
            },
          ]}
        />
      </ModalForm>
    </>
  );
};

export default App;
