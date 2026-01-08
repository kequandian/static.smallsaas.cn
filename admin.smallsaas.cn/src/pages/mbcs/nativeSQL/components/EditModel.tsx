import { getAddDosqlList, getEditDosqlList } from '@/api/mbcs';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
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
          if (!!formData?.id) {
            // 编辑
            const data = await getEditDosqlList(value, formData?.id);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-NATIVESQL');
            }
          } else {
            // 新增
            const params = {
              ...formData,
              ...value,
            };
            const data = await getAddDosqlList(params);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-NATIVESQL');
            }
          }
        }}
      >
        <ProFormText
          name="fieldName"
          label="服务标识"
          initialValue={formData?.fieldName}
          rules={[
            {
              required: true,
              message: '请输入服务标识！',
            },
            {
              pattern: /^[a-zA-Z0-9]+$/,
              message: '只能输入字母和数字且不能有空格！',
            },
          ]}
        />

        <ProFormTextArea
          name="sql"
          tooltip="请填写标准的SQL语句"
          label="SQL语句"
          initialValue={formData?.sql}
          rules={[
            {
              required: true,
              message: '请输入SQL语句！',
            },
          ]}
          fieldProps={{
            autoSize: { minRows: 5, maxRows: 10 },
          }}
        />

        <ProFormTextArea name="note" label="说明" initialValue={formData?.note} />
      </ModalForm>
    </>
  );
};

export default App;
