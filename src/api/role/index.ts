

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
 * @description 系统管理->角色列表
 */
export function getRolesList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/system.adminRole/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}

/**
 * @description 系统管理->角色列表
 */
export function getRolesListAll(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/system.adminRole/index', { all: '1' }).then((response) => response.data)
}

/**
 * @description 系统管理->角色删除
 */
export function actionRoleDelete(id: string): Promise<RemotePageResponse<any>> {
  return request.post('/admin/system.adminRole/delete', { id: id }).then((response) => response.data);
}

/**
 * @description 系统管理->角色编辑
 */
export async function actionRoleEdit(data: goodsNameType): Promise<RemotePageResponse<any>> {
  return request.post('/admin/brush.goods/edit', { ...data }).then((response) => response.data)
}
// export function actionRoleEdit(id: string): Promise<RemotePageResponse<any>> {
//   return request.post('/admin/system.adminRole/delete', { id: id }).then((response) => response.data);
// }
