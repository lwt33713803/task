// 客服管理
import { SmartFilterParams } from "@/components/Elgroup/ElTableSearchGroup/ElTableSearchGroup";
import { PageCursor, RemotePageResponse } from "@/components/Elgroup/Elorigin/Elorgin";
import request from "@/utils/requestContorller";

export interface ReponseData<T> {
    data: T,
    msg: string,
    code: any
}


/**
 * @description 客服列表
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function getServiceList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
    return request.get('/admin/customer_service/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}

/**
 * @description 客服列表 - 创建
 * @param {  name,icon, url} 
 * @returns 
 */

export async function createService(data: any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/customer_service/create', { ...data })
}

/**
 * @description 客服列表 - 删除
 * @param id
 * @returns 
 */

export async function delService(id: string): Promise<RemotePageResponse<any>> {
    return request.post('/admin/customer_service/delete', { id })
}

/**
 * @description 客服列表 - 编辑 
 * @param {  id,name,icon, url} 
 * @returns 
 */

export async function editService(data: any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/customer_service/edit', { ...data })
}



/**
 * @description 客服列表 - 详情
 * @param id
 * @returns 
 */
export async function descService(id: string): Promise<RemotePageResponse<any>> {
    return request.post('/admin/customer_service/view', { id }).then((response) => response.data)
}

/**
 * @description 客服管理 - 状态管理
 * @param id
 * @returns 
 */
export async function setStatus(id: number,status: number): Promise<RemotePageResponse<any>> {
    return request.post('/admin/customer_service/changeStatus', { id,status }).then((response) => response.data)
}


/*  -----------------------       大转盘   --------------------------  */

/**
 * @description 大转盘 - 列表
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */
export async function getWheelList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
    return request.get('/admin/market.rotary/record', { ...pageCursor, ...filterParams }).then((response) => response.data)
}

/**
 * @description 大转盘 - 获取颜色
 * @returns 
 */
export async function getColors(): Promise<RemotePageResponse<any>> {
    return request.get('/admin/market.rotary/backgroundImage').then((response) => response.data)
}

/**
 * @description 大转盘 - 获取规则
 * @returns 
 */
export async function getRules(): Promise<RemotePageResponse<any>> {
    return request.get('/admin/market.rotary/rule').then((response) => response.data)
}

/**
 * @description 大转盘 -  提交规则
 * @returns 
 */
export async function subRules(rows:any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/market.rotary/rule', { rows })
}

/**
 * @description 大转盘 -  获取奖项
 * @returns 
 */
export async function getPrize(): Promise<RemotePageResponse<any>> {
    return request.get('/admin/market.rotary/reward').then((response) => response.data)
}

/**
 * @description 大转盘 -  提交奖项
 * @returns 
 */
export async function subPrize(rows:any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/market.rotary/reward', { rows })
}
