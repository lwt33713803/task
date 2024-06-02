
import { SmartFilterParams } from "@/components/Elgroup/ElTableSearchGroup/ElTableSearchGroup";
import { PageCursor, RemotePageResponse } from "@/components/Elgroup/Elorigin/Elorgin";
import request from "@/utils/requestContorller";
export interface ReponseData<T> {
  data: T,
  msg: string,
  code: any
}
type Config = '' | 'base' | 'default' | 'withdrawal'
// 获取配置项 
export async function getConfigInfo(group: Config): Promise<RemotePageResponse<any>> {
  return request.get('/admin/system.config/index', { group: group })
}

export async function getConfigInfoNoAuth(group: Config): Promise<RemotePageResponse<any>> {
  return request.get('/admin/system.config/site', { group: group })
}



export async function getCountryList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/system.country/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}

// 获取配置项 
export async function editConfig(group_type: Config, data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/system.config/edit', { group_type: group_type, ...data })
}

//管理员管理
export async function getAdminList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/system.admin/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}

//管理员管理
export async function createAdmin(info: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/system.admin/create', { ...info })
}

export async function editAdmin(info: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/system.admin/edit', { ...info })
}

export async function editAdminStatus(info: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/system.admin/edit', { ...info })
}

export async function deleteAdmin(id: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/system.admin/delete', { id })
}

export async function resetDefaultPassword(info: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/system.admin/resetDefaultPassword', { id: info })
}

export async function getAllNode(): Promise<RemotePageResponse<any>> {
  return request.get('/admin/system.adminNode/all').then((response) => response.data)
}
