import React, { useCallback, useEffect, useState } from 'react';
import { Card, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getStepsByWorkflowId, deleteStep, addStep, updateStep, getStepById } from '@/api/workflow';
import { getUserAccountsList } from '@/api/enduser';
// @ts-ignore
import OrgTree from 'react-org-tree';
import './FlowChart.scss';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';

// 步骤类型枚举
export enum EStepType {
  START = 'START',
  MIDDLE = 'MIDDLE',
  END = 'END',
}

// 处理类型枚举
export enum EHandleType {
  APPROVAL = 'APPROVED',
  CONTENT = 'CONTENT',
}

// 模态框类型枚举
export enum EModalType {
  ADD = '添加步骤',
  EDIT = '编辑步骤',
  ADD_CHILD = '添加子步骤',
}

// 步骤表单组件
const StepForm: React.FC<any> = ({ visible, onCancel, onSubmit, formData, modalTitle, parentNode }) => {
  // 是否是编辑模式
  // const isEditing = modalTitle === EModalType.EDIT;
  // // 是否是添加子步骤模式
  // const isAddChild = modalTitle === EModalType.ADD_CHILD;

  // 获取初始值
  const getInitialValues = () => {
    if (formData) {
      return {
        ...formData,
        // 只取id
        nodeAssigneeList: formData.nodeAssigneeList.map((item: any) => item.id),
        nextSteps: formData.nextSteps ? JSON.parse(formData.nextSteps) : []
      };
    }
    return {
      // type: parentNode?.type === EStepType.START ? EStepType.MIDDLE : EStepType.START,
      stepType: EHandleType.APPROVAL
    };
  };

  return (
    <ModalForm
      title={modalTitle}
      open={visible}
      onOpenChange={(visible) => {
        if (!visible) onCancel();
      }}
      initialValues={getInitialValues()}
      onFinish={async (values) => {
        try {
          // 处理nextSteps
          const formattedValues = {
            ...values,
            nextSteps: JSON.stringify(values.nextSteps || [])
          };
          await onSubmit(formattedValues);
          return true;
        } catch (error) {
          console.error('表单提交失败:', error);
          return false;
        }
      }}
      modalProps={{
        destroyOnClose: true, // 关闭时销毁组件
        maskClosable: false   // 禁止点击遮罩关闭
      }}
    >
      <ProFormText
        name="name"
        label="步骤名称"
        rules={[{ required: true, message: '请输入步骤名称' }]}
        placeholder="请输入步骤名称"
      />
      {/*
      <ProFormSelect
        name="type"
        label="步骤类型"
        rules={[{ required: true, message: '请选择步骤类型' }]}
        disabled={isAddChild || (isEditing && formData?.type === EStepType.START)}
        options={[
          { label: '开始', value: EStepType.START },
          { label: '中间', value: EStepType.MIDDLE },
          { label: '结束', value: EStepType.END }
        ]}
      /> */}

      <ProFormSelect
        name="stepType"
        label="处理类型"
        rules={[{ required: true, message: '请选择处理类型' }]}
        options={[
          { label: '审核', value: EHandleType.APPROVAL },
          { label: '填写', value: EHandleType.CONTENT }
        ]}
      />

      <ProFormSelect.SearchSelect
        name="nodeAssigneeList"
        label="审核人员"
        mode="multiple"
        rules={[{ required: true, message: '请选择审核人员' }]}
        request={async (params) => {
          try {
            const { data } = await getUserAccountsList({
              pageNum: params.current || 1,
              pageSize: params.pageSize || 100,
              name: params.keyWords,
            });

            if (data && data.records) {
              return data.records.map((user: any) => ({
                name: user.name,
                id: user.id
              }));
            }
            return [];
          } catch (error) {
            console.error('获取用户列表失败', error);
            return [];
          }
        }}
        fieldProps={{
          fieldNames: {
            label: 'name',
            value: 'id'
          },
          labelInValue: true,
          placeholder: "请选择审核人员",
          autoClearSearchValue: true,
        }}
      />
    </ModalForm>
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
  const convertToTreeData = (steps: any) => {
    if (!steps) return null;

    // 递归处理每个节点
    const buildTree = (node: any): any => {
      if (!node) return null;

      // 处理节点数据
      const processedNode = { ...node };

      if (node.children) {
        // 如果 children 不是数组，转换为数组
        if (!(node.children instanceof Array)) {
          processedNode.children = [buildTree(node.children)];
        } else {
          processedNode.children = node.children.map((child: any) => buildTree(child));
        }
      }

      return processedNode;
    };

    // 如果是数组，处理第一个元素作为根节点
    if (Array.isArray(steps)) {
      return buildTree(steps[0]);
    }

    // 如果直接是对象，直接处理
    return buildTree(steps);
  };

  // 获取步骤数据
  const fetchSteps = useCallback(async () => {
    if (!processId) return;
    setLoading(true);
    try {
      const res = await getStepsByWorkflowId(processId);

      if (res?.code === 200) {
        // 直接使用返回的数据，可能是对象或数组
        const treeData = convertToTreeData(res.data);
        console.log('转换后的树形数据:', treeData);

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
  const handleEditStep = async (step: any) => {
    try {

      // 获取步骤详情
      const res = await getStepById(step.id);
      if (res?.code === 200 && res.data) {
        setCurrentStep(res.data); // 使用API返回的最新数据
        setParentNode(null);
        setModalTitle(EModalType.EDIT);

        // 延迟打开模态窗，确保状态已更新
        setTimeout(() => {
          setModalVisible(true);
        }, 100);
      } else {
        message.error(res?.message || '获取步骤详情失败');
      }
    } catch (error) {
      console.error('获取步骤详情失败:', error);
      message.error('获取步骤详情失败');
    }
  };

  // 添加子步骤
  const handleAddChildStep = (step: any) => {

    // 重置数据
    setCurrentStep(null);

    // 延迟打开模态窗
    setTimeout(() => {
      setParentNode(step);
      setModalTitle(EModalType.ADD_CHILD);
      setModalVisible(true);
    }, 100);
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
    }
  };

  // 提交表单
  const handleFormSubmit = async (values: any) => {
    try {
      if (modalTitle === EModalType.EDIT) {
        // 编辑步骤
        const res = await updateStep(currentStep.id, { ...values, processId, pid: currentStep.id });
        if (res?.code === 200) {
          message.success('更新成功');
          setModalVisible(false);
          // 立即重新获取数据
          await fetchSteps();
          return true;
        } else {
          console.log(res);
          message.error(res?.message || '更新失败');
          return false;
        }
      } else if (modalTitle === EModalType.ADD_CHILD) {
        // 添加子步骤
        const res = await addStep(processId, { ...values, pid: parentNode.id });
        if (res?.code === 200) {
          message.success('添加成功');
          setModalVisible(false);
          // 立即重新获取数据
          await fetchSteps();
          return true;
        } else {
          message.error(res?.message || '添加子步骤失败');
          return false;
        }
      } else {
        // 添加步骤
        const res = await addStep(processId, values);
        if (res?.code === 200) {
          message.success('添加成功');
          setModalVisible(false);
          // 立即重新获取数据
          await fetchSteps();
          return true;
        } else {
          message.error(res?.message || '添加失败');
          return false;
        }
      }
    } catch (error) {
      console.error('提交表单失败:', error);
      return false;
    }
  };

  // 渲染节点内容
  const renderContent = (data: any) => {
    const classNames = 'org-tree-content';

    // 获取审核人员名称
    const getAssigneeNames = () => {
      if (!data.nodeAssigneeList) return '';

      try {
        // 尝试解析JSON格式
        let assignees;
        if (typeof data.nodeAssigneeList === 'string') {
          try {
            assignees = JSON.parse(data.nodeAssigneeList);
          } catch (e) {
            // 如果解析失败，可能是普通字符串
            return data.nodeAssigneeList;
          }
        } else {
          assignees = data.nodeAssigneeList;
        }

        if (Array.isArray(assignees)) {
          return assignees.map((item: any) => {
            if (typeof item === 'object') {
              return item.name || item.label || (item.id ? `用户${item.id}` : '未知用户');
            }
            return item;
          }).join(', ');
        }

        // 如果是对象而非数组
        if (assignees && typeof assignees === 'object') {
          return assignees.name || assignees.label || '未知用户';
        }

        return String(data.nodeAssigneeList);
      } catch (e) {
        console.error('解析审核人数据失败:', e);
        return String(data.nodeAssigneeList || '');
      }
    };

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
          {data.nodeAssigneeList && (
            <div className="node-assignees" style={{ fontSize: '12px', color: '#666' }}>
              审核人: {getAssigneeNames()}
            </div>
          )}
        </div>
        <div>
          {/* 允许除结束节点外的所有节点添加子节点 */}
          {data.type !== EStepType.END && (
            <PlusOutlined
              style={{
                color: '#1677ff',
                fontSize: '14px',
                marginLeft: '4px',
                cursor: 'pointer',
              }}
              onClick={() => handleAddChildStep(data)}
            />
          )}
          {data.type !== EStepType.END && data.type !== EStepType.START && (
            <EditOutlined
              style={{
                color: '#1677ff',
                fontSize: '14px',
                marginLeft: '8px',
                marginRight: '6px',
                cursor: 'pointer',
              }}
              onClick={() => handleEditStep(data)}
            />
          )}
          {data.type !== EStepType.START && data.type !== EStepType.END && (
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
      className="flow-chart-card"
    >
      <div className="flow-tree-box">
        {flowData ? (
          <OrgTree
            data={flowData}
            collapsable={true}
            expandAll={expandAll}
            horizontal={false}
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
