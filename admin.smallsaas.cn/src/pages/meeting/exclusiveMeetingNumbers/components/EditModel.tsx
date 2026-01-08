import { postEditExclusiveMeetingNumbers, postExclusiveMeetingNumbers } from '@/api/meeting';
import { useTheServer } from '@/hooks/useTheServer';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import React, { useEffect } from 'react';
import { EModelType } from './ProTable';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  const { theServerLis, getTheServerListApi } = useTheServer();
  useEffect(() => {
    getTheServerListApi();
  }, []);
  return (
    <>
      <ModalForm
        disabled={type === EModelType.CHECK}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={`${type}专用会议号`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (!!formData?.id) {
            // 编辑
            const data = await postEditExclusiveMeetingNumbers(value, formData?.id);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-EXCLUSIVEMEETINGNUMBERS');
            }
          } else {
            // 新增
            const data = await postExclusiveMeetingNumbers(value);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-EXCLUSIVEMEETINGNUMBERS');
            }
          }
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="meetingNumber"
            label="专属会议号"
            initialValue={formData?.meetingNumber}
            rules={[
              {
                required: true,
                message: '请输入专属会议号',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="purpose"
            label="用途"
            initialValue={formData?.purpose}
            rules={[
              {
                required: true,
                message: '请输入用途',
              },
            ]}
          />
        </ProForm.Group>
        <ProFormSelect
          width="md"
          // options={theServerLis}
          request={async () =>
            theServerLis.map((item: any) => {
              return {
                label: item.name,
                value: item.id,
              };
            })
          }
          rules={[
            {
              required: true,
              message: '请输入服务器ID',
            },
          ]}
          name="serverId"
          label="服务器"
          initialValue={formData?.serverId}
        />
        <ProFormTextArea
          name="note"
          label="备注"
          initialValue={formData?.note ?? ''}
          placeholder={''}
        />
      </ModalForm>
    </>
  );
};

export default App;
