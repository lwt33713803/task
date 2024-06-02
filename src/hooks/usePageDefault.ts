/*
 * @Author: 
 * @Date: 2023-06-20 15:11:20
 * @LastEditors: 
 * @LastEditTime: 2023-07-19 16:35:16
 * @FilePath: /shop-backend-ele/src/hooks/usePageDefault.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ref, Ref } from 'vue'



const DEFAULT_PAGE_SIZE = 10
const DEFAULT_PAGE_INDEX = 1
const LAYOUT = 'sizes,prev, pager, next,total,jumper';
const PAGESIZES = [10, 20, 50, 100, 200, 1000];

export default (
  pageSize = DEFAULT_PAGE_SIZE,
  pageIndex = DEFAULT_PAGE_INDEX,
): [Ref<number>, Ref<number>] => {

  const _pageIndex = ref(pageIndex)
  const _pageSize = ref(pageSize)

  return [_pageIndex, _pageSize]
}
