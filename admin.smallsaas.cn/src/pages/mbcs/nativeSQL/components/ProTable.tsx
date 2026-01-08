import { getDelDosqlList, getDosqlList, getSqlDetail } from '@/api/mbcs';
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

  const onSqlDetail = async (id: any) => {
    const { data } = await getSqlDetail(id);
    setFormData(data);
    return data;
  };

  // 编辑回现
  const onEdit = async (data: any) => {
    await onSqlDetail(data?.id);
    setModelType(EModelType.EDIT);
    setCreateModalOpen(true);
  };

  const onDel = (data: any) => {
    getDelDosqlList(data).then((res: any) => {
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

  // const onCopy = (data: any) => {
  //   console.log();

  //   // 复制
  //   navigator.clipboard.writeText(`${location.host}${data}`);
  //   message.success('复制成功');
  // };

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-NATIVESQL', () => {
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
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '服务标识',
      dataIndex: 'fieldName',
      ellipsis: true,
      width: 120,
      hideInSearch: true,
    },

    {
      title: 'apiUrl',
      dataIndex: 'apiUrl',
      hideInSearch: true,
      ellipsis: true,
      width: 120,
      copyable: true,
      // render: (_, record: any) => (
      //   <div className=" cursor-pointer">
      //     {record.apiUrl} {record.apiUrl && <CopyOutlined onClick={() => onCopy(record.apiUrl)} />}
      //   </div>
      // ),
    },
    {
      title: '参数',
      dataIndex: 'params',
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
          <Button type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: (
                    <Confirmation onConfirm={() => onDel(record.id)} key="del">
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

    const { data } = await getDosqlList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      // 你可以添加其他需要的查询参数
    });
    return {
      data: data.records, // 数据列表
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
        pagination={{
          defaultPageSize: 10,
        }}
        search={false}
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
