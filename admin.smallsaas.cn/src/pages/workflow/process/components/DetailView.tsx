import React, { useEffect, useState } from 'react';
import { Modal, Descriptions, Button, Tabs, message } from 'antd';
import { getWorkflowById } from '@/api/workflow';
import FlowChart from './FlowChart';

interface Props {
  open: boolean;
  onClose: () => void;
  id: string;
}

const DetailView: React.FC<Props> = ({ open, onClose, id }) => {
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const res = await getWorkflowById(id);
      if (res?.code === 200) {
        setData(res.data);
      } else {
        message.error(res?.message || '获取详情失败');
      }
    } catch (error) {
      console.error('获取详情失败', error);
      message.error('获取详情失败');
    }
  };

  useEffect(() => {
    if (open && id) {
      fetchData();
    }
  }, [open, id]);

  const items = [
    {
      key: '1',
      label: '基本信息',
      children: (
        <Descriptions column={2}>
          <Descriptions.Item label="流程名称">{data?.name}</Descriptions.Item>
          <Descriptions.Item label="流程编码">{data?.code}</Descriptions.Item>
          <Descriptions.Item label="流程分类">{data?.categoryName}</Descriptions.Item>
          <Descriptions.Item label="表单分组">{data?.formGroup}</Descriptions.Item>
          <Descriptions.Item label="表单类型">{data?.formType}</Descriptions.Item>
          <Descriptions.Item label="状态">
            {data?.status === 'ENABLED' ? '启用' : '禁用'}
          </Descriptions.Item>
          <Descriptions.Item label="开放范围">{data?.openTo}</Descriptions.Item>
          <Descriptions.Item label="编号规则">{data?.codeRule}</Descriptions.Item>
        </Descriptions>
      ),
    },
    {
      key: '2',
      label: '工作流步骤',
      children: (
        <FlowChart processId={id} />
      ),
    },
  ];

  return (
    <Modal
      title="工作流详情"
      open={open}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button key="close" onClick={onClose}>
          关闭
        </Button>,
      ]}
    >
      <Tabs items={items} />
    </Modal>
  );
};

export default DetailView;
