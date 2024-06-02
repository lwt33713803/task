// 支付中心
import { SmartFilterParams } from "@/components/Elgroup/ElTableSearchGroup/ElTableSearchGroup";
import { PageCursor, RemotePageResponse } from "@/components/Elgroup/Elorigin/Elorgin";
import request from "@/utils/requestContorller";



/**
 * @description 充值提现统计
 * @returns 
 */

export async function getStatisticsDesc(data: any): Promise<RemotePageResponse<any>> {
    return request.get('/admin/recharge_withdrawal/statistics', data).then((response) => response.data)
}

/**
 * @description 充值记录列表
 * @param pageCursor  
 * @param filterParams
 * @returns 
 */

export async function getPayList(data: any): Promise<RemotePageResponse<any>> {
    return request.get('/admin/order_recharge/index', { ...data })
}

/**
 * @description 提现记录列表
 * @param pageCursor 
 * @param filterParams
 * @returns 
 */

export async function getWithdrawList(data: any): Promise<RemotePageResponse<any>> {
    return request.get('/admin/order_withdrawal/index', { ...data }).then((response) => response.data)
}

/**
 * @description 创建导出
 * @returns 
 */

export async function createExport(data: any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/recharge_withdrawal/export', { ...data })
}

/**
 * @description 查询导出进度
 * @param filename:文件名
 * @returns 
 */

export async function getExport(filename: string): Promise<RemotePageResponse<any>> {
    return request.get('/admin/recharge_withdrawal/progress', { filename }).then((response) => response.data)
}


/**
 * @description 下载导出文件
 * @returns 
 */

export async function downloadExport(filename: string): Promise<RemotePageResponse<any>> {
    return request.get('/admin/recharge_withdrawal/download', { filename }).then((response) => response.data)
}

/**
 * @description 代理列表
 * @returns 
 */

export async function getAgentList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
    return request.get('/admin/recharge_withdrawal/agentList', { ...pageCursor, ...filterParams }).then((response) => response.data)
}
