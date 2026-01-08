import { getAddAdminList, getStudyTopicSaveOrUpdate } from '@/api/launcher';
import cache from '@/utils/cache';
import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
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

export const suggestionType = [
  { label: '精选 ', value: 1 },
  { label: '条目', value: 2 },
  { label: '条目侧图', value: 3 },
  // { label: '品牌课程', value: 4 },
  // { label: '微课程', value: 5 },
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
        title={`${type}学习专题`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (value?.imgUrl[0]?.response?.data?.fileUrl) {
            value.imgUrl = value?.imgUrl[0]?.response?.data?.fileUrl;
          } else {
            value.imgUrl = value?.imgUrl[0]?.fileUrl;
          }
          if (!!formData?.id) value.id = formData?.id;
          // 新增/编辑
          const data = await getStudyTopicSaveOrUpdate(value);
          if (data.code === 0) {
            message.success(data.msg);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-STUDYTOPIC');
          } else {
            message.error(data.msg); // 更正错误提示
          }
        }}
      >
        <ProFormSelect
          debounceTime={500}
          request={async (params) => {
            // 使用 request 获取选项数据
            const { data } = await getAddAdminList({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 10, // 每页条数
              status: 1,
              centerType: 1,

              // title: params.keyWords,
              // 你可以添加其他需要的查询参数
            });
            return data.list.map((item: any) => ({
              label: item.name,
              value: item.id,
            }));
          }}
          rules={[
            {
              required: true,
              message: '请选择学习源',
            },
          ]}
          name="xuexiSourceId"
          label="学习源"
          initialValue={formData?.xuexiSourceId}
        />

        <ProFormText name="name" label="名称" initialValue={formData?.name} />
        <ProFormUploadButton
          accept=".jpg,.jpeg,.png,.svg" // 限制上传文件类型
          tooltip="支持jpg、png、svg格式"
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
            multiple: false,
            headers: {
              Authorization: `Bearer ${cache.getToken()}`,
            },
          }}
          max={1}
          label="图片"
          name="imgUrl"
          initialValue={formData?.imgUrl ? [{ url: formData?.imgUrl }] : []}
          action={UPLOAD_IMG}
          rules={[
            {
              required: true,
              message: '请上传图片!',
            },
          ]}
        />
        <ProFormSelect
          options={suggestionType}
          name="suggestionType"
          label="推荐类别"
          initialValue={formData?.suggestionType}
        />
        <ProFormText name="taskNum" label="课时数量" initialValue={formData?.taskNum} />
        <ProFormDigit label="排序" name="sort" min={0} initialValue={formData?.sort} />
        <ProFormText name="info" label="备注" initialValue={formData?.info} />
      </ModalForm>
    </>
  );
};

export default App;
