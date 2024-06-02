<!-- 查看接收人 -->
<template>
  <el-dialog v-model="visible" width="50%"  class="!rounded-2xl custom-dialog" title="查看接收人">
    <el-table v-loading="loading" :data="list" table-config border>
      <el-table-column label="ID" prop="id" />
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="昵称" prop="nickname" />
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
import { searchItemUser } from "@/api/system/notice";
const visible = ref<boolean>(false);
const loading = ref<boolean>(false);
const list = ref<any[]>([]);

const show = (id: number) => {
  console.log("item", id);
  visible.value = true;
  initData(id);
};
const initData = (id: number) => {
  loading.value = true;
  searchItemUser({ message_id: id }).then(({ data }) => {
    list.value = data;
    loading.value = false;
  });
};

defineExpose({
  show,
});
</script>
