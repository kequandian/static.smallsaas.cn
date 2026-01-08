import { getEntitiesList, deleteEntity } from '@/api/form';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Space, Modal } from 'antd';
import { useRef, useState } from 'react';
import FormEditor from './FormEditor';
import FormFieldsManager from './FormFieldsManager';
import FormPreview from './FormPreview';
// import FormDataManager from './FormDataManager';

const FormList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [editorVisible, setEditorVisible] = useState<boolean>(false);
  const [fieldsManagerVisible, setFieldsManagerVisible] = useState<boolean>(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  // const [dataManagerVisible, setDataManagerVisible] = useState<boolean>(false);
  const [currentForm, setCurrentForm] = useState<any>(null);
  const [editMode, setEditMode] = useState<'create' | 'edit'>('create');

  // 删除表单
  const handleDelete = async (entityName: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除该表单吗？删除后将无法恢复。',
      okText: '确认',
      cancelText: '取消',
      okType: 'danger',
      onOk: async () => {
        try {
          const res = await deleteEntity(entityName);
          if (res?.code === 200) {
            message.success('删除成功');
            actionRef.current?.reload();
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

  // 编辑表单
  const handleEdit = (record: any) => {
    setCurrentForm(record);
    setEditMode('edit');
    setEditorVisible(true);
  };

  // 创建表单
  const handleCreate = () => {
    setCurrentForm(null);
    setEditMode('create');
    setEditorVisible(true);
  };

  // 管理字段
  const handleManageFields = (record: any) => {
    setCurrentForm(record);
    setFieldsManagerVisible(true);
  };

  // 预览表单
  const handlePreview = (record: any) => {
    setCurrentForm(record);
    setPreviewVisible(true);
  };

  // 管理表单数据
  // const handleManageData = (record: any) => {
  //   setCurrentForm(record);
  //   setDataManagerVisible(true);
  // };

  // 表单保存成功回调
  const handleFormSaved = () => {
    setEditorVisible(false);
    actionRef.current?.reload();
  };

  // 字段管理保存成功回调
  const handleFieldsSaved = () => {
    setFieldsManagerVisible(false);
    actionRef.current?.reload();
  };

  const columns: ProColumns<any>[] = [
    {
      title: '表单名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '表单编码',
      dataIndex: 'entityName',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '描述',
      dataIndex: 'note',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '字段数量',
      dataIndex: 'fieldCount',
      hideInSearch: true,
      render: (_, record) => record.children?.length || 0,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      ellipsis: true,
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 220,
      fixed: 'right',
      render: (_, record) => (
        <Space size={20}>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" onClick={() => handleManageFields(record)}>
            字段管理
          </Button>
          {/* <Button type="link" onClick={() => handleManageData(record)}>
            数据管理
          </Button> */}
          <Button type="link" onClick={() => handlePreview(record)}>
            预览
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.entityName)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    try {
      const res = await getEntitiesList({
        page: params.current || 1,
        size: params.pageSize || 10,
        ...params,
      });

      return {
        data: res?.data?.records || [],
        total: res?.data?.total || 0,
        success: res?.code === 200,
      };
    } catch (error) {
      console.error(error);
      return {
        data: [],
        total: 0,
        success: false,
      };
    }
  };

  return (
    <>
      <ProTable<any>
        headerTitle="表单管理"
        actionRef={actionRef}
        rowKey="entityName"
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
          <Button key="create" type="primary" onClick={handleCreate}>
            新建表单
          </Button>,
        ]}
        request={request}
        columns={columns}
      />

      {/* 表单编辑器 */}
      <FormEditor
        visible={editorVisible}
        onCancel={() => setEditorVisible(false)}
        onSuccess={handleFormSaved}
        formData={currentForm}
        mode={editMode}
      />

      {/* 字段管理器 */}
      <FormFieldsManager
        visible={fieldsManagerVisible}
        onCancel={() => setFieldsManagerVisible(false)}
        onSuccess={handleFieldsSaved}
        formData={currentForm}
      />

      {/* 表单预览 */}
      <FormPreview
        visible={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        formData={currentForm}
      />

      {/* 表单数据管理 */}
      {/* <FormDataManager
        visible={dataManagerVisible}
        onCancel={() => setDataManagerVisible(false)}
        formData={currentForm}
      /> */}
    </>
  );
};

export default FormList;
