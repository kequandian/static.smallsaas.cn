import { volunteerActivityDel } from '@/api/activityManager';
import {
  getBasicWorkDel,
  getDemocraticReviewNoticeDel,
  getIntegralAcquisitionMethodDel,
  getNoticeAnnouncementDel,
  getOrganizationalLifeDel,
  getPioneeringDeedsDel,
  getReviewConferenceDel,
} from '@/api/baseWork';
import {
  courseDelete,
  courseMasterDelete,
  courseMasterUpdateStatus,
  courseUpdateStatus,
  getAddAdminList,
  getHomeDelete,
  getHomeUpdateStatus,
  getPartyMemberDelete,
  getPlaceContentDelete,
  getPlaceContentUpdateStatus,
  getStudyTopicDelete,
  getStudyTopicUpdateStatus,
  getSysCardDelete,
  getXuexiSourceDelete,
  getXuexiSourceTaskeDelete,
  getXuexiSourceTaskUpdateStatus,
  getXuexiSourceUpdateStatus,
  updateStatus,
} from '@/api/launcher';
import {
  learningTaskOutsideContentDelete,
  learningTaskOutsideDelete,
  learningTaskOutsidUpdateStatus,
} from '@/api/learningTaskOutside';
import { partyMembeOrgDel } from '@/api/partyOrg';
import { getPollingActivityDelete } from '@/api/pollingManager';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import { useState } from 'react';

