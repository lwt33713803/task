// 订单管理
import { SmartFilterParams } from "@/components/Elgroup/ElTableSearchGroup/ElTableSearchGroup";
import { PageCursor, RemotePageResponse } from "@/components/Elgroup/Elorigin/Elorgin";
import request from "@/utils/requestContorller";

/**
 * @description 订单列表
 * @returns 
 */
export async function getOrderList(pageCursor: PageCursor, filterParams: SmartFilterParams): Promise<RemotePageResponse<any>> {
    return request.get('/admin/brush.goodsOrder/index', { ...pageCursor, ...filterParams }).then((response) => response.data)
}
