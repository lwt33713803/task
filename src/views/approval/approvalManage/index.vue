<template>
  <f-table
    format
    ref="pageOrigin"
    :systemRecordloader="getApprovalList"
    :smartFilter="[
      {
        scheme: 'member_username',
        title: '申请人',
        placeholder: '请输入申请人',
        type: 'input',
        value: route.query.nickname || '',
      },
      approvalClassify.name,
      approvalClassify.status,
      approvalClassify.methods,
    ]"
  >
    <template #default="attrs">
      <el-table-column type="selection" />
      <fms-colunm
        :label="$t('table.id')"
        prop="id"
        sortable
        width="100"
      ></fms-colunm>
      <el-table-column v-slot="{ row }" label="审核流名称">
        {{ row.audit_flow.name }}
      </el-table-column>
      <el-table-column v-slot="{ row }" label="审批类型">
        {{
          typesApprove.filter(
            (item) => item.dict_value == row.audit_flow.type
          )[0].dict_label ?? ""
        }}
      </el-table-column>
      <el-table-column
        v-slot="{ row }"
        label="审核状态"
        prop="audit_status_name"
      >
        <el-text :type="TYPES[row.audit_status_name]" tag="b">{{
          row.audit_status_name
        }}</el-text>
      </el-table-column>
      <el-table-column v-slot="{ row }" label="申请人">
        <el-tag>{{ row.member.nickname }}</el-tag>
      </el-table-column>
      <el-table-column
        v-has="`approval:index:approval`"
        fixed="right"
        v-slot="{ row }"
        width="240"
        label="操作"
        #="{ attrs }"
      >
        <el-button type="primary" @click="query(row)">审核查看</el-button>
      </el-table-column>
    </template>
  </f-table>

  <!-- dialog -->
  <form-dialog ref="form_dialog_ref" @update="pageOrigin.refreshTrigger()" />
</template>

<script setup lang="ts">
import FormDialog from "./components/FormDialog.vue";
import { approvalClassify } from "@/interface/searchMap";
import type { FormInstance } from "element-plus";
import { useUserStoreHook } from "@/store/modules/user";
import { useRoute } from "vue-router";
import { getApprovalList, getApprovalDesc } from "@/api/payment/approval";
const route = useRoute();
const userStore = useUserStoreHook();
const pageOrigin = ref();
const form_dialog_ref = ref<FormInstance>();
const TYPES = reactive<any>({
  已通过: "success",
  已驳回: "warning",
  审核中: "default",
  待审核: "primary",
});

const typesApprove = dictMap.审批流记录类型;
const query = async (item: any) => {
  const { id } = item;
  let { data } = await getApprovalDesc(id);
  const { username } = userStore;
  data.username = username;
  console.log("data", data);
  form_dialog_ref.value.show(data);
};
</script>
