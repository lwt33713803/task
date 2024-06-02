import { SmartFilterParams } from "@/components/Elgroup/ElTableSearchGroup/ElTableSearchGroup";
import { PageCursor, RemotePageResponse } from "@/components/Elgroup/Elorigin/Elorgin";
import request from "@/utils/requestContorller";
export interface ReponseData<T> {
  data: T,
  msg: string,
  code: any
}

// 获取 bannerList
export async function getBannerList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/banner/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}
// 创建 bannerList
export function setBanner(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/banner/create', data)
}
// 删除 bannerList
export function delBanner(id: string): Promise<RemotePageResponse<any>> {
  return request.post('/admin/banner/delete', {id: id}).then((response) => response.data)
}
// 修改 bannerList
export function editBanner(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/banner/edit', data)
}

// 切换状态
export function setStatus(data: any): Promise<RemotePageResponse<any>> {
  return request.post('/admin/banner/changeStatus', data)
}

//获取lang详情
export function gatLangView(id: string,lang:string): Promise<RemotePageResponse<any>> {
  return request.get('/admin/banner/view', {id,lang})
}
