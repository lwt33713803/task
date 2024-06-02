import { SmartFilterParams } from "@/components/Elgroup/ElTableSearchGroup/ElTableSearchGroup";
import { PageCursor, RemotePageResponse } from "@/components/Elgroup/Elorigin/Elorgin";
import request from "@/utils/requestContorller";
export interface ReponseData<T> {
    data: T,
    msg: string,
    code: any
}

// 获取 单页列表
export async function getPagesList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
    return request.get('/admin/single_page/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}


// 创建 单页
export async function createPage(data:any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/single_page/create', data)
}

// 删除 单页
export async function delPages(id: string): Promise<RemotePageResponse<any>> {
    return request.post('/admin/single_page/delete',{id}).then((response) => response.data)
}

// 获取 单页详情
export async function getPagesDetail(id:string,lang:string): Promise<RemotePageResponse<any>> {
	if(lang){
		return request.get('/admin/single_page/view', {id,lang}).then((response) => response.data)
	}else{
		return request.get('/admin/single_page/view', {id}).then((response) => response.data)
	}
}

// 编辑 单页
export async function editPages(data: any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/single_page/edit',data)
}

//切换单页状态
export async function editPagesChangeStare(id: Number,status:Number): Promise<RemotePageResponse<any>> {
    return request.get('/admin/single_page/changeStatus', {
		id,status
	})
}

//langs for selector 
export async function getLangs(): Promise<RemotePageResponse<any>> {
	return request.get('/admin/lang/all').then((response) => response.data)
  }


