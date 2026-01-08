import { addRecruitment, updateRecruitment } from '@/api/website';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';
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
  return (
    <>
      <ModalForm
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
            const res = await updateRecruitment({ ...value, id: formData?.id });
            if (res?.code === 0) {
              message.success('编辑成功');
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-RECRUITMENT');
              return true;
            }
          } else {
            // 新增
            const res = await addRecruitment(value);
            if (res?.code === 0) {
              message.success('添加成功');
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-RECRUITMENT');
              return true;
            }
          }
        }}
      >
        <ProFormText
          name="position"
          label="职位"
          initialValue={formData?.position}
          rules={[
            {
              required: true,
              message: '请输入职位名称',
            },
          ]}
        />

        <ProFormText
          name="salaryRange"
          label="薪资范围"
          initialValue={formData?.salaryRange}
          placeholder="例如：8k-15k"
          rules={[
            {
              required: true,
              message: '请输入薪资范围',
            },
          ]}
        />

        <ProFormText
          name="district"
          label="所在地区"
          initialValue={formData?.district}
          placeholder="例如：北京市海淀区"
          rules={[
            {
              required: true,
              message: '请输入所在地区',
            },
          ]}
        />

        <ProFormText
          name="educational"
          label="学历要求"
          initialValue={formData?.educational}
          placeholder="例如：本科及以上"
          rules={[
            {
              required: true,
              message: '请输入学历要求',
            },
          ]}
        />

        <ProFormTextArea
          name="duty"
          label="工作职责"
          initialValue={formData?.duty}
          placeholder="请输入工作职责"
          fieldProps={{
            rows: 4,
          }}
          rules={[
            {
              required: true,
              message: '请输入工作职责',
            },
          ]}
        />
        <ProFormTextArea
          name="qualification"
          label="任职资格"
          initialValue={formData?.qualification}
          placeholder="请输入任职资格"
          fieldProps={{
            rows: 4,
          }}
          rules={[
            {
              required: true,
              message: '请输入任职资格',
            },
          ]}
        />
      </ModalForm>
    </>
  );
};

export default App;
