import { sysMenuGetAllList, sysRoleSave } from '@/api/launcher';
import {
  ModalForm,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import React from 'react';
import { EModelType } from './ProTable';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  return (
    <>
      <ModalForm
        width={'40%'}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={`${type}角色`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (!!formData?.id) value.id = formData?.id;
          // 新增/编辑
          const data = await sysRoleSave(value);
          if (data.code === 0) {
            message.success(data.msg);

            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-PARTYMEMBERAUTHORITY');
          } else {
            message.success(data.msg);
          }
        }}
      >
        <ProFormText
          name="roleName"
          label="角色名称"
          initialValue={formData?.roleName}
          rules={[
            {
              required: true,
              message: '请输入角色名称',
            },
          ]}
        />

        <ProFormTreeSelect
          label="权限设置"
          name="menuIds"
          allowClear
          secondary
          tooltip="每项子节点需包含父级"
          rules={[
            {
              required: true,
              message: '请选择权限',
            },
          ]}
          request={async () => {
            const res = await sysMenuGetAllList({
              pageNum: 1, // 当前页码
              pageSize: 100, // 每页条数
            });

            return res?.data;
          }}
          fieldProps={{
            treeDefaultExpandAll: true,
            // treeCheckable: true,
            multiple: true,
            showCheckedStrategy: 'SHOW_PARENT',
            fieldNames: {
              label: 'menuName',
              value: 'id',
              children: 'childes',
            },
          }}
          initialValue={formData?.menuIds}
        />
        <ProFormDigit
          label="排序"
          name="sort"
          min={0}
          rules={[
            {
              required: true,
              message: '请输入排序',
            },
          ]}
          initialValue={formData?.sort}
        />

        <ProFormTextArea name="remark" label="备注" initialValue={formData?.tips} />

        {/* <PermissionTree /> */}
      </ModalForm>
    </>
  );
};

export default App;
