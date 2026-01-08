import React, { useCallback, useEffect, useState } from 'react';
import { Card, Modal, Form, Input, Select, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getStepsByWorkflowId, deleteStep, addStep, updateStep } from '@/api/workflow';
// @ts-ignore
import OrgTree from 'react-org-tree';
import './FlowChart.scss';

// 步骤类型枚举
export enum EStepType {
  START = 'START',
  MIDDLE = 'MIDDLE',
  END = 'END',
}

// 处理类型枚举
export enum EHandleType {
  APPROVAL = 'approval',
  CONTENT = 'content',
}

// 模态框类型枚举
export enum EModalType {
  ADD = '添加步骤',
  EDIT = '编辑步骤',
  ADD_CHILD = '添加子步骤',
}

// 步骤表单组件
const StepForm: React.FC<any> = ({ visible, onCancel, onSubmit, formData, modalTitle, parentNode }) => {
  const [form] = Form.useForm();

  // 表单数据初始化
  useEffect(() => {
    if (visible) {
      if (formData) {
        form.setFieldsValue({
          ...formData,
          nextSteps: formData.nextSteps ? JSON.parse(formData.nextSteps) : []
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          type: parentNode?.type === EStepType.START ? EStepType.MIDDLE : EStepType.START,
          stepType: EHandleType.APPROVAL
        });
      }
    }
  }, [visible, formData, form, parentNode]);

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        nextSteps: JSON.stringify(values.nextSteps || [])
      };
      onSubmit(formattedValues);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 是否是编辑模式
  const isEditing = modalTitle === EModalType.EDIT;
  // 是否是添加子步骤模式
  const isAddChild = modalTitle === EModalType.ADD_CHILD;

  return (
    <Modal
      title={modalTitle}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="步骤名称"
          rules={[{ required: true, message: '请输入步骤名称' }]}
        >
          <Input placeholder="请输入步骤名称" />
        </Form.Item>

        <Form.Item
          name="type"
          label="步骤类型"
          rules={[{ required: true, message: '请选择步骤类型' }]}
        >
          <Select
            disabled={isAddChild || (isEditing && formData?.type === EStepType.START)}
          >
            <Select.Option value={EStepType.START}>开始</Select.Option>
            <Select.Option value={EStepType.MIDDLE}>中间</Select.Option>
            <Select.Option value={EStepType.END}>结束</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="stepType"
          label="处理类型"
          rules={[{ required: true, message: '请选择处理类型' }]}
        >
          <Select>
            <Select.Option value={EHandleType.APPROVAL}>审核</Select.Option>
            <Select.Option value={EHandleType.CONTENT}>填写</Select.Option>
          </Select>
        </Form.Item>
        {/*
        <Form.Item
          name="handlerSelectRule"
          label="处理人选择规则"
        >
          <Input placeholder="例如: ROLE:manager" />
        </Form.Item>

        <Form.Item
          name="handlerIds"
          label="处理人ID"
        >
          <Input placeholder="多个ID用逗号分隔" />
        </Form.Item>

        <Form.Item
          name="currentUserId"
          label="当前处理人ID"
        >
          <Input placeholder="请输入当前处理人ID" />
        </Form.Item> */}

        <Form.Item
          name="virtualFormCode"
          label="虚拟表单编码"
        >
          <Input placeholder="例如: form_leave_apply" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

interface FlowChartProps {
  processId: string;
}

// 主组件
const FlowChart: React.FC<FlowChartProps> = ({ processId }) => {
  // 流程数据
  const [flowData, setFlowData] = useState<any>(null);
  // 加载状态
  const [loading, setLoading] = useState<boolean>(false);
  // 模态框可见状态
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // 当前选中的步骤
  const [currentStep, setCurrentStep] = useState<any>(null);
  // 父节点
  const [parentNode, setParentNode] = useState<any>(null);
  // 模态框标题
  const [modalTitle, setModalTitle] = useState<EModalType>(EModalType.ADD);
  // 展开所有节点
  const [expandAll, setExpandAll] = useState<boolean>(false);

  // 将API返回的步骤数据转换为树形结构
  const convertToTreeData = (steps: any[]) => {
    if (!steps || steps.length === 0) return null;

    // 查找根节点（START类型的节点）
    const rootNode = steps.find(step => step.type === EStepType.START);
    if (!rootNode) return null;

    // 创建节点映射
    const nodeMap: Record<string, any> = {};
    steps.forEach(step => {
      nodeMap[step.id] = {
        id: step.id,
        name: step.name,
        type: step.type || EStepType.MIDDLE,
        stepType: step.stepType || EHandleType.APPROVAL,
        handlerIds: step.handlerIds,
        handlerSelectRule: step.handlerSelectRule,
        currentUserId: step.currentUserId,
        virtualFormCode: step.virtualFormCode,
        nextSteps: step.nextSteps,
        children: []
      };
    });

    // 构建树结构
    steps.forEach(step => {
      if (step.nextSteps) {
        try {
          const nextSteps = JSON.parse(step.nextSteps);
          if (Array.isArray(nextSteps)) {
            nextSteps.forEach(nextId => {
              if (nodeMap[nextId]) {
                nodeMap[step.id].children.push(nodeMap[nextId]);
              }
            });
          }
        } catch (e) {
          console.error('解析 nextSteps 失败:', step.nextSteps);
        }
      }
    });

    return nodeMap[rootNode.id];
  };

  // 获取步骤数据
  const fetchSteps = useCallback(async () => {
    if (!processId) return;

    setLoading(true);
    try {
      const res = await getStepsByWorkflowId(processId);
      if (res?.code === 200 && Array.isArray(res.data)) {
        const treeData = convertToTreeData(res.data);
        setFlowData(treeData);
        setExpandAll(true);
      } else {
        message.error(res?.message || '获取步骤数据失败');
      }
    } catch (error) {
      console.error('获取步骤失败:', error);
      message.error('获取步骤数据失败');
    } finally {
      setLoading(false);
    }
  }, [processId]);

  // 初始化获取数据
  useEffect(() => {
    fetchSteps();
  }, [fetchSteps]);

  // 编辑步骤
  const handleEditStep = (step: any) => {
    setCurrentStep(step);
    setParentNode(null);
    setModalTitle(EModalType.EDIT);
    setModalVisible(true);
  };

  // 添加子步骤
  const handleAddChildStep = (step: any) => {
    setCurrentStep(null);
    setParentNode(step);
    setModalTitle(EModalType.ADD_CHILD);
    setModalVisible(true);
  };

  // 删除步骤
  const handleDeleteStep = async (step: any) => {
    try {
      const res = await deleteStep(processId, step.id);
      if (res?.code === 200) {
        message.success('删除成功');
        fetchSteps();
      } else {
        message.error(res?.message || '删除失败');
      }
    } catch (error) {
      console.error('删除步骤失败:', error);
      message.error('删除步骤失败');
    }
  };

  // 提交表单
  const handleFormSubmit = async (values: any) => {
    try {
      if (modalTitle === EModalType.EDIT) {
        // 编辑步骤
        const res = await updateStep(currentStep.id, { ...values, processId });
        if (res?.code === 200) {
          message.success('更新成功');
          setModalVisible(false);
          fetchSteps();
        } else {
          message.error(res?.message || '更新失败');
        }
      } else if (modalTitle === EModalType.ADD_CHILD) {
        // 添加子步骤
        const res = await addStep(processId, values);
        if (res?.code === 200 && res.data) {
          const newStepId = res.data.id;

          // 解析父节点的nextSteps
          let parentNextSteps: string[] = [];
          try {
            if (parentNode.nextSteps) {
              parentNextSteps = JSON.parse(parentNode.nextSteps);
            }
          } catch (e) {
            console.error('解析 nextSteps 失败:', parentNode.nextSteps);
          }

          // 更新父节点的nextSteps
          if (!parentNextSteps.includes(newStepId)) {
            parentNextSteps.push(newStepId);

            const updateRes = await updateStep(parentNode.id, {
              ...parentNode,
              nextSteps: JSON.stringify(parentNextSteps),
              processId
            });

            if (updateRes?.code === 200) {
              message.success('添加子步骤成功');
              setModalVisible(false);
              fetchSteps();
            } else {
              message.error(updateRes?.message || '更新父节点失败');
            }
          }
        } else {
          message.error(res?.message || '添加子步骤失败');
        }
      } else {
        // 添加步骤
        const res = await addStep(processId, values);
        if (res?.code === 200) {
          message.success('添加成功');
          setModalVisible(false);
          fetchSteps();
        } else {
          message.error(res?.message || '添加失败');
        }
      }
    } catch (error) {
      console.error('提交表单失败:', error);
      message.error('操作失败');
    }
  };

  // 渲染节点内容
  const renderContent = (data: any) => {
    const classNames = 'org-tree-content';
    return (
      <div className={classNames}>
        <div
          className="name"
          style={{
            color: data.type === EStepType.START ? '#52c41a' :
              data.type === EStepType.END ? '#f5222d' : '#1890ff'
          }}
          onDoubleClick={() => handleEditStep(data)}
        >
          {data.name}
        </div>
        <div>
          {data.type === EStepType.START && (
            <PlusOutlined
              style={{
                color: '#1677ff',
                fontSize: '14px',
                marginLeft: '4px',
                cursor: 'pointer',
              }}
              onClick={() => {
                handleAddChildStep(data);
              }}
            />
          )}
          <EditOutlined
            style={{
              color: '#1677ff',
              fontSize: '14px',
              marginLeft: '8px',
              marginRight: '6px',
              cursor: 'pointer',
            }}
            onClick={() => {
              handleEditStep(data);
            }}
          />
          {data.type !== EStepType.START && (
            <Popconfirm
              title="确定要删除此步骤吗？"
              onConfirm={() => handleDeleteStep(data)}
              okText="确定"
              cancelText="取消"
            >
              <DeleteOutlined
                style={{
                  color: '#1677ff',
                  fontSize: '14px',
                  marginLeft: '4px',
                  cursor: 'pointer',
                }}
              />
            </Popconfirm>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card
      loading={loading}
      title="工作流程图"
      className="flow-chart-card"
    >
      <div className="flow-tree-box">
        {flowData ? (
          <OrgTree
            data={flowData}
            horizontal={true}
            collapsable={true}
            expandAll={expandAll}
            renderContent={(data: any) => renderContent(data)}
          />
        ) : null}
      </div>

      {/* 步骤表单模态框 */}
      <StepForm
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setParentNode(null);
        }}
        onSubmit={handleFormSubmit}
        formData={currentStep}
        modalTitle={modalTitle}
        parentNode={parentNode}
      />
    </Card>
  );
};

export default FlowChart;
