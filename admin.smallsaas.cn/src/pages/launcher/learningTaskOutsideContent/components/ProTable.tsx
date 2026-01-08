import { getAddAdminList } from '@/api/launcher';
import { learningTaskOutsideContentList } from '@/api/learningTaskOutside';
import Confirmation from '@/components/Confirmation';
import { useLauncher } from '@/hooks/useLauncher';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProFormSelect, ProTable } from '@ant-design/pro-components';
import { history, Link } from '@umijs/max';
import { Button, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTableV1: React.FC = () => {
  const { state } = history.location as any;

  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen, onLearningTaskOutsideContentDelete } = useLauncher();

  // item
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-LEARNINGTASKOUTSIDECONTENT', () => {
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

  const columns: ProColumns<any>[] = [
    {
      title: '图片',
      dataIndex: 'imgUrl',
      hideInSearch: true,
      key: 'image',
      valueType: 'image',
      className: 'image-100',
      width: 100,
    },
    {
      title: '学习源',
      dataIndex: 'xuexiSourceName',
      ellipsis: true,
      // hideInSearch: true,
      render: (_, record: any) => {
        return <Link to={`/launcher/newsManagement/learningSource`}>{record.xuexiSourceName}</Link>;
      },
      renderFormItem: () => {
        return (
          <ProFormSelect
            debounceTime={500}
            request={async (params) => {
              // 使用 request 获取选项数据
              const { data } = await getAddAdminList({
                pageNum: params.current || 1, // 当前页码
                pageSize: params.pageSize || 10, // 每页条数
                // title: params.keyWords,
                // 你可以添加其他需要的查询参数
              });
              return data.list.map((item: any) => ({
                label: item.name,
                value: item.id,
              }));
            }}
          />
        );
      },
    },

    {
      title: '学习专题',
      dataIndex: 'masterName',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '课时数量',
      dataIndex: 'taskNum',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '说明',
      dataIndex: 'info',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 80,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Confirmation onConfirm={() => onLearningTaskOutsideContentDelete(record.id)} key="del">
            <Button type="link">删除</Button>
          </Confirmation>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    const { data } = await learningTaskOutsideContentList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      taskId: state?.id,
      xuexiSourceId: params?.xuexiSourceName,
    });
    return {
      data: data?.list, // 数据列表
      total: data.total, // 数据总数
    };
  };

  return (
    <>
      <ProTable<any>
        actionRef={proTableV1Ref}
        columns={columns}
        request={request}
        rowKey="id"
        scroll={{ x: 1300 }}
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          labelWidth: 'auto',
        }}
        headerTitle={`${state?.taskName || '学习任务内容'}的列表`}
        toolBarRender={() => [
          <Button
            onClick={() => {
              setModelType(EModelType.ADD);
              setFormData(null);
              setCreateModalOpen(true);
            }}
            type="primary"
            key="primary"
          >
            添加
          </Button>,
        ]}
      />

      {/* 查看/编辑/新增 */}
      <EditModel
        type={modelType}
        formData={formData}
        setCreateModalOpen={setCreateModalOpen}
        createModalOpen={createModalOpen}
        fatherItem={state}
      />
      {/* end */}
    </>
  );
};
export default ProTableV1;
