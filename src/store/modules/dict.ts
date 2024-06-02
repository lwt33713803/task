
import { defineStore } from "pinia";

// import { store } from "@/store";

import { searchTypes } from '@/api/system/notice';


export const allDicts = defineStore('main',
  () => {
    // state
    const dictWeekMap: Ref<any> = ref(null)
    const params = reactive({ all: 1, type: '' })

    const uploadUserDict = ref([]); // 上传用户类型
    const viewShowDict = ref([]);   // 展示：0 隐藏 | 1 显示
    const balanceDict = ref([]);    // 余额匹配模式
    const brushModelDict = ref([]); // 刷单模式
    const brokerageDict = ref([]);  // 佣金结算方式
    const messageTypeDict = ref([]); // 消息类型
    const memberStatusDict = ref([]);// 会员认证审核状态
    const shoppingOrderDict = ref([]); // 商品订单规则类型
    const genderDict = ref([]);       // 性别


    const querySearchDictMap = async () => {
      const { data, code } = await searchTypeAll();
      if (code === 1) {
        dictWeekMap.value = data
        console.log(dictWeekMap.value)
      }
    }
    const handleSearchTypes = () => {
      return new Promise<void>((resolve, reject) => {
        searchTypes({ ...params }).then(res => {
          const { data } = res;
          console.log('searchTypes', data);
          data.filter(item => {
            // console.log('item', item);
            const { type, child } = item;
            switch (type) {
              case "upload_create_by":
                uploadUserDict.value = child;
                break;
              case "show_hide_status":
                viewShowDict.value = child;
                break;
              case "balance_search_type":
                balanceDict.value = child;
                break;
              case "brush_mode_type":
                brushModelDict.value = child;
                break;
              case "commission_settle_type":
                brokerageDict.value = child;
                break;
              case "message_type":
                messageTypeDict.value = child;
                break;
              case "goods_order_rule_type":
                shoppingOrderDict.value = child;
                break;
              case "commission_method":
                genderDict.value = child;
                break;
              default:
                memberStatusDict.value = child
            }
            // console.log('memberStatusDict',memberStatusDict.value)

            // 1.刷单模式 2.余额匹配模式 3.佣金结算模式 4.等级：http://doc.hr-dj.com/web/#/15/238  5.策略独立接口 /admin/task_plan_group/index query:all
          })
          resolve()
        }).catch((error) => {
          reject(error);
        });
      })
    }


    return {
      querySearchDictMap,
      handleSearchTypes,
      uploadUserDict,
      viewShowDict,
      balanceDict,
      brushModelDict,
      brokerageDict,
      messageTypeDict,
      memberStatusDict,
      dictWeekMap
    };
  }, {
  persist: true,
});

// // 非setup
// export function useUserStoreHook() {
//     return useUserStore(store);
// }
