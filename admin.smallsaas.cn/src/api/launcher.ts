import { request } from '@umijs/max';

// launcher服务端接口
// const LAUNCHER_API_URL = REACT_APP_ENV === 'prod' ? LAUNCHER_API_URL : '/launcherV1';
// const LAUNCHER_API_URL = '/admpb';
// const LAUNCHER_API_URL = LAUNCHER_API_URL;

/**
 * 轮播列表
 * @param data 请求参数
 * @returns
 */

export async function launcherFileUpload(data: any) {
  return request(`operation/system/purview/portal/file/upload`, {
    method: 'POST',
    data: data,
  });
}
/**
 * 轮播列表
 * @param data 请求参数
 * @returns
 */

export async function getSysCardGetPageList(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/sysCard/getPageList`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 轮播列表新增/编辑
 * @param data 请求参数
 * @returns
 */

export async function getSaveOrUpdate(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/sysCard/saveOrUpdate`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 轮播删除
 * @param data 请求参数
 * @returns
 */

export async function getSysCardDelete(id: any) {
  return request(`${LAUNCHER_API_URL}/portal/sysCard/delete`, {
    method: 'GET',
    params: { id: id },
  });
}

/**
 * 禁用/启用当前轮播
 * @param data 请求参数
 * @returns
 */

export async function updateStatus(params: any) {
  return request(`${LAUNCHER_API_URL}/portal/sysCard/updateStatus`, {
    method: 'GET',
    params,
  });
}

/**
 * 用户添加数据源时查询未绑定的列表
 * @param data 请求参数
 * @returns
 */

export async function getUserNotSourceList(data: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/xuexiSource/getUserNotSourceList`, {
    method: 'GET',
    params: data,
  });
}
/**
 * 管理员添加数据源时查询列表
 * @param data 请求参数
 * @returns
 */

export async function getAddAdminList(data: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/xuexiSource/getList`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 学习源新增/编辑
 * @param data 请求参数
 * @returns
 */

export async function getXuexiSourceSaveOrUpdate(data: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/xuexiSource/saveOrUpdate`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 学习源删除
 * @param data 请求参数
 * @returns
 */

export async function getXuexiSourceDelete(id: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/xuexiSource/delete`, {
    method: 'GET',
    params: { id: id },
  });
}
/**
 * 学习源 状态修改
 * @param data 请求参数
 * @returns
 */

export async function getXuexiSourceUpdateStatus(params: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/xuexiSource/updateStatus`, {
    method: 'GET',
    params,
  });
}

// 学习源任务

/**
 * 学习源任务列表
 * @param data 请求参数
 * @returns
 */

export async function getXuexiSourceTaskList(data: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/xuexiSourceTask/getList`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 学习源任务 新增/编辑
 * @param data 请求参数
 * @returns
 */

export async function getXuexiSourceTaskaveOrUpdate(data: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/xuexiSourceTask/saveOrUpdate`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 学习源任务删除
 * @param data 请求参数
 * @returns
 */

export async function getXuexiSourceTaskeDelete(id: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/xuexiSourceTask/delete`, {
    method: 'GET',
    params: { id: id },
  });
}
/**
 * 学习源任务状态修改
 * @param data 请求参数
 * @returns
 */

export async function getXuexiSourceTaskUpdateStatus(params: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/xuexiSourceTask/updateStatus`, {
    method: 'GET',
    params,
  });
}

/**
 * 正文内容列表
 * @param data 请求参数
 * @returns
 */

export async function getArticleList(data: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/article/list`, {
    method: 'POST',
    data: data,
  });
}

// 课程api
/**
 * 课程内容列表
 * @param data 请求参数
 * @returns
 */

