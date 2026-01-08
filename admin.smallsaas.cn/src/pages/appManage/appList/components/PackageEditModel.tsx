import { getAppsReleasesEdit } from '@/api/appManage';
import { ModalForm, ProFormSwitch, ProFormTextArea, ProFormText } from '@ant-design/pro-components';
import { Form, message, Space, Typography } from 'antd';
import Pubsub from 'pubsub-js';
import React from 'react';
import { EModelType } from './ProTable';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

const PackageEditModel: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData }) => {
  const [form] = Form.useForm(); // 创建表单实例
  const { Text } = Typography;

  return (
    <ModalForm
      width={500}
      form={form} // 传递表单实例
      modalProps={{
        maskClosable: false,
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      title={
        <Space>
          <Text strong>应用编辑</Text>
          <Text type="secondary" style={{ fontSize: 14, fontWeight: 'normal' }}>
            {formData?.packageName}
          </Text>
        </Space>
      }
      open={createModalOpen}
      onOpenChange={setCreateModalOpen}
      onFinish={async (value: any) => {
        // 编辑
        const data = await getAppsReleasesEdit(value, formData?.packageId);
        if (data.code === 200) {
          message.success(data.message);
          setCreateModalOpen(false);
          Pubsub.publish('UPDATE-APPPACKAGELIST');
        }
      }}
      layout="vertical"
    >
      <ProFormText
        name="versionCode"
        label="版本号"
        initialValue={formData?.versionCode}
        placeholder="请输入版本号"
        rules={[{ required: true, message: '请输入版本号' }]}
      />

      <ProFormSwitch
        name="mandatory"
        label="强制更新"
        initialValue={formData?.mandatory ?? false}
        fieldProps={{
          checkedChildren: '是',
          unCheckedChildren: '否'
        }}
      />

      <ProFormSwitch
        name="silence"
        label="静默更新"
        initialValue={formData?.silence ?? false}
        fieldProps={{
          checkedChildren: '是',
          unCheckedChildren: '否'
        }}
        tooltip="启用后，应用将在后台自动更新，无需用户确认"
      />

      <ProFormTextArea
        name="description"
        label="包描述"
        initialValue={formData?.description}
        placeholder="请输入包描述信息"
        fieldProps={{
          rows: 4,
          showCount: true,
          maxLength: 200
        }}
      />
    </ModalForm>
  );
};

export default PackageEditModel;
