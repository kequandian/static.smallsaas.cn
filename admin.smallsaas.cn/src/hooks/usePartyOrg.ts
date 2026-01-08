import { getMemberById } from '@/api/launcher';
import { addOrganization, getApproveList, getOrgDetails, getParytOrgTree } from '@/api/partyOrg';
import { useState } from 'react';

const traverseTree = (tree: any[]) => {
  if (!tree) return [];
  const nodes = Array.isArray(tree) ? tree : [tree];
  nodes.forEach((node) => {
    node.children = node.childes;
    if (node.childes && node.childes.length > 0) {
      return traverseTree(node.childes);
    }
  });
  return tree;
};

const treeToList = (tree: any[]) => {
  const list: any[] = [];
  const traverse = (node: any) => {
    const { children } = node;
    list.push(node);
    if (children) {
      children.forEach((child: any) => traverse(child));
    }
  };
  tree.forEach((node) => traverse(node));

  return list;
};

export const usePartyOrg = () => {
  const [partyOrgTree, setPartyOrgTree] = useState<any>([]);
  const [partyOrgList, setPartyOrgList] = useState<any>([]);
  const [orgDetails, setOrgDetails] = useState<any>(null);
  const [approveList, setApproveList] = useState<any>([]);
  const [memberDetails, setMemberDetails] = useState<any>(null);

  // 获取组织tree
  const getOrgListApi = async (params: any) => {
    setPartyOrgTree([]);
    const { data, code } = await getParytOrgTree(params);

    if (code === 0) {
      const treeData = traverseTree([...data]);
      setPartyOrgTree(treeData);
      setPartyOrgList(treeToList(treeData));
    }
  };

  // 添加组织
  const addOrgApi = async (params: any) => {
    const res = await addOrganization(params);
    return res;
  };

  // 查询当前用户组织信息
  const getOrgDetailApi = async (params: any) => {
    const { data, code } = await getOrgDetails(params);
    if (code === 0) {
      setOrgDetails(data);
    }
  };
  // 查询当前id党员信息
  const getMemberByIdApi = async (id: any) => {
    const { data, code } = await getMemberById(id);
    if (code === 0) {
      setMemberDetails(data);
    }
  };

  // 查询转入转出审批列表
  const getApproveListApi = async (params: any) => {
    if (approveList.length > 0) return;
    const { data, code } = await getApproveList(params);
    if (code === 0) {
      setApproveList(data);
    }
  };

  return {
    getOrgListApi,
    partyOrgTree,
    addOrgApi,
    getOrgDetailApi,
    orgDetails,
    getApproveListApi,
    approveList,
    partyOrgList,
    getMemberByIdApi,
    memberDetails,
  };
};
