import { getUsersEdit } from '@/api/enduser';
import { getSysOrgList, getTheServerAdd } from '@/api/theServer';
import { ModalForm, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import React from 'react';
import { EModelType, userTypeList } from './ProTable';

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
        disabled={type === EModelType.CHECK}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={`${type}终端用户`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          console.log(value, !!formData?.id);
          if (!!formData?.id) {
            // 编辑
            const data = await getUsersEdit(value, formData?.id);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              // Pubsub.publish('UPDATE-THESERVERLIST');
            }
          } else {
            // 新增
            const data = await getTheServerAdd(value);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              // Pubsub.publish('UPDATE-THESERVERLIST');
            }
          }
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="终端用户名称"
            initialValue={formData?.name}
            rules={[
              {
                required: true,
                message: '请输入终端用户名称！',
              },
            ]}
          />
          <ProFormText.Password
            width="md"
            name="password"
            hidden
            disabled
            label="终端用户密码"
            initialValue={formData?.password}
            rules={[
              {
                required: true,
                message: '请输入终端用户密码！',
              },
            ]}
          />

          <ProFormText
            width="md"
            name="registeredPhone"
            label="注册手机号"
            disabled
            initialValue={formData?.registeredPhone}
          // rules={[
          //   {
          //     required: true,
          //     message: '请输入注册手机号！',
          //   },
          //   {
          //     pattern: /^1[0-9]{10}$/,
          //     message: '手机号格式错误！',
          //   },
          // ]}
          />
          <ProFormText
            width="md"
            name="registeredEmail"
            label="注册邮箱"
            hidden
            disabled
            initialValue={formData?.registeredEmail}
          // rules={[
          //   {
          //     required: true,
          //     message: '请输入注册邮箱！',
          //   },
          //   {
          //     pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/,
          //     message: '注册邮箱格式错误！',
          //   },
          // ]}
          />

          <ProFormSelect.SearchSelect
            rules={[
              {
                required: true,
                message: '请输入终端用户类型！',
              },
            ]}
            options={userTypeList()}
            width="md"
            name="userTypeLis"
            label="终端用户类型"
            initialValue={formData?.userTypeList}
            fieldProps={{
              labelInValue: false,
              autoClearSearchValue: true,
            }}
          />

          <ProFormSelect.SearchSelect
            mode="single"
            rules={[
              {
                required: true,
                message: '请选择组织！',
              },
            ]}
            request={async (params) => {
              // 使用 request 获取选项数据
              const { data } = await getSysOrgList({
                pageNum: params.current || 1, // 当前页码
                pageSize: 1000, // 每页条数
              });
              return data.records.map((item: any) => ({
                label: item.name,
                value: item.id,
              }));
            }}
            width="md"
            name="orgId"
            label="分配组织"
            initialValue={formData?.orgId}
            fieldProps={{
              showSearch: true,
              labelInValue: false,
              autoClearSearchValue: true,
            }}
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};

export default App;
