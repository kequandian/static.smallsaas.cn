import { applicationList } from '@/services/mdm/applicationList';
import { applicationOtaPlanAdd, applicationOtaPlanUpdate } from '@/services/mdm/applicationOtaPlan';
import { channelPage } from '@/services/mdm/channel';
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import Pubsub from 'pubsub-js';
import React, { useState } from 'react';
import { EModelType } from './ProTable';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

// 执行类型 1 定时执行 2 非定时执行

export const typeOptions = [
  {
    label: '定时执行',
    value: 1,
  },
  {
    label: '非定时执行',
    value: 2,
  },
];

const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  const [execType, setExecType] = useState(formData?.execType || 1);
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
          if (formData?.id) {
            // 编辑
            const res = await applicationOtaPlanUpdate({ ...value, id: formData?.id });
            if (res.code === 200) {
              message.success(res.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-APPLICATIONOTAPLAN');
            } else {
              message.error(res.message);
            }
          } else {
            // 新增
            const res = await applicationOtaPlanAdd(value);
            if (res.code === 200) {
              message.success(res.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-APPLICATIONOTAPLAN');
            } else {
              message.error(res.message);
            }
          }
        }}
      >
        <ProFormText
          name="name"
          label="名称"
          initialValue={formData?.name}
          rules={[
            {
              required: true,
              message: '请输入名称',
            },
          ]}
        />

        <ProFormSelect
          request={async (params) => {
            const { data } = await applicationList({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 10, // 每页条数
            });
            return data.map((item: any) => ({
              label: item.name,
              value: item.appPackage,
            }));
          }}
          name="appPackage"
          label="应用"
          initialValue={formData?.appPackage}
          rules={[
            {
              required: true,
              message: '请选择应用',
            },
          ]}
        />
        <ProFormSelect
          request={async (params) => {
            const { data } = await channelPage({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 10, // 每页条数
            });
            return data.records.map((item: any) => ({
              label: item.name,
              value: item.id,
            }));
          }}
          name="channelId"
          label="渠道"
          initialValue={formData?.channelId}
          rules={[
            {
              required: true,
              message: '请选择渠道',
            },
          ]}
        />
        <ProFormSelect
          options={typeOptions}
          name="execType"
          label="执行方式"
          initialValue={formData?.execType}
          rules={[
            {
              required: true,
              message: '请输入执行方式',
            },
          ]}
          onChange={(value) => setExecType(value)}
        />
        {execType === 1 && (
          <ProFormDateTimePicker
            name="execTime"
            label="任务执行时间"
            initialValue={formData?.execTime}
          />
        )}
      </ModalForm>
    </>
  );
};

export default App;
