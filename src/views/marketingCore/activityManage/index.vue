<template>
  <demoComponent @save="reloaderSave"></demoComponent>
  <Elorigin
    format
    ref="pageOrigin"
    :systemRecordloader="getServiceList"
    :smartFilter="[
      smartFilterGoodsId,
      smartFilterGoodsName,
      smartFilterGoodsStatus,
      smartFilterDate,
    ]"
  >
    <template
      #header-action-append-button-gourp="{
        refreshTrigger,
        refreshTriggerAllParams,
      }"
    >
      <el-button @click="refreshTrigger" type="primary">{{
        $t("default.search")
      }}</el-button>
      <el-button @click="refreshTriggerAllParams">{{
        $t("default.refresh")
      }}</el-button>
      <!-- <el-button @click="() => open()" type="primary">{{ $t('default.create') }}</el-button> -->
      <el-button
        @click="
          onMessageBoxDelete(selectedItems.join(','), () => {
            refreshTriggerAllParams();
          })
        "
        type="danger"
        >{{ $t("default.deletes") }}</el-button
      >
    </template>
    <template #default="attrs">
      <el-table
        TableConfig
        @selection-change="handleSelectionChange"
        v-loading="!attrs.dataMatchCursor"
        v-bind="{ ...$attrs, ...TableConfig }"
        :data="attrs.recordBoxList"
        highlight-current-row
        row-class-name="row-class"
        header-cell-class-name="!py-5 text-[#333333] font-[500]"
      >
        <el-table-column type="selection" />
        <fms-colunm :label="$t('table.id')" prop="id" sortable></fms-colunm>
        <el-table-column label="所属代理" prop="agent_name" />
        <el-table-column label="客服名称" prop="name" />
        <el-table-column label="图标" prop="icon" />
        <el-table-column label="跳转链接" prop="url" />
        <el-table-column label="联系方式" prop="mobile" />
        <el-table-column label="操作人" prop="admin_name" />
        <el-table-column label="操作时间" prop="update_time" />

        <el-table-column
          fixed="right"
          v-slot="{ row }"
          width="240"
          label="操作"
          #="{ attrs }"
        >
          <el-button type="primary" @click="open(row)">删 除</el-button>
          <el-button
            type="danger"
            @click="
              onMessageBoxDelete(row.id, () => {
                attrs.refreshTrigger();
              })
            "
            >编 辑</el-button
          >
        </el-table-column>
      </el-table>
    </template>
  </Elorigin>
</template>

<script setup lang="ts">
import blockLable from "@/components/block/Label.vue";
// import {formatDate} from "@/utils/filterDate"
// import anyForm from './components/form.vue'
import { deletegood, editGood } from "@/api/goods/index";

import { getServiceList } from "@/api/marketing/index";

const pageOrigin = ref(null);

const filterId = (item: any) => {
  return item?.id;
};
const { selectedItems, handleSelectionChange } = useTableSelection(filterId);

//@ts-ignore
// const [demoComponent, open] = new useFormDialog(anyForm).getComponentHook();

const { onDelete, onMessageBoxDelete } = useTableDelete(deletegood, {
  details: "确认删除选中项目",
  type: "error",
});

//返回函数回调
const reloaderSave = async (form: any, cb: any) => {
  return (
    (await executeMethods(editGood, form, cb)) &&
    pageOrigin.value.refreshTrigger()
  );
};

const filterStatus = (val: string) => {
  let result: string;
  if (val === "order_recharge") {
    result = "充值";
  } else if (val === "order_withdrawal") {
    result = "提现";
  } else {
    result = "实名认证";
  }
  return result;
};
</script>
