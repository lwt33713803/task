
<script lang="ts" setup>

import { PropType } from 'vue';
import usePageDefault from '@/hooks/usePageDefault'
import useOriginContorller from '@/hooks/useOriginContorller'
import { Search, Refresh } from "@element-plus/icons-vue";
import { SystemRecordloaderFunction, LayoutString, ElRecordBox, SlotAttrsLoaderType } from './Elorgin'
import { NumberOrUndefined } from '@/interface/props'
import { SmartFilterInput, SmartFilterInputOriginSelect, SmartFilterParams } from '../ElTableSearchGroup/ElTableSearchGroup';
import { dateMap } from '@/enums/DateEnum';
const _layout: LayoutString = 'sizes,prev, pager, next,total,jumper';
const _pageSizes: number[] = [15, 10, 20, 50, 100, 200, 1000];
type RemoteRecord = any
defineOptions({
  name: 'FmsTableOrigin'
})
const props = defineProps({
  serachType: {
    type: String,
    default: "all",
  },
  // 视图 small | default
  viewControl: {
    type: String,
    default: 'default'
  },
  //加载器
  systemRecordloader: {
    //不确定类型，如果是直接调用 systemRecordloader 的话则无法确认，如果再包装器包装的话会指定为当前的数据范型
    type: Function as PropType<SystemRecordloaderFunction<any, any>>,
    required: true
  },
  //需要查询的参数
  queryparameters: {
    type: [Object, Array, String, Number, Boolean],
    required: false,
    default: undefined,
  },
  //刷新器 是否回到第一页 还是保留当前页数 int类型自增判断
  refreshLoader: {
    type: Object as PropType<[NumberOrUndefined, NumberOrUndefined]>,
    required: false,
    default: () => []
  },
  smartFilter: {
    type: [Object, Array, String, Number, Boolean],
    required: false,
    default: undefined,
  },
  //分页器管理
  layout: {
    type: Object as PropType<LayoutString>,
    required: false,
    default: 'sizes,prev, pager, next,total,jumper'
  },
  //分页器分段数组
  pageSizes: {
    type: Object as PropType<number[]>,
    required: false,
    default: [10, 20, 50, 100, 200, 1000]
  },
  /**
   * 刷新的线索
   * 第一个参数会回到第一页
   * 第二个参数会保留当前页码数
   */
  refreshClues: {
    type: Object as PropType<[number | undefined, number | undefined]>,
    required: false,
    default: undefined,
  },
  /**
   * 格式化时间，是否需要格式化 
   */
  format: {
    type: Boolean,
    required: false,
    default: "YYYY-MM-DD",
  },
  isShowDefaultBtn: {
    type: Boolean,
    required: true,
    default: "YYYY-MM-DD",
  },

})
const { systemRecordloader, format } = props
const [elPageIndex, elPageSize] = usePageDefault()
const queryparameters = computed(() => props.queryparameters);
const smartFilterParams = ref<any>({});
const doItemFilterParams = (params: SmartFilterParams) => {
  smartFilterParams.value = { ...smartFilterParams.value, ...params }
  console.log(smartFilterParams.value)
}

const searchGroup = ref(null)
const filterSchemes = computed<SmartFilterInputOriginSelect[]>(() => {
  // console.log('props.smartFilter',props.smartFilter)
  return props.smartFilter;
});
//@ts-ignore
console.log(systemRecordloader, 'loader')
const { recordBoxList, pageController, pageState, } = useOriginContorller<RemoteRecord>(systemRecordloader, { queryparameters, smartFilterParams, autoStart: false } as any)

onMounted(() => {
  setTimeout(() => {
    pageController.start()
  }, 300)
})
const pageItemTotal = computed(() => pageState?.itemCount?.value ?? 0);
// const recordList = computed(() => recordSystemList.map(({ record }: any) => record));
const dataMatchCursor = computed(() => pageState.dataMatchCursor.value);

const refreshClue = computed(() => (props.refreshClues ? props.refreshClues[0] : undefined));
const refreshCurrentClue = computed(() => (props.refreshClues ? props.refreshClues[1] : undefined));

const refreshTriggerClue = ref(0);
const refreshTriggerAllParamsClue = ref(0)
const refreshCurrentTriggerClue = ref(0);
const refreshFilterCurrentTriggerClue = ref(0)
const refreshTrigger = () => refreshTriggerClue.value++;
const refreshTriggerAllParams = () => refreshTriggerAllParamsClue.value++
const refreshCurrentTrigger = () => {
  refreshCurrentTriggerClue.value++
  return (otherAction: any) => {
  }
};
const refreshFilterTrigger = (otherAction: any) => {
  refreshFilterCurrentTriggerClue.value++
}
const CardStyle = computed(() => {
  return {
    padding: '0'
  }
})
/**
 * 监听要刷新整体(要恢复到第1页)的线索
 */
