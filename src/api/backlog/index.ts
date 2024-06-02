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
 * @description 策略列表
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */
export async function getAuditList(): Promise<RemotePageResponse<any>> {
  return request.get('/admin/audit_record/index', { page: 1, list_rows: 5, audit_status: 'pending' }).then((response) => response.data)
}


/**
 * @description 订单列表
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */
export function getOrderList(): Promise<RemotePageResponse<any>> {
  return request.get('/admin/brush.goodsOrder/index', { page: 1, list_rows: 5 }).then((response) => response.data)
}


/**
 * @description 用户管理列表
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function getmemberList(): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.member/readyRows', { page: 1, list_rows: 10 }).then((response) => response.data)
}


/**
 * @description 用户管理 状态
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function setStatus(id: number, config_task_status: number): Promise<RemotePageResponse<any>> {
  return request.post('/admin/member.member/changeConfigTaskStatus', { id, config_task_status }).then((response) => response.data)
}


/**
 * @description 策略管理 初始列表
 */
export async function getTacticsList(): Promise<RemotePageResponse<any>> {
  return request.get('/admin/task_plan_group/index',  { page: 1, list_rows: 10 }).then((response) => response.data)
}


/**
 * @description 等级列表
 */
export async function getGenderList(): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.memberLevel/readyRows',  { list_rows: 5 }).then((response) => response.data)
}
