import { createActivity } from '@/api/activityManager';
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import dayjs from 'dayjs';
import Pubsub from 'pubsub-js';
import React from 'react';
import { EModelType } from './ProTable';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

// 1宣传教育  2就业指导  3卫生保健  4治安维护  5其他
export const typeOptions = [
  {
    label: '宣传教育',
    value: 1,
  },
  {
    label: '就业指导',
    value: 2,
  },
  {
    label: '卫生保健',
    value: 3,
  },
  {
    label: '治安维护',
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
        title={`${type}活动`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          const params = {
            ...value,
            status: formData?.id ? formData.status : 1,
            id: formData?.id || undefined,
          };
          const res = await createActivity(params);
          if (res.code === 0) {
            message.success(res.msg);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-ACTIVITY-TABLE');
          }
        }}
      >
        <ProFormText
          name="activityName"
          label="活动名称"
          initialValue={formData?.activityName}
          rules={[
            {
              required: true,
              message: '请输入活动名称',
            },
          ]}
        />

        <ProFormSelect
          options={typeOptions}
          name="type"
          label="活动类型"
          initialValue={formData?.type}
          rules={[
            {
              required: true,
              message: '请选择活动类型',
            },
          ]}
        />

        <ProFormDateTimePicker
          fieldProps={{ showTime: { format: 'HH:mm' }, format: 'YYYY-MM-DD HH:mm' }}
          name="activityDateStart"
          label="活动开始时间"
          initialValue={formData?.activityDateStart}
          rules={[
            {
              required: true,
              message: '请选择活动开始时间',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const activityDateEnd = getFieldValue('activityDateEnd');
                if (value && activityDateEnd) {
                  const birthDate = dayjs(value);
                  const activityDateEndConverted = dayjs(activityDateEnd);

                  if (birthDate.isAfter(activityDateEndConverted)) {
                    return Promise.reject(new Error('活动开始时间不能大于活动结束时间'));
                  }
                }
                return Promise.resolve();
              },
            }),
          ]}
        />

        <ProFormDateTimePicker
          fieldProps={{ showTime: { format: 'HH:mm' }, format: 'YYYY-MM-DD HH:mm' }}
          name="activityDateEnd"
          label="活动结束时间"
          initialValue={formData?.activityDateEnd}
          rules={[
            {
              required: true,
              message: '请选择活动结束时间',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const activityDateStart = getFieldValue('activityDateStart');
                if (value && activityDateStart) {
                  const activityDateStartConverted = dayjs(activityDateStart);
                  const joinDate = dayjs(value);

                  if (joinDate.isBefore(activityDateStartConverted)) {
                    return Promise.reject(new Error('活动结束时间不能早于活动开始时间'));
                  }
                }
                return Promise.resolve();
              },
            }),
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
        <ProFormTextArea
          name="content"
          label="活动内容"
          initialValue={formData?.content}
          rules={[
            {
              required: true,
              message: '请输入活动内容',
            },
          ]}
        />
        <ProFormDigit name="maxNum" label="活动最大人数" initialValue={formData?.maxNum} />
      </ModalForm>
    </>
  );
};

export default App;
