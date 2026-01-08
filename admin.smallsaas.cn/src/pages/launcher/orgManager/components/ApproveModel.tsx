import { partyApprove } from '@/api/partyOrg';
import { ModalForm, ProFormRadio, ProFormTextArea } from '@ant-design/pro-components';
import { Form } from 'antd';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
}

const ApproveModel: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData }) => {
  const [form] = Form.useForm();

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
        title="审批"
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          const res = await partyApprove({
            id: formData.id,
            ...value,
          });
          if (res.code === 0) {
            setCreateModalOpen(false);
          }
        }}
      >
        <ProFormRadio.Group
          name="result"
          label="审批结果"
          options={[
            {
              label: '同意',
              value: 1,
            },
            {
              label: '不同意',
              value: 0,
            },
          ]}
          rules={[{ required: true, message: '请选择审批结果!' }]}
        />
        <ProFormTextArea name="info" label="审批意见" initialValue={formData?.info} />
      </ModalForm>
    </>
  );
};

export default ApproveModel;
