import { addUsingPost2, updateUsingPut5 } from '@/services/topics/pingtaiyitimoban';
import cache from '@/utils/cache';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger,
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

export const typeOptions = [
  {
    label: '党组织',
    value: 1,
  },
  {
    label: '机关单位',
    value: 2,
  },
  {
    label: '企事业',
    value: 3,
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
          if (value.fileUrl[0]?.response?.data?.fullPath) {
            value.fileUrl = value.fileUrl[0]?.response?.data?.fullPath;
          } else {
            console.log(value.fileUrl);

            value.fileUrl = value.fileUrl[0]?.url;
          }

          if (formData?.id) {
            // 编辑
            const res = await updateUsingPut5({ ...value, id: formData?.id });
            if (res.code === 200) {
              message.success(res.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-TOPICTEMPLATE');
            } else {
              message.error(res.message);
            }
          } else {
            // 新增
            const res = await addUsingPost2(value);
            if (res.code === 200) {
              message.success(res.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-TOPICTEMPLATE');
            } else {
              message.error(res.message);
            }
          }
        }}
      >
        <ProFormUploadDragger
          max={1}
          label="上传模版"
          // accept=".apk,.exe"
          name="fileUrl"
          action={`${UPLOAD_URL}?filePath=/doc/issue-template/&module=operatingPlatform`}
          rules={[
            {
              required: true,
              message: '请上传文件',
            },
          ]}
          // tooltip="支持apk/exe格式文件"
          // description="单次上传文档"
          initialValue={formData?.fileUrl ? [{ url: formData?.fileUrl, name: '附件' }] : []}
          fieldProps={{
            name: 'file',
            maxCount: 1,
            headers: {
              Authorization: `Bearer ${cache.getToken()}`,
            },
          }}
          onChange={(info) => {
            if (info.file.status === 'done') {
              // 保留小数点后面类型 //cf5cb848c14f49eb87838b731c03489d.svg
              const fileType = info?.file?.response?.data?.fileUrl;
              form.setFieldsValue({
                fileType: fileType.split('.').pop(),
              });
            }
          }}
        />

        <ProFormText hidden name="fileType" label="模版类型" initialValue={formData?.fileType} />
        <ProFormText
          name="name"
          label="模版名称"
          initialValue={formData?.name}
          rules={[
            {
              required: true,
              message: '请输入模版名称',
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
              message: '请选择活动类型',
            },
          ]}
        />
      </ModalForm>
    </>
  );
};

export default App;
