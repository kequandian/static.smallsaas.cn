import { getEntityFields } from '@/api/form';
import { Drawer, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { render as renderAmis } from 'amis';
import 'amis/lib/themes/default.css';

interface FormPreviewProps {
  visible: boolean;
  onCancel: () => void;
  formData: any;
}

const FormPreview: React.FC<FormPreviewProps> = ({
  visible,
  onCancel,
  formData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formSchema, setFormSchema] = useState<any>(null);

  // 获取表单字段并生成amis schema
  const fetchFormSchema = async () => {
    if (!formData?.entityName) return;

    setLoading(true);
    try {
      const res = await getEntityFields(formData.entityName);
      if (res?.code === 200 && res.data) {
        // 构建amis表单schema
        const fields = res.data.children || [];
        const formControls = fields.map((field: any) => {
          const baseControl = {
            name: field.attributeName,
            label: field.fieldName,
            required: field.required,
            placeholder: field.placeholder,
          };

          // 根据组件类型生成不同的控件配置
          switch (field.componentType) {
            case 'input':
              return {
                ...baseControl,
                type: 'input-text',
              };
            case 'textarea':
              return {
                ...baseControl,
                type: 'textarea',
              };
            case 'number':
              return {
                ...baseControl,
                type: 'input-number',
              };
            case 'date':
              return {
                ...baseControl,
                type: 'input-date',
              };
            case 'select':
              return {
                ...baseControl,
                type: 'select',
                options: field.configJson?.options || [],
              };
            case 'radio':
              return {
                ...baseControl,
                type: 'radios',
                options: field.configJson?.options || [],
              };
            case 'checkbox':
              return {
                ...baseControl,
                type: 'checkboxes',
                options: field.configJson?.options || [],
              };
            case 'switch':
              return {
                ...baseControl,
                type: 'switch',
              };
            default:
              return {
                ...baseControl,
                type: 'input-text',
              };
          }
        });

        // 构建完整的表单schema
        const schema = {
          type: 'page',
          title: formData.name,
          body: {
            type: 'form',
            title: '',
            mode: 'horizontal',
            api: '/api/mock/saveForm',
            controls: formControls,
            actions: [
              {
                type: 'submit',
                label: '提交',
                primary: true,
              },
              {
                type: 'reset',
                label: '重置',
              },
            ],
          },
        };

        setFormSchema(schema);
      }
    } catch (error) {
      console.error('获取表单结构失败', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible && formData) {
      fetchFormSchema();
    }
  }, [visible, formData]);

  // 渲染amis表单
  const renderForm = () => {
    if (!formSchema) return null;

    return renderAmis(formSchema, {
      locale: 'zh-CN',
    });
  };

  return (
    <Drawer
      title={`${formData?.name || '表单'} - 预览`}
      width={800}
      open={visible}
      onClose={onCancel}
      destroyOnClose
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div className="amis-preview">
          {renderForm()}
        </div>
      )}
    </Drawer>
  );
};

export default FormPreview;
