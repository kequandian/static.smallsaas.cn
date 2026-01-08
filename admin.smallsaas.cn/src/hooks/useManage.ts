import { getAppsDel, getOpsReleaseDel, getReleasesDel } from '@/api/appManage';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import { useState } from 'react';

export const useManage = () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [othercreateModalOpen, setOtherCreateModalOpen] = useState<boolean>(false);

  // 删除
  const onAppsDel = async (id: number) => {
    const { code } = await getAppsDel(id);
    if (code === 200) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-APPMANAGELIST');
    }
  };
  // 包删除
  const onReleasesDel = async (id: string) => {
    const { code } = await getReleasesDel(id);
    if (code === 200) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-APPPACKAGELIST');
    }
  };
  // onOpsDel
  const onOpsDel = async (id: number) => {
    const { code } = await getOpsReleaseDel(id);
    if (code === 200) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-OPSLIST');
    }
  };
  return {
    setCreateModalOpen,
    createModalOpen,
    onAppsDel,
    onReleasesDel,
    onOpsDel,
    setOtherCreateModalOpen,
    othercreateModalOpen,
  };
};
