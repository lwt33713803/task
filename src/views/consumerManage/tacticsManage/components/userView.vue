<template>
  <el-dialog v-model="SHOW_FLAG" width="50%"  class="!rounded-2xl custom-dialog"  :title="$t('tactics.query_user_title')">
    <el-table TableConfig v-loading="LOADING" :data="list" border>
      <el-table-column :label="$t(`id`)" prop="id" />
      <el-table-column :label="$t(`tactics.username`)" prop="username" />
      <el-table-column :label="$t(`tactics.name`)"  prop="nickname" />
      <el-table-column :label="$t(`mobile`)"  prop="mobile" />
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
import { getTacticsRelation } from "@/api/goods/index";
const SHOW_FLAG = ref<boolean>(false);
const LOADING = ref<boolean>(false);
const list = ref<any[]>([]);

const show = (id: number) => {
  console.log(id);
  LOADING.value = true;
  SHOW_FLAG.value = true;
  getTacticsRelation({ group_id: id }).then(({ data }) => {
    list.value = data;
    LOADING.value = false;
  });
};

defineExpose({
  show,
});
</script>
