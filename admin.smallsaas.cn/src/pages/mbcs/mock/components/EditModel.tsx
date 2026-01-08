import { getTheServerAdd, getTheServerEdit } from '@/api/theServer';
import { IPV4Single, PORTSingle } from '@/utils/rules';
import { ModalForm, ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
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
        disabled={type === EModelType.CHECK}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={`${type}服务器`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          console.log(value, !!formData?.id);
          if (!!formData?.id) {
            // 编辑
            const data = await getTheServerEdit(value, formData?.id);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-THESERVERLIST');
            }
          } else {
            // 新增
            const data = await getTheServerAdd(value);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-THESERVERLIST');
            }
          }
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="服务器名称"
            initialValue={formData?.name}
            rules={[
              {
                required: true,
                message: '服务器名称',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="ip"
            label="IP地址"
            initialValue={formData?.ip}
            rules={[
              {
                required: true,
                message: '请输入IP地址！',
              },
              {
                pattern: IPV4Single,
                message: 'IP地址格式错误！',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="sipPort"
            label="管理端口"
            initialValue={formData?.sipPort}
            rules={[
              {
                required: true,
                message: '请输入管理端口！',
              },
              {
                pattern: PORTSingle,
                message: '管理端口格式错误！',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="portalPort"
            label="媒体端口"
            initialValue={formData?.portalPort}
            rules={[
              {
                required: true,
                message: '请输入媒体端口！',
              },
              {
                pattern: PORTSingle,
                message: '媒体端口格式错误！',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="multiMtgPref"
            label="多方会议前缀"
            initialValue={formData?.multiMtgPref}
            rules={[
              {
                required: true,
                message: '请输入多方会议前缀！',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="location"
            label="机房"
            initialValue={formData?.location}
            placeholder={''}
          />
          <ProFormText
            width="md"
            name="hostname"
            label="服务器域名"
            initialValue={formData?.hostname}
            placeholder={''}
          />
        </ProForm.Group>
        {/*  */}
        <ProForm.Group>
          <ProFormTextArea
            width="xl"
            name="notes"
            label="备注"
            initialValue={formData?.notes ?? ''}
            placeholder={''}
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};

export default App;
