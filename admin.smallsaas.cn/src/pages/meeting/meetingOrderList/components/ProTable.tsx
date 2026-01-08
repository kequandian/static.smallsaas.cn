import { getMeetingAgendas } from '@/api/meeting';
import { useMeeting } from '@/hooks/useMeeting';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import dayjs from 'dayjs';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}
const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();

  const { createModalOpen, setCreateModalOpen, onCancelMeeting } = useMeeting();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);
  const [formData, setFormData] = useState<any>();
  // const onEdit = (data: any) => {
  //   setModelType(EModelType.EDIT);
  //   setFormData(data);
  //   setCreateModalOpen(true);
  // };
  const onCancel = (id: number) => {
    // 取消预约
    // console.log(data);
    onCancelMeeting(id);
  };

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-MEETINGORDERLIST', () => {
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
      title: '会议主题',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '预约设备',
      dataIndex: 'deviceName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '会议号',
      dataIndex: 'meetingNumber',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: 'creatorUserName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '会议开始时间',
      dataIndex: 'meetingStartTime',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record: any) => {
        return dayjs(Number(record.meetingStartTime)).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '会议结束时间',
      dataIndex: 'meetingEndTime',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record: any) => {
        return dayjs(Number(record.meetingEndTime)).format('YYYY-MM-DD HH:mm:ss');
      },
    },

    {
      title: '创建时间',
      key: 'createTime',
      hideInSearch: true,
      dataIndex: 'createTime',
      sorter: (a, b) => {
        const aTime = new Date(a.createTime).getTime(); // 需要先转换成时间戳
        const bTime = new Date(b.createTime).getTime();
        return aTime - bTime;
      },
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
          {/* <Button  type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button> */}
          <Button
            disabled={!!record.cancel}
            type="link"
            key="cancel"
            onClick={() => onCancel(record.id)}
          >
            {record.cancel ? '已取消' : '取消预约'}
          </Button>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize
    const { data } = await getMeetingAgendas({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      // search: {
      //   name: params.name || '',
      //   sn: params.sn || '',
      // },
      title: `${params.title || ''}`,
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
      <ProTable
        columns={columns}
        actionRef={proTableV1Ref}
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          labelWidth: 'auto',
        }}
        request={request}
        rowKey="id"
        headerTitle="会议预约列表"
        scroll={{ x: 1300 }}
        // toolBarRender={() => [
        // <Button
        //   onClick={() => {
        //     setModelType(EModelType.ADD);
        //     setFormData(null);
        //     setCreateModalOpen(true);
        //   }}
        //   type="primary"
        //   key="primary"
        // >
        //   预约会议
        // </Button>,
        // ]}
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
