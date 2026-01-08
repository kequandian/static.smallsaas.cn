import { courseSaveOrUpdate, getArticleList, launcherFileUpload } from '@/api/launcher';
import { EModelType } from './ProTable';

import cache from '@/utils/cache';
import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormUploadButton,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import Pubsub from 'pubsub-js';
import React, { useEffect, useState } from 'react';

// const baseUrl = REACT_APP_ENV === 'prod' ? LAUNCHER_API_URL : '/launcherV1';

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
  const [courseType, setCourseType] = useState<any>(null);
  useEffect(() => {
    if (createModalOpen) {
      setCourseType(formData?.courseType);
    } else {
      setCourseType(null);
    }
  }, [createModalOpen]);

  // 自定义上传
  const onCustomRequest = (file: any) => {
    const formData = new FormData();
    formData.append('file', file.file);
    // 用自己的接口
    launcherFileUpload(formData).then((res: any) => {
      console.log(res);
      if (res.code === 0) {
        // 调用组件内方法, 设置为成功状态
        file.onSuccess(res, file.file);
        file.status = 'done';
        // setFileData(res.data);
      } else {
        file.onError();
        file.status = 'error';
      }
    });
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
        title={`${type}课程内容`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          value.status = value.status ? 1 : 0;

          value.courseMasterId = fatherItem?.id;
          value.xuexiSourceId = fatherItem?.xuexiSourceId;

          if (value.fileList) {
            value.fileList = value.fileList.map((item: any) => {
              console.log(item?.response?.data.url);
              return item?.response?.data?.fileUrl;
            });
          }
          // 正文图片过滤
          if (value?.imgUrl[0]?.response?.data?.fileUrl) {
            value.imgUrl = value?.imgUrl[0]?.response?.data?.fileUrl;
          } else {
            value.imgUrl = value?.imgUrl[0]?.url;
          }

          value.courseMasterId = fatherItem?.id;
          if (!!formData?.id) value.id = formData?.id;
          // 新增/编辑
          const data = await courseSaveOrUpdate(value);
          if (data.code === 0) {
            message.success(data.msg);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-COURSECONTENT');
          } else {
            message.success(data.msg);
          }
        }}
      >
        <ProFormSelect
          options={[
            { label: '平台拉取 ', value: 'platform' },
            { label: '自定义上传', value: 'custom' },
          ]}
          name="courseType"
          label="类型"
          initialValue={formData?.courseType || 'platform'}
          onChange={(value) => setCourseType(value)}
          rules={[
            {
              required: true,
              message: '请选择类型',
            },
          ]}
        />

        {courseType === 'custom' ? (
          <div>
            <ProFormUploadDragger
              max={10}
              // accept="pdf"
              accept=".pdf"
              label="自定义上传"
              tooltip="只支持pdf格式！"
              name="fileList"
              // action={UPLOAD_IMG}
              fieldProps={{
                customRequest: (file: any) => onCustomRequest(file),
              }}
              rules={[
                {
                  required: true,
                  message: '请上传文件',
                },
              ]}
            />
            <ProFormText name="title" label="标题" initialValue={formData?.title} />
          </div>
        ) : (
          <div>
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
                  itemTypeName: item.itemTypeName,
                  publishDate: item.publishDate,
                  imgUrl: item?.imgUrl,
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
                  form.setFieldsValue({
                    title: option.title,
                    itemType: option.itemType,
                    itemTypeName: option.itemTypeName,
                    publishDate: option.publishDate,
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
            <ProFormText name="title" label="标题" disabled initialValue={formData?.title} />

            <ProFormText
              name="itemType"
              label="itemType"
              disabled
              initialValue={formData?.itemTypeName}
            />
            <ProFormText
              name="publishDate"
              label="发布时间"
              disabled
              initialValue={formData?.publishDate}
            />
          </div>
        )}

        <ProFormDigit label="排序" name="sort" min={0} initialValue={formData?.sort} />
        <ProFormSwitch
          name="status"
          tooltip="禁用/启用"
          label="状态"
          initialValue={formData?.status}
        />
      </ModalForm>
    </>
  );
};

export default App;
