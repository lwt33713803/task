import { SmartFilterParams } from "@/components/Elgroup/ElTableSearchGroup/ElTableSearchGroup";
import { PageCursor, RemotePageResponse } from "@/components/Elgroup/Elorigin/Elorgin";
import { goodsNameType } from '@/views/brushUnitCore/goodsClassifyManage/components/classify'
import request from "@/utils/requestContorller";

export interface ReponseData<T> {
  data: T,
  msg: string,
  code: any
}

/**
 * @description 代理组列表
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */
export async function getAgencyGroupList(data?: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/agent_group/index', { ...data }).then((response) => response.data)
}

/**
* @description 代理组列表 - 编辑
* @returns 
*/
export async function editAgencyGroupList(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/agent_group/edit', { ...data })
}

/**
* @description 代理组列表 - 创建
* @returns 
*/
export async function setAgencyGroupList(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/agent_group/create', { ...data })
}


/**
* @description 代理组列表 - 删除
* @returns 
*/
export async function delAgencyGroupList(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/agent_group/delete', { ...data })
}

/**
* @description 修改代理状态
* @returns 
*/
export async function setStatus(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/agent/changeStatus', { ...data })
}

/**
* @description 代理列表 
* @param pageCursor 
* @param filterParams 
* @returns 
*/
export async function getAgencyList(data: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/agent/index', { ...data }).then((response) => response.data)
}

/**
* @description 代理列表 - 新增
* @returns 
*/
export async function setAgencyList(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/agent/create', { ...data })
}

/**
* @description 代理列表 - 新增
* @returns 
*/
export async function editAgencyList(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/agent/edit', { ...data })
}

/**
* @description 代理列表 - 删除
* @returns 
*/
export async function delAgencyList(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/agent/delete', { ...data })
}

/**
* @description 代理列表 - 重置密码
* @returns 
*/
export async function resetPassWord(id: number): Promise<RemotePageResponse<any>> {
  return request.post('/admin/agent/resetPassword', { id })
}


// /**
// * @description 代理组 - 国家选项
// * @returns 
// */
// export async function (id: number): Promise<RemotePageResponse<any>> {
//   return request.post('/admin/agent/resetPassword', { id })
// }