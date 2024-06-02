import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { UserForm, UserInfo, UserPageVO, UserQuery, Edit } from './types';
import { PageCursor, RemotePageResponse } from "@/components/Elgroup/Elorigin/Elorgin";
import { SmartFilterParams } from "@/components/Elgroup/ElTableSearchGroup/ElTableSearchGroup";
import resequesting from "@/utils/requestContorller";
export interface ReponseData<T> {
	data: T,
	msg: string,
	code: any
}

/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
export function getUserInfo(): AxiosPromise<UserInfo> {
  return request({
    url: '/admin/system.auth/info',
    method: 'get'
  });
}

/**
 * 用户分润管理
 */
export async function getUserCommissions(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return resequesting.get('/admin/member.divideCommission/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}

//用户分润-修改 
export function divideCommissionedit(data: Edit): Promise<RemotePageResponse<any>> {
  return request.post('/admin/member.divideCommission/edit', data)
}

//转盘|优惠券明细
export function memberInviteRecord(data: any): Promise<RemotePageResponse<any>> {
  return request({
    url: '/admin/member.memberInviteRecord/index',
    method: 'get',
    params: data
  });
}

//分享列表
export async function getMarketShareList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return resequesting.get('/admin/market.share/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}
//获取-分享规则
export function getMarketRulesList(): any {
  return request({
    url: '/admin/market.share/rule',
    method: 'get'
  });
}
//保存-规则
export function actionEditMarketRule(data: any): any {
  return request.post('/admin/market.share/rule', data)
}
// 优惠券列表
export function getCouponList(data: any): any {
  return request({
    url: '/admin/market.coupon/index',
    method: 'get',
    params: data
  });
}
// 全部优惠券
export function getAllCouponList(): any {
	return getCouponList({all:1});
}

//账变记录
export async function account_operations(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return resequesting.get('/admin/member.memberAccountRecord/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}
