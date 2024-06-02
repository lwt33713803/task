// 审批 + 审批流
import { SmartFilterParams } from "@/components/Elgroup/ElTableSearchGroup/ElTableSearchGroup";
import { PageCursor, RemotePageResponse } from "@/components/Elgroup/Elorigin/Elorgin";
import request from "@/utils/requestContorller";

export interface ReponseData<T> {
    data: T,
    msg: string,
    code: any
}

//管理员管理
export async function getAdminList(data: any ): Promise<RemotePageResponse<any>> {
    return request.get('/admin/system.admin/index', { ...data }).then((response) => response.data)
}


/**
 * @description 审批管理列表
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function getApprovalList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
    return request.get('/admin/audit_record/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}

/**
 * @description 审批管理 - 审批详情
 * @param id 
 * @returns 
 */

export async function getApprovalDesc(id: string): Promise<RemotePageResponse<any>> {
    return request.get('/admin/audit_record/view', { id })
}

/**
 * @description 审批管理 - 审批
 * @param {id: 审批记录id ,audit_status：审批状态}
 * @returns 
 */

export async function subApproval(data: any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/audit_record/audit', { ...data })
}



/**
 * @description 审批流管理列表
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function getApprovalsList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
    return request.get('/admin/audit_flow/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}


/**
 * @description 审批流管理 - 创建
 * @param {name: '名称',type: '类型',nodes:'节点配置',status:'状态'}
 * @returns 
 */

export async function createApprovals(data: any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/audit_flow/create', { ...data })
}

/**
 * @description 审批流管理 - 编辑
 * @param {id,name: '名称',type: '类型',nodes:'节点配置',status:'状态'}
 * @returns 
 */

export async function editApprovals(data: any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/audit_flow/edit', { ...data })
}

/**
 * @description 审批流管理 - 回显
 * @param {id,name: '名称',type: '类型',nodes:'节点配置',status:'状态'}
 * @returns 
 */

export async function queryApprovals(id: any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/audit_flow/view', { id })
}

/**
 * @description 审批流管理 - 删除
 * @param {id}
 * @returns 
 */

export async function delApprovals(id: string): Promise<RemotePageResponse<any>> {
    return request.post('/admin/audit_flow/delete', { id })
}

/**
 * @description 审批流管理 - 状态
 * @param {id}
 * @returns 
 */

export async function setStatus(id: string, status: string): Promise<RemotePageResponse<any>> {
    return request.post('/admin/audit_flow/changeStatus', { id, status }).then((response) => response.data)
}

/**
 * @description 充值渠道
 * @returns 
 */

export async function getTrans(): Promise<RemotePageResponse<any>> {
    return request.post('/admin/audit_record/rechargeChannels').then((response) => response.data)
}