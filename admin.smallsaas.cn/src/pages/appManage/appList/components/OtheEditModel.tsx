import { getAppsEdit, getCustomUpload } from '@/api/appManage';
import cache from '@/utils/cache';
import {
  ModalForm,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
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
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  const [fileData, setFileData] = useState<any>(null);
  const [form] = Form.useForm(); // 创建表单实例

  useEffect(() => {
    if (!createModalOpen) {
      setFileData(null);
    }
  }, [createModalOpen]);

  return (
    <>
      <ModalForm
        // width={'40%'}
        form={form} // 传递表单实例
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={`上传其他应用`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          // console.log(value, !!formData?.id);

          if (type === EModelType.EDIT) {
            // 编辑
            const data = await getAppsEdit(value, formData?.appId);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-APPMANAGELIST');
            }
          } else {
            // 新增
            // if (value.file) delete value.file;

            value.downloadUrl = fileData?.fileUrl;
            const data = await getCustomUpload(value);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-APPMANAGELIST');
            }
          }
        }}
      >
        {type !== EModelType.EDIT && (
          <ProFormUploadDragger
            max={1}
            label="上传其他App"
            // accept=".exe"
            name="downloadUrl"
            action={UPLOAD_URL}
            rules={[
              {
                required: true,
                message: '请上传文件',
              },
            ]}
            tooltip="支持exe格式文件"
            description="单次上传"
            initialValue={
              formData?.downloadUrl ? [{ url: formData?.downloadUrl, name: '附件' }] : []
            }
            fieldProps={{
              name: 'file',
              maxCount: 1,
              headers: {
                Authorization: `Bearer ${cache.getToken()}`,
              },
              data: {
                useOriName: true,
                filePath: `/ota/window/${generateUUID()}/`,
                module: 'operatingPlatform',
              },
            }}
            onChange={(info) => {
              if (info.file.status === 'done') {
                // 保留小数点后面类型 //cf5cb848c14f49eb87838b731c03489d.svg
                const data = info?.file?.response?.data;
                console.log('size', data);

                setFileData(data);
                form.setFieldsValue({
                  size: data?.fileSize,
                });
              }
            }}
          />
        )}

        {type === EModelType.EDIT && (
          <div>
            <ProFormText name="alias" label="应用别名" initialValue={formData?.alias} />

            <ProFormTextArea
              name="description"
              label="应用描述"
              initialValue={formData?.description}
              rules={[
                {
                  required: true,
                  message: '请输入应用描述！',
                },
              ]}
            />
          </div>
        )}

        {type === EModelType.ADD && fileData && (
          <div>
            <ProFormText
              name="alias"
              label="应用别名"
              initialValue={formData?.alias}
              rules={[
                {
                  required: true,
                  message: '请输入应用别名！',
                },
              ]}
            />

            <ProFormDigit
              hidden
              name="size"
              label="包大小"
              disabled
              initialValue={formData?.size}
              rules={[
                {
                  required: true,
                  message: '上传带入',
                },
              ]}
            />
            <ProFormText
              name="appPackage"
              label="应用包名"
              initialValue={formData?.appPackage}
              rules={[
                {
                  required: true,
                  message: '请输入应用包名！',
                },
              ]}
            />
            <ProFormTextArea
              name="releaseDescription"
              label="包描述"
              initialValue={formData?.releaseDescription}
              rules={[
                {
                  required: true,
                  message: '请输入包描述！',
                },
              ]}
            />
            <ProFormText name="name" label="应用名称" initialValue={formData?.name} />

            <ProFormTextArea
              name="description"
              label="应用描述"
              initialValue={formData?.description}
            />
            <ProFormText
              name="versionCode"
              label="版本号"
              initialValue={formData?.versionCode}
              rules={[
                {
                  required: true,
                  message: '请输入版本号！',
                },
              ]}
            />
            <ProFormText name="versionName" label="版本名称" initialValue={formData?.versionName} />
            <ProFormSwitch
              name="mandatory"
              label="强制更新"
              initialValue={formData?.mandatory ?? false}
            />
            <ProFormSwitch
              name="silence"
              label="静默更新"
              initialValue={formData?.silence ?? false}
            />
          </div>
        )}
      </ModalForm>
    </>
  );
};

export default App;
