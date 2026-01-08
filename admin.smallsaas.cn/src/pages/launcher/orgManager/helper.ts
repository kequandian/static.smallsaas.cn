export const getProfessionText = (professionList: any[]) => {
  return professionList?.map((item) => item.profession).join(',');
};

const statusMap: { [key: number]: string } = {
  3: '撤回',
  5: '转出驳回',
  8: '转入驳回',
  10: '提出申请',
  20: '转出审批通过',
  30: '转入审批通过',
};
export const getStatuText = (status: number) => {
  return statusMap[status] || '';
};

export const findParentById = (tree: any[], targetId: number) => {
  let parent = null;
  function traverse(node: any) {
    if (!node || !node.children) return;
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      // 如果找到目标节点，则返回当前节点作为其父节点
      if (child.id === targetId) {
        parent = node;
        return true;
      }
      // 递归检查子节点
      if (traverse(child)) {
        return true;
      }
    }
  }
  // 遍历顶层节点
  for (let i = 0; i < tree.length; i++) {
    if (traverse(tree[i])) {
      break;
    }
  }

  return parent;
};
