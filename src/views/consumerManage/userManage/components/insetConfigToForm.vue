

<script setup lang="ts">
import blockLable from "@/components/block/Label.vue";
import anyForm from "./components/form.vue";
import { Search, Refresh } from "@element-plus/icons-vue";

import { getmemberConfigGoods } from "@/api/user/userAdmin";
import { useArrayMap } from "@vueuse/core";
import ElPageOrigin from "@/components/Elgroup/Elorigin/index.vue";
import { useTableSelection } from "@/hooks/useTableSelect";
import { useTableDelete } from "@/hooks/useTableDelete";
import {
  smartFilterGoodsPrice,
  smartFilterGoodsName,
} from "@/interface/searchMap";
import useStudentDetail from "@/hooks/useDetailHook";
import type {
  goodsNameType,
  goodsNameTypeg,
} from "../goodsClassifyManage/components/classify";
import to from "await-to-js";
import { ref, watchEffect, watch, reactive } from "vue";
const props = defineProps({
  formData: {
    type: Object,
    default: null,
  },
});
const goodsForm = ref(props.formData);
const pageOrigin = ref(null);
const filterId = (item: any) => {
  return item?.id;
};
const rowValue = ref(null);

const tableFef = ref(null);
const rowClick = (e: any) => {
  console.log(goodsForm.value.items, ";goodsForm");
  rowValue.value = { ...e, goodIndex: goodsForm.value.items };
};

const getValue = () => {
  return rowValue;
};

defineExpose({ getValue });
const { selectedItems, handleSelectionChange } = useTableSelection(filterId);
//@ts-ignore
</script>

<template>
  <el-page-origin ref="pageOrigin" serachType="filter" :systemRecordloader="getmemberConfigGoods"
    :queryparameters="goodsForm" :smartFilter="[
      {
        title: '商品最小价格',
        scheme: 'min_price',
        type: 'input',
      },
      {
        title: '商品最大价格',
        scheme: 'max_price',
        type: 'input',
      },
      smartFilterGoodsName,
    ]">
    <template #header-action-append-button-gourp="{ refreshTrigger, refreshFilter }">
    </template>
    <template #default="attrs">
      <el-table TableConfig @row-click="rowClick" ref="tableFef" @selection-change="handleSelectionChange"
        v-loading="!attrs.dataMatchCursor" v-bind="{ ...$attrs, ...TableConfig }" :data="attrs.recordBoxList"
        highlight-current-row row-class-name="row-class" header-cell-class-name="!py-5 text-[#333333] font-[500]">
        <el-table-column label="商品编号" prop="id" sortable></el-table-column>
        <el-table-column label="商品名称" prop="goods_name" v-slot="{ row }" sortable>
          <blockLable :text="row.goods_name" :maxWidth="200"></blockLable>
        </el-table-column>
        <el-table-column label="商品图片" prop="goods_name" v-slot="{ row }" sortable>
          <el-image :preview-teleported="true" :preview-src-list="[row.image]" :src="row.image"></el-image>
        </el-table-column>
        <el-table-column label="商品价格" prop="price" sortable></el-table-column> </el-table></template>
  </el-page-origin>
</template>
