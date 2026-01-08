import { Tabs } from 'antd';
import React, { useState } from 'react';
import InProgressMeetings from './InProgressMeetings.tsx';
import NotStartedMeetings from './NotStartedMeetings';
import TerminatedMeetings from './TerminatedMeetings';

type TabKey = 'notStarted' | 'inProgress' | 'terminated';

const MeetingTabs: React.FC = () => {
  const [activeKey, setActiveKey] = useState<TabKey>('notStarted');
  // 使用时间戳作为key强制组件重新渲染，从而重新获取数据
  const [tabRefreshKeys, setTabRefreshKeys] = useState({
    notStarted: Date.now(),
    inProgress: Date.now(),
    terminated: Date.now(),
  });

  const handleTabChange = (key: TabKey) => {
    setActiveKey(key);
    // 更新当前选中tab的时间戳，触发重新渲染
    setTabRefreshKeys(prev => ({
      ...prev,
      [key]: Date.now()
    }));
  };

  const items = [
    {
      key: 'notStarted',
      label: '未开始会议',
      children: <NotStartedMeetings key={`notStarted-${tabRefreshKeys.notStarted}`} />,
    },
    {
      key: 'inProgress',
      label: '进行中会议',
      children: <InProgressMeetings key={`inProgress-${tabRefreshKeys.inProgress}`} />,
    },
    {
      key: 'terminated',
      label: '历史会议',
      children: <TerminatedMeetings key={`terminated-${tabRefreshKeys.terminated}`} />,
    },
  ];

  return (
    <Tabs
      activeKey={activeKey}
      onChange={(key) => handleTabChange(key as TabKey)}
      items={items}
      type="line"
      size="small"
      tabBarStyle={{ marginBottom: 24 }}
    />
  );
};

export default MeetingTabs;
