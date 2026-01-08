import { addWorkflow, getCategoryList, updateWorkflow } from '@/api/workflow';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import React from 'react';
import { EModelType } from './ProTable';
import { getEntitiesList } from '@/api/form';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

const EditModel: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  return (
    <>
      <ModalForm
        width={'40%'}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
        }}
        title={`${type}工作流`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (formData?.id) {
            // 编辑
            const res = await updateWorkflow(formData.id, value);
            if (res?.code === 200) {
              message.success('编辑成功');
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-WORKFLOW');
              return true;
            } else {
              message.error(res?.message || '编辑失败');
            }
          } else {
            // 新增
            const res = await addWorkflow(value);
            if (res?.code === 200) {
              message.success('添加成功');
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-WORKFLOW');
              return true;
            } else {
              message.error(res?.message || '添加失败');
            }
          }
        }}
      >
        <ProFormText
          name="name"
          label="工作流名称"
          initialValue={formData?.name}
          rules={[
            {
              required: true,
              message: '请输入工作流名称',
            },
          ]}
        />

        <ProFormText
          name="code"
          label="工作流编码"
          initialValue={formData?.code}
          rules={[
            {
              required: true,
              message: '请输入工作流编码',
            },
          ]}
        />

        <ProFormSelect
          name="categoryId"
          label="所属分类"
          initialValue={formData?.categoryId}
          request={async (params) => {
            const res = await getCategoryList({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 10, // 每页条数
              identifier: 'workflow'
            });
            return res.data.map((item: any) => ({

              label: item.name,
              value: item.typeId,
            }));
          }}
          rules={[
            {
              required: true,
              message: '请选择所属分类',
            },
          ]}
        />

        <ProFormSwitch
          name="status"
          label="状态"
          initialValue={formData?.status === 'ENABLED'}
          valuePropName="checked"
          transform={(value) => value ? 'ENABLED' : 'DISABLED'}
        />



        <ProFormSelect
          name="entityName"
          label="关联表单"
          initialValue={formData?.entityName}
          debounceTime={500}
          request={async () => {
            try {
              const res = await getEntitiesList(
                {
                  pageNum: 1,
                  pageSize: 100,
                }
              );
              if (res.code === 200 && res.data) {
                return (res.data.records || []).map((item: any) => ({
                  label: `${item.name} (${item.entityName})`,
                  value: item.entityName,
                }));
              }
              return [];
            } catch (error) {
              console.error('获取表单列表失败', error);
              return [];
            }
          }}
          placeholder="请选择关联表单"
          fieldProps={{
            showSearch: true,
            autoClearSearchValue: true,
          }}
        />

        <ProFormSelect
          name="openTo"
          label="开放范围"
          initialValue={formData?.openTo || 'ALL'}
          options={[
            { label: '所有人', value: 'ALL' },
            { label: '指定部门', value: 'DEPARTMENT' },
            { label: '指定用户', value: 'USER' },
          ]}
        />

        <ProFormText
          name="openToIds"
          label="开放对象ID"
          initialValue={formData?.openToIds}
          placeholder="多个ID使用逗号分隔"
        />

        {/* <ProFormText
          name="codeRule"
          label="编号规则"
          initialValue={formData?.codeRule}
          placeholder="如：HR-{YYYYMMDD}-{SEQ}"
        /> */}

        <ProFormSwitch
          name="allowDelete"
          label="允许删除"
          initialValue={formData?.allowDelete !== false}
          valuePropName="checked"
        />
      </ModalForm>
    </>
  );
};

export default EditModel;
