import { addVideoChannel, editVideoChannel } from '@/api/akstreamnvr';
import { BetaSchemaForm, ModalForm } from '@ant-design/pro-components';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import React from 'react';
import { driveFormConfig } from '../config/driveFormConfig';
import '../index.scss';
import { EModelType } from './ProTable';
interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  console.log(formData);

  return (
    <>
      <ModalForm
        // mode="single"
        width={600}
        layout={'horizontal'}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        grid
        // colProps={{ xs: 12 }}
        initialValues={formData}
        disabled={type === EModelType.CHECK}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={`${type}设备`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          console.log(value, !!formData?.id);
          if (!!formData?.id) {
            // 编辑
            const data = await editVideoChannel(value, formData?.mainId);
            // if (data.code === 200) {
            message.success(data.message || '修改成功');
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-AKSTREAMNVRLIST');
            // }
          } else {
            // 新增
            const res = await addVideoChannel(value);
            if (res.data.id && res.data.id > 0) {
              message.success(res.message || '添加成功');

              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-AKSTREAMNVRLIST');
            }
          }
        }}
      >
        <BetaSchemaForm layoutType="Embed" columns={driveFormConfig} />
      </ModalForm>
    </>
  );
};

export default App;