export async function getCourseList(data: any) {
  return request(`${LAUNCHER_API_URL}/course/courseContentEntity/getList`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 课程内容保存/编辑
 * @param data 请求参数
 * @returns
 */
export async function courseSaveOrUpdate(data: any) {
  return request(`${LAUNCHER_API_URL}/course/courseContentEntity/saveOrUpdate`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 课程内容状态修改
 * @param data 请求参数
 * @returns
 */

export async function courseUpdateStatus(params: any) {
  return request(`${LAUNCHER_API_URL}/course/courseContentEntity/updateStatus`, {
    method: 'GET',
    params,
  });
}

/**
 * 课程内容删除
 * @param data 请求参数
 * @returns
 */

export async function courseDelete(id: any) {
  return request(`${LAUNCHER_API_URL}/course/courseContentEntity/delete`, {
    method: 'GET',
    params: { id: id },
  });
}

// 课程专题
/**
 * 课程专题列表
 * @param data 请求参数
 * @returns
 */

export async function getCourseMasterList(data: any) {
  return request(`${LAUNCHER_API_URL}/course/courseMaster/getList`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 课程专题保存/编辑
 * @param data 请求参数
 * @returns
 */
export async function courseMasterSaveOrUpdate(data: any) {
  return request(`${LAUNCHER_API_URL}/course/courseMaster/saveOrUpdate`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 课程专题状态修改
 * @param data 请求参数
 * @returns
 */

export async function courseMasterUpdateStatus(params: any) {
  return request(`${LAUNCHER_API_URL}/course/courseMaster/updateStatus`, {
    method: 'GET',
    params,
  });
}

/**
 * 课程专题删除
 * @param data 请求参数
 * @returns
 */

export async function courseMasterDelete(id: any) {
  return request(`${LAUNCHER_API_URL}/course/courseMaster/delete`, {
    method: 'GET',
    params: { id: id },
  });
}

// 学习专题
/**
 * 学习专题列表
 * @param data 请求参数
 * @returns
 */

export async function getStudyTopicList(data: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/xuexiMaster/getList`, {
    method: 'POST',
    data: data,
  });
}
/**
 * 学习专题保存/编辑
 * @param data 请求参数
 * @returns
 */
export async function getStudyTopicSaveOrUpdate(data: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/xuexiMaster/saveOrUpdate`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 学习专题状态修改
 * @param data 请求参数
 * @returns
 */

export async function getStudyTopicUpdateStatus(params: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/xuexiMaster/updateStatus`, {
    method: 'GET',
    params,
  });
}

/**
 * 学习专题删除
 * @param data 请求参数
 * @returns
 */

export async function getStudyTopicDelete(id: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/xuexiMaster/delete`, {
    method: 'GET',
    params: { id: id },
  });
}

// 首页推荐
/**
 * 首页推荐列表
 * @param data 请求参数
 * @returns
 */

export async function getHomeList(data: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/centerSuggestion/getList`, {
    method: 'POST',
    data: data,
  });
}
/**
 * 首页推荐保存/编辑
 * @param data 请求参数
 * @returns
 */
export async function getHomeSaveOrUpdate(data: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/centerSuggestion/saveOrUpdate`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 首页推荐状态修改
 * @param data 请求参数
 * @returns
 */

export async function getHomeUpdateStatus(params: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/centerSuggestion/updateStatus`, {
    method: 'GET',
    params,
  });
}

/**
 * 首页推荐删除
 * @param data 请求参数
 * @returns
 */

export async function getHomeDelete(id: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/centerSuggestion/delete`, {
    method: 'GET',
    params: { id: id },
  });
}

// 地区内容
/**
 * 地区内容列表
 * @param data 请求参数
 * @returns
 */

export async function getPlaceContentList(data: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/placeContent/getList`, {
    method: 'POST',
    data: data,
  });
}
/**
 * 地区内容保存/编辑
 * @param data 请求参数
 * @returns
 */
export async function getPlaceContentSaveOrUpdate(data: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/placeContent/saveOrUpdate`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 地区内容状态修改
 * @param data 请求参数
 * @returns
 */

export async function getPlaceContentUpdateStatus(params: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/placeContent/updateStatus`, {
    method: 'GET',
    params,
  });
}

/**
 * 地区内容删除
 * @param data 请求参数
 * @returns
 */

export async function getPlaceContentDelete(id: any) {
  return request(`${LAUNCHER_API_URL}/xuexi-center/placeContent/delete`, {
    method: 'GET',
    params: { id: id },
  });
}

/**
 * 党员列表
 * @param data 请求参数
 * @returns
 */
// /partyMember/getMemberPageList
export async function getMemberList(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/partyMember/getMemberPageList`, {
    method: 'POST',
    data,
  });
}
/**
 * 党员添加/编辑
 * @param data 请求参数
 * @returns
 */
export async function getMemberUpadta(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/partyMember/addMember`, {
    method: 'POST',
    data: data,
  });
}
/**
 * 党员删除
 * @param data 请求参数
 * @returns
 */

export async function getPartyMemberDelete(id: any) {
  return request(
    `${LAUNCHER_API_URL}/portal/partyMember/delete
`,
    {
      method: 'GET',
      params: { id: id },
    },
  );
}

/**
 * 党员添加/编辑
 * @param data 请求参数
 * @returns
 */
export async function getMemberById(id: any) {
  return request(`${LAUNCHER_API_URL}/portal/partyMember/getMemberById`, {
    method: 'GET',
    params: { id: id },
  });
}

// 认证
/**
 * 认证
 * @param data 请求参数
 * @returns
 */
export async function uploadAuthentication(params: any, url: string) {
  return request(`${LAUNCHER_API_URL}/portal/partyMember/${url}`, {
    method: 'GET',
    params,
  });
}

// 党员权限
// /sysRole/getAllList
export async function getSysRoleList(params: any) {
  return request(`${LAUNCHER_API_URL}/portal/sysRole/getAllList`, {
    method: 'POST',
    params,
  });
}

// /sysMenu/aesv;
export async function sysMenuSave(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/sysMenu/save`, {
    method: 'POST',
    data,
  });
}

// /sysRole/save
export async function sysRoleSave(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/sysRole/save`, {
    method: 'POST',
    data,
  });
}

// /sysMenu/getAllList
export async function sysMenuGetAllList(params: any) {
  return request(`${LAUNCHER_API_URL}/portal/sysMenu/getAllList`, {
    method: 'GET',
    params,
  });
}

// /sysRole/delete
export async function sysRoleDelete(params: any) {
  return request(`${LAUNCHER_API_URL}/portal/sysRole/delete`, {
    method: 'GET',
    params,
  });
}
