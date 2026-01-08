import { delAdmUsers, delOrg, delPermGroups, delPerms, delTenants } from '@/api/tenantManagement';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import { useState } from 'react';

export const useTenantManagement = () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  // 删除组织
  const onDelOrg = async (id: number) => {
    const { code } = await delOrg(id);
    if (code === 200) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-ORGANIZATION');
    }
  };
  // 删除租户
  const onDelTenants = async (id: number) => {
    const { code } = await delTenants(id);
    if (code === 200) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-TENANTS');
    }
  };
  // 删除平台用户
  const onDelAdmUsers = async (id: number) => {
    const { code } = await delAdmUsers(id);
    if (code === 200) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-ADMUSERSLIST');
    }
  };
  // 删除权限
  const onDelPerms = async (id: number) => {
    const { code } = await delPerms(id);
    if (code === 200) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-PERMLIST');
    }
  };
  // 删除权限分组
  const onDelPermGroups = async (id: number) => {
    const { code } = await delPermGroups(id);
    if (code === 200) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-PERMLIST');
    }
  };

  return {
    createModalOpen,
    setCreateModalOpen,
    onDelOrg,
    onDelTenants,
    onDelPerms,
    onDelPermGroups,
    onDelAdmUsers,
  };
};
