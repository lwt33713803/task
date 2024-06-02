<template>
  <el-drawer v-model="SHOW_FLAG" :title="$t('tactics.select_user_title')" @close="closeChange">
    <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
      <span class="tag-group__title m-1 line-height-2">{{ $t('tactics.select_users') }}:</span>
      <el-tag v-for="(user, index) in user_select_opt" :key="user.id" class="mx-1" closable :disable-transitions="false"
        @close="delUsers(index)">
        {{ user.nickname }}
      </el-tag>
      <el-button class="button-new-tag ml-1" size="small" @click="closeChange">{{ $t('confirm') }}</el-button>
    </div>
    <div class="search">
      <fmsFormItem :label="`${$t('tactics.username')}:`">
        <el-input v-model="form.username" :placeholder="$t('tactics.username_hint')" clearable />
      </fmsFormItem>
      <fmsFormItem :label="`${$t('tactics.level_name')}:`">
        <fms-select v-model="form.level_id" :placeholder="$t('tactics.level_name_hint')" :options="gender_opt"
          :key-name="'level_name'" :val-name="'id'" clearable />
      </fmsFormItem>
      <el-button type="primary" style="margin-left: .5rem;" @click="searchChange">{{ $t('query') }}</el-button>
    </div>
    <div class="user-wrap">
      <!-- <el-button type="primary" @click="selectsChange">批量添加</el-button> -->
      <el-table TableConfig :data="user_list" v-loading="LOADING" height="100%" style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column prop="id" :label="$t(`id`)" />
        <el-table-column prop="username" :label="$t(`tactics.username`)" />
        <el-table-column prop="nickname" :label="$t(`tactics.name`)" />
        <el-table-column prop="level.level_name" :label="$t(`tactics.gender`)" />
        <el-table-column v-slot="{ row }" fixed="right" :label="$t(`backlogCore.operation`)">
          <el-button type="primary" @click="selectUser(row)">{{ $t(`tactics.add`) }}</el-button>
        </el-table-column>
      </el-table>
      <el-pagination small layout="prev, pager, next" :total="total" class="_pagination"
        @current-change="handleSizeChange" style="display: flex; justify-content: center; margin: 1rem 0" />
    </div>
    <el-button style="margin: 1rem auto 0; display: block;" @click="closeChange">{{ $t('confirm') }}</el-button>
  </el-drawer>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { getGradeList } from "@/api/system/grade";
import { searchUsers } from "@/api/system/notice";
import { deWeight } from "@/utils/filterDate";
const emit = defineEmits(["add", "del"]);
const LOADING = ref<boolean>(false);
const form = reactive<any>({ page: 1, list_rows: 10, username: '', level_id: undefined })

const SHOW_FLAG = ref<boolean>(false);
const gender_opt: Ref<any> = ref([])
// const IS_SEARCH = ref<boolean>(true);
// const user_name = ref("");
const user_select_opt = ref<any>([]);
const user_list = ref<any[]>([]);
const total: any = ref("");
const delUsers = (index: number | string) => {
  user_select_opt.value.splice(index, 1);
  emit("del", user_select_opt.value);
};

const selectUser = (item: any) => {
  user_select_opt.value.push(item);
  user_select_opt.value = deWeight(user_select_opt.value, "id");
  emit("add", user_select_opt.value);
};

const handleSizeChange = (val: number) => {
  const { list_rows } = form;
  handleSearchUsers({ list_rows, page: val });
};

const handleSearchUsers = async (form: any) => {
  LOADING.value = true;
  const { data } = await searchUsers(form);
  user_list.value = data.data;
  total.value = data.total;
  LOADING.value = false;
};

const searchChange = () => {
  handleSearchUsers(form);
};

const closeChange = () => {
  SHOW_FLAG.value = false;
  LOADING.value = false;
  form.username = "";
  form.level_id = undefined
};

const show = (item = []) => {
  console.log("item", item);
  SHOW_FLAG.value = true;
  user_select_opt.value = item;
  getGenderOpt();
  handleSearchUsers(form);
};

const getGenderOpt = async () => {
  gender_opt.value = await getGradeList({ all: 1 })
  console.log(gender_opt.value)
}

// 模糊搜索
// const inputChange = () => {
//   if (!IS_SEARCH.value) return;
//   IS_SEARCH.value = true;
//   setTimeout(() => {
//     IS_SEARCH.value = true;
//     handleSearchUsers({ username: user_name.value });
//   }, 800);
// };

// 批量添加
// const handleSelectionChange = (val: any) => {
//   user_select_opt.value = val
//   user_select_opt.value = deWeight(user_select_opt.value, "id");
// };

defineExpose({
  user_select_opt,
  show,
});
</script>

<style>
.el-pagination {
  text-align: center !important;
}

.search {
  margin: 1.5rem 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>
