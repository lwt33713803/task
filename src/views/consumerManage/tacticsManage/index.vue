<template>
  <f-table ref="page_origin" :system-recordloader="getTacticsList" :smartFilter="[
    {
      scheme: 'group_name',
      title: '策略组名称',
      placeholder: '请输入名称',
      type: 'input',
      value: route.query.group_name || '',
    },
    tacticsClassify.user,
    tacticsClassify.status,
    tacticsClassify.date,
  ]">
    <template #header-action-append-button-gourp="{
      refreshTriggerAllParams,
      getSelection,
    }">
      <el-button v-has="`consumer:tactics:create`" type="primary" @click="form_ref.show()" >{{ $t('create') }}</el-button>
      <el-button 
      v-has="`consumer:tactics:batchDelete`"
      type="danger"
      @click="
        onMessageBoxDelete(
          getSelection()
            .map((i) => i.id)
            .join(','),
          () => {
            refreshTriggerAllParams();
            message.success('删除成功');
          }
        )
        " >{{ $t("default.deletes") }}</el-button>
    </template>
    <template #default="attrs">
      <el-table-column type="selection" />
      <el-table-column :label="$t('tactics.name')" prop="group_name" width="250"/>
      <el-table-column v-slot="{ row }" :label="$t('backlogCore.as_agent')" width="150">
        <el-tag v-if="row.agent_name">{{ row.agent_name }}</el-tag>
      </el-table-column>
      <el-table-column v-slot="{ row }" v-has="`consumer:tactics:viewPlan`" :label="$t('backlogCore.scheme')" width="150" align="center">
        <el-button @click="plan_view_ref.show(row.id)">{{ $t('backlogCore.view_plan') }}</el-button>
      </el-table-column>
      <el-table-column v-slot="{ row }" v-has="`consumer:tactics:viewUsers`" :label="$t('backlogCore.associating_users')" width="150" align="center"> 
        <el-button @click="user_view_ref.show(row.id)">{{ $t('backlogCore.view_associating') }}</el-button>
      </el-table-column>
      <el-table-column v-slot="{ row }" v-has="`consumer:tactics:status`" :label="$t('status')" prop="status" width="150" >
        <el-switch v-model="row.status" :inactive-value="0" :active-value="1" @change="switchChange(row)" />
      </el-table-column>
      <el-table-column v-slot="{ row }"  v-has="`consumer:tactics:isOpen`" :label="$t('tactics.is_open')" prop="is_open" width="150" >
        <el-switch v-model="row.is_open" :inactive-value="0" :active-value="1" @change="switchOpenChange(row)" />
      </el-table-column>
      <el-table-column v-slot="{ row }" :label="$t('tactics.create_people')" prop="admin_name" width="150"  align="center">
        <el-tag >{{ row.admin_name || row.agent_name }}</el-tag>
      </el-table-column>
      <el-table-column :label="$t('create_time')" prop="create_time" sortable width="200"  align="center"/>
      <el-table-column v-slot="{ row }" fixed="right" :label="$t('backlogCore.operation')" #="{ attrs }" width="250"  align="center">
        <el-button v-has="`consumer:tactics:edit`" type="primary" @click="form_ref.show(row.id)" >{{ $t('tactics.edit_btn') }}</el-button>
        <el-button 
          v-has="`consumer:tactics:delete`" type="danger" @click="
          onMessageBoxDelete(row.id, () => {
            attrs.refreshTrigger();
          })
          " >{{ $t('tactics.delete_btn') }}</el-button>
      </el-table-column>
    </template>
  </f-table>

  <!-- Dialog -->
  <FormDialog ref="form_ref" @up-data="page_origin.refreshTrigger()" />

  <!-- view user -->
  <user-view ref="user_view_ref" />

  <!-- view plan -->
  <plan-view ref="plan_view_ref" />
</template>

<script setup lang="ts">
import FTable from "@/components/Elgroup/Elorigin/f-table.vue";
import { tacticsClassify } from "@/interface/searchMap";
import {
  getTacticsList,
  delGradeItem,
  setStatus,
  setIsOpen,
} from "@/api/goods/index";
import { useTableDelete } from "@/hooks/useTableDelete";
import { ElMessage, FormInstance } from "element-plus";
import FormDialog from "./components/FormDialog.vue";
import userView from "./components/userView.vue";
import planView from "./components/planView.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const { onDelete, onMessageBoxDelete } = useTableDelete(delGradeItem, {
  details: "确认删除选中项目",
  type: "error",
});

const form_ref = ref();
const user_view_ref = ref();
const plan_view_ref = ref();
const page_origin = ref<FormInstance | any>();

const switchChange = (row: any) => {
  const { id, status } = row;
  setStatus({ id, status }).then((res: any) =>
    ElMessage.success("状态切换成功")
  );
};

const switchOpenChange = (row: any) => {
  const { id, is_open: status } = row;
  setIsOpen({ id, status }).then((res: any) =>
    ElMessage.success("共享切换成功")
  );
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
