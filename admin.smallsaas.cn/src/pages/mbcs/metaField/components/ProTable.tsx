import { getdelMachines, getMachines } from '@/api/mbcs';
import Confirmation from '@/components/Confirmation';
import { useTheServer } from '@/hooks/useTheServer';
import { EllipsisOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, message, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';

export type TableListItem = {
  key: number;
  name: string;
  status: string;
  createTime: number;
  meetingNumber: string;
  meetingServerIp: string;
};

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
  CHECK = '查看',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen } = useTheServer();

  // item
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  // 编辑回现
  const onEdit = (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(data);
    setCreateModalOpen(true);
  };

  const onDel = (data: any) => {
    getdelMachines(data).then((res: any) => {
      if (res.code === 200) {
        message.success('删除成功');
        // 刷新
        if (proTableV1Ref) {
          // 手动调用刷新
          proTableV1Ref.current?.reload();
        }
      }
    });
  };

  const onCopy = (data: any) => {
    // 复制
    navigator.clipboard.writeText(data);
    message.success('复制成功');
  };
  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-METAFIELD', () => {
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
  // 查看
  // const onCheck = (data: any) => {
  //   setModelType(EModelType.CHECK);
  //   data.notes = '';
  //   setFormData(data);
  //   setCreateModalOpen(true);
  // };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '服务标识',
      dataIndex: 'entity',
      ellipsis: true,
      width: 120,
    },
    {
      title: '表名',
      dataIndex: 'entityTableName',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '字段名',
      dataIndex: 'entityFieldName',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '字段类型',
      dataIndex: 'entityFieldType',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '过滤字段',
      dataIndex: 'whereFieldName',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },

    {
      title: '备注',
      dataIndex: 'note',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 60,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" key="edit" onClick={() => onCopy(record.entityFieldName)}>
            复制
          </Button>

          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: (
                    <a key="edit" onClick={() => onEdit(record)}>
                      编辑
                    </a>
                  ),
                  key: 'edit',
                },
                {
                  label: (
                    <Confirmation onConfirm={() => onDel(record)} key="del">
                      <a>删除</a>
                    </Confirmation>
                  ),
                  key: 'del',
                },
              ],
            }}
          >
            <a>
              <EllipsisOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize

    const { data } = await getMachines({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      whereFieldName: params.entity,
      // 你可以添加其他需要的查询参数
    });
    return {
      data: data, // 数据列表
      total: data.total, // 数据总数
      // 如果有其他分页信息，也可以在这里返回
    };
  };

  return (
    <>
      <ProTable<TableListItem>
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
        headerTitle="列表"
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
            新增
          </Button>,
        ]}
      />

      {/* 查看/编辑/新增 */}
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
