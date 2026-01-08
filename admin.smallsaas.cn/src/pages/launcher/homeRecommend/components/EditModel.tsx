import {
  getAddAdminList,
  getCourseMasterList,
  getHomeSaveOrUpdate,
  getStudyTopicList,
} from '@/api/launcher';
import { EModelType } from './ProTable';

import { ModalForm, ProFormDigit, ProFormSelect } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import Pubsub from 'pubsub-js';
import React, { useEffect, useState } from 'react';

export const homeSelectType = [
  { label: '党务首页 ', value: 1, color: 'red' },
  { label: '党群首页', value: 2, color: 'cyan' },
  { label: '党组首页', value: 3, color: 'geekblue' },
  // { label: '宣传工作', value: 5, color: 'yellow' },
];
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
  const [selectCenterType, setSelectCenterType] = useState<any>();
  const [form] = Form.useForm(); // 创建表单实例

  useEffect(() => {
    if (createModalOpen) {
      setSelectCenterType(formData?.centerType || 1);
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
        title={`${type}首页推荐`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (!!formData?.id) value.id = formData?.id;
          // 新增/编辑
          const data = await getHomeSaveOrUpdate(value);
          if (data.code === 0) {
            message.success(data.msg);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-HOMERECOMMEND');
          } else {
            message.success(data.msg);
          }
        }}
      >
        <ProFormSelect
          options={centerType}
          name="centerType"
          label="中心类型"
          initialValue={formData?.centerType || selectCenterType}
          onChange={(value) => {
            console.log('value', value);

            setSelectCenterType(value);
            form.setFieldsValue({
              masterId: null,
              xuexiSourceName: null,
            });
          }}
          rules={[
            {
              required: true,
              message: '请选择中心类型',
            },
          ]}
        />

        {selectCenterType === 1 && (
          <ProFormSelect
            debounceTime={500}
            fieldProps={{
              showSearch: true,
            }}
            params={{ selectCenterType: selectCenterType }}
            request={async (params) => {
              console.log('params', params);

              const { data } = await getCourseMasterList({
                pageNum: params.current || 1, // 当前页码
                pageSize: params.pageSize || 100, // 每页条数
                status: 1,
                name: params.keyWords,
              });
              return data.list.map((item: any) => ({
                label: item.name,
                value: item.id,
                xuexiSourceId: item.xuexiSourceId,
              }));
            }}
            rules={[
              {
                required: true,
                message: '请选择课程专题',
              },
            ]}
            name="masterId"
            label="课程专题"
            initialValue={formData?.masterId}
            onChange={(v, o) => {
              form.setFieldsValue({
                xuexiSourceId: o.xuexiSourceId,
              });
            }}
          />
        )}
        {selectCenterType === 2 && (
          <ProFormSelect
            debounceTime={500}
            fieldProps={{
              showSearch: true,
            }}
            params={{ selectCenterType: selectCenterType }}
            request={async (params) => {
              console.log('params', params);

              const { data } = await getStudyTopicList({
                pageNum: params.current || 1, // 当前页码
                pageSize: params.pageSize || 100, // 每页条数
                status: 1,
                name: params.keyWords,
              });
              return data.list.map((item: any) => ({
                label: item.name,
                value: item.id,
                xuexiSourceId: item.xuexiSourceId,
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
            onChange={(v, o) => {
              form.setFieldsValue({
                xuexiSourceId: o.xuexiSourceId,
              });
            }}
          />
        )}
        <ProFormSelect
          debounceTime={500}
          request={async (params) => {
            const { data } = await getAddAdminList({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 10, // 每页条数
              status: 1,
              centerType: selectCenterType,
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
          // disabled
          hidden
          name="xuexiSourceId"
          label="学习源"
          initialValue={formData?.xuexiSourceId}
        />
        <ProFormSelect
          options={homeSelectType}
          name="suggestionType"
          label="配置首页"
          initialValue={formData?.suggestionType}
          rules={[
            {
              required: true,
              message: '请选择配置',
            },
          ]}
        />

        <ProFormDigit label="排序" name="sort" min={0} initialValue={formData?.sort} />
      </ModalForm>
    </>
  );
};

export default App;
