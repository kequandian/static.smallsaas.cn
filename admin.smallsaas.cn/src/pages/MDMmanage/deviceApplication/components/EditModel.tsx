import { getOrgList } from '@/api/tenantManagement';
import { channelAdd, channelUpdate } from '@/services/mdm/channel';
import { policyPage } from '@/services/mdm/policy';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
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

// 策略类型 1 平板 2 大屏
export const typeOptions = [
  {
    label: '平板',
    value: 1,
  },
  {
    label: '大屏',
    value: 2,
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
          if (formData?.id) {
            // 编辑
            const res = await channelUpdate({ ...value, id: formData?.id });
            if (res.code === 200) {
              message.success(res.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-DEVICEAPPLICATION');
            } else {
              message.error(res.message);
            }
          } else {
            // 新增
            const res = await channelAdd(value);
            if (res.code === 200) {
              message.success(res.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-DEVICEAPPLICATION');
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
        <ProFormText name="num" label="渠道编号" initialValue={formData?.num} />

        <ProFormSelect
          mode="multiple"
          request={async (params) => {
            const { data } = await policyPage({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 10, // 每页条数
            });
            return data.records.map((item: any) => ({
              label: item.name,
              value: item.id,
            }));
          }}
          name="strategyIds"
          label="策略"
          initialValue={formData?.strategyIds}
        />

        <ProFormSelect
          mode="multiple"
          request={async (params) => {
            const { data } = await getOrgList({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 10, // 每页条数
            });
            return data.records.map((item: any) => ({
              label: item.name,
              value: item.id,
            }));
          }}
          name="orgIds"
          label="组织"
          initialValue={formData?.orgIds}
        />
      </ModalForm>
    </>
  );
};

export default App;
