import { SmartFilterParams } from "@/components/Elgroup/ElTableSearchGroup/ElTableSearchGroup";
import { PageCursor, RemotePageResponse } from "@/components/Elgroup/Elorigin/Elorgin";
import request from "@/utils/requestContorller";
export interface ReponseData<T> {
    data: T,
    msg: string,
    code: any
}

// 获取 等级列表
export async function getGradeList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
    return request.get('/admin/member.memberLevel/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}

// 创建 等级列表
export async function createGrade(data: any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/member.memberLevel/create', { ...data }).then((response) => response.msg)
}

// 删除 等级列表
export async function delGrade(id:string): Promise<RemotePageResponse<any>> {
    return request.post('/admin/member.memberLevel/delete', { id }).then((response) => response.data)
}

// 修改
export async function editGrade(data: any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/member.memberLevel/edit', { ...data }).then((response) => response.msg)
}

// 获取
export async function getGrade(id: number): Promise<RemotePageResponse<any>> {
    return request.post('/admin/member.memberLevel/view', { id }).then((response) => response.data)
}

// 获取
export async function getImgs(): Promise<RemotePageResponse<any>> {
    return request.get('/admin/member.memberLevel/bgImage').then((response) => response.data)
}