import { getArticleList, getXuexiSourceTaskaveOrUpdate } from '@/api/launcher';
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
import React, { useEffect, useState } from 'react';
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
  const [activearticle, setActivearticle] = useState<any>({});
  // const { userNotSourceList, onUserNotSourceList } = useLauncher();
  const [form] = Form.useForm(); // 创建表单实例

  useEffect(() => {
    // onUserNotSourceList();
  }, []);

  useEffect(() => {
    if (!createModalOpen) {
      setActivearticle({});
    }
  }, [createModalOpen]);

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
        title={`${type}学习任务`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (!!formData?.id) value.id = formData?.id;
          // 正文图片过滤
          if (value?.imgUrl[0]?.response?.data?.fileUrl) {
            value.imgUrl = value?.imgUrl[0]?.response?.data?.fileUrl;
          } else {
            value.imgUrl = value?.imgUrl[0]?.url;
          }

          value.xuexiMasterId = fatherItem?.id;
          value.xuexiSourceId = fatherItem?.xuexiSourceId;

          const data = await getXuexiSourceTaskaveOrUpdate(value);
          if (data.code === 0) {
            message.success(data.msg);
            setCreateModalOpen(false);
            setActivearticle({});
            Pubsub.publish('UPDATE-LEARNINGTASKSLIST');
          } else {
            message.error(data.msg); // 更正错误提示
          }
        }}
      >
        <ProFormSelect
          debounceTime={500}
          request={async (params) => {
            // 使用 request 获取选项数据
            const { data } = await getArticleList({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 100, // 每页条数
              title: params.keyWords,
              xuexiSourceId: fatherItem?.xuexiSourceId,

              // 你可以添加其他需要的查询参数
            });
            return data.list.map((item: any) => ({
              label: item.title,
              value: item.articleId,
              itemType: item.itemType,
              imgUrl: item.imgUrl,
              publishDate: item.publishDate,
            }));
          }}
          rules={[
            {
              required: true,
              message: '请选择正文',
            },
          ]}
          name="articleId"
          label="正文"
          initialValue={formData?.articleId}
          fieldProps={{
            showSearch: true,
            labelInValue: false,
            autoClearSearchValue: true,
            onSelect: (value: any, option: any) => {
              console.log(value, option);
              setActivearticle(option);
              console.log(option);

              form.setFieldsValue({
                title: option.title, // 设置标题
                itemType: option.itemType, // 设置类型
                publishDate: option.publishDate,
                itemTypeName: option.itemTypeName,
                imgUrl: [{ url: option?.imgUrl }],
              });
            },
          }}
        />
        <ProFormUploadButton
          accept="正文选择后带出，无需上传" // 限制上传文件类型
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
        />
        <ProFormText
          name="title"
          label="标题"
          disabled
          initialValue={formData?.title || activearticle?.label}
        />
        <ProFormText
          name="itemType"
          label="类型"
          disabled
          initialValue={formData?.itemTypeName || activearticle?.itemTypeName}
        />
        <ProFormText
          name="publishDate"
          label="发布时间"
          disabled
          initialValue={formData?.publishDate || activearticle?.publishDate}
        />
        <ProFormDigit label="排序" name="sort" min={0} initialValue={formData?.sort} />
      </ModalForm>
    </>
  );
};

export default App;
