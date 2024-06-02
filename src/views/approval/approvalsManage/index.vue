<template>
  <f-table
    format
    ref="pageOrigin"
    :systemRecordloader="getApprovalsList"
    :is-show-default-btn="false"
    :height="600"
  >
    <template
      #header-action-append-button-gourp="{
        refreshTrigger,
        getSelection,
        refreshTriggerAllParams,
      }"
    >
      <el-button
        v-has="`approval:approvals:create`"
        type="primary"
        @click="form_dialog_ref.show()" 
        >创 建</el-button
      >
      <el-button
        v-has="`approval:approvals:batchDelete`"
        @click="
          onMessageBoxDelete(
            getSelection()
              .map((i) => i.id)
              .join(','),
            () => {
              refreshTriggerAllParams();
            }
          )
        "
        type="danger"
        >{{ $t("default.deletes") }}</el-button
      >
    </template>
    <template #default="attrs">
      <el-table-column type="selection" />
      <fms-colunm :label="$t('table.id')" prop="id" sortable width="100" />
      <el-table-column label="流程名称" prop="name" />
      <el-table-column v-slot="{ row }" v-has="`approval:approvals:status`" label="流程状态">
        <el-switch
          v-model="row.status"
          inactive-value="0"
          active-value="1"
          @change="() => setStatus(row.id, row.status)"
        ></el-switch>
      </el-table-column>
      <el-table-column v-slot="{ row }" label="流程类型">
        <el-text type="success" tag="b"> {{ filter_types[row.type] }}</el-text>
      </el-table-column>

      <el-table-column prop="update_time" label="操作时间" />
      <el-table-column
        fixed="right"
        v-slot="{ row }"
        width="240"
        label="操作"
        #="{ attrs }"
      >
        <el-button v-has="`approval:approvals:edit`" type="primary" @click="editChange(row)">编 辑</el-button>
        <el-button
          v-has="`approval:approvals:delete`"
          type="danger"
          @click="
            onMessageBoxDelete(row.id, () => {
              attrs.refreshTrigger();
            })
          "
          >删 除</el-button
        >
      </el-table-column>
    </template>
  </f-table>
  <form-dialog
    ref="form_dialog_ref"
    :options="users"
    @update="pageOrigin.refreshTrigger()"
  />
</template>

<script setup lang="ts">
import FormDialog from "./components/FormDialog.vue";
import {
  getApprovalsList,
  delApprovals,
  queryApprovals,
  setStatus,
} from "@/api/payment/approval";

const form_dialog_ref = ref(); // form 组件
const pageOrigin = ref();
const users = ref<any>([]);

const { onDelete, onMessageBoxDelete } = useTableDelete(delApprovals, {
  details: "确认删除选中项目",
  type: "error",
});

const filter_types = reactive<{
  order_recharge?: string;
  order_withdrawal?: string;
  member_verify?: string;
}>({
  order_recharge: "充值",
  order_withdrawal: "提现",
  member_verify: "实名认证审核",
});

const editChange = async (row: any) => {
  const { id } = row;
  const { data }: any = await queryApprovals(id);
  form_dialog_ref.value.show(data);
};
</script>
