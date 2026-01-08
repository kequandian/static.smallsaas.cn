import { getEditPassword, getEquipmentList } from '@/api/equipment';
import Confirmation from '@/components/Confirmation';
import { useEquipment } from '@/hooks/useEquipment';
import EditModel from '@/pages/meeting/meetingEquipment/components/EditModel';
import { CheckCircleOutlined, CloseCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Input, Modal, Space, Switch, Tag } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';

export type TableListItem = {
  key: string; // 添加 key 属性
  name: string;
  status: string;
  createTime: number;
  meetingNumber: number;
  meetingServerIp: string;
  meetingStatus: string;
  operatorName: string; // 假设这里还有其他字段
  mode: string;
  sn: string;
  city: string;
  authorize: boolean;
  enablePw: boolean;
  updateTime: number;
  loginUserName: string;
};

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
  CHECK = '查看',
}

const ProTableV1: React.FC<{
  orgId: string;
}> = ({ orgId }) => {
  const proTableV1Ref = useRef<ActionType>();
  const clientPw = useRef<any>();

  const {
    createModalOpen,
    onAuthorization,
    onEnableNoPWLogin,
    setCreateModalOpen,
    onDel,
    onDevicesDisable,
  } = useEquipment();

  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  // 监听Pubsub EQUIPMENTLIST=>设备列表刷新
  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-EQUIPMENTLIST', () => {
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

  // 编辑回显
  const onEdit = (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(data);
    setCreateModalOpen(true);
  };

  // 查看
  const onCheck = (data: any) => {
    setModelType(EModelType.CHECK);
    setFormData(data);
    setCreateModalOpen(true);
  };

  // 修改登录密码
  const onEditPassword = async (id: number) => {
    Modal.confirm({
      title: '是否修改登录密码?',
      destroyOnClose: true,
      icon: <></>,
      content: (
        <Input placeholder="请输入新密码" onChange={(ev) => (clientPw.current = ev.target.value)} />
      ),
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        const params = {
          clientPw: clientPw.current,
        };
        await getEditPassword(params, id);
      },

      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // 免密登陆
  const onIsPassword = (checked: boolean, record: any) =>
    onEnableNoPWLogin(checked ? 0 : 1, record.id);

  /**
   * 配置表格列
   * @title 列名称
   * @dataIndex 关联参数名的索引
   * @hideInTable 是否显示在表格
   * @nahideInFormme 是否显示在表单
   * @fieldProps 配置表单内组件属性
   * @width 列宽
   * @hideInSearch 是否显示在搜索
   * @ellipsis 超出省略号
   * @valueEnum 枚举定义
   * @fixed 是否固定列 left/right
   * @render 自定义渲染
   * @align 是否列居中
   */
  const columns: ProColumns<TableListItem>[] = [
    // 假列 用来显示搜索
    {
      title: '搜索',
      dataIndex: 'search',
      hideInTable: true,
      hideInForm: true,
      fieldProps: {
        placeholder: '名称/SN',
      },
    },

    //
    {
      title: '设备名称',
      dataIndex: 'name',
      ellipsis: true,
      hideInSearch: true,
      width: 150,

    },
    // {
    //   title: 'SN',
    //   dataIndex: 'hwSn',
    //   // ellipsis: true,
    //   hideInSearch: true,
    //   // width: 200,
    // },

    {
      title: '序列号hwSn',
      dataIndex: 'hwSn',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '序列号sn',
      dataIndex: 'sn',
      // ellipsis: true,
      hideInSearch: true,
      // width: 200,
    },
    {
      title: '型号',
      dataIndex: 'model',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '制造商',
      dataIndex: 'manufacturer',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '地区',
      dataIndex: 'provinceName',
      hideInSearch: true,
      width: 120,
      render: (_, record: any) => {
        let { provinceName, cityName, districtName } = record;

        // 处理provinceName可能是JSON字符串的情况
        try {
          if (provinceName && typeof provinceName === 'string' && provinceName.startsWith('[')) {
            const addressArray = JSON.parse(provinceName);
            if (Array.isArray(addressArray) && addressArray.length > 0) {
              // 如果是JSON数组格式，直接使用数组内容
              provinceName = addressArray[0] || '';
              cityName = addressArray[1] || '';
              districtName = addressArray[2] || '';
            }
          }
        } catch (error) {
          console.error('解析地区数据失败:', error);
        }

        // 过滤掉空值并拼接
        const address = [provinceName, cityName, districtName]
          .filter((item) => item !== null && item !== '') // 过滤掉 null、undefined 和空字符串
          .join('/'); // 用 '/' 拼接

        return <>{address}</>;
      },
    },
    {
      title: '媒体服务器',
      dataIndex: 'meetingServerName',
      hideInSearch: true,
      ellipsis: true,
      // width: 120,
    },
    // {
    //   title: '设备状态',
    //   dataIndex: 'status',
    //   hideInSearch: true,
    //   ellipsis: true,
    //   render: (_, record: any) => {
    //     return <Tag
    //       icon={record.status === 'ON_LINE' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
    //       color={record.status === 'ON_LINE' ? 'success' : 'default'}>{record.status === 'ON_LINE' ? '在线' : '离线'}</Tag>;
    //   },
    // },

    {
      title: '操作',
      dataIndex: 'option',
      hideInSearch: true,
      width: 160,
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Button type="link" onClick={() => onDel(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize

    const { data } = await getEquipmentList({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      orgId: orgId || '',
      unOrg: orgId === '-1',
      search: `${params.search || ''}`,
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
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          labelWidth: 'auto',
        }}
        params={{ orgId: orgId }}
        request={request}
        headerTitle="设备列表"
      // toolBarRender={() => [
      //   <Button
      //     onClick={() => {
      //       setModelType(EModelType.ADD);
      //       setFormData(null);
      //       setCreateModalOpen(true);
      //     }}
      //     type="primary"
      //     key="primary"
      //   >
      //     创建设备
      //   </Button>,
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
