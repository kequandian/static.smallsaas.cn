import { postEditMeetingNumberGateway, postMeetingNumberGateway } from '@/api/meeting';
import { useTheServer } from '@/hooks/useTheServer';
import { ModalForm, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
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
  const { theServerLis, operatorList, getTheServerListApi, getOperatorListApi } = useTheServer();
  useEffect(() => {
    getTheServerListApi();
    getOperatorListApi();
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
        title={`${type}路由配置`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (!!formData?.id) {
            // 编辑
            const data = await postEditMeetingNumberGateway(value, formData?.id);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-MEETINGNUMROUTING');
            }
          } else {
            // 新增
            const data = await postMeetingNumberGateway(value);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-MEETINGNUMROUTING');
            }
          }
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="matchPrefix"
            label="会议号段"
            initialValue={formData?.matchPrefix}
            rules={[
              {
                required: true,
                message: '请输入会议号段',
              },
            ]}
          />

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
        </ProForm.Group>

        <ProFormSelect
          width="md"
          // options={theServerLis}
          request={async () =>
            operatorList.map((item: any) => {
              return {
                label: item.name,
                value: item.id,
              };
            })
          }
          rules={[
            {
              required: true,
              message: '请选择运营商',
            },
          ]}
          name="channelId"
          label="运营商"
          initialValue={formData?.channelId}
        />
      </ModalForm>
    </>
  );
};

export default App;
