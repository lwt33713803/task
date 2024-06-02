
import { SmartFilterParams } from "@/components/Elgroup/ElTableSearchGroup/ElTableSearchGroup";
import { PageCursor, RemotePageResponse } from "@/components/Elgroup/Elorigin/Elorgin";
import request from "@/utils/requestContorller";
export interface ReponseData<T> {
  data: T,
  msg: string,
  code: any
}

/**
 * @description 系统管理->角色列表
 */
export function getRolesList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/system.adminRole/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}

// 获取所有权限节点
export async function getAllNode(): Promise<RemotePageResponse<any>> {
  return request.get('/admin/system.adminNode/all').then((response) => response.data)
}

// 角色创建
export async function createRoles(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/system.adminRole/create', data);
}

// 角色编辑
export async function editRoles(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/system.adminRole/edit', data);
}

// 角色详情
export async function getRoleDetail(id: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/system.adminRole/view', { id }).then((response) => response.data);
}

// 删除 角色
export async function delRole(id: string): Promise<RemotePageResponse<any>> {
  return request.post('/admin/system.adminRole/delete', { id })
}

//状态编辑
export async function editRoleState(id: string, status: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/system.adminRole/changeStatus', { id, status }).then((response) => response.data)
}
