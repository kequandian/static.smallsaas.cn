import { getInstanceById } from '@/api/workflow';
import { Descriptions, Modal, Tabs, Table, Tag, Space, Button, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

interface Props {
    viewModalOpen: boolean;
    setViewModalOpen: (b: boolean) => void;
    formData?: any;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
    onRollback: (id: string) => void;
}

const statusMap: Record<string, { color: string, text: string }> = {
    'INITED': { color: 'blue', text: '初始化' },
    'VERIFYING': { color: 'processing', text: '处理中' },
    'HANDLING': { color: 'processing', text: '处理中' },
    'HANDLED_APPROVED': { color: 'success', text: '已同意' },
    'HANDLED_REJECTED': { color: 'error', text: '已拒绝' },
    'HANDLED_ROLLBACK': { color: 'warning', text: '已驳回' },
};

const ViewModel: React.FC<Props> = ({
    viewModalOpen,
    setViewModalOpen,
    formData,
    onApprove,
    onReject,
    onRollback
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [instanceDetail, setInstanceDetail] = useState<any>(null);

    // 获取实例详情
    const fetchInstanceDetail = async (id: string) => {
        setLoading(true);
        try {
            const res = await getInstanceById(id);
            if (res?.data) {
                setInstanceDetail(res.data);
            } else {
                setInstanceDetail(null);
            }
        } catch (error) {
            console.error('获取实例详情失败', error);
        } finally {
            setLoading(false);
        }
    };

    // 获取实例详情
    useEffect(() => {
        if (viewModalOpen && formData?.id) {
            fetchInstanceDetail(formData.id);
        }
    }, [viewModalOpen, formData]);

    // 处理状态显示
    const renderStatus = (status: string) => {
        const statusInfo = statusMap[status] || { color: 'default', text: status };
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
    };

    // 处理记录表格列
    const recordColumns = [
        {
            title: '步骤',
            dataIndex: 'stepName',
            key: 'stepName',
        },
        {
            title: '处理人',
            dataIndex: 'handlerName',
            key: 'handlerName',
        },
        {
            title: '处理时间',
            dataIndex: 'handleTime',
            key: 'handleTime',
        },
        {
            title: '处理结果',
            dataIndex: 'result',
            key: 'result',
        }
    ];

    // 下一步表格列
    const nextStepColumns = [
        {
            title: '步骤名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '处理人',
            dataIndex: 'currentUserName',
            key: 'currentUserName',
            render: (text: string) => text || '-',
        }
    ];

    // 获取处理记录数据
    const getHandledRecords = () => {
        if (!instanceDetail?.handledSteps) return [];

        const steps = instanceDetail.handledSteps.split(',');
        const users = instanceDetail.handledUsers?.split(',') || [];

        return steps.map((step: string, index: number) => ({
            key: index,
            stepName: step,
            handlerName: users[index] || '-',
            handleTime: '-',
            result: '-',
        }));
    };

    return (
        <Modal
            title="工作流实例详情"
            open={viewModalOpen}
            onCancel={() => setViewModalOpen(false)}
            footer={null}
            width={700}
            destroyOnClose
        >
            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <Spin size="large" />
                </div>
            ) : (
                instanceDetail && (
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="基本信息" key="1">
                            <Descriptions bordered column={2}>
                                <Descriptions.Item label="实例名称" span={2}>{instanceDetail.name}</Descriptions.Item>
                                <Descriptions.Item label="实例编码">{instanceDetail.code}</Descriptions.Item>
                                <Descriptions.Item label="状态">{renderStatus(instanceDetail.status)}</Descriptions.Item>
                                <Descriptions.Item label="创建人">{instanceDetail.creator}</Descriptions.Item>
                                <Descriptions.Item label="创建时间">{instanceDetail.createTime}</Descriptions.Item>
                                <Descriptions.Item label="当前步骤" span={2}>{instanceDetail.currentStepName}</Descriptions.Item>
                                <Descriptions.Item label="当前处理人" span={2}>{instanceDetail.currentUserName}</Descriptions.Item>
                            </Descriptions>

                            {(instanceDetail.status === 'VERIFYING' || instanceDetail.status === 'HANDLING') && (
                                <div style={{ marginTop: 16, textAlign: 'center' }}>
                                    <Space>
                                        <Button
                                            type="primary"
                                            onClick={() => onApprove(instanceDetail.id)}
                                        >
                                            同意
                                        </Button>
                                        <Button
                                            danger
                                            onClick={() => onReject(instanceDetail.id)}
                                        >
                                            拒绝
                                        </Button>
                                        <Button
                                            onClick={() => onRollback(instanceDetail.id)}
                                        >
                                            驳回
                                        </Button>
                                    </Space>
                                </div>
                            )}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="处理记录" key="2">
                            <Table
                                dataSource={getHandledRecords()}
                                columns={recordColumns}
                                pagination={false}
                                locale={{ emptyText: '暂无处理记录' }}
                            />
                        </Tabs.TabPane>
                        {instanceDetail.nextSteps && (
                            <Tabs.TabPane tab="下一步" key="3">
                                <Table
                                    dataSource={instanceDetail.nextSteps}
                                    columns={nextStepColumns}
                                    rowKey="id"
                                    pagination={false}
                                    locale={{ emptyText: '暂无下一步' }}
                                />
                            </Tabs.TabPane>
                        )}
                    </Tabs>
                )
            )}
        </Modal>
    );
};

export default ViewModel;
