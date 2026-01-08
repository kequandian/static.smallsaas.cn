import { createPollingActivity } from '@/api/pollingManager';
import cache from '@/utils/cache';
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
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

// 1经济治理 2生态治理 3民生治理 4数字治理 5其他
export const typeOptions = [
  {
    label: '经济治理',
    value: 1,
  },
  {
    label: '生态治理',
    value: 2,
  },
  {
    label: '民生治理',
    value: 3,
  },
  {
    label: '数字治理',
    value: 4,
  },
  {
    label: '其他',
    value: 5,
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
        title={`${type}投票活动`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (value?.imgUrl[0]?.response?.data?.fileUrl) {
            value.imgUrl = value?.imgUrl[0]?.response?.data?.fileUrl;
          } else {
            value.imgUrl = value?.imgUrl[0]?.fileUrl;
          }
          const params = {
            ...value,
            status: formData?.id ? formData.status : 1,
            id: formData?.id || undefined,
          };
          const res = await createPollingActivity(params);
          if (res.code === 0) {
            message.success(res.msg);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-POLLINGMANAGER');
          }
        }}
      >
        <ProFormText
          name="title"
          label="活动标题"
          initialValue={formData?.title}
          rules={[
            {
              required: true,
              message: '请输入活动标题',
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
        <ProFormSelect
          options={typeOptions}
          name="type"
          label="投票类型"
          initialValue={formData?.type}
          rules={[
            {
              required: true,
              message: '请选择投票类型',
            },
          ]}
        />
        <ProFormDateTimePicker
          fieldProps={{ showTime: { format: 'HH:mm' }, format: 'YYYY-MM-DD HH:mm' }}
          name="startDate"
          label="开始时间"
          initialValue={formData?.startDate}
          rules={[
            {
              required: true,
              message: '请选择开始时间',
            },
          ]}
        />
        <ProFormDateTimePicker
          fieldProps={{ showTime: { format: 'HH:mm' }, format: 'YYYY-MM-DD HH:mm' }}
          name="endDate"
          label="结束时间"
          initialValue={formData?.endDate}
          rules={[
            {
              required: true,
              message: '请选择结束时间',
            },
          ]}
        />
        <ProFormTextArea
          name="content"
          label="投票内容"
          initialValue={formData?.content}
          rules={[
            {
              required: true,
              message: '请输入投票内容',
            },
          ]}
        />
        <ProFormDigit
          name="pollingMaxNum"
          label="单人最大投票数"
          initialValue={formData?.pollingMaxNum}
          rules={[
            {
              required: true,
              message: '请输入单人最大投票数',
            },
          ]}
        />
        <ProFormUploadButton
          accept=".jpg,.jpeg,.png,.svg" // 限制上传文件类型
          tooltip="支持jpg、png、svg格式"
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
            multiple: false,
            headers: {
              Authorization: `Bearer ${cache.getToken()}`,
            },
          }}
          max={1}
          label="图片"
          name="imgUrl"
          initialValue={formData?.imgUrl ? [{ url: formData?.imgUrl }] : []}
          action={UPLOAD_IMG}
        />
      </ModalForm>
    </>
  );
};

export default App;
