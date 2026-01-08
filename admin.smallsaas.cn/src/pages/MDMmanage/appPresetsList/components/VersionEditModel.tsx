import { mdmAddVersion, uploadApkUpload } from '@/api/MDMApi';
import cache from '@/utils/cache';
import {
  ModalForm,
  ProFormText,
  ProFormUploadButton,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import Pubsub from 'pubsub-js';
import React, { useEffect, useState } from 'react';
import { EModelType } from './ProTable';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  item?: any;
  type?: EModelType;
}

const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, item, type }) => {
  const [versionFileData, setVersionFileData] = useState<any>(null);
  const [form] = Form.useForm(); // 创建表单实例

  useEffect(() => {
    if (!createModalOpen) {
      setVersionFileData(null);
    }
  }, [createModalOpen]);
  // 自定义上传
  const onCustomRequest = (file: any) => {
    const versionFormData = new FormData();
    versionFormData.append('apkFile', file.file);
    // 用自己的接口
    uploadApkUpload(versionFormData).then((res: any) => {
      if (res.code === 0) {
        // 调用组件内方法, 设置为成功状态
        file.onSuccess(res, file.file);
        file.status = 'done';
        console.log(res);

        setVersionFileData(res.data);
        form.setFieldsValue({
          name: res?.data?.appName,
          packageName: res?.data?.appPackageName,
          appIconUrl: [{ url: res?.data?.appIconUrl }],
          appVersion: res?.data?.appVersion,
          versionCode: res?.data?.appVersionCode,
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
        title={`添加版本`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          // 新增/编辑

          // 数据传入调整
          if (value.appUrl) {
            value.appUrl = value.appUrl
              .map((item: any) => {
                console.log(item?.response?.data.appUrl);
                return item?.response?.data?.appUrl;
              })
              .join(',');
          }
          value.appIconUrl = value.appIconUrl[0].url;

          value.appInstallId = item?.id;

          const data = await mdmAddVersion(value);
          if (data.code === 0) {
            message.success(data.message);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-MDMMANAGEVERSIONLIST');
          }
        }}
      >
        {type !== EModelType.EDIT && (
          <ProFormUploadDragger
            max={1}
            label="上传App"
            accept=".apk"
            name="appUrl"
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
            tooltip="支持apk格式文件"
            description="单次上传apk文件"
          />
        )}

        {!!versionFileData && (
          <div>
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
              label="App图标"
              name="appIconUrl"
              // initialValue={versionFileData?.appIconUrl ? [{ url: versionFileData?.appIconUrl }] : []}
              action={UPLOAD_IMG}
              rules={[
                {
                  required: true,
                  message: '请上传图片!',
                },
              ]}
            />
            <ProFormText
              name="name"
              label="应用名称"
              rules={[
                {
                  required: true,
                  message: '请输入应用名称！',
                },
              ]}
            />
            <ProFormText
              name="appVersion"
              label="版本号"
              rules={[
                {
                  required: true,
                  message: '请输入版本号！',
                },
              ]}
            />
            <ProFormText
              name="versionCode"
              label="版本code"
              rules={[
                {
                  required: true,
                  message: '请输入版本code！',
                },
              ]}
            />
            <ProFormText
              name="packageName"
              label="应用包名"
              rules={[
                {
                  required: true,
                  message: '请输入应用包名！',
                },
              ]}
            />
          </div>
        )}
      </ModalForm>
    </>
  );
};

export default App;
