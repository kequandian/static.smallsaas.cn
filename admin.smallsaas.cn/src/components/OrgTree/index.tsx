import { useOrganization } from '@/hooks/useOrganization';
import { Tree, Card } from 'antd';
import { FolderOutlined, TeamOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import './index.scss';

interface Props {
  onSelect: (b: any, i: any) => void;
  unknown?: any;
  width?: number | string;
  title?: string;
}

const OrgTreeV2: React.FC<Props> = ({ onSelect, unknown, width = 260, title = '组织架构' }) => {
  const { orgList, getOrgListApi } = useOrganization();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  // 初始化/更新
  useEffect(() => {
    getOrgListApi();
  }, []);

  // 默认选择第一个
  useEffect(() => {
    // 确保 orgList 数据加载完成且不为空
    if (orgList.length > 0) {
      const firstNode = orgList[0];
      onSelect([firstNode.id], { node: firstNode });
      // 默认展开第一级
      setExpandedKeys([firstNode.id]);
    }
  }, [orgList]);

  // 渲染自定义标题，添加图标
  const renderTreeTitle = (nodeData: any) => {
    const icon = nodeData.children && nodeData.children.length > 0 ?
      <FolderOutlined style={{ color: '#1890ff', marginRight: 8 }} /> :
      <TeamOutlined style={{ color: '#52c41a', marginRight: 8 }} />;

    return (
      <span className="tree-node-title">
        {icon}
        <span>{nodeData.name}</span>
      </span>
    );
  };

  const treeData = unknown ? [unknown, ...orgList] : orgList;

  return (
    orgList.length > 0 && (
      <Card
        className="org-tree-card"
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          minWidth: typeof width === 'number' ? `${width}px` : width
        }}
        bodyStyle={{
          padding: 0,
          height: "100%",
          overflow: "hidden"
        }}
        title={
          <div className="tree-card-title">
            <TeamOutlined style={{ marginRight: 8 }} />
            {title}
          </div>
        }
        bordered={false}
      >
        <div className="tree-container">
          <Tree
            defaultSelectedKeys={[orgList[0]?.id]}
            className="custom-tree"
            defaultExpandAll={true}
            defaultExpandParent
            onSelect={onSelect}
            treeData={treeData}
            fieldNames={{ title: 'name', key: 'id' }}
            expandedKeys={expandedKeys}
            onExpand={(keys) => setExpandedKeys(keys)}
            titleRender={renderTreeTitle}
          // showLine
          // blockNode
          />
        </div>
      </Card>
    )
  );
};

export default OrgTreeV2;
