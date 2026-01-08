import { courseMasterSaveOrUpdate, getAddAdminList } from '@/api/launcher';
import { EModelType } from './ProTable';

import { suggestionType } from '@/pages/launcher/learningTopic/components/EditModel';
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
        title={`${type}课程专题`}
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
          const data = await courseMasterSaveOrUpdate(value);
          if (data.code === 0) {
            message.success(data.msg);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-COURSEMASTER');
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
        <ProFormDigit
          name="price"
          label="价格"
          initialValue={formData?.price}
          rules={[
            {
              required: true,
              message: '请输入价格',
            },
            {
              pattern: /^\d+(\.\d{1,2})?$/,
              message: '请输入正确的金额格式（最多两位小数）',
            },
          ]}
        />
        <ProFormSelect
          debounceTime={500}
          request={async (params) => {
            const { data } = await getAddAdminList({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 10, // 每页条数
              status: 1,
              centerType: 2,
            });
            return data.list.map((item: any) => ({
              label: item.name,
              value: item.id,
            }));
          }}
          rules={[
            {
              required: true,
              message: '请选择学习源',
            },
          ]}
          name="xuexiSourceId"
          label="学习源"
          initialValue={formData?.xuexiSourceId}
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
          options={suggestionType}
          name="suggestionType"
          label="推荐类别"
          initialValue={formData?.suggestionType}
        />
        <ProFormDigit label="排序" name="sort" min={0} initialValue={formData?.sort} />
        <ProFormTextArea name="info" label="备注" initialValue={formData?.info} />
      </ModalForm>
    </>
  );
};

export default App;
