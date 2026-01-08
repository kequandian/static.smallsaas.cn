import Confirmation from '@/components/Confirmation';
import { useLauncher } from '@/hooks/useLauncher';
import {
  applicationOtaPlanDelete,
  applicationOtaPlanExec,
  applicationOtaPlanPage,
} from '@/services/mdm/applicationOtaPlan';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel, { typeOptions } from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen } = useLauncher();
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  // 删除
  const onDel = async (id: any) => {
    const { code } = await applicationOtaPlanDelete({ id: id });

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
    setCreateModalOpen(true);
  };

  const onExecute = async (id: any) => {
    const data = await applicationOtaPlanExec({ id: id });
    if (data?.code === 200) {
      message.success(data?.message);
    }
  };
  const columns: ProColumns<any>[] = [
    {
      title: '任务名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '应用包名',
      dataIndex: 'appPackage',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '渠道名称',
      dataIndex: 'channelName',
      ellipsis: true,
    },
    {
      title: '执行方式',
      dataIndex: 'execType',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record: any) => {
        return typeOptions.filter((item: any) => item.value === record.execType)[0]?.label;
      },
    },
    {
      title: '执行时间',
      dataIndex: 'execTime',
      hideInSearch: true,
      ellipsis: true,
    },

    {
      title: '应用名称',
      dataIndex: 'packageName',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '应用版本',
      dataIndex: 'lastVersion',
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: '更新时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '执行状态',
      dataIndex: 'execStatus',
      ellipsis: true,
      hideInSearch: true,
      valueEnum: {
        1: {
          text: '未开始',
          status: 'Default',
        },
        2: {
          text: '已执行',
          status: 'Processing',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 180,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" key="execute" onClick={() => onExecute(record?.id)}>
            执行
          </Button>
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
    const updataListPub = Pubsub.subscribe('UPDATE-APPLICATIONOTAPLAN', () => {
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
    const { data } = await applicationOtaPlanPage({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      name: params?.name,
      channelName: params?.channelName,
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
              setCreateModalOpen(true);
            }}
            type="primary"
          >
            添加
          </Button>,
        ]}
      />

      {/* 查看/编辑/添加 */}
      <EditModel
        type={modelType}
        formData={formData}
        setCreateModalOpen={setCreateModalOpen}
        createModalOpen={createModalOpen}
      />
      {/* end */}
    </>
  );
};
export default ProTableV1;
