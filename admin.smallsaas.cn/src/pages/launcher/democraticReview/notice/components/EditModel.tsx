import { getReviewNoticeListPublish } from '@/api/baseWork';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Form, message, Modal } from 'antd';
import Pubsub from 'pubsub-js';
import React from 'react';
import { EModelType } from './ProTable';
const { confirm } = Modal;

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

// 1公告  2通知

export const typeOptions = [
  {
    label: '公告',
    value: 1,
    color: '#2db7f5'
  },
  {
    label: '通知',
    value: 2,
    color: '#87d068'

  },
];

const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  const [form] = Form.useForm(); // 创建表单实例

  const showConfirm = (params: any) => {
    confirm({
      title: '该公告发布后其余公告将失效,是否确认?',
      icon: <ExclamationCircleFilled />,
      async onOk() {
        const res = await getReviewNoticeListPublish(params);
        if (res.code === 0) {
          message.success(res.msg);
          setCreateModalOpen(false);
          Pubsub.publish('UPDATE-REVIEWNOTICE');
        } else {
          message.error(res.msg);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
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
          if (value?.type === 1) {
            await showConfirm(params);
          } else {
            const res = await getReviewNoticeListPublish(params);
            if (res.code === 0) {
              message.success(res.msg);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-REVIEWNOTICE');
            } else {
              message.error(res.msg);
            }
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
