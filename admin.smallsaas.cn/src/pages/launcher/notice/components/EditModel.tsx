import { getNoticePublish } from '@/api/baseWork';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
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

// 类型( 1党内事务 2干部任免 3规章制度 4教育学习 5其他 )
export const typeOptions = [
  {
    label: '党内事务',
    value: 1,
    color: '#f50',
  },
  {
    label: '干部任免',
    value: 2,
    color: '#2db7f5',
  },
  {
    label: '规章制度',
    value: 3,
    color: '#87d068',
  },
  {
    label: '教育学习',
    value: 4,
    color: '#4b5e6d',
  },
  {
    label: '其他',
    value: 5,
    color: '#b940cb',
  },
];

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
          const res = await getNoticePublish(params);
          if (res.code === 0) {
            message.success(res.msg);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-NOTICE');
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
        <ProFormSelect
          options={typeOptions}
          name="type"
          label="类型"
          initialValue={formData?.type}
          rules={[
            {
              required: true,
              message: '请选择类型',
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
              message: '请输入标题',
            },
          ]}
        />

        <ProFormText
          name="publisher"
          label="发布机关"
          initialValue={formData?.publisher}
          rules={[
            {
              required: true,
              message: '请输入发布机关',
            },
          ]}
        />
      </ModalForm>
    </>
  );
};

export default App;
