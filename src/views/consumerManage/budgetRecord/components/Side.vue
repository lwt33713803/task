<template>
  <el-card class="m-dept-side">
    <div class="title">{{ $t(`budget.agency_list`) }}</div>

    <div class="filter-tree">
      <el-input
        v-model="search_val"
        width="100%"
        size="large"
        :placeholder="$t(`placeholder_input`)"
        :suffix-icon="Search"
        @change="searchChange"
      />
      <el-scrollbar class="scrollbar">
        <el-tree
          ref="treeRef"
          :data="table_data"
          :props="defaultProps"
          icon-class="none"
          default-expand-all
          :expand-on-click-node="false"
        >
          <template #default="{ node, data }">
            <div
              class="tree-wrap"
              :class="[node.data.id === select_id ? 'active' : '']"
              @click="selectAction(node, data)"
            >
              <span>{{ data.username }}</span>
            </div>
          </template>
        </el-tree>
      </el-scrollbar>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElTree } from "element-plus";
import { getAgentList } from "@/api/payment/record";

const emit = defineEmits(["change"]);
const select_id = ref();
const search_val = ref("");

const table_data = ref<any>();

interface Tree {
  id: string;
  name: string;
  createTime?: string;
  remark?: string;
  children?: Tree[];
}

const treeRef = ref<InstanceType<typeof ElTree>>();

const defaultProps = {
  children: "children",
  label: "group_name",
  value: "id",
};

const initList = async (form = {}) => {
  const { data }: any = await getAgentList(form);
  data.unshift({
    id: "",
    username: "全部",
  });
  table_data.value = data;
  const { id } = table_data.value[0];
  select_id.value = id;
  emit("change", table_data.value[0]);
};

const selectAction = (node: any, data: any) => {
  const { id } = node.data;
  select_id.value = id;
  emit("change", data);
};

const searchChange = async () => {
  const username = search_val.value;
  initList({ username });
};

onBeforeMount(async () => {
  initList();
});
</script>

<style lang="scss" scoped>
@import "../index.scss";

.scrollbar {
  margin-top: 1rem;
}
.active {
  color: #1e2022;
  background-color: #d9ecff;
}

.title {
  font-weight: 500;
  text-align: center;
  color: #303133;
}

:deep(.el-input__wrapper) {
  width: 100%;
}
:deep(.el-tree-node__content) {
  height: auto;
}
</style>
