import { getPollingActivitySignUp } from '@/api/pollingManager';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { useRef } from 'react';

const ProTableV1: React.FC = () => {
  const pathParams = useParams();
  const proTableV1Ref = useRef<ActionType>();

  const columns: ProColumns<any>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      hideInSearch: true,
    },
    {
      title: '时间',
      dataIndex: 'createDate',
      hideInSearch: true,
    },
  ];

  const request = async (params: any) => {
    const { data } = await getPollingActivitySignUp({
      id: pathParams.id,
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
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
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        headerTitle="投票列表"
        search={false}
      />
    </>
  );
};
export default ProTableV1;
