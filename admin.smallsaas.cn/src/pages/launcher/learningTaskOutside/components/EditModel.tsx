import { learningTaskOutsideUpdate } from '@/api/learningTaskOutside';
import { getParytOrgTree } from '@/api/partyOrg';
import cache from '@/utils/cache';
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
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
          if (value?.imgUrl[0]?.response?.data?.fileUrl) {
            value.imgUrl = value?.imgUrl[0]?.response?.data?.fileUrl;
          } else {
            value.imgUrl = value?.imgUrl[0]?.fileUrl;
          }
          if (!!formData?.id) value.id = formData?.id;
          // 新增/编辑
          const data = await learningTaskOutsideUpdate(value);
          if (data.code === 0) {
            message.success(data.msg);
            setCreateModalOpen(false);
            Pubsub.publish('UPDATE-LEARNINGTASKOUTSIDE');
          } else {
            message.error(data.msg);
          }
        }}
      >
        <ProFormText name="taskName" label="任务名称" initialValue={formData?.taskName} />

        <ProFormDateTimePicker
          fieldProps={{ showTime: { format: 'HH:mm' }, format: 'YYYY-MM-DD HH:mm' }}
          name="startTime"
          label="开始时间"
          initialValue={formData?.startTime}
          rules={[
            {
              required: true,
              message: '请选择开始时间',
            },
          ]}
        />

        <ProFormDateTimePicker
          fieldProps={{ showTime: { format: 'HH:mm' }, format: 'YYYY-MM-DD HH:mm' }}
          name="endTime"
          label="结束时间"
          initialValue={formData?.endTime}
          rules={[
            {
              required: true,
              message: '请选择结束时间',
            },
          ]}
        />

        <ProFormDigit
          name="points"
          label="积分"
          initialValue={formData?.points}
          rules={[
            {
              required: true,
              message: '请输入积分',
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
        <ProFormTreeSelect
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
            treeCheckable: true,
            multiple: true,
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
          name="orgIdList"
          label="党组织"
          initialValue={formData?.orgList.map((item: any) => item.id)}
        />
        <ProFormDigit name="sort" label="排序" initialValue={formData?.sort} />
        <ProFormTextArea name="info" label="说明" initialValue={formData?.info} />
      </ModalForm>
    </>
  );
};

export default App;
