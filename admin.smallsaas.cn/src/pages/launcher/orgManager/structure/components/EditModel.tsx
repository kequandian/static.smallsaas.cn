import { usePartyOrg } from '@/hooks/usePartyOrg';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Form } from 'antd';
import dayjs from 'dayjs';
import Pubsub from 'pubsub-js';
import React from 'react';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  parent: any;
  formData?: any;
  title?: string;
}

const EditModel: React.FC<Props> = ({
  createModalOpen,
  setCreateModalOpen,
  parent,
  formData,
  title,
}) => {
  const [form] = Form.useForm(); // 创建表单实例
  const { addOrgApi } = usePartyOrg();

  return (
    <>
      <ModalForm
        form={form}
        width={'50%'}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={title}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          const params = {
            ...value,
          };
          params.parentId = parent?.id;

          // if (!formData.id) {
          //   params.parentIds = [...parent.parentIds, parent.id];
          // }

          if (!!formData?.id) params.id = formData?.id;

          const res = await addOrgApi(params);
          if (res.code === 0) {
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-ORG-TREE');
          }
        }}
      >
        <ProFormText name="name" label="党组织全称" initialValue={formData?.name}
          rules={[
            {
              required: true,
              message: '请输入党组织全称',
            },
          ]} />
        <ProFormText name="shortName" label="组织简称" initialValue={formData?.shortName}
          rules={[
            {
              required: true,
              message: '请输入组织简称',
            },
          ]}
        />
        <ProFormSelect
          options={[
            {
              value: 1,
              label: '党委',
            },
            {
              value: 2,
              label: '党支部',
            },
            {
              value: 11,
              label: '内部办公室',
            },
          ]}
          rules={[
            {
              required: true,
              message: '请选择类别',
            },
          ]}
          name="type"
          label="类别"
          initialValue={formData?.type}
          placeholder="请选择类别"


        />
        <ProFormText
          name="orgNum"
          label="组织代码"
          initialValue={formData?.orgNum}
          rules={[
            {
              required: true,
              message: '请输入组织代码',
            },
          ]}
        />
        <ProFormText name="orgUnit" label="党组织所在单位" initialValue={formData?.orgUnit} />
        <ProFormText name="secretary" label="书记" initialValue={formData?.secretary} />
        <ProFormText name="contacts" label="联系人" initialValue={formData?.contacts} />
        <ProFormText name="contactPhone" label="联系电话" initialValue={formData?.contactPhone} />
        <ProFormDatePicker
          name="becomeDate"
          label="成立时间"
          width="xl"
          initialValue={formData?.becomeDate ? dayjs(formData?.becomeDate) : dayjs(new Date())}
          rules={[
            {
              required: true,
              message: '请选择成立时间',
            },
          ]}
        />
      </ModalForm>
    </>
  );
};

export default EditModel;
