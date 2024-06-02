import { RemotePageResponse } from "@/components/Elgroup/Elorigin/Elorgin";
import request from "@/utils/requestContorller";
export interface ReponseData<T> {
    data: T,
    msg: string,
    code: any
}

export async function setPassword(data: any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/system.auth/changePassword', data)
}