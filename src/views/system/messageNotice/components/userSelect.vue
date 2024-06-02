<template>
  <el-drawer
    v-model="SHOW_FLAG"
    title="选择接收人"
    fullscreen
    @close="closeChange"
  >
    <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
      <span class="tag-group__title m-1 line-height-2">已选择接收人：</span>
      <el-tag
        v-for="(user, index) in select_users"
        :key="user.id"
        class="mx-1"
        closable
        :disable-transitions="false"
        @close="delUsers(index)"
      >
        {{ user.nickname }}
      </el-tag>
      <el-button class="button-new-tag ml-1" size="small" @click="closeChange"
        >确 定</el-button
      >
    </div>
    <div class="search">
      <fmsInput v-model="username" placeholder="请输入用户名查询">
        <template #append>
          <el-button style="color: #333" type="primary" @click="searchChange"
            >搜 索</el-button
          >
        </template>
      </fmsInput>
    </div>
    <div class="user-wrap">
      <el-table
        TableConfig
        v-loading="LOADING"
        :data="user_data"
        height="100%"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="mobile" label="手机号" />
        <el-table-column v-slot="{ row }" fixed="right" label="操作">
          <el-button type="primary" @click="selectUser(row)">添 加</el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        style="display: flex; justify-content: center; margin: 1rem 0"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { searchUsers } from "@/api/system/notice";
import { deWeight } from "@/utils/filterDate";
const emit = defineEmits(["upUsers", "del"]);
const SHOW_FLAG = ref<boolean>(false);
const LOADING = ref<boolean>(false);
const username = ref("");
const query_form = { page: 1, list_rows: 10 };
const user_data: any = ref([]);
const select_users: any = ref([]);
const total: any = ref("");

const delUsers = (index: number | string) => {
  select_users.value.splice(index, 1);
  emit("del", select_users.value);
};

const selectUser = (item: any) => {
  select_users.value.push(item);
  select_users.value = deWeight(select_users.value, "id");
};

const initData = async (form: any) => {
  searchUsers(form).then(({ data }) => {
    user_data.value = data.data;
    total.value = data.total;
    LOADING.value = false;
  });
};

const handleCurrentChange = (val: number) => {
  const { list_rows } = query_form;
  initData({ list_rows, page: val });
};

const searchChange = () => {
  if (username.value) {
    return initData({ username: username.value });
  }
  initData({ page: 1, list_rows: 10 });
};

const show = (list = []) => {
  SHOW_FLAG.value = true;
  LOADING.value = true;
  select_users.value = list;
  initData(query_form);
};

const closeChange = () => {
  SHOW_FLAG.value = false;
  LOADING.value = false;
  emit("upUsers", select_users.value);
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: center !important;
}

.search {
  margin: 1.5rem 0 1rem;
}

:deep(.el-input__wrapper) {
  width: 100% !important;
  max-width: 100% !important;
}
</style>
