import { SmartFilterParams } from "@/components/Elgroup/ElTableSearchGroup/ElTableSearchGroup";
import { PageCursor, RemotePageResponse } from "@/components/Elgroup/Elorigin/Elorgin";
import request from "@/utils/requestContorller";
export interface ReponseData<T> {
  data: T,
  msg: string,
  code: any
}

// 获取 noticeList
export async function getNoticeList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/message/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}
// 创建 noticeList
export function setNotice(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/message/create', data)
}
// 删除 noticeList
export function delNotice(id: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/message/delete', { id }).then((response) => response.data)
}

// 编辑 noticeList
export function editNotice(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/message/edit', data)
}

// 获取all 消息类型
export function searchTypes(data: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/system.dict/index', data)
}

// 获取all 消息类型
export function searchTypesPage(pageCursor: PageCursor, data: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/system.dict/index', { ...pageCursor, all: 1, ...data })
}
// 获取all 消息类型
export function searchTypeAll(): Promise<RemotePageResponse<any>> {
  return request.get('/admin/system.dict/index', { all: 1, type: '' })
}

// 获取all 接受人
export function searchUsers(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/member.member/index', data)
}

// 查询 item 接收人
export function searchItemUser(id: any): Promise<RemotePageResponse<any>> {
  return request.get('/admin/message/receives', id)
}

// 修改状态
export function setStatus(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/message/changeStatus', data)
}

