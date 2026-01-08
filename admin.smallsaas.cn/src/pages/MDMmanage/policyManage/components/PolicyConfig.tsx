import Confirmation from '@/components/Confirmation';
import { policyContentDelete, policyContentPage } from '@/services/mdm/policyContent';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import PolicyConfigEditModel from './PolicyConfigEditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

interface PolicyConfigProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const PolicyConfig: React.FC<PolicyConfigProps> = ({ modalOpen, setModalOpen }) => {
  const proTableV1Ref = useRef<ActionType>();
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  // 删除
  const onDel = async (id: any) => {
    const { code } = await policyContentDelete({ id: id });

    if (code === 200) {
      message.success('删除成功');
    }
    // 刷新
    if (proTableV1Ref) {
      // 手动调用刷新
      proTableV1Ref.current?.reload();
    }
  };
  // 编辑回现
  const onEdit = (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(data);
    setModalOpen(true);
  };
  const columns: ProColumns<any>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '标识',
      dataIndex: 'identify',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '分类',
      dataIndex: 'category',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Confirmation onConfirm={() => onDel(record.id)} key="del">
            <a>删除</a>
          </Confirmation>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-POLICYCONTENT', () => {
      // 刷新
      if (proTableV1Ref) {
        // 手动调用刷新
        proTableV1Ref.current?.reload();
      }
    });
    return () => {
      Pubsub.unsubscribe(updataListPub);
    };
  }, []);
  const request = async (params: any) => {
    const { data } = await policyContentPage({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      name: params?.name,
      itemType: params?.itemType,
    });
    return {
      data: data?.records || [], // 数据列表
      total: data?.total, // 数据总数
    };
  };

  return (
    <>
      <ProTable<any>
        actionRef={proTableV1Ref}
        columns={columns}
        request={request}
        scroll={{ x: 1300 }}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          labelWidth: 'auto',
        }}
        headerTitle="列表"
        toolBarRender={() => [
          <Button
            key={'add'}
            onClick={() => {
              setModelType(EModelType.ADD);
              setFormData(null);
              setModalOpen(true);
            }}
            type="primary"
          >
            创建配置
          </Button>,
        ]}
      />

      {/* 查看/编辑/添加 */}
      <PolicyConfigEditModel
        type={modelType}
        formData={formData}
        setCreateModalOpen={setModalOpen}
        createModalOpen={modalOpen}
      />
      {/* end */}
    </>
  );
};
export default PolicyConfig; 