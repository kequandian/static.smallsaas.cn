import { createEntity, updateEntity } from '@/api/form';
import { Form, Input, Modal, message } from 'antd';
import React, { useEffect } from 'react';

interface FormEditorProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  formData: any;
  mode: 'create' | 'edit';
}

const FormEditor: React.FC<FormEditorProps> = ({
  visible,
  onCancel,
  onSuccess,
  formData,
  mode,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && mode === 'edit' && formData) {
      form.setFieldsValue({
        entityName: formData.entityName,
        name: formData.name,
        note: formData.note,
      });
    } else {
      form.resetFields();
    }
  }, [visible, formData, mode, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (mode === 'create') {
        const res = await createEntity(values);
        if (res?.code === 200) {
          message.success('创建成功');
          onSuccess();
        } else {
          message.error(res?.message || '创建失败');
        }
      } else {
        const res = await updateEntity(formData.entityName, values);
        if (res?.code === 200) {
          message.success('更新成功');
          onSuccess();
        } else {
          message.error(res?.message || '更新失败');
        }
      }
    } catch (error) {
      console.error('表单提交错误', error);
    }
  };

  return (
    <Modal
      title={mode === 'create' ? '创建表单' : '编辑表单'}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ entityName: '', name: '', note: '' }}
      >
        <Form.Item
          name="entityName"
          label="表单编码"
          rules={[{ required: true, message: '请输入表单编码' }]}
          tooltip="表单编码作为唯一标识，创建后不可修改"
        >
          <Input placeholder="请输入表单编码，如：customer_info" disabled={mode === 'edit'} />
        </Form.Item>

        <Form.Item
          name="name"
          label="表单名称"
          rules={[{ required: true, message: '请输入表单名称' }]}
        >
          <Input placeholder="请输入表单名称，如：客户信息" />
        </Form.Item>

        <Form.Item
          name="note"
          label="表单描述"
        >
          <Input.TextArea placeholder="请输入表单描述" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormEditor;
