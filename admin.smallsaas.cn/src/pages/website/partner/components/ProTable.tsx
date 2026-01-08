import { getPartnerList } from '@/api/website';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef } from 'react';

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();

  const columns: ProColumns<any>[] = [
    {
      title: '客户名称',
      dataIndex: 'name',
      ellipsis: true,
      // hideInSearch: true,
    },
    // 手机号
    {
      title: '手机号',
      dataIndex: 'phone',
      ellipsis: true,
      hideInSearch: true,
    },
    // 公司名称
    {
      title: '公司名称',
      dataIndex: 'orgName',
      ellipsis: true,
      hideInSearch: true,
    },
    // district
    {
      title: '地区',
      dataIndex: 'district',
      ellipsis: true,
      hideInSearch: true,
    },
  ];

  const request = async (params: any) => {
    try {
      const res = await getPartnerList({
        pageNum: params.current || 1, // 当前页码
        pageSize: params.pageSize || 10, // 每页条数
        isHandle: params.isHandle,
        name: params.name,
      });
      return {
        data: res?.data?.list || [], // 数据列表
        total: res?.data?.total || 0, // 数据总数
      };
    } catch (error) {
      message.error('获取数据失败');
      return {
        data: [],
        total: 0,
        success: false,
      };
    }
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

        headerTitle="合作伙伴列表"
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
      />
    </>
  );
};
export default ProTableV1;
