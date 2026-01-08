import { mdmAppInstallUpdate, uploadApkUpload } from '@/api/MDMApi';
import { getOperatorsList } from '@/api/operation';
import cache from '@/utils/cache';
import {
  ModalForm,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
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
  formData?: any;
  type?: EModelType;
}

export const ControlLevelType = [
  {
    label: '所有',
    value: 0,
    color: 'green',
  },
  {
    label: '组织',
    value: 1,
    color: 'red',
  },
  {
    label: '渠道',
    value: 2,
    color: 'blue',
  },
];
const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  const [fileData, setFileData] = useState<any>(null);
  const [form] = Form.useForm(); // 创建表单实例
  const [controlLevel, setControlLevel] = useState<any>(0);

  useEffect(() => {
    if (!createModalOpen) {
      setFileData(null);
    }
  }, [createModalOpen]);
  // 自定义上传
  const onCustomRequest = (file: any) => {
    const formData = new FormData();
    formData.append('apkFile', file.file);
    // 用自己的接口
    uploadApkUpload(formData).then((res: any) => {
      if (res.code === 0) {
        // 调用组件内方法, 设置为成功状态
        file.onSuccess(res, file.file);
        file.status = 'done';
        console.log(res);

        setFileData(res.data);
        form.setFieldsValue({
          packageName: res?.data?.appPackageName,
          name: res?.data?.appName,
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
        title={`${type}预设应用`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          // 新增/编辑

          // 格式化值
          value.isMust = value.isMust ? 1 : 0;
          value.status = value.status ? 1 : 0;

          if (value.appUrl) {
            value.appUrl = value.appUrl
              .map((item: any) => {
                console.log(item?.response?.data.appUrl);
                return item?.response?.data?.appUrl;
              })
              .join(',');
          }
          value.appIconUrl = value.appIconUrl[0].url;

          const data = await mdmAppInstallUpdate(value);
          if (data.code === 0) {
            message.success(data.message);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-MDMMANAGELIST');
          }
        }}
      >
        {type !== EModelType.EDIT && (
          <ProFormUploadDragger
            max={1}
            label="上传App"
            accept=".apk"
            name="appUrl"
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
        {((type === EModelType.ADD && !!fileData) || type === EModelType.EDIT) && (
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
              initialValue={formData?.name}
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
              initialValue={formData?.packageName}
              rules={[
                {
                  required: true,
                  message: '请输入应用包名！',
                },
              ]}
            />
            <ProFormTextArea
              name="info"
              label="应用描述"
              initialValue={formData?.info}
              rules={[
                {
                  required: true,
                  message: '请输入应用描述！',
                },
              ]}
            />

            <ProFormRadio.Group
              name="controlLevel"
              label="应用管控级别"
              radioType="button"
              options={ControlLevelType}
              initialValue={formData?.controlLevel || controlLevel}
              fieldProps={{
                onChange: (e) => setControlLevel(e.target.value),
              }}
            />
            {controlLevel === 2 && (
              <ProFormSelect
                mode="multiple"
                debounceTime={500}
                request={async (params) => {
                  const { data } = await getOperatorsList({
                    pageNum: params.current || 1, // 当前页码
                    pageSize: params.pageSize || 100, // 每页条数
                  });
                  return data.records.map((item: any) => ({
                    controlName: item.name,
                    controlId: item.channelNumber,
                  }));
                }}
                fieldProps={{
                  labelInValue: true,
                  fieldNames: {
                    label: 'controlName',
                    value: 'controlId',
                  },
                }}
                rules={[
                  {
                    required: true,
                    message: '请选择渠道！',
                  },
                ]}
                name="controList"
                label="渠道"
                initialValue={formData?.controList}
              />
            )}

            <ProFormSwitch
              name="isMust"
              label="是否强制安装"
              initialValue={!!formData?.isMust ?? false}
            />
            <ProFormSwitch
              name="status"
              label="是否启用"
              initialValue={!!formData?.status ?? false}
            />
          </div>
        )}
      </ModalForm>
    </>
  );
};

export default App;
