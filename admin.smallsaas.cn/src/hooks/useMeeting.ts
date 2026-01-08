import { getUserAccountsList } from '@/api/enduser';
import {
  getMeetingIdChatRecord,
  postDelExclusiveMeetingNumbers,
  postDelMeetingNumberGateway,
  putCancelMeeting,
} from '@/api/meeting';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import { useState } from 'react';

export const useMeeting = () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  // 终端用户列表
  const [userAccountsList, setUserAccountsList] = useState<any>();
  // 会议号路由删除
  const onDelMeetingGateway = async (id: number) => {
    const { code } = await postDelMeetingNumberGateway(id);
    if (code === 200) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-MEETINGNUMROUTING');
    }
  };
  // 专用会议号删除
  const onDelExclusive = async (id: number) => {
    const { code } = await postDelExclusiveMeetingNumbers(id);
    if (code === 200) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-EXCLUSIVEMEETINGNUMBERS');
    }
  };
  // 组织用户列表
  const getOrgUserList = async () => {
    const { data } = await getUserAccountsList({ pageSize: 20, pageNum: 1 });
    if (data) {
      setUserAccountsList([...data.records]);
    }
    return data.records;
  };

  // 取消预约
  const onCancelMeeting = async (id: number) => {
    const { code } = await putCancelMeeting(id);
    if (code === 200) {
      message.success('取消成功');
      Pubsub.publish('UPDATE-MEETINGORDERLIST');
    }
  };

  // 当前会议聊天记录
  const onMeetingIdChatRecord = async (meetingId: number) => {
    const { data } = await getMeetingIdChatRecord(meetingId);
    if (data) {
      setUserAccountsList([...data.records]);
    }
    return data.records;
  };
  return {
    userAccountsList,
    getOrgUserList,
    createModalOpen,
    setCreateModalOpen,
    onDelExclusive,
    onDelMeetingGateway,
    onCancelMeeting,
    onMeetingIdChatRecord,
  };
};
