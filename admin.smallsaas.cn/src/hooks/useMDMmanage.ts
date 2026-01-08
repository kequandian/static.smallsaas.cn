import {
  mdmAddInstallAll,
  mdmAppDeleteVersion,
  mdmAppInstallDelete,
  mdmAppInstallUpdateMustStatus,
  mdmAppInstallUpdateStatus,
} from '@/api/MDMApi';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import { useState } from 'react';

export const useMDMmanage = () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  // 禁用/启用当前应用
  const onMdmAppInstallUpdateStatus = async (b: boolean, id: number) => {
    const { code } = await mdmAppInstallUpdateStatus({ id: id, status: b ? 1 : 0 });
    if (code === 0) {
      message.success('设置成功');
      Pubsub.publish('UPDATE-MDMMANAGELIST');
    }
  };
  // 预设应用是否强制安装
  const onMdmAppInstallUpdateMustStatus = async (b: boolean, id: number) => {
    const { code } = await mdmAppInstallUpdateMustStatus({ id: id, status: b ? 1 : 0 });
    if (code === 0) {
      message.success('设置成功');
      Pubsub.publish('UPDATE-MDMMANAGELIST');
    }
  };
  // 删除当前预设应用
  const onMdmAppInstallDelete = async (id: number) => {
    const { code } = await mdmAppInstallDelete({ id: id });
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-MDMMANAGELIST');
    }
  };
  // 删除当前版本
  const onMdmAppDeleteVersion = async (id: number) => {
    const { code } = await mdmAppDeleteVersion({ id: id });
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-MDMMANAGEVERSIONLIST');
    }
  };

  // 管理员一键推送预装应用安装与更新
  const onMdmAddInstallAll = async () => {
    const { code } = await mdmAddInstallAll();
    if (code === 0) {
      message.success('推送成功');
    }
  };

  return {
    setCreateModalOpen,
    onMdmAddInstallAll,
    createModalOpen,
    onMdmAppInstallDelete,
    onMdmAppDeleteVersion,
    onMdmAppInstallUpdateStatus,
    onMdmAppInstallUpdateMustStatus,
  };
};
