import { request } from '@umijs/max';

// 1. 工作流分类接口
export async function getCategoryList(params: any) {
  return request('/api/adm/categories/all', {
    method: 'GET',
    params,
  });
}

export async function getCategoryTree(params: any) {
  return request('/api/adm/categories/all/tree', {
    method: 'GET',
    params,
  });
}

export async function getCategoryById(id: string) {
  return request(`/api/adm/categories/${id}`, {
    method: 'GET',
  });
}

export async function addCategory(data: any) {
  return request('/api/adm/categories', {
    method: 'POST',
    data,
  });
}

export async function updateCategory(id: string, data: any) {
  return request(`/api/adm/categories/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function deleteCategory(id: string) {
  return request(`/api/adm/categories/${id}`, {
    method: 'DELETE',
  });
}

// 2. 工作流接口
export async function getWorkflowList(params: any) {
  return request('/api/adm/wf/processes', {
    method: 'GET',
    params,
  });
}

export async function getWorkflowById(id: string) {
  return request(`/api/adm/wf/processes/${id}`, {
    method: 'GET',
  });
}

export async function addWorkflow(data: any) {
  return request('/api/adm/wf/processes', {
    method: 'POST',
    data,
  });
}

export async function updateWorkflow(id: string, data: any) {
  return request(`/api/adm/wf/processes/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function toggleWorkflowStatus(id: string) {
  return request(`/api/adm/wf/processes/status/${id}`, {
    method: 'PUT',
  });
}

export async function deleteWorkflow(id: string) {
  return request(`/api/adm/wf/processes/${id}`, {
    method: 'DELETE',
  });
}

// 工作流步骤接口
export async function getStepsByWorkflowId(processId: string) {
  return request(`/api/adm/wf/processes/${processId}/steps`, {
    method: 'GET',
  });
}

export async function getStepById(id: string) {
  return request(`/api/adm/wf/processes/steps/${id}`, {
    method: 'GET',
  });
}

export async function addStep(processId: string, data: any) {
  return request(`/api/adm/wf/processes/${processId}/steps`, {
    method: 'POST',
    data,
  });
}

export async function updateStep(id: string, data: any) {
  return request(`/api/adm/wf/processes/steps/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function deleteStep(processId: string, id: string) {
  return request(`/api/adm/wf/processes/steps/${id}`, {
    method: 'DELETE',
  });
}
// 3. 工作流实例接口
export async function getInstanceList(params: any) {
  return request('/api/adm/v2/wf/instances', {
    method: 'GET',
    params,
  });
}
// /api/adm/v2/wf/instances
export async function getInstanceById(id: string) {
  return request(`/api/adm/v2/wf/instances/${id}`, {
    method: 'GET',
  });
}

export function addInstance(data: any) {
  return request('/api/adm/pub/wf/instances', {
    method: 'POST',
    data,
  });
}

export function reSubmitInstance(id: string, data: any) {
  return request(`/api/adm/pub/wf/instances/${id}/submit`, {
    method: 'PUT',
    data,
  });
}

export async function deleteInstance(id: string) {
  return request(`/workflow/instance/delete/${id}`, {
    method: 'DELETE',
  });
}

export async function approveInstance(id: string, data: any) {
  return request(`/workflow/instance/approve/${id}`, {
    method: 'POST',
    data,
  });
}

export async function rejectInstance(id: string, data: any) {
  return request(`/workflow/instance/reject/${id}`, {
    method: 'POST',
    data,
  });
}

export async function rollbackInstance(id: string, data: any) {
  return request(`/workflow/instance/rollback/${id}`, {
    method: 'POST',
    data,
  });
}
