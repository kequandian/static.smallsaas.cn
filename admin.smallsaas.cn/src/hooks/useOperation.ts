import { putDelOperators } from '@/api/operation';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import { useState } from 'react';

export const useOperation = () => {
  // 服务器from
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  // 删除
  const onDel = async (id: number) => {
    const { code } = await putDelOperators(id);
    if (code === 200) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-CHANNELLIST');
    }
  };
  return {
    setCreateModalOpen,
    createModalOpen,
    onDel,
  };
};
