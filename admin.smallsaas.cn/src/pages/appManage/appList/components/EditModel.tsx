import { getAppsAdd, getAppsEdit, getAppsUpload } from '@/api/appManage';
import {
  ModalForm,
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
const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  const [fileData, setFileData] = useState<any>(null);
  const [form] = Form.useForm(); // 创建表单实例

  useEffect(() => {
    if (!createModalOpen) {
      setFileData(null);
    }
  }, [createModalOpen]);
  // 自定义上传
  const onCustomRequest = (file: any) => {
    const formData = new FormData();
    formData.append('file', file.file);
    // 用自己的接口
    getAppsAdd(formData).then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        // 调用组件内方法, 设置为成功状态
        file.onSuccess(res, file.file);
        file.status = 'done';
        setFileData(res.data);
        form.setFieldsValue({
          appDescription: res?.data?.appDescription,
          alias: res?.data?.alias,
        });
      } else {
        file.onError();
        file.status = 'error';
      }
    });
  };
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
        title={`上传安卓应用`}
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
            value.packageId = fileData?.packageId;
            if (value.file) delete value.file;
            const data = await getAppsUpload(value);
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
            label="上传App"
            accept=".apk,.exe"
            name="file"
            action={UPLOAD_IMG}
            fieldProps={{
              customRequest: (file: any) => onCustomRequest(file),
            }}
            rules={[
              {
                required: true,
                message: '请上传文件',
              },
            ]}
            tooltip="支持apk/exe格式文件"
            description="单次上传apk/exe文件"
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
            <ProFormTextArea
              name="appDescription"
              label="应用描述"
              initialValue={formData?.appDescription}
              rules={[
                {
                  required: true,
                  message: '请输入应用描述！',
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
