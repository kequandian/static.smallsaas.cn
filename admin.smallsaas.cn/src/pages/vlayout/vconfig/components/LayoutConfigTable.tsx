import { layoutConfigCopy, layoutConfigDelete, layoutConfigList, layoutConfigPage } from '@/services/layout/layoutService';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal, Space, message } from 'antd';
import { useRef, useState } from 'react';
import FixedLayoutConfigEditor from './FixedLayoutConfigEditor';

export enum EModalType {
  ADD = '新建',
  EDIT = '编辑',
}

const LayoutConfigTable: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentLayout, setCurrentLayout] = useState<API.LayoutConfigDTO | undefined>();
  const [modalType, setModalType] = useState<EModalType>(EModalType.ADD);

  // 编辑布局
  const handleEdit = (record: API.LayoutConfigDTO) => {
    setModalType(EModalType.EDIT);
    setCurrentLayout(record);
    setModalVisible(true);
  };

  // 删除布局
  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个布局配置吗？删除后无法恢复。',
      onOk: async () => {
        try {
          const res = await layoutConfigDelete({ id });
          if (res.code === 200) {
            message.success('删除成功');
            if (actionRef.current) {
              actionRef.current.reload();
            }
          } else {
            message.error(res.message || '删除失败');
          }
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  // 复制布局
  const handleCopy = async (id: number, name: string) => {
    Modal.confirm({
      title: '确认复制',
      content: '确定要复制这个布局配置吗？',
      onOk: async () => {
        try {
          const res = await layoutConfigCopy({ id});
          if (res.code === 200) {
            message.success('复制成功');
            if (actionRef.current) {
              actionRef.current.reload();
            }
          } else {
            message.error(res.message || '复制失败');
          }
        } catch (error) {
          message.error('复制失败');
        }
      },
    });
  };

  // 表格列定义
  const columns: ProColumns<API.LayoutConfigDTO>[] = [
    {
      title: '布局名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '布局编码',
      dataIndex: 'code',
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => [
        <Button type="link" key="edit" onClick={() => handleEdit(record)}>
          编辑
        </Button>,
        <Button type="link" key="copy" onClick={() => handleCopy(record.id!, record.name)}>
          复制
        </Button>,
        <Button type="link" key="delete" onClick={() => handleDelete(record.id!)}>
          删除
        </Button>,
      ],
    },
  ];

  // 获取布局列表数据
  const fetchLayoutData = async (params: any) => {
    try {
      const res = await layoutConfigPage({
        pageNum: params.current,
        pageSize: params.pageSize,
        name: params.name,
        code: params.code,
      });

      if (res.code === 200) {
        return {
          data: res.data?.records || [],
          total: res.data?.total || 0,
          success: true,
        };
      }
      return {
        data: [],
        total: 0,
        success: false,
      };
    } catch (error) {
      return {
        data: [],
        total: 0,
        success: false,
      };
    }
  };

  return (
    <>
      <ProTable<API.LayoutConfigDTO>
        headerTitle="布局列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              setModalType(EModalType.ADD);
              setCurrentLayout(undefined);
              setModalVisible(true);
            }}
          >
            新建布局
          </Button>,
        ]}
        request={fetchLayoutData}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
        }}
      />

      {/* 全屏布局配置弹窗 */}
      <FixedLayoutConfigEditor
        open={modalVisible}
        onOpenChange={setModalVisible}
        layout={currentLayout}
        type={modalType}
        onSuccess={() => {
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
      />
    </>
  );
};

export default LayoutConfigTable; 