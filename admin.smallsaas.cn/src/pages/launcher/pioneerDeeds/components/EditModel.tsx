import { getPioneeringDeedsPublish } from '@/api/baseWork';
import cache from '@/utils/cache';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import Pubsub from 'pubsub-js';
import React, { useEffect, useState } from 'react';
import { EModelType } from './ProTable';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

// 二级类型: 1使命  2榜样的力量  3功勋闪耀

export const secondTypeOptions = [
  {
    label: '使命',
    value: 1,
    color: '#f50',
  },
  {
    label: '榜样的力量',
    value: 2,
    color: '#2db7f5',
  },
  {
    label: '功勋闪耀',
    value: 3,
    color: '#87d068',
  },
];
// 栏目类型1党群服务中心 2养老助老 3志愿帮扶 4创业服务 5其他
export const typeOptions = [
  {
    label: '活动专栏',
    value: 1,
    color: '#f50',
  },
  {
    label: '全国优秀共产党员',
    value: 2,
    color: '#2db7f5',
  },
  {
    label: '全国先进基层党组织',
    value: 3,
    color: '#87d068',
  },
  {
    label: '七一勋章获得者',
    value: 4,
    color: '#4b5e6d',
  },
  {
    label: '国家荣誉称号获得者',
    value: 5,
    color: '#b940cb',
  },
];

const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  const [form] = Form.useForm(); // 创建表单实例
  const [secondType, setSecondType] = useState<any>(formData?.secondType);

  useEffect(() => {
    if (!createModalOpen) {
      setSecondType(null);
    }
  }, [createModalOpen]);

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
          };
          const res = await getPioneeringDeedsPublish(params);
          if (res.code === 0) {
            message.success(res.msg);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-PIONEERDEEDS');
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
          label="栏目"
          initialValue={formData?.type}
          rules={[
            {
              required: true,
              message: '请选择栏目',
            },
          ]}
          onChange={(value) => {
            setSecondType(value);
          }}
        />

        {secondType === 1 && (
          <ProFormSelect
            options={secondTypeOptions}
            name="secondType"
            label="类型"
            initialValue={formData?.secondType}
            rules={[
              {
                required: true,
                message: '请选择类型',
              },
            ]}
          />
        )}
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
          rules={[{ required: true, message: '请上传图片' }]}
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
