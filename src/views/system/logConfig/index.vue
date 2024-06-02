

<script setup lang="ts">
import blockLable from "@/components/block/Label.vue";
import upload from "./components/upload.vue";
import { getAdminLog } from "@/api/system/log";

const pageOrigin = ref(null);

const filterId = (item: any) => {
  return item?.id;
};
const logFilterArray = [
  { scheme: "title", title: "日志标题", type: "input" },
  {
    scheme: "method",
    title: "请求方式",
    type: "select",
    options: [
      { dict_value: "POST", dict_name: 1 },
      { dict_value: "GET", dict_name: 0 },
    ],
  },
  { scheme: "url", title: "请求地址", type: "input" },
  { scheme: "create_time", title: "操作时间", type: "date" },
];
const { selectedItems, handleSelectionChange } = useTableSelection(filterId);

//@ts-ignore

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
  // cb('hide') ('hideloading')
};

//弹窗逻辑
const uploadModel = ref(false);
</script>

<template>
  <f-table ref="pageOrigin" :systemRecordloader="getAdminLog" :smartFilter="[...logFilterArray]">
    <template #default="attrs">
      <el-table-column type="selection" />
      <fms-colunm :label="$t('table.id')" prop="id" sortable></fms-colunm>
      <el-table-column :label="$t('good.byname')" prop="create_by" v-slot="{ row }">
        {{ row.admin.username }}
      </el-table-column>
      <el-table-column :label="$t('good.bytime')" prop="create_time" />
      <el-table-column :label="$t('good.method')" prop="method" />
      <el-table-column :label="$t('system.url')" prop="url" />
      <el-table-column :label="$t('system.title')" prop="title" />
      <el-table-column :label="$t('system.ip')" prop="ip" />
      <!-- <el-table-column :label="`所属代理`" prop="user_agent" /> -->
      <el-table-column :label="`操作时间`" prop="create_time" />
    </template>
  </f-table>
</template>
