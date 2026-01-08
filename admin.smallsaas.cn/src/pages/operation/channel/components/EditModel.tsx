import { postAddOperators, putEditOperators } from '@/api/operation';
import { useMeeting } from '@/hooks/useMeeting';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
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
  const { userAccountsList, getOrgUserList } = useMeeting();
  useEffect(() => {
    getOrgUserList();
  }, []);

  return (
    <>
      <ModalForm
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={`${type}渠道`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (!!formData?.id) {
            // 编辑
            const data = await putEditOperators(value, formData?.id);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-CHANNELLIST');
            }
          } else {
            // 新增
            const data = await postAddOperators(value);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-CHANNELLIST');
            }
          }
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="渠道名称"
          initialValue={formData?.name}
          rules={[
            {
              required: true,
              message: '请输入渠道名称',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="channelNumber"
          label="渠道编号"
          initialValue={formData?.channelNumber}
          rules={[
            {
              required: true,
              message: '请输入渠道编号',
            },
            {
              pattern: /^[^\u4e00-\u9fa5]+$/, // 不能包含中文字符
              message: '渠道名称不能包含中文字符',
            },
            {
              max: 15, // 最大长度为15
              message: '渠道名称不能超过15个字符',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="area"
          label="所属区域"
          initialValue={formData?.area}
          rules={[
            {
              required: true,
              message: '请输入所属区域',
            },
          ]}
        />
        <ProFormSelect
          width="md"
          request={async () =>
            userAccountsList.map((item: any) => {
              return {
                label: item.name,
                value: item.id,
              };
            })
          }
          rules={[
            {
              required: true,
              message: '请选择渠道负责人',
            },
          ]}
          name="managerId"
          label="渠道负责人"
          initialValue={formData?.managerId}
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
