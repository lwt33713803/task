import { SmartFilterParams } from "@/components/Elgroup/ElTableSearchGroup/ElTableSearchGroup";
import { PageCursor, RemotePageResponse } from "@/components/Elgroup/Elorigin/Elorgin";
import request from "@/utils/requestContorller";
export interface ReponseData<T> {
  data: T,
  msg: string,
  code: any
}

// 获取 bannerList
export async function getAdminLog(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
  return request.get('/admin/system.adminLog/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}