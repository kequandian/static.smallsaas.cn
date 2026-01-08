import { getEquipmentList } from '@/api/equipment';
import { postMeetingAgendasBooking, postMeetingCategorys } from '@/api/meeting';
import { getTheServerEdit } from '@/api/theServer';
import {
  ModalForm,
  ProForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { EModelType } from './ProTable';

import { Form, message } from 'antd';
import Pubsub from 'pubsub-js';
import React from 'react';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

export enum RegularMeetingType {
  NOT_REPEAT = '不重复',
  WEEK = '每周重复',
  MONTH = '每月重复',
  WORKING_DAY = '每个工作日重复',
}

const regularMeetingTypeData = [
  {
    label: RegularMeetingType.NOT_REPEAT,
    value: 'NOT_REPEAT',
  },
  {
    label: RegularMeetingType.WEEK,
    value: 'WEEK',
  },
  {
    label: RegularMeetingType.MONTH,
    value: 'MONTH',
  },
  {
    label: RegularMeetingType.WORKING_DAY,
    value: 'WORKING_DAY',
  },
];
const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  const [form] = Form.useForm(); // 创建表单实例

  const now = dayjs();
  const validateMeetingTime = (
    rule: any,
    value: dayjs.Dayjs | undefined,
    callback: (error?: string) => void,
  ) => {
    if (!value || value.isBefore(now)) {
      callback('会议预约时间不能早于当前时间');
    } else {
      callback();
    }
  };

  const validateEndTime = (
    rule: any,
    value: dayjs.Dayjs | undefined,
    callback: (error?: string) => void,
  ) => {
    const startTime = form?.getFieldValue('meetingStartTime');
    if (!value || !startTime || value.isBefore(dayjs(startTime))) {
      callback('会议预约结束时间不能早于开始时间');
    } else {
      callback();
    }
  };
  return (
    <>
      <ModalForm
        form={form} // 传递表单实例
        disabled={type === EModelType.CHECK}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={`${type}预约会议`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          console.log(value, !!formData?.id);
          if (!!formData?.id) {
            // 编辑
            const data = await getTheServerEdit(value, formData?.id);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-MEETINGORDERLIST');
            }
          } else {
            // 新增
            const data = await postMeetingAgendasBooking(value);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-MEETINGORDERLIST');
            }
          }
        }}
      >
        <ProForm.Group>
          <ProFormSelect
            width={'md'}
            debounceTime={500}
            showSearch
            request={async (params) => {
              const { data } = await getEquipmentList({
                pageNum: params.current || 1, // 当前页码
                pageSize: params.pageSize || 100, // 每页条数
              });
              return data.records.map((item: any) => ({
                label: item.name,
                value: item.deviceId,
              }));
            }}
            rules={[
              {
                required: true,
                message: '请选择设备',
              },
            ]}
            name="deviceId"
            label="设备"
            initialValue={formData?.deviceId}
          />

          <ProFormText
            width={'md'}
            name="meetingPw"
            label="会议密码"
            initialValue={formData?.meetingPw}
            rules={[
              {
                required: true,
                message: '请输入会议密码！',
              },
            ]}
          />

          <ProFormDateTimePicker
            width={'md'}
            name="meetingStartTime"
            label="会议预约开始时间"
            fieldProps={{
              format: 'YYYY-MM-DD HH:mm',
            }}
            rules={[
              {
                required: true,
                message: '请选择会议预约开始时间！',
              },
              {
                validator: validateMeetingTime,
              },
            ]}
            initialValue={formData?.meetingStartTime ? dayjs(formData.meetingStartTime) : undefined}
          />
          <ProFormDateTimePicker
            width={'md'}
            name="meetingEndTime"
            label="会议预约结束时间"
            fieldProps={{
              format: 'YYYY-MM-DD HH:mm',
            }}
            rules={[
              {
                required: true,
                message: '请选择会议预约结束时间！',
              },
              {
                validator: validateEndTime,
              },
              {
                validator: validateMeetingTime,
              },
            ]}
            initialValue={formData?.meetingEndTime ? dayjs(formData.meetingEndTime) : undefined}
          />
          <ProFormText
            width={'md'}
            name="title"
            label="会议主题"
            initialValue={formData?.title}
            rules={[
              {
                required: true,
                message: '请输入会议主题！',
              },
            ]}
          />
          <ProFormSelect
            width={'md'}
            debounceTime={500}
            showSearch
            request={async () => {
              return [];
            }}
            name="participantIds"
            label="参会人列表"
            initialValue={formData?.participantIds}
          />
          <ProFormSelect
            options={regularMeetingTypeData}
            width={'md'}
            tooltip={
              <>
                NOT_REPEAT : 不重复
                <br />
                DYA : 每日重复
                <br />
                WEEK ：每周重复（根据预约的会议开始的那个星期几）
                <br />
                MOON ：每月重复（根据预约的会议开始那一天） WORKING_DAY ：每个工作日重复
              </>
            }
            name="regularMeetingType"
            label="例会类型"
            initialValue={formData?.regularMeetingType}
          />
          <ProFormSelect
            width={'md'}
            request={async () => {
              const { data } = await postMeetingCategorys();
              return data.map((item: any) => ({
                label: item.name,
                value: item.categoryId,
              }));
            }}
            name="meetingCategoryId"
            label="会议类别"
            initialValue={formData?.meetingCategoryId}
          />
        </ProForm.Group>
        <ProFormTextArea
          width={'xl'}
          name="description"
          label="会议描述"
          initialValue={formData?.description ?? ''}
          placeholder={''}
        />
      </ModalForm>
    </>
  );
};

export default App;
