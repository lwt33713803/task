<script lang="ts">
export default { name: "FmsTable" };
</script>

<script setup lang="ts">
import fmsButtonAdd from "../fms-buttons/fms-button-add.vue";
import fmsInputSearch from "@/components/fms-inputs/fms-input-search.vue";
import fmsPagination from "./fms-pagination.vue";

const props = withDefaults(
  defineProps<{
    description?: string;
    paginationFlag?: boolean;
    searchFlag?: boolean;
  }>(),
  {
    description: "暂无数据",
    paginationFlag: true,
    searchFlag: true,
  }
);
</script>

<template>
  <div class="table-container-global">
    <div v-if="searchFlag" class="filter-form">
      <div class="w-100">
        <fmsInputSearch></fmsInputSearch>
      </div>
    </div>
    <el-table TableConfig v-bind="$attrs" :header-cell-style="{ 'text-align': 'center' }">
      <template #empty>
        <div class="empty-container">
          <el-empty :description="description" />
          <fmsButtonAdd></fmsButtonAdd>
        </div>
      </template>
      <template v-for="(item, key, index) in $slots" :key="index" #[key]>
        <slot :name="key"></slot>
      </template>
    </el-table>
    <div v-if="paginationFlag" class="flex flex-row justify-between mt-[30px]">
      <div></div>
      <div class="ml-auto pr-[30px]">
        <fmsPagination></fmsPagination>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-container-global {
  border: 1px solid #f5f5f5;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px 0 30px 0;
  overflow: hidden;

  &:hover {
    box-shadow: 0px 0px 15px 0px rgba(140, 152, 164, 0.15);
    border: 1px solid transparent;
    cursor: pointer;
  }
}

.filter-form {
  height: 62px;
  padding: 0 20px;
}

.empty-container {
  padding: 20px 0 40px 0;
  box-sizing: border-box;
}

:deep(.el-table th.el-table__cell) {
  background: rgba(231, 234, 243, 0.4);
  border-bottom: 1px solid rgba(231, 234, 243, 0.7);
  height: 54px;
  font-size: 14px;
  color: #1e2022;
  font-weight: normal;
  //   padding-left: 24px;
  box-sizing: border-box;

  .cell {
    border-right: 1px solid rgba(231, 234, 243, 0.7);
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  &:last-child {
    .cell {
      border: none;
    }
  }
}

:deep(th.el-table__cell.el-table-fixed-column--right) {
  // background-color:#fff;
}

:deep(.el-table-column--selection.el-table__cell) {
  padding-left: 10px !important;

  .cell {
    border: none !important;
  }
}

:deep(td.el-table__cell) {
  height: 72px !important;
  box-sizing: border-box;
}

:deep(.el-checkbox__inner) {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

:deep(.el-checkbox__inner::after) {
  top: 2px;
  left: 5px;
}</style>
