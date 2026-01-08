import { getGroupByList } from '@/api/roles';
import { Tree, TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

const App: React.FC = () => {
  const [value, setValue] = useState(['0-0-0']);
  const [treeData, setTreeData] = useState();

  const getGroupList = async () => {
    const res = await getGroupByList();
    console.log(res?.data?.items[0]?.items);
    setTreeData(res?.data?.items[0]?.items);
  };

  useEffect(() => {
    getGroupList();
  }, []);

  const onChange = (newValue: string[]) => {
    console.log('onChange ', newValue);
    setValue(newValue);
  };

  return (
    <Tree
      checkable
      // onSelect={onSelect}
      // onCheck={onCheck}
      treeData={treeData}
      fieldNames={{ title: 'name', key: 'id', children: 'items' }}
    />
  );
};

export default App;
