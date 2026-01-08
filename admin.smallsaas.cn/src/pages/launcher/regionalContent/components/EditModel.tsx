import { getAddAdminList, getArticleList, getPlaceContentSaveOrUpdate } from '@/api/launcher';
import { EModelType } from './ProTable';

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
import { suggestionType } from '../../learningTopic/components/EditModel';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}
export const centerType = [
  { label: '课程中心', value: 1, color: 'yellow' },
  { label: '学习中心', value: 2, color: 'blue' },
];
const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  const [form] = Form.useForm(); // 创建表单实例

  const [selectXuexiSourceId, setSelectXuexiSourceId] = useState<any>(formData?.xuexiSourceId);
  useEffect(() => {
    if (!createModalOpen) {
      console.log('formData11', formData?.xuexiSourceId);

      setSelectXuexiSourceId(null);
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
        clearOnDestroy
        title={`${type}地区内容`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (!!formData?.id) value.id = formData?.id;
          // 新增/编辑
          // 正文图片过滤
          if (value?.imgUrl[0]?.response?.data?.fileUrl) {
            value.imgUrl = value?.imgUrl[0]?.response?.data?.fileUrl;
          } else {
            value.imgUrl = value?.imgUrl[0]?.url;
          }

          const data = await getPlaceContentSaveOrUpdate(value);
          if (data.code === 0) {
            message.success(data.msg);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-REGIONALCONTENT');
          } else {
            message.success(data.msg);
          }
        }}
      >
        <ProFormSelect
          debounceTime={500}
          request={async (params) => {
            const { data } = await getAddAdminList({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 10, // 每页条数
              status: 1,
              centerType: 3,
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
          onChange={(value: any) => setSelectXuexiSourceId(value)}
          name="xuexiSourceId"
          label="学习源"
          initialValue={formData?.xuexiSourceId}
        />
        <ProFormSelect
          options={suggestionType}
          name="suggestionType"
          label="推荐类别"
          initialValue={formData?.suggestionType}
        />
        {/* {(selectXuexiSourceId || formData?.xuexiSourceId) && ( */}
        <div>
          <ProFormSelect
            disabled={!selectXuexiSourceId}
            debounceTime={500}
            // disabled={selectXuexiSourceId || formData?.xuexiSourceId}
            request={async (params) => {
              // 使用 request 获取选项数据
              const { data } = await getArticleList({
                pageNum: params.current || 1, // 当前页码
                pageSize: params.pageSize || 100, // 每页条数
                title: params.keyWords,
                xuexiSourceId: selectXuexiSourceId,
                // 你可以添加其他需要的查询参数
              });
              return data.list.map((item: any) => ({
                label: item.title,
                value: item.articleId,
                itemType: item.itemType,
                imgUrl: item.imgUrl,
                showSource: item.showSource,
                publishDate: item.publishDate,
                sort: item.sort,
                videoUrl: item.videoUrl,
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
                form.setFieldsValue({
                  title: option.title, // 设置标题
                  itemType: option.itemType, // 设置类型
                  itemTypeName: option.itemTypeName,
                  imgUrl: [{ url: option?.imgUrl }],
                  showSource: option.showSource,
                  publishDate: option.publishDate,
                  sort: option.sort,
                  videoUrl: option.videoUrl,
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
          <ProFormText name="title" label="标题" disabled initialValue={formData?.title} />
          <ProFormText
            name="itemType"
            label="类型"
            disabled
            initialValue={formData?.itemTypeName}
          />
          <ProFormText
            name="showSource"
            label="来源"
            disabled
            initialValue={formData?.showSource}
          />
          <ProFormText
            name="publishDate"
            label="发表时间"
            disabled
            initialValue={formData?.publishDate}
          />

          <ProFormText
            name="videoUrl"
            hidden
            label="videoUrl"
            disabled
            initialValue={formData?.videoUrl}
          />

          <ProFormDigit label="排序" name="sort" min={0} initialValue={formData?.sort} />
        </div>
        {/* )} */}
      </ModalForm>
    </>
  );
};

export default App;