export const useLauncher = () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [userNotSourceList, setUserNotSourceList] = useState<any>([]);

  // 删除当前轮播图
  const onDelBanner = async (id: number) => {
    const { code } = await getSysCardDelete(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-BANNERLIST');
    }
  };
  // 禁用/启用当前轮播图
  const onUpdateStatus = async (b: boolean, id: number) => {
    const { code } = await updateStatus({ id: id, status: b ? 1 : 0 });
    if (code === 0) {
      message.success('设置成功');
      Pubsub.publish('UPDATE-BANNERLIST');
    }
  };
  // 禁用/启用当前学习源
  const onXuexiSourceUpdateStatus = async (b: boolean, id: number) => {
    const { code } = await getXuexiSourceUpdateStatus({ id: id, status: b ? 1 : 0 });
    if (code === 0) {
      message.success('设置成功');
      Pubsub.publish('UPDATE-LEARNINGSOURCELIST');
    }
  };
  // 禁用/启用当前学习源任务
  const onXuexiSourceTaskUpdateStatus = async (b: boolean, id: number) => {
    const { code } = await getXuexiSourceTaskUpdateStatus({ id: id, status: b ? 1 : 0 });
    if (code === 0) {
      message.success('设置成功');
      Pubsub.publish('UPDATE-LEARNINGTASKSLIST');
    }
  };
  // 禁用/启用 课程内容
  const onCourseUpdateStatus = async (b: boolean, id: number) => {
    const { code } = await courseUpdateStatus({ id: id, status: b ? 1 : 0 });
    if (code === 0) {
      message.success('设置成功');
      Pubsub.publish('UPDATE-COURSECONTENT');
    }
  };

  // 禁用/启用 课程专题
  const onCourseMasterUpdateStatus = async (b: boolean, id: number) => {
    const { code } = await courseMasterUpdateStatus({ id: id, status: b ? 1 : 0 });
    if (code === 0) {
      message.success('设置成功');
      Pubsub.publish('UPDATE-COURSEMASTER');
    }
  };
  // 删除当前课程专题
  const onCourseMasterDelete = async (id: number) => {
    const { code } = await courseMasterDelete(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-COURSEMASTER');
    }
  };
  // 删除当前学习源
  const onXuexiSourceTaskeDelete = async (id: number) => {
    const { code } = await getXuexiSourceTaskeDelete(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-LEARNINGTASKSLIST');
    }
  };
  // 获取学习源列表
  const onUserNotSourceList = async () => {
    const { data } = await getAddAdminList({ pageSize: 100, pageNum: 1 });
    if (data) {
      setUserNotSourceList([...data.list]);
    }
  };
  // 删除当前学习源任务
  const onDelXuexiSource = async (id: number) => {
    const { code } = await getXuexiSourceDelete(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-LEARNINGSOURCELIST');
    }
  };
  // 删除课程内容
  const onCourseDelete = async (id: number) => {
    const { code } = await courseDelete(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-COURSECONTENT');
    }
  };

  // 禁用/启用 学习专题
  const onStudyTopicUpdateStatus = async (b: boolean, id: number) => {
    const { code } = await getStudyTopicUpdateStatus({ id: id, status: b ? 1 : 0 });
    if (code === 0) {
      message.success('设置成功');
      Pubsub.publish('UPDATE-STUDYTOPIC');
    }
  };
  // 删除课程专题
  const onStudyTopicDelete = async (id: number) => {
    const { code } = await getStudyTopicDelete(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-STUDYTOPIC');
    }
  };

  // 禁用/启用 首页推荐
  const onHomeUpdateStatus = async (b: boolean, id: number) => {
    const { code } = await getHomeUpdateStatus({ id: id, status: b ? 1 : 0 });
    if (code === 0) {
      message.success('设置成功');
      Pubsub.publish('UPDATE-HOMERECOMMEND');
    }
  };
  // 删除首页推荐
  const onHomeDelete = async (id: number) => {
    const { code } = await getHomeDelete(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-HOMERECOMMEND');
    }
  };
  // 禁用/启用 地区内容
  const onPlaceContentUpdateStatus = async (b: boolean, id: number) => {
    const { code } = await getPlaceContentUpdateStatus({ id: id, status: b ? 1 : 0 });
    if (code === 0) {
      message.success('设置成功');
      Pubsub.publish('UPDATE-REGIONALCONTENT');
    }
  };
  // 删除地区内容
  const onPlaceContentDelete = async (id: number) => {
    const { code } = await getPlaceContentDelete(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-REGIONALCONTENT');
    }
  };

  // 禁用/启用 学习任务表
  const onLearningTaskOutsidUpdateStatus = async (b: boolean, id: number) => {
    const { code } = await learningTaskOutsidUpdateStatus({ id: id, status: b ? 1 : 0 });
    if (code === 0) {
      message.success('设置成功');
      Pubsub.publish('UPDATE-LEARNINGTASKOUTSIDE');
    }
  };

  // 删除学习任务表
  const onLearningTaskOutsideDelete = async (id: number) => {
    const { code } = await learningTaskOutsideDelete(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-LEARNINGTASKOUTSIDE');
    }
  };
  // 删除学习任务表=>学习内容
  const onLearningTaskOutsideContentDelete = async (id: number) => {
    const { code } = await learningTaskOutsideContentDelete(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-LEARNINGTASKOUTSIDECONTENT');
    }
  };

  // 删除党员
  const onPartyMemberDelete = async (id: number) => {
    const { code } = await getPartyMemberDelete(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-PARTYMEMBER');
    }
  };
  // 组织转移列表=>删除
  const onPartyMembeOrgDel = async (id: number) => {
    const { code } = await partyMembeOrgDel(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-ORGANIZATIONALTRANSFER');
    }
  };

  // 志愿活动=>删除
  const onVolunteerActivityDel = async (id: number) => {
    const { code } = await volunteerActivityDel(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-ACTIVITY-TABLE');
    }
  };
  // 投票管理=>删除
  const onPollingActivityDelete = async (id: number) => {
    const { code } = await getPollingActivityDelete(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-POLLINGMANAGER');
    }
  };
  // 基础工作=>删除
  const onBasicWorkDel = async (id: number) => {
    const { code } = await getBasicWorkDel(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-BASEWORK');
    }
  };
  // 先锋事迹=>删除
  const onPioneeringDeedsDel = async (id: number) => {
    const { code } = await getPioneeringDeedsDel(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-PIONEERDEEDS');
    }
  };
  // 通知公告=>删除
  const onNoticeAnnouncementDel = async (id: number) => {
    const { code } = await getNoticeAnnouncementDel(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-NOTICE');
    }
  };
  // 积分定义=>删除
  const onIntegralAcquisitionMethodDel = async (id: number) => {
    const { code } = await getIntegralAcquisitionMethodDel(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-INTEGRALACQUISITIONMETHOD');
    }
  };

  // 组织生活=>删除
  const onOrganizationalLifeDel = async (id: number) => {
    const { code } = await getOrganizationalLifeDel(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-ORGANIZATIONALLIFE');
    }
  };
  // 通知公告=>删除
  const onDemocraticReviewNoticeDel = async (id: number) => {
    const { code } = await getDemocraticReviewNoticeDel(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-REVIEWNOTICE');
    }
  };
  // 会议信息=>删除
  const onReviewConferenceDel = async (id: number) => {
    const { code } = await getReviewConferenceDel(id);
    if (code === 0) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-REVIEWCONFERENCE');
    }
  };
  return {
    createModalOpen,
    setCreateModalOpen,
    onDelBanner,
    onUpdateStatus,
    onDelXuexiSource,
    onXuexiSourceUpdateStatus,
    userNotSourceList,
    onUserNotSourceList,
    onXuexiSourceTaskeDelete,
    onXuexiSourceTaskUpdateStatus,
    onCourseUpdateStatus,
    onCourseDelete,
    onCourseMasterUpdateStatus,
    onCourseMasterDelete,
    onStudyTopicUpdateStatus,
    onStudyTopicDelete,
    onHomeUpdateStatus,
    onHomeDelete,
    onPlaceContentDelete,
    onPlaceContentUpdateStatus,
    onLearningTaskOutsidUpdateStatus,
    onLearningTaskOutsideDelete,
    onLearningTaskOutsideContentDelete,
    onPartyMemberDelete,
    onPartyMembeOrgDel,
    onVolunteerActivityDel,
    onPollingActivityDelete,
    onBasicWorkDel,
    onPioneeringDeedsDel,
    onNoticeAnnouncementDel,
    onIntegralAcquisitionMethodDel,
    onOrganizationalLifeDel,
    onDemocraticReviewNoticeDel,
    onReviewConferenceDel,
  };
};
