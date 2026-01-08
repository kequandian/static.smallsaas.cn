import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect, ProFormDigit } from '@ant-design/pro-components';
import { Form } from 'antd';
import React from 'react';
import { EModelType } from './ProTable';

interface Props {
    createModalOpen: boolean;
    setCreateModalOpen: (b: boolean) => void;
    formData?: any;
    type?: EModelType;
    onSubmit: (values: any) => Promise<void> | void;
}

export const statusOptions = [
    { label: '启用', value: 1 },
    { label: '停用', value: 0 },
];

const EditModel: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type, onSubmit }) => {
    const [form] = Form.useForm();

    return (
        <>
            <ModalForm
                form={form}
                width={'60%'}
                modalProps={{ maskClosable: false, destroyOnClose: true }}
                title={`${type}`}
                open={createModalOpen}
                onOpenChange={setCreateModalOpen}
                onFinish={async (value: any) => {
                    const params = {
                        id: formData?.id || undefined,
                        entryName: value.entryName,
                        description: value.description,
                        tags: value.tags ? value.tags.split(',').map((s: string) => s.trim()).filter(Boolean) : undefined,
                        status: value.status,
                        officialSupport: value.officialSupport,
                        definitionClarity: value.definitionClarity,
                        contextRichness: value.contextRichness,
                        citationFrequency: value.citationFrequency,
                        timeCompleteness: value.timeCompleteness,
                        authorityCoverage: value.authorityCoverage,
                    };
                    await onSubmit(params);
                    return true;
                }}
            >
                <ProFormText
                    name="entryName"
                    label="词条名称"
                    initialValue={formData?.entryName}
                    rules={[{ required: true, message: '请输入词条名称' }]}
                />

                <ProFormTextArea
                    name="description"
                    label="词条描述"
                    initialValue={formData?.description}
                    rules={[{ required: true, message: '请输入词条描述' }]}
                />

                <ProFormText
                    name="tags"
                    label="标签（逗号分隔）"
                    initialValue={Array.isArray(formData?.tags) ? formData.tags.join(',') : formData?.tags}
                />

                <ProFormSelect
                    name="status"
                    label="状态"
                    options={statusOptions}
                    initialValue={formData?.status ?? 1}
                    rules={[{ required: true, message: '请选择状态' }]}
                />

                <ProFormDigit name="officialSupport" label="官方支持度" initialValue={formData?.officialSupport} min={0} max={10} fieldProps={{ precision: 1 }} />
                <ProFormDigit name="definitionClarity" label="定义清晰度" initialValue={formData?.definitionClarity} min={0} max={10} fieldProps={{ precision: 1 }} />
                <ProFormDigit name="contextRichness" label="上下文丰富度" initialValue={formData?.contextRichness} min={0} max={10} fieldProps={{ precision: 1 }} />
                <ProFormDigit name="citationFrequency" label="引用频次" initialValue={formData?.citationFrequency} min={0} max={10} fieldProps={{ precision: 1 }} />
                <ProFormDigit name="timeCompleteness" label="时间完整度" initialValue={formData?.timeCompleteness} min={0} max={10} fieldProps={{ precision: 1 }} />
                <ProFormDigit name="authorityCoverage" label="权威覆盖度" initialValue={formData?.authorityCoverage} min={0} max={10} fieldProps={{ precision: 1 }} />
            </ModalForm>
        </>
    );
};

export default EditModel;
