import {
  policyContentAdd,
  policyContentCategory,
  policyContentUpdate,
} from '@/services/mdm/policyContent';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import Pubsub from 'pubsub-js';
import React, { useEffect } from 'react';
import { EModelType } from './PolicyConfig';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

const PolicyConfigEditModel: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  const [form] = Form.useForm(); // 创建表单实例

  // 重置表单
  const resetForm = () => {
    form.resetFields();
  };

  // 监听modal状态变化
  useEffect(() => {
    if (createModalOpen && type === EModelType.ADD) {
      // 如果是添加模式，重置表单
      resetForm();
    }
  }, [createModalOpen, type]);

  // 提交前处理数据
  const handleSubmit = async (values: any) => {
    let submitValues = { ...values };

    if (formData?.id) {
      // 编辑
      const res = await policyContentUpdate({ ...submitValues, id: formData?.id });
      if (res.code === 200) {
        message.success(res.message);
        setCreateModalOpen(false);
        Pubsub.publish('UPDATE-POLICYCONTENT');
      }
    } else {
      // 新增
      const res = await policyContentAdd(submitValues);
      if (res.code === 200) {
        message.success(res.message);
        setCreateModalOpen(false);
        Pubsub.publish('UPDATE-POLICYCONTENT');
      }
    }
    return true;
  };

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
        onFinish={handleSubmit}
      >
        <ProFormText
          name="name"
          label="名称"
          initialValue={formData?.name}
          rules={[
            {
              required: true,
              message: '请输入名称',
            },
          ]}
        />
        <ProFormText
          name="identify"
          label="标识"
          initialValue={formData?.identify}
          rules={[
            {
              required: true,
              message: '请输入标识',
            },
          ]}
        />
        <ProFormSelect
          showSearch 
          request={async (params) => {
            const { data } = await policyContentCategory({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 100, // 每页条数
            });
            const tempList = data.map((item: any) => ({
              label: item.name,
              value: item.code,
            }));
            const { keyWords } = params;
            if (keyWords) {
              tempList.push({ label: keyWords, value: keyWords });
            }
            return tempList;
          }}
          rules={[
            {
              required: true,
              message: '请选择分类标识',
            },
          ]}
          name="category"
          label="分类标识"
          initialValue={formData?.category}
        />
      </ModalForm>
    </>
  );
};

export default PolicyConfigEditModel;
