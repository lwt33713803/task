

import { SmartFilterParams } from "@/components/Elgroup/ElTableSearchGroup/ElTableSearchGroup";
import { PageCursor, RemotePageResponse } from "@/components/Elgroup/Elorigin/Elorgin";
import { goodsNameType } from '@/views/memberUnitCore/goodsClassifyManage/components/classify'
import request from "@/utils/requestContorller";

export interface ReponseData<T> {
  data: T,
  msg: string,
  code: any
}

/*
 *getTacticsList: 获取策略管理列表
 */
export async function getTacticsList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/task_plan_group/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}

/**
 * @description 用户分类列表
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */
export async function getGoodsCategoryList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.goodsCategory/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}


/**
 * @description 用户分类删除
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */
export async function changeMemberTaskGroup(data): Promise<RemotePageResponse<any>> {
  return request.post('/admin/member.member/changeTaskGroup', { ...data })
}
/**
 * @description 用户分类列表
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */
export async function getGoodsCategoryListAll(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/brush.goodsCategory/index', { all: '1' }).then((response) => response.data)
}


/**
 * @description 用户分类删除
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */
export async function deletegoodsClassfiy(id: string): Promise<RemotePageResponse<any>> {
  return request.post('/admin/member.goodsCategory/delete', { id: id }).then((response) => response.data)
}

/**
 * @description 编辑用户分类
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */
export async function editGoodsClassfiy(data: goodsNameType): Promise<RemotePageResponse<any>> {
  return request.post('/admin/member.goodsCategory/edit', { ...data }).then((response) => response.data)
}

/**
 * @description 创建用户分类
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */
export async function createGoodsClassfiy(data: goodsNameType | { id: string }): Promise<RemotePageResponse<any>> {
  return request.post('/admin/member.goodsCategory/create', { ...data }).then((response) => response.data)
}

type Trest = 'login' | 'pay'
export async function resetMemberPassword(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/member.member/resetPassword', { id: data.id, type: data.type }).then((response) => response.data)
}


//<<-----------------------------用户管理模块--------------------------------------->>

export async function setCountryDefault(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/system.country/default', { id: data.id }).then((response) => response.data)
}

export async function setCountryEdit(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/system.country/changeStatus', { id: data.id, status: data.status }).then((response) => response.data)
}

export async function changeConfigTaskStatus(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/member.member/changeConfigTaskStatus', { id: data.id, config_task_status: data.config_task_status }).then((response) => response.data)
}


/**
 * @description 用户管理列表
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function getmemberList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.member/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}
/**
 * @description 用户管理列表
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function getmemberListDefault(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.member/parentList', { ...pageCursor, ...filterParams }).then((response) => response.data)
}


/**
 * @description 用户管理列表
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function getmemberAgent(): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.member/agent').then((response) => response.data)
}



/**
 * @description 获取用户银行卡信息
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function getMemberBank(member_id: string): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.memberBankcard/index', { member_id: member_id, all: 1 }).then((response) => response.data)
}



/**
 * @description 编辑用户银行卡信息
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function setMemberBank(data: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.memberBankcard/edit', { ...data }).then((response) => response.data)
}

/**
 * @description 获取用户银行卡列表
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function getBankList(data: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.memberBankcard/bankList', { ...data }).then((response) => response.data)
}
export async function getBankListAll(data: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.memberBankcard/bankList', { ...data })
}
export async function getParentArray(data: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.member/parentArray', { ...data })
}
export async function getChildArray(data: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.member/childArray', { ...data })
}

/**
 * @description 获取用户信息
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function getMemberView(member_id: string): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.member/view', { id: member_id }).then((response) => response.data)
}

/**
 * @description 修改用户信息
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function setMemberView(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/member.member/edit', { ...data }).then((response) => response.data)
}
/**
 * @description 获取用户实名
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function getMemberVerifyView(member_id: string): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.MemberVerify/view', { member_id: member_id }).then((response) => response.data)
}
/**
 * @description 获取用户实名
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function setMemberVerifyEdit(data: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.MemberVerify/edit', { ...data }).then((response) => response.data)
}


export async function getmemberListAll(username): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.member/index', { all: 1, username: username }).then((response) => response.data)
}

/**
 * @description 用户配置获取
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function getmemberConfig(member_id: string): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.memberTask/index', { member_id: member_id }).then((response) => response.data)
}
export async function getmemberSkin(member_id: string): Promise<RemotePageResponse<any>> {
  return request.get('admin/system.config/skin', { member_id: member_id }).then((response) => response.data)
}

/**
 * @description 用户配置查询商品
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function getmemberConfigGoods(data: any, otherParmas?: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.memberTask/goods', { ...data, ...otherParmas }).then((response) => response.data)
}

/**
 * @description 用户账单变化信息
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function getmemberBillAccount(member_id: string): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.member/account', { member_id: member_id }).then((response) => response.data)
}

/**
 * @description 用户账单变化列表
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */

export async function getmemberBillList(username: string): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.memberAccountRecord/account', { username: username }).then((response) => response.data)
}
/**
 * @description 编辑用户
 * @param data 
 * @returns 
 */
export async function editMember(data: goodsNameType): Promise<RemotePageResponse<any>> {
  return request.post('/admin/member.member/edit', { ...data }).then((response) => response.data)
}
/**
 * @description 编辑用户配置
 * @param data 
 * @returns 
 */
export async function createMemberConfig(data: goodsNameType): Promise<RemotePageResponse<any>> {
  return request.post('/admin/member.memberTask/create', { ...data }).then((response) => response.data)
}
/**
 * @description 编辑用户
 * @param data 
 * @returns 
 */
export async function getAppendMemberConfig(member_id: string): Promise<RemotePageResponse<any>> {
  return request.get('/admin/member.memberTask/getAppend', { member_id: member_id }).then((response) => response.data)
}
/**
 * @description 编辑修改打针
 * @param data 
 * @returns 
 */
export async function setAppendMemberConfig(member_id: string, rows: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/member.memberTask/editAppend', { member_id: member_id, rows: rows }).then((response) => response.data)
}

/**
 * @description 创建用户
 * @param data 
 * @returns 
 */
export async function createMember(data: goodsNameType | { id: string }): Promise<RemotePageResponse<any>> {
  return request.post('/admin/member.member/create', { ...data }).then((response) => response.data)
}

/**
 * @description 用户删除
 * @param id 
 * @returns 
 */
export async function deleteMember(id: string): Promise<RemotePageResponse<any>> {
  return request.post('/admin/member.member/delete', { id: id }).then((response) => response.data)
}

/**
 * @description 修改管理员状态
 * @param pageCursor 
 * @param filterParams 
 * @returns 
 */
export async function changeAdminStatus(id: string, status: string): Promise<RemotePageResponse<any>> {
  return request.post('/admin/system.admin/changeStatus', { id, status }).then((response) => response.data)
}
