import { getCity, getProvince } from '@/api/system';
import { useLauncher } from '@/hooks/useLauncher';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
}

const ProTableV1: React.FC = () => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen } = useLauncher();
  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);
  const [dataSource, setDataSource] = useState<any[]>([]);

  const columns: any = [
    {
      title: '(行政代码)名称',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record: any) => (
        <>
          <div>{`(${record.areaCode})${record.name}`}</div>
        </>
      ),
      with: 500,
    },
    {
      title: '简称',
      dataIndex: 'shortName',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '邮政编码',
      dataIndex: 'zipCode',
      hideInSearch: true,
      ellipsis: true,
    },
    // 区域级别

    {
      title: '电话区号',
      dataIndex: 'prefixCode',
      hideInSearch: true,
      ellipsis: true,
    },

    {
      title: '位置（经纬度)',
      dataIndex: 'longitude',
      hideInSearch: true,
      ellipsis: true,
      render: (_, record: any) => {
        return (
          <>
            <div>{`(${record.longitude},${record.latitude})`}</div>
          </>
        );
      },
    },
  ];

  // 获取子节点
  const getChildList = async (expanded: boolean, record: any) => {
    const hasChildren = record.children.length > 0;
    // 判断是否点击的数据下的子节点children是否为空，就调用接口
    if (expanded && !hasChildren) {
      const { data } = await getCity(record.id);
      console.log('data', record.areaLevel);
      record.children = data;
      if (record?.areaLevel === 1) {
        record.children = data.map((item: any) => {
          return {
            ...item,
            children: [],
          };
        });
      }
      // 更新数据源
      setDataSource((prevDataSource) =>
        prevDataSource.map((item) =>
          item.id === record.id ? { ...item, children: record.children } : item,
        ),
      );
    }
  };

  const request = async () => {
    const { data } = await getProvince();
    const newData = data.map((item: any) => {
      return {
        ...item,
        children: [],
      };
    });
    setDataSource(newData);
  };

  useEffect(() => {
    request();
    const updataListPub = Pubsub.subscribe('UPDATE-FILEMANAGEMENT', () => {
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

  return (
    <>
      <ProTable<any>
        actionRef={proTableV1Ref}
        rowKey="id"
        search={false}
        pagination={{
          defaultPageSize: 10,
        }}
        // scroll={{ x: 1000 }}
        columns={columns}
        headerTitle="列表"
        dataSource={dataSource}
        expandable={{
          onExpand: (expanded, record) => {
            getChildList(expanded, record);
          },
        }}
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
