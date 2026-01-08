import { addCategory, updateCategory, getCategoryTree } from '@/api/workflow';
import {
  ModalForm,
  ProFormText,
  ProFormTreeSelect,
  ProFormDigit,
} from '@ant-design/pro-components';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import React, { useState, useEffect } from 'react';
import { EModelType } from './ProTable';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

const EditModel: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  const [treeData, setTreeData] = useState<any[]>([]);

  // 获取分类树
  const fetchCategoryTree = async () => {
    try {
      const res = await getCategoryTree({ identifier: 'workflow' });
      if (res?.data) {
        // 添加一个"无父级"选项
        setTreeData([
          { id: null, name: '无父级', pId: 0, value: null },
          ...(res.data || []),
        ]);
      }
    } catch (error) {
      console.error('获取分类树失败', error);
    }
  };

  // 获取分类树形数据
  useEffect(() => {
    if (createModalOpen) {
      fetchCategoryTree();
    }
  }, [createModalOpen]);

  return (
    <>
      <ModalForm
        width={'40%'}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
        }}
        title={`${type}分类`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          // 添加工作流标识
          value.identifier = 'workflow';
          // value.orgId = 0;
          if (value?.pid) {
            console.log(value.pid, value.pid.label);
            value.pName = value.pid.label
            value.pid = value.pid.value

          }


          if (formData?.id) {
            // 编辑
            const res = await updateCategory(formData.id, value);
            if (res?.code === 200) {
              message.success('编辑成功');
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-CATEGORY');
              return true;
            }
          } else {
            // 新增
            const res = await addCategory(value);
            if (res?.code === 200) {
              message.success('添加成功');
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-CATEGORY');
              return true;
            }
          }
        }}
      >
        <ProFormText
          name="name"
          label="分类名称"
          initialValue={formData?.name}
          rules={[
            {
              required: true,
              message: '请输入分类名称',
            },
          ]}
        />

        <ProFormText
          name="code"
          label="分类编码"
          initialValue={formData?.code}
          rules={[
            {
              required: true,
              message: '请输入分类编码',
            },
          ]}
        />

        <ProFormTreeSelect
          name="pid"
          label="父级分类"
          initialValue={formData?.pid}
          placeholder="请选择父级分类"
          allowClear
          fieldProps={{
            treeData: treeData,
            fieldNames: { label: 'name', value: 'id', children: 'children' },
            labelInValue: true,

          }}
        />

        <ProFormDigit
          name="sortorder"
          label="排序"
          initialValue={formData?.sortorder || 1}
          min={1}
          rules={[
            {
              required: true,
              message: '请输入排序序号',
            },
          ]}
        />

        <ProFormText
          name="cover"
          label="封面图片"
          initialValue={formData?.cover}
          placeholder="请输入封面图片URL"
        />
      </ModalForm>
    </>
  );
};

export default EditModel;
