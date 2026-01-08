import { getFormDataList, getFormDataDetail, deleteFormData } from '@/api/form';
import { getEntityFields } from '@/api/form';
import { Button, Drawer, message, Modal, Space, Table } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { render as renderAmis } from 'amis';
import 'amis/lib/themes/default.css';

interface FormDataManagerProps {
    visible: boolean;
    onCancel: () => void;
    formData: any;
}

const FormDataManager: React.FC<FormDataManagerProps> = ({
    visible,
    onCancel,
    formData,
}) => {
    const [dataList, setDataList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [detailVisible, setDetailVisible] = useState<boolean>(false);
    const [currentRecord, setCurrentRecord] = useState<any>(null);
    const [fields, setFields] = useState<any[]>([]);
    const [tableColumns, setTableColumns] = useState<any[]>([]);

    // 查看详情
    const handleViewDetail = async (record: any) => {
        try {
            const res = await getFormDataDetail(formData.entityName, record.id);
            if (res?.code === 200) {
                setCurrentRecord(res.data);
                setDetailVisible(true);
            } else {
                message.error('获取详情失败');
            }
        } catch (error) {
            console.error('获取详情失败', error);
            message.error('获取详情失败');
        }
    };

    // 删除数据
    const handleDelete = (record: any) => {
        Modal.confirm({
            title: '确认删除',
            content: '确定要删除该条数据吗？删除后将无法恢复。',
            okText: '确认',
            cancelText: '取消',
            okType: 'danger',
            onOk: async () => {
                try {
                    const res = await deleteFormData(formData.entityName, record.id);
                    if (res?.code === 200) {
                        message.success('删除成功');
                        fetchDataList();
                    } else {
                        message.error(res?.message || '删除失败');
                    }
                } catch (error) {
                    message.error('操作失败');
                    console.error(error);
                }
            },
        });
    };

    // 获取表单字段
    const fetchFields = async () => {
        if (!formData?.entityName) return;

        try {
            const res = await getEntityFields(formData.entityName);
            if (res?.code === 200 && res.data) {
                const fieldList = res.data.children || [];
                setFields(fieldList);

                // 生成表格列
                const columns = fieldList.map((field: any) => ({
                    title: field.fieldName,
                    dataIndex: field.attributeName,
                    key: field.attributeName,
                    ellipsis: true,
                }));

                // 添加操作列
                columns.push({
                    title: '操作',
                    key: 'action',
                    fixed: 'right',
                    width: 180,
                    render: (_: any, record: any) => (
                        <Space size="small">
                            <Button
                                type="link"
                                icon={<EyeOutlined />}
                                onClick={() => handleViewDetail(record)}
                            >
                                查看
                            </Button>
                            <Button
                                type="link"
                                icon={<EditOutlined />}
                                onClick={() => message.info('编辑功能待实现')}
                            >
                                编辑
                            </Button>
                            <Button
                                type="link"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(record)}
                            >
                                删除
                            </Button>
                        </Space>
                    ),
                });

                setTableColumns(columns);
            }
        } catch (error) {
            console.error('获取表单字段失败', error);
        }
    };

    // 获取表单数据列表
    const fetchDataList = async (page = pagination.current, pageSize = pagination.pageSize) => {
        if (!formData?.entityName) return;

        setLoading(true);
        try {
            const res = await getFormDataList(formData.entityName, {
                page,
                size: pageSize,
            });

            if (res?.code === 200) {
                setDataList(res.data.records || []);
                setPagination({
                    ...pagination,
                    current: page,
                    pageSize,
                    total: res.data.total || 0,
                });
            } else {
                setDataList([]);
                setPagination({
                    ...pagination,
                    total: 0,
                });
            }
        } catch (error) {
            console.error('获取表单数据列表失败', error);
            setDataList([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (visible && formData) {
            fetchFields();
            fetchDataList(1);
        }
    }, [visible, formData]);

    // 添加数据
    const handleAdd = () => {
        message.info('添加功能待实现');
    };

    // 处理表格分页
    const handleTableChange = (pagination: any) => {
        fetchDataList(pagination.current, pagination.pageSize);
    };

    // 渲染详情表单
    const renderDetailForm = () => {
        if (!currentRecord || fields.length === 0) return null;

        // 构建详情表单schema
        const formItems = fields.map((field: any) => ({
            type: 'static',
            name: field.attributeName,
            label: field.fieldName,
            value: currentRecord[field.attributeName],
        }));

        const schema = {
            type: 'page',
            body: {
                type: 'form',
                mode: 'horizontal',
                controls: formItems,
            },
        };

        return renderAmis(schema, {
            locale: 'zh-CN',
        });
    };

    return (
        <Drawer
            title={`${formData?.name || '表单'} - 数据管理`}
            width={1000}
            open={visible}
            onClose={onCancel}
            destroyOnClose
        >
            <div style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                >
                    添加数据
                </Button>
            </div>

            <Table
                columns={tableColumns}
                dataSource={dataList}
                rowKey="id"
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
                scroll={{ x: 'max-content' }}
            />

            {/* 详情抽屉 */}
            <Drawer
                title="数据详情"
                width={600}
                open={detailVisible}
                onClose={() => setDetailVisible(false)}
                destroyOnClose
            >
                <div className="amis-preview">
                    {renderDetailForm()}
                </div>
            </Drawer>
        </Drawer>
    );
};

export default FormDataManager;
