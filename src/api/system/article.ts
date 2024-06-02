import { SmartFilterParams } from "@/components/Elgroup/ElTableSearchGroup/ElTableSearchGroup";
import { PageCursor, RemotePageResponse } from "@/components/Elgroup/Elorigin/Elorgin";
import request from "@/utils/requestContorller";
export interface ReponseData<T> {
    data: T,
    msg: string,
    code: any
}

// 获取 文章列表
export async function getArticleList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
    return request.get('/admin/article/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}

// 创建 文章列表
export function setArticle(data: any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/article/create', data)
}

// 修改 文章列表
export function editArticle(data: any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/article/edit', data)
}

// 删除 文章列表
export function delArticle(id: string): Promise<RemotePageResponse<any>> {
    return request.post('/admin/article/delete', {id}).then((response) => response.data)
}

// 获取 all 消息类型
export function searchTypes(): Promise<RemotePageResponse<any>> {
    return request.get('/admin/article_cate/all')
}

// 切换状态
export function setStatus(data: any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/article/changeStatus', data)
  }

// 查询详情
export function queryDesc(id: any,lang:any): Promise<RemotePageResponse<any>> {
    return request.get('/admin/article/view', {id,lang}).then((response) => response.data)
  }

// 查询详情 buy id
export function queryDescById(id: any): Promise<RemotePageResponse<any>> {
    return request.get('/admin/article/view', {id}).then((response) => response.data)
  }
