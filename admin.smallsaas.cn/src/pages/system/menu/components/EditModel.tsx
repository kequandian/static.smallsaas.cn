import { getMenuAdd, getMenuEdit } from '@/api/menu';
import { getGroupByList } from '@/api/roles';
import {
  ModalForm,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
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
        title={`${type}`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          console.log(value, !!formData?.id);
          if (!!formData?.pid) {
            value.pid = formData?.pid;
          }
          if (!!formData?.id) {
            // 编辑
            const data = await getMenuEdit(value, formData?.id);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-MENULIST');
            }
          } else {
            // 新增
            const data = await getMenuAdd(value);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-MENULIST');
            }
          }
        }}
      >
        <ProFormText
          name="name"
          label="菜单名称"
          initialValue={formData?.name}
          rules={[
            {
              required: true,
              message: '请输入菜单名称',
            },
          ]}
        />
        <ProFormText
          name="path"
          label="path路径"
          initialValue={formData?.path}
          rules={[
            {
              required: true,
              message: '请输入path路径',
            },
          ]}
        />
        <ProFormText
          name="component"
          label="component路径"
          tooltip="低代码菜单固定'./lowPage'"
          initialValue={formData?.component}
        />
        <ProFormTreeSelect
          label="菜单权限设置"
          name="permId"
          allowClear
          secondary
          request={async () => {
            const res = await getGroupByList();
            const mapMenuItems = (items: any[]): any[] => {
              return items.map((item: any) => {
                return {
                  label: item?.name,
                  value: item?.id,
                  disabled: !!item?.children,
                  children: item?.children ? mapMenuItems(item.children) : undefined,
                };
              });
            };
            return res?.data?.children ? mapMenuItems(res.data.children) : [];
          }}
          fieldProps={{
            // labelInValue: true,
            treeDefaultExpandAll: true,
          }}
          initialValue={formData?.permId}
        />

        <ProFormText name="icon" label="图标" initialValue={formData?.icon} />
        <ProFormDigit name="sort" label="排序" initialValue={formData?.sort} />
        <ProFormSwitch
          name="hideInMenu"
          label="是否隐藏菜单"
          initialValue={!!formData?.hideInMenu ?? false}
        />
      </ModalForm>
    </>
  );
};

export default App;
