import { getXuexiSourceSaveOrUpdate } from '@/api/launcher';
import { EModelType } from './ProTable';

import cache from '@/utils/cache';
import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import React from 'react';

// const baseUrl = REACT_APP_ENV === 'prod' ? LAUNCHER_API_URL : '/launcherV1';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

export const centerType = [
  // { label: '所有中心 ', value: 0, color: 'green' },
  { label: '学习中心 ', value: 1, color: '#f50' },
  { label: '课程中心', value: 2, color: '#2db7f5' },
  { label: '地方精选', value: 3, color: '#87d068' },
];
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
        title={`${type}学习源`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (value?.imgUrl[0]?.response?.data?.fileUrl) {
            value.imgUrl = value?.imgUrl[0]?.response?.data?.fileUrl;
          } else {
            value.imgUrl = value?.imgUrl[0]?.fileUrl;
          }

          if (!!formData?.id) value.id = formData?.id;
          // 新增/编辑
          const data = await getXuexiSourceSaveOrUpdate(value);
          if (data.code === 0) {
            message.success(data.msg);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-LEARNINGSOURCELIST');
          } else {
            message.success(data.msg);
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
          rules={[
            {
              required: true,
              message: '请上传图片!',
            },
          ]}
        />
        <ProFormSelect
          options={centerType}
          name="centerType"
          label="类型"
          initialValue={formData?.centerType}
          rules={[
            {
              required: true,
              message: '请选择平台类型',
            },
          ]}
        />

        <ProFormDigit label="排序" name="sort" min={0} initialValue={formData?.sort} />
        <ProFormTextArea name="info" label="备注" initialValue={formData?.info} />
      </ModalForm>
    </>
  );
};

export default App;
