import { getEditAdmin } from '@/api/enduser';
import ProImgCrop from '@/components/ProImgCrop';
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import React from 'react';
import './index.scss';

const EditUser: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleFinish = async (value: any) => {
    console.log('value', value);

    // 过滤头像数据
    const avatarUrl = value?.avatar[0]?.response?.data?.fileUrl;
    const param = {
      name: value.name,
    } as any;
    if (avatarUrl) {
      param.avatarUrl = avatarUrl;
    }
    const { code } = await getEditAdmin(param);

    if (code === 200) {
      setInitialState((preInitialState) => ({
        ...preInitialState,
        currentUser: {
          ...preInitialState?.currentUser,
          ...param,
        },
      }));
      message.success('更新基本信息成功');
    }
  };

  return (
    <PageContainer breadcrumb={undefined}>
      <ProForm
        layout="vertical"
        onFinish={handleFinish}
        submitter={{
          searchConfig: {
            submitText: '更新基本信息',
          },
          render: (_, dom) => dom[1],
        }}
      >
        <ProForm.Item
          label="头像上传"
          rules={[
            {
              required: true,
              message: '请上传图片!',
            },
          ]}
          shouldUpdate
        >
          {(form) => {
            return (
              <ProForm.Item
                name="avatar"
                initialValue={[{ url: `${initialState?.currentUser?.avatarUrl}` }]}
              >
                <ProImgCrop
                  imgUrl={initialState?.currentUser?.avatarUrl}
                  cbUrl={(info) => {
                    form.setFieldsValue({ avatar: info?.fileList });
                  }}
                />
              </ProForm.Item>
            );
          }}
        </ProForm.Item>
        <ProFormText
          width="md"
          name="name"
          label="名称"
          initialValue={initialState?.currentUser?.name}
          rules={[
            {
              required: true,
              message: '请输入名称',
            },
            {
              pattern: /^.{2,16}$/,
              message: '请输入2到16位名称！',
            },
          ]}
        />
      </ProForm>
    </PageContainer>
  );
};

export default EditUser;
