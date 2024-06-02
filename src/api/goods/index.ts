

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
 * @description 商品分类列表
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */
export async function getGoodsCategoryList(data: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/brush.goodsCategory/index', { ...data }).then((response) => response.data)
}
export async function getGoodsCategoryListPage(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/brush.goodsCategory/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}

/**
 * @description 商品分类状态改变
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */
export async function changeGoodStatus(id: string, status: string): Promise<RemotePageResponse<any>> {
  return request.post('/admin/brush.goods/changeStatus', { id, status }).then((response) => response.data)
}

/**
 * @description 商品分类状态改变
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */
export async function changeCategoryGoodStatus(id: string, status: string): Promise<RemotePageResponse<any>> {
  return request.post('/admin/brush.goodsCategory/changeStatus', { id, status }).then((response) => response.data)
}


/**
 * @description 商品分类删除
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */
export async function deletegoodsClassfiy(id: string): Promise<RemotePageResponse<any>> {
  return request.post('/admin/brush.goodsCategory/delete', { id: id }).then((response) => response.data)
}

/**
 * @description 编辑商品分类
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */
export async function editGoodsClassfiy(data: goodsNameType): Promise<RemotePageResponse<any>> {
  return request.post('/admin/brush.goodsCategory/edit', { ...data }).then((response) => response.data)
}

/**
 * @description 创建商品分类
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */
export async function createGoodsClassfiy(data: goodsNameType | { id: string }): Promise<RemotePageResponse<any>> {
  return request.post('/admin/brush.goodsCategory/create', { ...data }).then((response) => response.data)
}



//<<-----------------------------商品管理模块--------------------------------------->>

/**
 * @description 商品管理列表
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function getBrushGoodsList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/brush.goods/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}

/**
 * @description 编辑商品
 * @param data 
 * @returns 
 */
export async function editGood(data: goodsNameType): Promise<RemotePageResponse<any>> {
  return request.post('/admin/brush.goods/edit', { ...data }).then((response) => response.data)
}

/**
 * @description 创建商品
 * @param data 
 * @returns 
 */
export async function createGood(data: goodsNameType | { id: string }): Promise<RemotePageResponse<any>> {
  return request.post('/admin/brush.goods/create', { ...data }).then((response) => response.data)
}

/**
 * @description 商品删除
 * @param id 
 * @returns 
 */
export async function deletegood(id: string): Promise<RemotePageResponse<any>> {
  return request.post('/admin/brush.goods/delete', { id: id }).then((response) => response.data)
}

/**
 * @description 策略管理 初始列表
 */
export async function getTacticsList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/task_plan_group/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}

/**
 * @description 策略管理->策略选择
 */
export async function getTacticsSelect(data: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/task_plan_group/index', { ...data }).then((response) => response.data)
}

/**
 * @description 策略管理->策略选择
 */
export async function getTacticsSelectAll(data: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/task_plan_group/index', { all: 1 }).then((response) => response.data)
}






/*   ---------------------------------  账单  --------------------------------------- */


/**
 * @description 账单变化
 */
export async function changeAccount(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/member.member/changeAccount', { ...data }).then((response) => response.data)
}


/**
 * @description 账单明细
 */
export async function getAccountList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.memberAccountRecord/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}

/**
 * @description 策略管理->等级选择 list
 */
export async function getGradeList(): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.memberLevel/index').then((response) => response.data)
}

/**
 * @description 策略管理->新增 list
 */
export async function setGradeItem(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/task_plan/create', { ...data }).then((response) => response.data)
}
/**
 * @description 策略管理->详情
 */
export function queryGradeItem(id: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/task_plan_group/view', id)
}
/**
 * @description 策略管理->编辑
 */
export function editGradeItem(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/task_plan/edit', { ...data })
}
/**
 * @description 策略管理->删除
 */
export function delGradeItem(id: string): Promise<RemotePageResponse<any>> {
  return request.post('/admin/task_plan_group/delete', { id: id }).then((response) => response.data)
}
/**
 * @description 策略管理->查看计划 
 */
export function getTacticsInfo(id: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/task_plan/index', id)
}

/**
 * @description 策略管理->查看关联
 */
export function getTacticsRelation(id: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/task_plan_group/members', id)
}

/**
 * @description 策略管理->状态切换
 */
export function setStatus(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/task_plan_group/changeStatus', data)
}

/**
 * @description 策略管理->共享状态
 */
export async function setIsOpen(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/task_plan_group/changeIsOpen', data)
}


//<<-----------------------------订单管理模块--------------------------------------->>

/**
 * @description 订单管理->初始列表
 */
export function getOrderList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/brush.goodsOrder/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}

/**
 * @description 订单管理->取消订单
 */
export function actionOrderCancel(id: string): Promise<RemotePageResponse<any>> {
  return request.post('/admin/brush.goodsOrder/cancel', { order_id: id }).then((response) => response.data);
}

/**
 * @description 订单管理->解冻本金
 */
export function actionOrderFreeze(id: string): Promise<RemotePageResponse<any>> {
  return request.post('/admin/brush.goodsOrder/completed', { order_id: id }).then((response) => response.data);
}
