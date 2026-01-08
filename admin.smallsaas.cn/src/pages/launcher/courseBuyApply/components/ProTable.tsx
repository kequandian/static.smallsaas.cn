import { courseBuyApplyList, courseBuyApplyUpdateStatus } from '@/api/learningTaskOutside';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef } from 'react';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}
// 状态 :0 申请处理中  1 已购买  2撤销预定
// 状态为0时,展示按钮 处理  点击处理调用状态变更接口
export const typeOptions = [
  {
    label: '申请处理中',
    value: 0,
  },
  {
    label: '已购买',
    value: 1,
  },
  {
    label: '撤销预定',
    value: 2,
  },
];
const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  // const { createModalOpen, setCreateModalOpen } = useLauncher();
  // const [formData, setFormData] = useState<any>();
  // const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);
  // 编辑回现
  const onDelivery = async (id: any) => {
    const { code } = await courseBuyApplyUpdateStatus({
      id,
      status: 1, //变成已购买
    });
    if (code === 0) {
      message.success('设置成功');
      if (proTableV1Ref) {
        // 手动调用刷新
        proTableV1Ref.current?.reload();
      }
    }
  };
  const columns: ProColumns<any>[] = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      ellipsis: true,
    },
    {
      title: '课程名称',
      dataIndex: 'courseMasterName',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '金额',
      dataIndex: 'price',
      hideInSearch: true,
      ellipsis: true,
      valueType: 'money',
    },
    {
      title: '购买人',
      dataIndex: 'userName',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '课程图片',
      dataIndex: 'imgUrl',
      hideInSearch: true,
      ellipsis: true,
      valueType: 'image',
    },

    {
      title: '邮箱',
      dataIndex: 'mail',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '备注',
      dataIndex: 'content',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      ellipsis: true,
      valueEnum: {
        0: {
          text: '申请处理中',
          status: 'Processing',
        },
        1: {
          text: '已购买',
          status: 'Success',
        },
        2: {
          text: '撤销预定',
          status: 'Error',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button
            type="link"
            key="edit"
            hidden={record.status !== 0}
            onClick={() => onDelivery(record.id)}
          >
            发货
          </Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-COURSEBUYAPPLY', () => {
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
    const { data } = await courseBuyApplyList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      orderNo: params?.orderNo,
    });
    return {
      data: data?.list || [], // 数据列表
      total: data.total, // 数据总数
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
        headerTitle="课程预定列表"
        // toolBarRender={() => [
        //   <Button
        //     key={'add'}
        //     onClick={() => {
        //       setModelType(EModelType.ADD);
        //       setFormData(null);
        //       setCreateModalOpen(true);
        //     }}
        //     type="primary"
        //   >
        //     添加
        //   </Button>,
        // ]}
      />

      {/* 查看/编辑/添加 */}
      {/* <EditModel
        type={modelType}
        formData={formData}
        setCreateModalOpen={setCreateModalOpen}
        createModalOpen={createModalOpen}
      /> */}
      {/* end */}
    </>
  );
};
export default ProTableV1;
