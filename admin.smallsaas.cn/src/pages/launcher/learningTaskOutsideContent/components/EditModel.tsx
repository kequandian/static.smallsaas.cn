import { getStudyTopicList } from '@/api/launcher';
import { learningTaskOutsideContentUpdate } from '@/api/learningTaskOutside';
import { ModalForm, ProFormSelect } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import Pubsub from 'pubsub-js';
import React from 'react';
import { EModelType } from './ProTable';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
  fatherItem?: any;
}

const App: React.FC<Props> = ({
  createModalOpen,
  setCreateModalOpen,
  formData,
  type,
  fatherItem,
}) => {
  const [form] = Form.useForm(); // 创建表单实例
  return (
    <>
      <ModalForm
        form={form} // 传递表单实例
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
          value.taskId = fatherItem?.id;

          // 新增/编辑
          const data = await learningTaskOutsideContentUpdate(value);
          if (data.code === 0) {
            message.success(data.msg);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-LEARNINGTASKOUTSIDECONTENT');
          } else {
            message.error(data.msg); // 更正错误提示
          }
        }}
      >
        <ProFormSelect
          debounceTime={500}
          request={async (params) => {
            const { data } = await getStudyTopicList({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 10, // 每页条数
              status: 1,
            });
            return data.list.map((item: any) => ({
              label: item.name,
              value: item.id,
            }));
          }}
          rules={[
            {
              required: true,
              message: '请选择学习专题',
            },
          ]}
          name="masterId"
          label="学习专题"
          initialValue={formData?.masterId}
        />
      </ModalForm>
    </>
  );
};

export default App;
