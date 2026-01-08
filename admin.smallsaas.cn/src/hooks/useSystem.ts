import { getMenuDelete } from '@/api/menu';
import { getDelroles } from '@/api/roles';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import { useState } from 'react';

export const useSystem = () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  // 菜单删除
  const onDel = async (id: number) => {
    const { code } = await getMenuDelete(id);
    if (code === 200) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-MENULIST');
    }
  };

  // 角色删除
  const onDelRole = async (id: number) => {
    const { code } = await getDelroles(id);
    if (code === 200) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-ROLELIST');
    }
  };
  return {
    createModalOpen,
    setCreateModalOpen,
    onDel,
    onDelRole,
  };
};
