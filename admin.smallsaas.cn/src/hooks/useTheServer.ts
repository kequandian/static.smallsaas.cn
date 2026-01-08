import { getEndUserDel } from '@/api/enduser';
import { getOperatorsList } from '@/api/operation';
import { getTheServerList, getTheServerListDel } from '@/api/theServer';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import { useState } from 'react';

export const useTheServer = () => {
  // 服务器from
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  // 服务器list
  const [theServerLis, setTheServerLis] = useState<any>([]);
  // 运营商list
  const [operatorList, setOperatorList] = useState<any>([]);

  // 获取服务器列表
  const getTheServerListApi = async () => {
    const { data } = await getTheServerList({ pageSize: 20, pageNum: 1 });
    if (data) {
      setTheServerLis([...data.records]);
    }
    return data.records;
  };
  // 获取运营商列表
  const getOperatorListApi = async () => {
    const { data } = await getOperatorsList({ pageSize: 20, pageNum: 1 });
    if (data) {
      setOperatorList([...data.records]);
    }
    return data.records;
  };

  // 删除
  const onDel = async (id: number) => {
    const { code } = await getTheServerListDel(id);
    getTheServerListApi();
    if (code === 200) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-THESERVERLIST');
    }
  };

  const onEndUserDel = async (id: number) => {
    const { code } = await getEndUserDel(id);
    getTheServerListApi();
    if (code === 200) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-ENDUSERLIST');
    }
  };
  return {
    setCreateModalOpen,
    createModalOpen,
    onDel,
    getTheServerListApi,
    theServerLis,
    getOperatorListApi,
    operatorList,
    onEndUserDel,
  };
};
