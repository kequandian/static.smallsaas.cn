import { request } from '@umijs/max';

// const LAUNCHER_API_URL = REACT_APP_ENV === 'prod' ? LAUNCHER_API_URL : '/launcherV1';

/** 获取组织树 */
export async function getParytOrgTree(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/partyOrganization/getOrganizationTree`, {
    method: 'POST',
    data,
  });
}

/** 添加组织 */
export async function addOrganization(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/partyOrganization/addOrganization`, {
    method: 'POST',
    data,
  });
}

/** 获取当前用户组织信息 */
export async function getOrgDetails(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/partyOrganization/getOrganizationById`, {
    method: 'GET',
    params: data,
  });
}

/** 提交转移组织申请 */
export async function orgApply(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/partyMemberChangeOrganization/apply`, {
    method: 'POST',
    data,
  });
}

/** 查询转入转出审批列表 */
export async function getApproveList(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/partyMemberChangeOrganization/getApproveList`, {
    method: 'POST',
    data,
  });
}

/** 党员转入转出审批*/
export async function partyApprove(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/partyMemberChangeOrganization/approve`, {
    method: 'POST',
    data,
  });
}
/** 删除*/
export async function partyMembeOrgDel(id: any) {
  return request(
    `${LAUNCHER_API_URL}/portal/partyMemberChangeOrganization/delete
`,
    {
      method: 'GET',
      params: { id: id },
    },
  );
}

/** 党员转换组织详情 */
export async function getOrgChangeDetails(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/partyMemberChangeOrganization/getInfoById`, {
    method: 'GET',
    params: data,
  });
}

/** 查询党内职务 */
export async function getProfessionList(data: any) {
  return request(`${LAUNCHER_API_URL}/portal/partyMember/getProfession`, {
    method: 'GET',
    params: data,
  });
}
