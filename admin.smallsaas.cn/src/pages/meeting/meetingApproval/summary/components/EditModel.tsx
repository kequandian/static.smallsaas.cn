import { addUsingPost1, updateUsingPut4 } from '@/services/topics/pingtaiyitiguanli';
import { pageUsingGet4 } from '@/services/topics/pingtaiyitimoban';
import cache from '@/utils/cache';
import {
  ModalForm,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import Pubsub from 'pubsub-js';
import React from 'react';
import { EModelType } from './ProTable';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

export const typeOptions = [
  {
    label: '党组织',
    value: 1,
  },
  {
    label: '机关单位',
    value: 2,
  },
  {
    label: '企事业',
    value: 3,
  },
];
const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
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
          if (value.attachmentUrl[0]?.response?.data?.fullPath) {
            value.attachmentUrl = value.attachmentUrl[0]?.response?.data?.fullPath;
          } else {
            value.attachmentUrl = value.attachmentUrl[0]?.fullPath;
          }

          if (formData?.id) {
            // 编辑
            const res = await updateUsingPut4({ ...value, id: formData?.id });
            if (res.code === 200) {
              message.success(res.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-TOPICS');
            } else {
              message.error(res.message);
            }
          } else {
            // 新增
            const res = await addUsingPost1(value);
            if (res.code === 200) {
              message.success(res.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-TOPICS');
            } else {
              message.error(res.message);
            }
          }
        }}
      >
        <ProFormText
          name="title"
          label="议题名称"
          initialValue={formData?.title}
          rules={[
            {
              required: true,
              message: '请输入议题名称',
            },
          ]}
        />
        <ProFormUploadDragger
          max={1}
          label="上传附件"
          // accept=".apk,.exe"
          name="attachmentUrl"
          action={UPLOAD_FILES}
          rules={[
            {
              required: true,
              message: '请上传文件',
            },
          ]}
          // tooltip="支持apk/exe格式文件"
          description="单次上传"
          initialValue={
            formData?.attachmentUrl ? [{ url: formData?.attachmentUrl, name: '附件' }] : []
          }
          fieldProps={{
            name: 'file',
            maxCount: 1,
            headers: {
              Authorization: `Bearer ${cache.getToken()}`,
            },
          }}
          onChange={(info) => {
            if (info.file.status === 'done') {
              // 保留小数点后面类型 //cf5cb848c14f49eb87838b731c03489d.svg
              const fileType = info?.file?.response?.data?.fileUrl;
              form.setFieldsValue({
                fileType: fileType.split('.').pop(),
              });
            }
          }}
        />

        <ProFormSelect
          debounceTime={500}
          request={async (params) => {
            const { data } = await pageUsingGet4({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 100, // 每页条数
            });
            return data?.records?.map((item: any) => ({
              label: item.name,
              value: item.id,
            }));
          }}
          rules={[
            {
              required: true,
              message: '请选择议题模版',
            },
          ]}
          name="templateId"
          label="议题模版"
          initialValue={[formData?.templateId]}
        />

        <ProFormList
          name="subIssues"
          initialValue={
            formData?.subIssues || [
              {
                title: '',
              },
            ]
          }
          creatorButtonProps={{
            position: 'bottom',
            creatorButtonText: '新增子议题',
          }}
        >
          <ProFormText width="md" name="title" label="子议题列表" />
        </ProFormList>
      </ModalForm>
    </>
  );
};

export default App;
