<template>
  <f-table  ref="pageOrigin" format :system-recordloader="getGradeList" :is-show-default-btn="false" :height="650">
    <template #header-action-append-button-gourp="{ refreshTrigger }">
      <el-button v-has="`consumer:grade:create`" type="primary" @click="formDialog.show()">{{ $t('create') }}</el-button>
    </template>
    <template #default="attrs">
      <el-table-column :label="$t('gender')" prop="level_value" align="center" />
      <el-table-column v-slot="{ row }" :label="$t('tactics.level_name')" prop="level_name" width="100">
        <el-tag>
          {{ row.level_name ?? $t('tactics.level_null') }}
        </el-tag>
      </el-table-column>
      <el-table-column v-slot="{ row }" :label="$t('icon')" align="center" width="120">
        <el-image 
          style="width: 80px; height: 80px" :src="row.icon" fit="fill" :preview-teleported="true"
          :preview-src-list="[row.icon]" />
      </el-table-column>
      <el-table-column v-slot="{ row }" :label="$t('image')" align="center" width="120">
        <el-image 
          style="width: 80px; height: 80px" :src="row.image" fit="fill" :preview-teleported="true"
          :preview-src-list="[row.image]" />
      </el-table-column>
      <el-table-column :label="$t('Gender.dividend')" prop="commission_settle_type_label" align="center" />
      <el-table-column v-slot="{ row }" :label="$t(`backlogCore.money`)" prop="commission_method_label" width="250" align="center">
        <div style="display: flex; flex-direction: column; align-items: center">
          <el-link v-for="item in row.commission_method_label" :key="item.path" style="border-bottom: 1px dashed #ebeef5">
            {{ item }}
          </el-link>
        </div>
      </el-table-column>
      <el-table-column :label="$t('Gender.day_money_num')" prop="day_cash_num" align="center" width="100" />
      <el-table-column :label="$t('Gender.month_money_num')" prop="month_cash_num" align="center" width="100" />
      <el-table-column :label="$t('Gender.goods_class')" prop="category_name" align="center" width="150" />
      <el-table-column :label="$t('Gender.up_methods')" prop="upgrade_desc" align="center" width="150" />
      <el-table-column :label="$t('create_time')" prop="create_time" align="center" width="200" />
      <el-table-column v-slot="{ row }" fixed="right" :label="$t('backlogCore.operation')" #="{ attrs }" width="200">
        <el-button v-has="`consumer:grade:edit`" type="primary" @click="formDialog.show(row)">{{ $t('tactics.edit_btn') }}</el-button>
      </el-table-column>
    </template>
  </f-table>

  <FormDialog ref="formDialog" @update="pageOrigin.refreshTrigger()" />
</template>

<script setup lang="ts">
import FormDialog from "./components/FormDialog.vue";
import { getGradeList, delGrade } from "@/api/system/grade";
import FTable from "@/components/Elgroup/Elorigin/f-table.vue";
import { useTableDelete } from "@/hooks/useTableDelete";
import type { FormInstance } from "element-plus";

const { onDelete, onMessageBoxDelete } = useTableDelete(delGrade, {
  details: "确认删除选中项目",
  type: "error",
});
const formDialog = ref();
const pageOrigin = ref<FormInstance | any>();

const filterId = (item: any) => {
  return item?.id;
};

const { selectedItems, handleSelectionChange } = useTableSelection(filterId);
</script>

<style scoped lang="scss">
.crated-form {
  padding: 0 4rem;
  box-sizing: border-box;
}

.el-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.pad-r-2 {
  padding-right: 2rem;
}

:deep(.el-form-item__content) {
  width: 70%;
}

:deep(.el-form-item__label) {
  text-align: right !important;
  margin-bottom: 0 !important;
  margin-right: 1rem;
  width: 18%;
}

._hidden {
  overflow: hidden !important;

  .el-drawer__body {
    overflow: hidden !important;
  }
}

.dialog-footer {
  display: flex;
  justify-content: center;
}

.mouse {
  cursor: pointer;
  margin-bottom: 5px;
}
</style>
