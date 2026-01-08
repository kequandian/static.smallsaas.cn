import { getMemberUpadta } from '@/api/launcher';
import { EModelType } from './ProTable';

import { getParytOrgTree, getProfessionList } from '@/api/partyOrg';
import ProImgCrop from '@/components/ProImgCrop';
import dayjs from 'dayjs';

import {
  EditableProTable,
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import Pubsub from 'pubsub-js';
import React, { useState } from 'react';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  const [form] = Form.useForm(); // 创建表单实例
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const columns_1: any = [
    {
      title: '学校',
      dataIndex: 'place',
    },
    {
      title: '时间',
      dataIndex: 'experienceDate',
    },
    {
      title: '学历',
      dataIndex: 'experienceLevel',
    },
    {
      title: '专业',
      dataIndex: 'profession',
    },
    {
      title: '操作',
      valueType: 'option',
    },
  ];
  const columns_2: any = [
    {
      title: '单位',
      dataIndex: 'place',
    },
    {
      title: '时间',
      dataIndex: 'experienceDate',
    },
    {
      title: '行业',
      dataIndex: 'experienceLevel',
    },
    {
      title: '职务',
      dataIndex: 'profession',
    },
    {
      title: '操作',
      valueType: 'option',
    },
  ];
  return (
    <>
      <ModalForm
        // width={'70%'}
        form={form} // 传递表单实例
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={`${type}`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          if (value?.headUrl[0]?.response?.data?.fileUrl) {
            value.headUrl = `${value?.headUrl[0]?.response?.data?.fileUrl}`;
          } else {
            value.headUrl = value?.headUrl[0]?.url;
          }
          value.isLeader = value?.isLeader ? 1 : 0;
          if (!!formData?.id) value.id = formData?.id;
          // 新增/编辑
          const data = await getMemberUpadta(value);
          if (data.code === 0) {
            console.log('党员新增/编辑', data, message);
            message.success(data.msg);

            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-PARTYMEMBER');
          }
        }}
      >
        {/* <ProFormUploadButton
            width={'md'}
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
            label="头像"
            name="headUrl"
            initialValue={formData?.headUrl ? [{ url: formData?.headUrl }] : []}
            action={UPLOAD_IMG}
          /> */}
        <ProForm.Group>
          <ProForm.Item label="头像上传" shouldUpdate>
            {(form) => {
              return (
                <ProForm.Item
                  name="headUrl"
                  initialValue={formData?.headUrl ? [{ url: formData?.headUrl }] : []}
                >
                  <ProImgCrop
                    imgUrl={formData?.headUrl}
                    cbUrl={(info) => {
                      form.setFieldsValue({ headUrl: info?.fileList });
                    }}
                  />
                </ProForm.Item>
              );
            }}
          </ProForm.Item>
        </ProForm.Group>
        <ProForm.Group>
          <ProFormTreeSelect
            width="md"
            debounceTime={500}
            request={async (params) => {
              const { data } = await getParytOrgTree({
                pageNum: params.current || 1, // 当前页码
                pageSize: params.pageSize || 10, // 每页条数
              });
              return data;
            }}
            fieldProps={{
              treeDefaultExpandAll: true,
              fieldNames: {
                label: 'name',
                value: 'id',
                children: 'childes',
              },
            }}
            rules={[
              {
                required: true,
                message: '请选择党组织',
              },
            ]}
            name="partyOrganizationId"
            label="党组织"
            initialValue={formData?.partyOrganizationId}
          />

          <ProFormText
            width="md"
            label="姓名"
            name="name"
            initialValue={formData?.name}
            rules={[
              {
                required: true,
                message: '请输入姓名',
              },
              {
                pattern: /^[\u4e00-\u9fa5]+$/,
                message: '只能输入中文',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="phone"
            label="手机号"
            initialValue={formData?.phone}
            rules={[
              {
                required: true,
                message: '请输入注册手机号！',
              },
              {
                pattern: /^1[0-9]{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="email"
            label="邮箱"
            initialValue={formData?.email}
            rules={[
              {
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/,
                message: '邮箱格式错误！',
              },
            ]}
          />

          <ProFormSelect
            mode="multiple"
            request={async (params) => {
              const { data } = await getProfessionList({
                pageNum: params.current || 1, // 当前页码
                pageSize: params.pageSize || 10, // 每页条数
              });
              return data;
            }}
            width="md"
            name="professionList"
            label="党内职务"
            initialValue={
              formData?.professionList?.map((profession: any) => ({
                ...profession,
                label: profession.profession,
                value: profession.professionCode,
              })) || []
            }
            fieldProps={{
              labelInValue: true,
              maxCount: 3,
              // autoClearSearchValue: true,
              fieldNames: {
                label: 'profession',
                value: 'professionCode',
              },
            }}
            rules={[
              {
                required: true,
                message: '请输入党内职务，可输入多个',
              },
            ]}
          />
          {/* <ProFormText
            width="md"
            label="党内职务"
            tooltip="多个职务用英文逗号隔开"
            name="profession"
            initialValue={formData?.profession}
            rules={[
              {
                required: true,
                message: '请输入党内职务，可输入多个',
              },
            ]}
          /> */}

          <ProFormText
            width="md"
            label="民族"
            name="nation"
            initialValue={formData?.nation}
            rules={[
              {
                pattern: /^[\u4e00-\u9fa5]+$/,
                message: '只能输入中文',
              },
            ]}
          />
          <ProFormDatePicker
            width="md"
            name="birthDate"
            initialValue={formData?.birthDate}
            label="出生日期"
            rules={[
              {
                required: true,
                message: '请输入出生日期',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const joinDate = getFieldValue('joinDate');
                  if (value && joinDate) {
                    const birthDate = dayjs(value);
                    const joinDateConverted = dayjs(joinDate);

                    if (birthDate.isAfter(joinDateConverted)) {
                      return Promise.reject(new Error('出生日期不能大于入党日期'));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          />

          <ProFormSelect
            width="md"
            options={[
              {
                label: '男',
                value: 1,
              },
              {
                label: '女',
                value: 2,
              },
            ]}
            name="sex"
            label="性别"
            initialValue={formData?.sex}
          />
          <ProFormDatePicker
            width="md"
            name="joinDate"
            initialValue={formData?.joinDate}
            label="入党时间"
            rules={[
              {
                required: true,
                message: '请输入党时间',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const birthDate = getFieldValue('birthDate');
                  if (value && birthDate) {
                    const birthDateConverted = dayjs(birthDate);
                    const joinDate = dayjs(value);

                    if (joinDate.isBefore(birthDateConverted)) {
                      return Promise.reject(new Error('入党日期不能早于出生日期'));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          />
          <ProFormText
            width="md"
            label="党员编号"
            name="memberCode"
            initialValue={formData?.memberCode}
          />
          {/* <ProFormSwitch
            width="md"
            name="isLeader"
            label="是否领导"
            initialValue={!!formData?.isLeader ?? false}
          /> */}
        </ProForm.Group>

        <ProForm.Item
          label="党员学历"
          name="educationalList"
          initialValue={formData?.educationalList}
          trigger="onValuesChange"
        >
          <EditableProTable<any>
            rowKey="key"
            locale={{ emptyText: null }}
            maxLength={3}
            toolBarRender={false}
            columns={columns_1}
            recordCreatorProps={{
              newRecordType: 'dataSource',
              position: 'top',
              record: () => ({
                key: Date.now(),
              }),
            }}
            editable={{
              type: 'multiple',
              editableKeys,
              onChange: setEditableRowKeys,
              actionRender: (row, _, dom) => {
                return [dom.delete];
              },
            }}
          />
        </ProForm.Item>
        <ProForm.Item
          label="党员社会经历"
          name="societyList"
          initialValue={formData?.societyList}
          trigger="onValuesChange"
        >
          <EditableProTable<any>
            locale={{ emptyText: null }}
            rowKey="key"
            maxLength={3}
            toolBarRender={false}
            columns={columns_2}
            recordCreatorProps={{
              newRecordType: 'dataSource',
              position: 'top',
              record: () => ({
                key: Date.now(),
              }),
            }}
            editable={{
              type: 'multiple',
              editableKeys,
              onChange: setEditableRowKeys,
              actionRender: (row, _, dom) => {
                return [dom.delete];
              },
            }}
          />
        </ProForm.Item>
      </ModalForm>
    </>
  );
};

export default App;
