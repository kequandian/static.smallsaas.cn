import { getArticleList, getSaveOrUpdate } from '@/api/launcher';
import cache from '@/utils/cache';
import {
  ModalForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { EModelType } from './ProTable';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

export const bannerSelectType = [
  { label: '学习首页 ', value: 1, color: '#9254de' },
  { label: '党务首页 ', value: 2, color: '#f50' },
  { label: '党群首页', value: 3, color: '#2db7f5' },
  { label: '组织首页', value: 4, color: '#87d068' },
  // { label: '宣传工作', value: 5, color: 'yellow' },
];
const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  const [bannerType, setBannerType] = useState<any>(null);
  const [activearticle, setActivearticle] = useState<any>({});
  const [form] = Form.useForm(); // 创建表单实例

  useEffect(() => {
    if (createModalOpen) {
      setBannerType(formData?.type);
    } else {
      setBannerType(null);
      setActivearticle({});
    }
  }, [createModalOpen]);

  return (
    <>
      <ModalForm
        form={form} // 传递表单实例
        width={'40%'}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {
            // setBannerType(null);
          },
        }}
        title={`${type}`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          value.status = value.status ? 1 : 0;

          if (value?.imgUrl[0]?.response?.data?.fileUrl) {
            value.imgUrl = value?.imgUrl[0]?.response?.data?.fileUrl;
          } else {
            value.imgUrl = value?.imgUrl[0]?.fileUrl;
          }

          if (!!formData?.id) value.id = formData?.id;

          // 编辑
          const data = await getSaveOrUpdate(value);
          if (data.code === 0) {
            message.success(data.msg);
            setCreateModalOpen(false);
            PubSub.publish('UPDATE-BANNERLIST');
          } else {
            message.success(data.msg);
          }
        }}
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
          // 1党务首页 2党群首页 3组织首页
          options={bannerSelectType}
          name="type"
          label="类型"
          initialValue={formData?.type}
          onChange={(value) => {
            setBannerType(value);
            // form.setFieldsValue({
            //   type: value, // 设置类型
            // });
          }}
          rules={[
            {
              required: true,
              message: '请选择类型',
            },
          ]}
        />
        {/* {bannerType === 'feature' && ( */}
        <ProFormText name="route" label="跳转路由" initialValue={formData?.route} />
        {/* )} */}
        {/* {bannerType === 'carousel' && ( */}
        <ProFormSelect
          debounceTime={500}
          request={async (params) => {
            // 使用 request 获取选项数据
            const { data } = await getArticleList({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 100, // 每页条数
              title: params.keyWords,
              // 你可以添加其他需要的查询参数
            });
            return data.list.map((item: any) => ({
              label: item.title,
              value: item.articleId,
              itemType: item.itemType,
              itemTypeName: item.itemTypeName,
              publishDate: item.publishDate,
              showSource: item.showSource,
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
              form.setFieldsValue({
                title: option.title, // 设置标题
                itemType: option.itemType, // 设置类型
                itemTypeName: option.itemTypeName,
                publishDate: option.publishDate,
                showSource: option.showSource,
              });
            },
          }}
        />
        {/* )} */}
        {/* {bannerType === 'carousel' && ( */}
        <ProFormText
          name="title"
          label="标题"
          disabled
          initialValue={formData?.title || activearticle?.label}
        />
        {/* )} */}
        {/* {bannerType === 'carousel' && ( */}
        <ProFormText
          name="itemType"
          label="类型"
          disabled
          initialValue={formData?.itemTypeName || activearticle?.itemTypeName}
        />
        {/* )} */}
        <ProFormText
          name="publishDate"
          label="发布时间"
          disabled
          initialValue={formData?.publishDate || activearticle?.publishDate}
        />
        <ProFormText
          name="showSource"
          label="来源"
          disabled
          initialValue={formData?.showSource || activearticle?.showSource}
        />
        <ProFormText
          name="sort"
          label="排序"
          initialValue={formData?.sort}
          rules={[
            {
              required: true,
              message: '请输入排序',
            },
          ]}
        />
        <ProFormSwitch
          name="status"
          tooltip="禁用/启用"
          label="状态"
          initialValue={formData?.status ?? false}
        />
        <ProFormTextArea name="info" label="说明" initialValue={formData?.info} />
      </ModalForm>
    </>
  );
};

export default App;
