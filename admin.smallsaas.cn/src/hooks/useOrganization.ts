import { getOrgTreeList } from '@/api/organization';
import { getSysOrgList } from '@/api/theServer';

import { useState } from 'react';

export const useOrganization = () => {
  // 组织list
  const [orgList, setOrgList] = useState<any>([]);
  const [organizationList, setOrganizationList] = useState<any>([]);

  // 获取组织list
  const getOrgListApi = async () => {
    const { data, code } = await getOrgTreeList({ pageSize: 20, pageNum: 1 });
    if (code === 200) setOrgList(data?.children);
  };
  // 获取组织列表
  const getOrganizationList = async () => {
    const { data, code } = await getSysOrgList({ pageSize: 200, pageNum: 1 });
    console.log(data, 'getOrganizationList');

    if (code === 200) setOrganizationList(data.records);
    return data;
  };

  return {
    getOrgListApi,
    orgList,
    organizationList,
    getOrganizationList,
  };
};