watch([() => refreshClue.value, () => refreshTriggerClue.value], () => {
  pageController.refresh()
  elPageIndex.value = 1

}, { deep: true, onTrigger: console.log });

/**
 * 监听要刷新当前页面的线索
 */
watch([() => refreshCurrentClue.value, () => refreshCurrentTriggerClue.value], () => {

  pageController.refresh(true);
}, { deep: true });
watch([() => refreshFilterCurrentTriggerClue.value, () => refreshCurrentTriggerClue.value], () => {
  pageController.refreshFilter(true);
  searchGroup.value.map(i => {
    console.log(i, 'reset')
    i.reset()
  })
}, { deep: true });


watch([() => refreshTriggerAllParamsClue.value], () => {
  console.log(searchGroup.value)
  searchGroup.value.map(i => {
    console.log(i, 'reset')
    i.reset()
  })
  pageController.refreshAll(true)
  elPageIndex.value = 1

}, { deep: true });

watch(
  () => elPageIndex.value,
  (index) => {
    onIndexChange(index);
  },
);

watch(
  () => elPageSize.value,
  (size) => {
    onSizeChange(size);
  },
);
watch(
  () => pageState?.pageCursor?.value,
  (pageCursor) => {
    if (pageCursor) {
      // elPageIndex.value = pageCursor.page + 1;
      elPageSize.value = pageCursor.list_rows;
    }
  },
  { deep: true },
);
const onSizeChange = async (size: number) => {
  //TODO 换页页面大小的时候可能会出来查询多次的bug
  await pageController.changePageSize(size);
};

const onIndexChange = async (index: number) => {
  await pageController.changePageIndex(index);
};
const loaderList = (recordBoxList: any) => {
  return format ?
    formatDateFields(['create_time', 'update_time', 'last_login_time'], recordBoxList) :
    recordBoxList
}

function formatDateFields(dateFields: string[], source: any[]): any[] {
  return source.map(item => {
    const formattedItem: any = { ...item };
    dateFields.forEach(field => {
      if (field in formattedItem) {
        formattedItem[field] = !formattedItem[field] ? '暂无数据' : useDateFormat(new Date(formattedItem[field] * 1000), dateMap['中国']).value;
      }
    });
    return formattedItem;
  });
}


//插槽导出器
const SlotAttrsLoader: ComputedRef<SlotAttrsLoaderType> = computed(() => {
  return {
    recordBoxList: loaderList(recordBoxList),
    // recordList: recordList.value,
    refreshCurrentTrigger: refreshCurrentTrigger,
    refreshTrigger: refreshTrigger,
    refreshTriggerAllParams: refreshTriggerAllParams,
    pageController: pageController,
    dataMatchCursor: dataMatchCursor.value,
    refreshFilter: refreshFilterTrigger,
  }
})
defineExpose({ refreshTrigger })

</script>
<template>
  <div>
    <!-- 分页器 -->

    <div>
      <slot v-bind="SlotAttrsLoader" name="header-action-append"></slot>
    </div>
  </div>
  <div class="page-body">
    <el-card v-if="filterSchemes" class="my-1">
      <div class="flex flex-wrap justify-start">
        <ElTableSearchGroup class="my-2 " v-for="(itemFilterParams, index) in filterSchemes" ref="searchGroup"
          :key="index" :config="itemFilterParams" @change="doItemFilterParams">
        </ElTableSearchGroup>
        <slot v-bind="SlotAttrsLoader" name="header-action-append-search">

        </slot>
      </div>

    </el-card>
    <el-card :body-style="CardStyle">
      <div v-if="viewControl != 'small'" class="p-6">
        <div class=" flex justify-between items-center">
          <div>
            <slot v-bind="SlotAttrsLoader" name="header-action-append-button-gourp">
            </slot>
          </div>
          <div>
            <div v-show="props.isShowDefaultBtn">
              <el-button @click="refreshTrigger" type="primary">查询</el-button>
              <el-button @click="() => {
                props.serachType == 'all' ? refreshTriggerAllParams() : refreshFilterTrigger(true)
              }" :icon="Refresh">
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <slot v-bind="SlotAttrsLoader">

      </slot>

      <el-pagination v-if="viewControl != 'small'" class="my-6 float-right mr-6" v-model:current-page="elPageIndex"
        v-model:page-size="elPageSize" background :hide-on-single-page="false" :page-sizes="pageSizes"
        :default-page-size="elPageSize" :layout="layout" :total="pageItemTotal" />
    </el-card>

  </div>
</template>
<style>
.el-pagination {}

.el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  border-bottom: none !important
}
</style>
