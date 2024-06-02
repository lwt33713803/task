<template>
  <el-dialog v-model="user_flag" width="50%" class="!rounded-2xl custom-dialog" :title="$t('backlogCore.query_users')">
    <el-table v-loading="loading" :data="list" border>
      <el-table-column :label="$t('id')" prop="id" />
      <el-table-column :label="$t('backlogCore.nickname')" prop="username" />
      <el-table-column :label="$t('backlogCore.name')" prop="nickname" />
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
import { getTacticsRelation } from "@/api/goods/index";
const list = ref<any[]>([]);
const user_flag = ref<boolean>(false);
const loading = ref<boolean>(false);

const show = (id: number): void => {
  loading.value = true;
  user_flag.value = true;
  getTacticsRelation({ group_id: id }).then((res) => {
    loading.value = false;
    console.log(res);
    list.value = res.data;
  });
};

defineExpose({
  show,
});
</script>
