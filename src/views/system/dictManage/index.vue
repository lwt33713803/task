
<script setup lang="ts">
import blockLable from "@/components/block/Label.vue";
import { searchTypesPage } from "@/api/system/notice";
import { useArrayMap } from "@vueuse/core";
import ElPageOrigin from "@/components/Elgroup/Elorigin/index.vue";
import { useTableSelection } from "@/hooks/useTableSelect";
import { useTableDelete } from "@/hooks/useTableDelete";
import {
  smartFilterGoodsId,
  smartFilterGoodsName,
  smartFilterGoodsStatus,
  smartFilterDate,
} from "@/interface/searchMap";
import useStudentDetail from "@/hooks/useDetailHook";
import type {
  goodsNameType,
  goodsNameTypeg,
} from "../goodsClassifyManage/components/classify";
import to from "await-to-js";
import { ref, watchEffect } from "vue";

const goodForm = ref({});
const pageOrigin = ref(null);
const filterId = (item: any) => {
  return item?.id;
};
const { selectedItems, handleSelectionChange } = useTableSelection(filterId);
//@ts-ignore

// const { onDelete, onMessageBoxDelete } = useTableDelete(deletegood, { details: '确认删除选中项目', type: 'error' })
</script>

<template>
  <f-table ref="pageOrigin" :systemRecordloader="searchTypesPage"
    :smartFilter="[{ title: '字典名称', scheme: 'dict_name', type: 'input' }]">
    <template #header-action-append-button-gourp="{
      refreshTrigger,
      refreshTriggerAllParams,
    }">
    </template>
    <template #default="attrs">
      <el-table-column type="expand">
        <template #default="props">
          <div m="4">
            <el-table TableConfig :data="props.row.child">
              <el-table-column label="字典名称" prop="dict_label" />
              <el-table-column label="字典值" prop="dict_value" />
              <el-table-column label="备注" prop="remark" />
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="字典名称" prop="dict_name"></el-table-column>
      <el-table-column label="字典对应状态值" prop="type"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <el-table-column label="创建时间" prop="create_time"> </el-table-column>
      <el-table-column label="操作时间" prop="update_time"> </el-table-column>
    </template>
  </f-table>
</template>
