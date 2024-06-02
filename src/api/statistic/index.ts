import { SmartFilterParams } from "@/components/Elgroup/ElTableSearchGroup/ElTableSearchGroup";
import { PageCursor, RemotePageResponse, RemotePageResponseObj } from "@/components/Elgroup/Elorigin/Elorgin";
import request from "@/utils/requestContorller";
import { TuserData } from "./type";
export interface ReponseData<T> {
    data: T,
    msg: string,
    code: any
}
// 获取 数据统计 - 静态展示
export function getData(): Promise<RemotePageResponse<TuserData>> {
    return request.get('/admin/stat/userData')
}

// 获取 数据统计 - 订单数据
export function getOderData(data: any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/stat/orderData', { ...data })
}

// 获取 数据统计 - 收入支出
export function getOutlayData(data: any): Promise<RemotePageResponse<any>> {
    return request.post('/admin/stat/rechargeWithdrawal', { ...data })
}
