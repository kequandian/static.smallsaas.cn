import { request } from '@umijs/max';

/** 获取服会议列表 */
export async function getMeetingList(data: any) {
  return request('/v2/api/adm/newconf/meetings', {
    method: 'GET',
    params: data,
  });
}

/** 获取服会议预约列表 */
export async function getMeetingAgendas(data: any) {
  return request('/v2/api/adm/newconf/meetingAgendas/list', {
    method: 'GET',
    params: data,
  });
}

/** 获取服会议预约列表 */
export async function getMeetingChatRecord(meetingId: any) {
  return request(`/v2/api/newconf/meetings/chat/${meetingId}/chatRecord`, {
    method: 'GET',
  });
}

/** 获取会议详情 */
export async function getMeetingsDetails(id: any) {
  console.log(id);

  return request(`/v2/api/adm/newconf/meetings/${id}`, {
    method: 'GET',
  });
}

//会议号路由
/** 会议号路由列表 */
export async function getMeetingNumberGateway(data: any) {
  return request(`/v2/api/adm/newconf/meetingNumberGateway`, {
    method: 'GET',
    params: data,
  });
}
/** 添加会议号路由 */
export async function postMeetingNumberGateway(data: any) {
  return request(`/v2/api/adm/newconf/meetingNumberGateway`, {
    method: 'POST',
    data,
  });
}
/** 编辑会议号路由 */
export async function postEditMeetingNumberGateway(data: any, id: number) {
  return request(`/v2/api/adm/newconf/meetingNumberGateway/${id}`, {
    method: 'PUT',
    data,
  });
}

/** 删除会议号路由 */

export async function postDelMeetingNumberGateway(id: number) {
  return request(`/v2/api/adm/newconf/meetingNumberGateway/${id}`, {
    method: 'DELETE',
  });
}
// end

// 专用会议号管理
/** 专用会议号列表 */
export async function getExclusiveMeetingNumbers(data: any) {
  return request(`/v2/api/adm/newconf/exclusiveMeetingNumbers`, {
    method: 'GET',
    params: data,
  });
}
/** 添加专用会议号 */
export async function postExclusiveMeetingNumbers(data: any) {
  return request(`/v2/api/adm/newconf/exclusiveMeetingNumbers`, {
    method: 'POST',
    data,
  });
}
/** 编辑专用会议号*/
export async function postEditExclusiveMeetingNumbers(data: any, id: number) {
  return request(`/v2/api/adm/newconf/exclusiveMeetingNumbers/${id}`, {
    method: 'PUT',
    data,
  });
}

/** 删除专用会议号 */

export async function postDelExclusiveMeetingNumbers(id: number) {
  return request(`/v2/api/adm/newconf/exclusiveMeetingNumbers/${id}`, {
    method: 'DELETE',
  });
}
/** 预约会议 */
export async function postMeetingAgendasBooking(data: any) {
  return request(`/v2/api/adm/newconf/meetingAgendas/booking`, {
    method: 'POST',
    data,
  });
}
/** 会议类别列表 */
export async function postMeetingCategorys() {
  return request(`/v2/api/adm/newconf/meetingCategorys/list`, {
    method: 'GET',
  });
}
/** 取消预约 */
export async function putCancelMeeting(id: number) {
  return request(`/v2/api/adm/newconf/meetingAgendas/${id}/cancel`, {
    method: 'PUT',
  });
}

/** 当前会议聊天记录 */

export async function getMeetingIdChatRecord(meetingId: any) {
  return request(`/v2/api/adm/newconf/meetings/chat/${meetingId}/chatRecord`, {
    method: 'GET',
  });
}

// end
// 会议投票列表
// /api/newconf/vote/page
export async function getMeetingVotePage(data: any) {
  return request(`/v2/api/adm/newconf/vote/page`, {
    method: 'GET',
    params: data,
  });
}
// 会议投票审批
// /api/adm/newconf/vote/approve
export async function postMeetingVoteApprove(data: any) {
  return request(`/v2/api/adm/newconf/vote/approve`, {
    method: 'PUT',
    params: data,
  });
}

// 会议表决列表
// /api/newconf/meetingVoteStatistics/page
export async function getMeetingVoteStatisticsPage(data: any) {
  return request(`/v2/api/adm/newconf/meetingVoteStatistics/page`, {
    method: 'GET',
    params: data,
  });
}
// 会议表决审批
// /api/newconf/meetingVoteStatistics/approve
export async function meetingVoteStatisticsApprove(data: any) {
  return request(`/v2/api/adm/newconf/meetingVoteStatistics/approve`, {
    method: 'PUT',
    params: data,
  });
}

// /api/adm/newconf/meetingMinutes/page
export async function getMeetingMinutesPage(data: any) {
  return request(`/v2/api/adm/newconf/meetingMinutes/page`, {
    method: 'GET',
    params: data,
  });
}

// /api/adm/newconf/meetingMinutes/approve
export async function postMeetingMinutesApprove(data: any) {
  return request(`/v2/api/adm/newconf/meetingMinutes/approve`, {
    method: 'PUT',
    params: data,
  });
}

// /api/adm/newconf/meetingMinutes/editText
export async function postMeetingMinutesEditText(data: any) {
  return request(`/v2/api/adm/newconf/meetingMinutes/editText`, {
    method: 'PUT',
    params: data,
  });
}

// 获取未开始会议列表
export async function getNotStartedMeetingList(params: any) {
  return request('/api/adm/newconf/meetings/page/notStartedMeeting', {
    method: 'GET',
    params,
  });
}

// 获取进行中会议列表
export async function getInProgressMeetingList(params: any) {
  return request('/api/adm/newconf/meetings/page/inProgressMeeting', {
    method: 'GET',
    params,
  });
}

// 获取已结束会议列表
export async function getTerminatedMeetingList(params: any) {
  return request('/api/adm/newconf/meetings/page/terminatedMeeting', {
    method: 'GET',
    params,
  });
}

// 获取会议详情
export async function getMeetingDetails(id: number) {
  return request(`/api/adm/newconf/meetings/${id}`, {
    method: 'GET',
  });
}

// 获取会议参会人信息
export async function getMeetingParticipants(id: number) {
  return request(`/api/adm/newconf/meetings/${id}/participants`, {
    method: 'GET',
  });
}

// 获取会议聊天记录
export async function getMeetingChatRecords(meetingId: number) {
  return request(`/api/adm/newconf/meetings/chat/${meetingId}/archivedChatRecord`, {
    method: 'GET',
  });
}

// 获取会议实例列表
export async function getMeetingInstances(meetingId: number) {
  return request(`/api/adm/newconf/meetingInstance/${meetingId}/list`, {
    method: 'GET',
  });
}

// 创建会议（示例API，需要后续替换）
export async function createMeeting(data: any) {
  return request('/api/adm/newconf/meetings/create', {
    method: 'POST',
    data,
  });
}

// 更新会议信息（示例API，需要后续替换）
export async function updateMeeting(id: number, data: any) {
  return request(`/api/adm/newconf/meetings/${id}`, {
    method: 'PUT',
    data,
  });
}

// 取消会议（示例API，需要后续替换）
export async function cancelMeeting(id: number) {
  return request(`/api/adm/newconf/meetings/${id}/cancel`, {
    method: 'POST',
  });
}
