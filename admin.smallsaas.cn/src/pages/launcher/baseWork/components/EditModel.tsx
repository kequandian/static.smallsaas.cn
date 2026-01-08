import { createBaseWork } from '@/api/baseWork';
import cache from '@/utils/cache';
import pcaChian from '@/utils/pcaChian';
import {
  ModalForm,
  ProFormCascader,
  ProFormDateTimePicker,
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

// 1党群服务中心 2养老助老 3志愿帮扶 4创业服务 5其他
export const typeOptions = [
  {
    label: '党群服务中心',
    value: 1,
    color: '#f50',
  },
  {
    label: '养老助老',
    value: 2,
    color: '#2db7f5',
  },
  {
    label: '志愿帮扶',
    value: 3,
    color: '#87d068',
  },
  {
    label: '创业服务',
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
          if (value?.imgUrl[0]?.response?.data?.fileUrl) {
            value.imgUrl = value?.imgUrl[0]?.response?.data?.fileUrl;
          } else {
            value.imgUrl = value?.imgUrl[0]?.fileUrl;
          }
          const params = {
            ...value,
            // status: formData?.id ? formData.status : 1,
            id: formData?.id || undefined,
            province: value?.province[0] || '',
            city: value?.province[1] || '',
            county: value?.province[2] || '',
          };
          const res = await createBaseWork(params);
          if (res.code === 0) {
            message.success(res.msg);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-BASEWORK');
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
        <ProFormCascader
          initialValue={
            formData?.province ? [formData?.province, formData?.city, formData?.county] : []
          }
          name="province"
          label="区域"
          fieldProps={{
            options: pcaChian,
            fieldNames: {
              label: 'name',
              value: 'name',
            },
            onChange: (value: any) => {
              console.log(value);
            },
          }}
          rules={[
            {
              required: true,
              message: '请选择区域',
            },
          ]}
        />
        <ProFormText
          name="address"
          label="活动地址"
          initialValue={formData?.title}
          rules={[
            {
              required: true,
              message: '活动地址',
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
        <ProFormText
          name="phone"
          label="联系电话"
          initialValue={formData?.phone}
          rules={[
            {
              required: true,
              message: '请输入手机号',
            },
            {
              pattern: /^1\d{10}$/,
              message: '不合法的手机号！',
            },
          ]}
        />
      </ModalForm>
    </>
  );
};

export default App;
