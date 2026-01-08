// import { launcherFileUpload } from '@/api/launcher';
import { orgApply } from '@/api/partyOrg';
import { usePartyOrg } from '@/hooks/usePartyOrg';
import { ModalForm, ProFormTreeSelect, ProFormUploadButton } from '@ant-design/pro-components';
import { Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import './transferModel.scss';
import cache from '@/utils/cache';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  title?: string;
}

const TransferModel: React.FC<Props> = ({
  createModalOpen,
  setCreateModalOpen,
  formData,
  title,
}) => {
  const [curFormData, setCurFormData] = useState<any>(formData || { fileList: [] });
  const [form] = Form.useForm();
  const { getOrgListApi, partyOrgTree } = usePartyOrg();

  useEffect(() => {
    getOrgListApi({});
  }, []);

  useEffect(() => {
    if (formData) {
      const newFormData = JSON.parse(JSON.stringify(formData));
      newFormData.fileList = (newFormData.fileList || []).map((item: any) => {
        return {
          ...item,
          url: item.fileUrl,
          name: item.fileName,
          status: 'done',
        };
      });
      setCurFormData(newFormData);
    }
  }, [formData]);

  // 自定义上传
  // const onCustomRequest = (file: any) => {
  //   const formData = new FormData();
  //   formData.append('file', file.file);
  //   launcherFileUpload(formData).then((res: any) => {
  //     if (res.code === 0) {
  //       file.onSuccess(res, file.file);
  //       file.status = 'done';
  //       curFormData.fileList.push({
  //         fileUrl: res.url,
  //         fileName: res.originalName,
  //         status: 'done',
  //       });
  //       setCurFormData({ ...curFormData });
  //     } else {
  //       file.onError();
  //       file.status = 'error';
  //     }
  //   });
  // };

  const onChangeFileAlias = (e: any, file: any) => {
    file.name = e.target.value;
  };
  return (
    <>
      <ModalForm
        className="transfer-model"
        form={form}
        width={'50%'}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={title}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          const params: any = {
            partyMemberId: curFormData.id,
            sourcePartyOrganizationId: curFormData.partyOrganizationId,
            targetPartyOrganizationId: value.targetPartyOrganizationId,
            fileList: [],
          };
          value.fileUrl.forEach((item: any) => {
            params.fileList.push({
              fileUrl: item.response?.data?.fileUrl,
              fileName: item.aliasName || item.name,
            });
          });
          const res = await orgApply(params);
          if (res.code === 0) {
            setCreateModalOpen(false);
          }
        }}
      >
        <ProFormTreeSelect
          name="targetPartyOrganizationId"
          label="党组织"
          fieldProps={{
            treeData: partyOrgTree,
            fieldNames: {
              label: 'name',
              value: 'id',
            },
          }}
          initialValue={curFormData?.targetPartyOrganizationId}
          placeholder="请选择要转移的组织名称"
          rules={[{ required: true, message: '请选择要转移的组织名称!' }]}
        />
        <ProFormUploadButton
          // accept=".jpg,.jpeg,.png,.svg" // 限制上传文件类型
          tooltip="请上传申请文件"
          max={10}
          label="申请文件"
          name="fileUrl"
          initialValue={curFormData?.fileList || []}
          action={UPLOAD_FILES}

          fieldProps={{
            multiple: true,
            headers: {
              Authorization: `Bearer ${cache.getToken()}`,
            },
            // customRequest: (file: any) => onCustomRequest(file),
            itemRender: (originNode: React.ReactElement, file: any) => {
              console.log(file);
              return (
                <div className="file-item">
                  {originNode}
                  <div className="file-name">
                    <div className="title">文件别名：</div>
                    <Input
                      value={file.name}
                      size="middle"
                      onChange={(e) => onChangeFileAlias(e, file)}
                    />
                  </div>
                </div>
              );
            },
          }}
          rules={[
            {
              required: true,
              message: '请上传申请文件!',
              // validator: (rule: any, value: any, callback: (error?: string) => void) => {
              //   if (!curFormData.fileList.length) {
              //     callback('请上传申请文件!');
              //   } else {
              //     callback();
              //   }
              // },
            },
          ]}
        />
      </ModalForm>
    </>
  );
};

export default TransferModel;
