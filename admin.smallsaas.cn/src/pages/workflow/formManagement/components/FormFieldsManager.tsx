import { getEntityFields, addEntityField, updateEntityField, deleteEntityField } from '@/api/form';
import { Button, Card, Drawer, message, Modal, Space, Table } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import 'amis/lib/themes/default.css';
import { DrawerForm, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components';

interface FormFieldsManagerProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  formData: any;
}

// 组件类型选项
const componentTypeOptions = [
  { label: '单行文本', value: 'input' },
  { label: '多行文本', value: 'textarea' },
  { label: '数字', value: 'number' },
  { label: '日期', value: 'date' },
  { label: '下拉选择', value: 'select' },
  { label: '单选框', value: 'radio' },
  { label: '复选框', value: 'checkbox' },
  { label: '开关', value: 'switch' },
];

// 字段类型选项
const fieldTypeOptions = [
  { label: '字符串', value: 'string' },
  { label: '数字', value: 'number' },
  { label: '布尔值', value: 'boolean' },
  { label: '日期', value: 'date' },
  { label: '对象', value: 'object' },
  { label: '数组', value: 'array' },
];

const FormFieldsManager: React.FC<FormFieldsManagerProps> = ({
  visible,
  onCancel,
  onSuccess,
  formData,
}) => {
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fieldFormVisible, setFieldFormVisible] = useState<boolean>(false);
  const [currentField, setCurrentField] = useState<any>(null);
  const [editMode, setEditMode] = useState<'create' | 'edit'>('create');
  const [configJson, setConfigJson] = useState<string>('{}');
  const [selectedComponentType, setSelectedComponentType] = useState<string>('input');

  // 获取字段列表
  const fetchFields = async () => {
    if (!formData?.entityName) return;

    setLoading(true);
    try {
      const res = await getEntityFields(formData.entityName);
      if (res?.code === 200 && res.data) {
        setFields(res.data.children || []);
      } else {
        setFields([]);
      }
    } catch (error) {
      console.error('获取字段列表失败', error);
      setFields([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible && formData) {
      fetchFields();
    }
  }, [visible, formData]);

  // 添加字段
  const handleAddField = () => {
    setCurrentField(null);
    setEditMode('create');
    setSelectedComponentType('input');
    setConfigJson('{}');
    setFieldFormVisible(true);
  };

  // 编辑字段
  const handleEditField = (record: any) => {
    setCurrentField(record);
    setEditMode('edit');
    setSelectedComponentType(record.componentType);

    const configJsonValue = record.configJson
      ? (typeof record.configJson === 'string' ? record.configJson : JSON.stringify(record.configJson, null, 2))
      : '{}';

    setConfigJson(configJsonValue);
    setFieldFormVisible(true);
  };

  // 删除字段
  const handleDeleteField = (record: any) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除字段 "${record.fieldName}" 吗？`,
      okText: '确认',
      cancelText: '取消',
      okType: 'danger',
      onOk: async () => {
        try {
          const res = await deleteEntityField(formData.entityName, record.attributeName);
          if (res?.code === 200) {
            message.success('删除成功');
            fetchFields();
            onSuccess();
          } else {
            message.error(res?.message || '删除失败');
          }
        } catch (error) {
          message.error('操作失败');
          console.error(error);
        }
      },
    });
  };

  // 处理表单提交
  const handleSubmit = async (values: any) => {
    try {
      // 处理configJson
      let configJsonData = {};
      try {
        configJsonData = JSON.parse(configJson);
      } catch (error) {
        message.error('选项配置JSON格式错误');
        return false;
      }

      // 确保required字段有值，默认为false
      const fieldData = {
        ...values,
        required: values.required === undefined ? false : values.required,
        configJson: configJsonData,
        entityId: formData.id,
      };

      if (editMode === 'create') {
        const res = await addEntityField(formData.entityName, fieldData);
        if (res?.code === 200) {
          message.success('添加成功');
          fetchFields();
          onSuccess();
          return true;
        } else {
          message.error(res?.message || '添加失败');
          return false;
        }
      } else {
        const res = await updateEntityField(formData.entityName, currentField.attributeName, fieldData);
        if (res?.code === 200) {
          message.success('更新成功');
          fetchFields();
          onSuccess();
          return true;
        } else {
          message.error(res?.message || '更新失败');
          return false;
        }
      }
    } catch (error) {
      console.error('表单提交错误', error);
      return false;
    }
  };

  // 获取初始值
  const getInitialValues = () => {
    if (currentField) {
      return {
        attributeName: currentField.attributeName,
        fieldName: currentField.fieldName,
        fieldType: currentField.fieldType,
        componentType: currentField.componentType,
        placeholder: currentField.placeholder,
        required: currentField.required === undefined ? false : currentField.required,
        defaultValue: currentField.defaultValue,
      };
    }
    return {
      componentType: 'input',
      fieldType: 'string',
      required: false
    };
  };

  // 组件类型变化时的处理
  const handleComponentTypeChange = (value: string) => {
    setSelectedComponentType(value);

    // 根据组件类型设置默认的configJson
    if (['select', 'radio', 'checkbox'].includes(value)) {
      setConfigJson(JSON.stringify({
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' }
        ]
      }, null, 2));
    } else {
      setConfigJson('{}');
    }
  };

  const columns = [
    {
      title: '字段名',
      dataIndex: 'attributeName',
      key: 'attributeName',
    },
    {
      title: '显示名称',
      dataIndex: 'fieldName',
      key: 'fieldName',
    },
    {
      title: '组件类型',
      dataIndex: 'componentType',
      key: 'componentType',
      render: (text: string) => {
        const option = componentTypeOptions.find(opt => opt.value === text);
        return option ? option.label : text;
      },
    },
    {
      title: '数据类型',
      dataIndex: 'fieldType',
      key: 'fieldType',
    },
    {
      title: '是否必填',
      dataIndex: 'required',
      key: 'required',
      render: (required: boolean) => required ? '是' : '否',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditField(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteField(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Drawer
      title={`${formData?.name || '表单'} - 字段管理`}
      width={800}
      open={visible}
      onClose={onCancel}
      destroyOnClose
    >
      <Card>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddField}
          style={{ marginBottom: 16 }}
        >
          添加字段
        </Button>

        <Table
          columns={columns}
          dataSource={fields}
          rowKey="attributeName"
          loading={loading}
          pagination={false}
        />
      </Card>

      {/* 字段表单 - 使用ModalForm */}
      <DrawerForm
        title={editMode === 'create' ? '添加字段' : '编辑字段'}
        width={600}
        open={fieldFormVisible}
        onOpenChange={(visible) => {
          if (!visible) setFieldFormVisible(false);
        }}
        initialValues={getInitialValues()}
        onFinish={handleSubmit}
        layout="vertical"
        drawerProps={{
          destroyOnClose: true,
        }}
      >
        <ProFormText
          name="attributeName"
          label="字段名"
          rules={[{ required: true, message: '请输入字段名' }]}
          placeholder="请输入字段名，如：name"
          disabled={editMode === 'edit'}
          tooltip="字段名作为唯一标识，创建后不可修改"
        />

        <ProFormText
          name="fieldName"
          label="显示名称"
          rules={[{ required: true, message: '请输入显示名称' }]}
          placeholder="请输入显示名称，如：姓名"
        />

        <ProFormSelect
          name="fieldType"
          label="数据类型"
          rules={[{ required: true, message: '请选择数据类型' }]}
          options={fieldTypeOptions}
          placeholder="请选择数据类型"
        />

        <ProFormSelect
          name="componentType"
          label="组件类型"
          rules={[{ required: true, message: '请选择组件类型' }]}
          options={componentTypeOptions}
          placeholder="请选择组件类型"
          fieldProps={{
            onChange: handleComponentTypeChange
          }}
        />

        <ProFormText
          name="placeholder"
          label="占位提示"
          placeholder="请输入占位提示"
        />

        <ProFormText
          name="defaultValue"
          label="默认值"
          placeholder="请输入默认值"
        />

        <ProFormSwitch
          name="required"
          label="是否必填"
          initialValue={false}
        />

        {['select', 'radio', 'checkbox'].includes(selectedComponentType) && (
          <ProFormTextArea
            name="_configJson"
            label="选项配置"
            tooltip="配置组件的选项数据"
            placeholder="请输入JSON格式的选项配置"
            fieldProps={{
              rows: 10,
              value: configJson,
              onChange: (e) => setConfigJson(e.target.value)
            }}
          />
        )}
      </DrawerForm>
    </Drawer>
  );
};

export default FormFieldsManager;
