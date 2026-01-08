import { getAvatarEefresh, getUserAccountsList, getUserAccountsListWithSearch, getUserType, resetUserPassword } from '@/api/enduser';
import Confirmation from '@/components/Confirmation';
import { useTheServer } from '@/hooks/useTheServer';
import { EllipsisOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Avatar, Button, Dropdown, Modal, Space, Tag, message } from 'antd';
import Pubsub from 'pubsub-js';
import { useEffect, useRef, useState } from 'react';
import EditModel from './EditModel';
import TypeList from './TypeList';

export const userTypeEnum: {
  [key: string]: any;
} = {
  262144: {
    color: 'green',
    text: '普通用户',
  },
  524288: {
    color: 'red',
    text: '组织管理员',
  },
  1048576: {
    color: 'purple',
    text: '设备管理员',
  },
};

// 生产用户列表
export const userTypeList = () => {
  const typeList = [] as any;
  for (const key in userTypeEnum) {
    if (Object.prototype.hasOwnProperty.call(userTypeEnum, key)) {
      const element = userTypeEnum[key];
      typeList.push({
        label: element.text,
        value: Number(key),
        color: element.color,
      });
    }
  }
  return typeList;
};
// end

export enum EModelType {
  ADD = '添加',
  EDIT = '编辑',
  CHECK = '查看',
}

const ProTableV1: React.FC<{
  orgId: string;
}> = ({ orgId }) => {
  const proTableV1Ref = useRef<ActionType>();
  const { createModalOpen, setCreateModalOpen, onEndUserDel } = useTheServer();

  // const [userArr, setUserArr] = useState<string[]>([]);
  const userArr = useRef<any>([]);

  const [formData, setFormData] = useState<any>();
  const [modelType, setModelType] = useState<EModelType>(EModelType.ADD);

  // 编辑回现
  const onEdit = (data: any) => {
    setModelType(EModelType.EDIT);
    setFormData(data);
    setCreateModalOpen(true);
  };

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-ENDUSERLIST', () => {
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

  // 修改用户类型
  const onUserTypeList = async (item: any) => {
    Modal.confirm({
      title: '是否修改用户类型?',
      destroyOnClose: true,
      icon: <></>,
      content: (
        <TypeList
          list={item.userTypeList}
          setUserArr={(e) => (userArr.current = e.map((e: any) => e.value))}
          userTypeList={userTypeList()}
        />
      ),
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        // 修改用户类型状态
        const { code } = await getUserType({ userTypeList: userArr.current.map(Number) }, item.id);

        if (code === 200) {
          message.success('修改成功');
          proTableV1Ref.current?.reload();
        }
        userArr.current = [];
      },

      onCancel() {
        userArr.current = [];
      },
    });
  };

  // 生成随机头像
  const onAvatar = async (id: string) => {
    const { code } = await getAvatarEefresh(id);
    console.log(code);
    if (code === 200) {
      message.success('设置成功');
      proTableV1Ref.current?.reload();
    }
  };

  // 重置密码
  const onResetPassword = async (id: string) => {
    Modal.confirm({
      title: '确认重置密码',
      content: '确定要重置该用户的密码吗？',
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        const result = await resetUserPassword(id);
        if (result.code === 200) {
          // 显示API返回的数据
          Modal.info({
            title: '重置密码成功',
            content: (
              <div>
                {result.data && (
                  <div>
                    {/* <p><strong>返回数据:</strong></p> */}
                    <pre style={{ background: '#f5f5f5', padding: '8px', borderRadius: '4px', fontSize: '12px' }}>
                      {JSON.stringify(result.data, null, 2).replace(/"/g, '')}
                    </pre>
                  </div>
                )}
              </div>
            ),
            okText: '确定',
          });
        } else {
          message.error('密码重置失败');
        }
      },
    });
  };

  const columns: ProColumns<any>[] = [
    {
      title: '搜索',
      dataIndex: 'search',
      hideInTable: true,
      fieldProps: {
        placeholder: '请输入账号或者手机号',
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={record.avatar} />
          <span style={{ marginLeft: 10 }}>{record.name}</span>
        </div>
      ),
    },
    {
      title: '账号',
      dataIndex: 'account',
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: '手机号',
      dataIndex: 'registeredPhone',
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: '用户角色',
      dataIndex: 'userTypeList',
      hideInSearch: true,
      ellipsis: true,
      render: (_, record: any) => {
        return record.userTypeList.map((e: number) => (
          <Tag key={e} bordered={false} color={userTypeEnum[e]?.color}>
            {userTypeEnum[e]?.text}
          </Tag>
        ));
      },
    },

    {
      title: '注册时间',
      key: 'since',
      hideInSearch: true,
      dataIndex: 'createTime',
      width: 200,
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
      width: 220,

      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          {/* <Button type="link" key="userTypeOpen" onClick={() => onUserTypeList(record)}>
            用户类型
          </Button> */}
          {/* <a key="check" onClick={() => onCheck(record)}>
            查看
          </a> */}
          <Button type="link" key="edit" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Button type="link" key="resetPassword" onClick={() => onResetPassword(record.id)}>
            重置密码
          </Button>
          <Confirmation onConfirm={() => onEndUserDel(record.id)} key="del">
            <a>删除</a>
          </Confirmation>
        </Space>
      ),
    },
  ];

  const request = async (params: any) => {
    // 这里的 params 包含了分页的参数，例如：params.current 和 params.pageSize

    const { data } = await getUserAccountsListWithSearch({
      pageNum: params.current || 1, // 当前页码
      pageSize: params.pageSize || 10, // 每页条数
      search: params?.search,

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
        actionRef={proTableV1Ref}
        columns={columns}
        scroll={{ x: 1300 }}
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          labelWidth: 'auto',
        }}
        request={request}
        rowKey="id"
        headerTitle="终端用户列表"
        toolBarRender={() => [
          <Button
            className=" hidden"
            onClick={() => {
              setModelType(EModelType.ADD);
              setFormData(null);
              setCreateModalOpen(true);
            }}
            type="primary"
            key="primary"
          >
            创建终端用户
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
      {/* <TypeList
        // id={id}
        userTypeList={userTypeList}
        isUserTypeOpen={isUserTypeOpen}
        setIsUserTypeOpen={setIsUserTypeOpen}
      /> */}
    </>
  );
};
export default ProTableV1;
