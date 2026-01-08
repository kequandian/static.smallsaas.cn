import { updateMeeting, createMeeting } from '@/api/meeting';
import {
  ModalForm,
  ProForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormSwitch,
} from '@ant-design/pro-components';
import dayjs from 'dayjs';

import { Form, message } from 'antd';
import React from 'react';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: string;
  onSuccess?: () => void;
}

const EditModel: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type, onSuccess }) => {
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
    const startTime = form?.getFieldValue('agendaStartTime');
    if (!value || !startTime || value.isBefore(dayjs(startTime))) {
      callback('会议预约结束时间不能早于开始时间');
    } else {
      callback();
    }
  };

  // 模拟用户数据，实际应该从API获取
  const mockUsers = [
    { label: '张三', value: '1' },
    { label: '李四', value: '2' },
    { label: '王五', value: '3' },
    { label: '赵六', value: '4' },
  ];

  return (
    <>
      <ModalForm
        form={form} // 传递表单实例
        disabled={type === "查看"}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
        }}
        title={`${type}会议`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          try {
            // 处理参会人数据
            const participants = value.participants?.map((item: any) => ({
              userId: item.value,
              name: item.label,
            }));

            const params = {
              ...value,
              participants,
            };

            if (!!formData?.id) {
              // 编辑
              const data = await updateMeeting(formData.id, params);
              if (data.code === 200) {
                message.success('修改会议成功');
                setCreateModalOpen(false);
                if (onSuccess) onSuccess();
                return true;
              }
            } else {
              // 新增
              const data = await createMeeting(params);
              if (data.code === 200) {
                message.success('预约会议成功');
                setCreateModalOpen(false);
                if (onSuccess) onSuccess();
                return true;
              }
            }
          } catch (error) {
            console.error('操作失败:', error);
            message.error('操作失败');
            return false;
          }
        }}
      >
        <ProForm.Group>
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
            name="hostUserId"
            label="帮谁预约"
            placeholder="请选择预约人"
            options={mockUsers}
            initialValue={formData?.hostUserId}
            rules={[{ required: true, message: '请选择预约人' }]}
          />
          <ProFormDateTimePicker
            width={'md'}
            name="agendaStartTime"
            label="开始时间"
            fieldProps={{
              format: 'YYYY-MM-DD HH:mm',
            }}
            rules={[
              {
                required: true,
                message: '请选择开始时间！',
              },
              {
                validator: validateMeetingTime,
              },
            ]}
            initialValue={formData?.agendaStartTime ? dayjs(formData.agendaStartTime) : undefined}
          />
          <ProFormDateTimePicker
            width={'md'}
            name="agendaEndTime"
            label="结束时间"
            fieldProps={{
              format: 'YYYY-MM-DD HH:mm',
            }}
            rules={[
              {
                required: true,
                message: '请选择结束时间！',
              },
              {
                validator: validateEndTime,
              },
              {
                validator: validateMeetingTime,
              },
            ]}
            initialValue={formData?.agendaEndTime ? dayjs(formData.agendaEndTime) : undefined}
          />
          <ProFormText
            width={'md'}
            name="meetingPw"
            label="会议密码"
            initialValue={formData?.meetingPw}
            placeholder="请输入会议密码（选填）"
          />
          <ProFormSelect
            width={'md'}
            name="participants"
            label="参会人"
            mode="multiple"
            placeholder="请选择参会人"
            options={mockUsers}
            initialValue={formData?.participants}
            fieldProps={{
              showSearch: true,
              filterOption: (input: string, option: any) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
            }}
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormSwitch
            name="inviteValid"
            label="非邀请不能入会"
            initialValue={formData?.inviteValid || false}
          />
          <ProFormSwitch
            name="sendSms"
            label="发送短信邀请"
            initialValue={formData?.sendSms || false}
          />
          <ProFormSwitch
            name="disableCamera"
            label="入会时关闭摄像头"
            initialValue={formData?.disableCamera || true}
          />
          <ProFormSwitch
            name="disableAudio"
            label="入会时静音"
            initialValue={formData?.disableAudio || true}
          />
        </ProForm.Group>


      </ModalForm>
    </>
  );
};

export default EditModel;
