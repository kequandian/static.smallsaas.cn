import { addUsingPost } from '@/services/topics/pingtaiwenjianguanli';
import cache from '@/utils/cache';
import { ModalForm, ProFormSelect, ProFormUploadDragger } from '@ant-design/pro-components';
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

export const typeOptions = [
  {
    label: '会议文档',
    value: 1,
    filePath: '/doc/meeting-doc/',
  },
  {
    label: '议题文档',
    value: 2,
    filePath: '/doc/issue-doc/',
  },
  {
    label: '表决管理',
    value: 3,
    filePath: '/doc/vite-result/',
  },
  {
    label: '会议纪要',
    value: 4,
    filePath: '/doc/meeting-minutes/',
  },
];

const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  const [form] = Form.useForm(); // 创建表单实例
  const [filePath, setFilePath] = React.useState<string>(typeOptions[0].filePath);

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
          const data = value.fileUrl[0]?.response?.data;

          const params = {
            accessLevel: value.accessLevel || 0, // 默认为0(私有)
            fileBusinessType: value.fileBusinessType,
            fileName: data?.fileName,
            fileSize: data?.fileSize,
            fileType: data?.fileName.split('.').pop(),
            fileUrl: data?.fullPath,
            id: formData?.id, // 编辑时需要传id
          };

          // 新增
          const res = await addUsingPost(params);
          if (res.code === 200) {
            message.success(res.message);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-FILEMANAGEMENT');
          }

        }}
      >
        {/* <ProFormSelect
          options={[
            {
              label: '私有',
              value: 0,
            },
            {
              label: '公开',
              value: 1,
            },
          ]}
          name="accessLevel"
          label="访问级别"
          initialValue={formData?.accessLevel || 0}
          placeholder="访问级别 0: 私有 1: 公开"
        /> */}
        <ProFormSelect
          options={typeOptions}
          name="fileBusinessType"
          label="文件业务类型"
          initialValue={formData?.fileBusinessType || 1}
          rules={[
            {
              required: true,
              message: '请选择文件业务类型',
            },
          ]}
          onChange={(value: any, item: any) => setFilePath(item.filePath)}
        />
        <ProFormUploadDragger
          max={1}
          label="上传模版"
          name="fileUrl"
          action={`${UPLOAD_URL}?filePath=${filePath}&module=operatingPlatform`}
          rules={[
            {
              required: true,
              message: '请上传文件',
            },
          ]}
          // tooltip="支持apk/exe格式文件"
          // description="单次上传文档"
          initialValue={
            formData?.fileUrl ? [{ url: formData?.fileUrl, name: formData?.fileName }] : []
          }

          fieldProps={{
            name: 'file',
            maxCount: 1,
            headers: {
              Authorization: `Bearer ${cache.getToken()}`,
            },
            // data: {
            //   filePath: '/file/',
            //   module: 'operatingPlatform',
            // },
          }}
        />
      </ModalForm>
    </>
  );
};

export default App;
