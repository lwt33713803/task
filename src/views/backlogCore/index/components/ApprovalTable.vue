<template>
  <Elorigin format ref="pageOrigin" :systemRecordloader="getAuditList" style="padding: 0" :view-control="`small`">
    <template #default="attrs">
      <el-table @selection-change="handleSelectionChange" v-loading="!attrs.dataMatchCursor" v-bind="{ ...$attrs }"
        :data="attrs.recordBoxList" highlight-current-row row-class-name="row-class"
        header-cell-class-name=" text-[#333333] font-[500]" :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }" border stripe height="290" element-loading-text="正在加载数据中..."
        :element-loading-svg="props.svg">
        <el-table-column v-slot="{ $index }" :label="$t('id')" width="60">
          {{ $index + 1 }}
        </el-table-column>
        <el-table-column v-slot="{ row }" :label="$t('backlogCore.proposer')" width="100">
          <el-tag v-if="row.member.nickname">{{ row.member.nickname }}</el-tag>
        </el-table-column>
        <el-table-column v-slot="{ row }" :label="$t('backlogCore.audit_type')" width="120">
          {{ row.audit_flow.type_name }}
        </el-table-column>
        <el-table-column v-slot="{ row }" :label="$t('backlogCore.audit_status')" width="100">
          {{ filterStatus(row.audit_status) }}
        </el-table-column>
        <el-table-column align="right" :label="$t('backlogCore.operation')" fixed="right" width="150">
          <template #default="{ row }">
            <el-button type="primary" plain @click="operation(row.member.nickname)">{{ $t('backlogCore.operation') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Elorigin>
</template>

<script lang="ts" setup>
import { getAuditList } from "@/api/backlog/index";
import { useRouter } from "vue-router";
const props = defineProps({
  svg: {
    type: String,
    default: ``,
  },
});
const router = useRouter();
const filterStatus = (val: string) => {
  let result: string;
  if (val === "pending") {
    result = "待审核";
  } else if (val === "pass") {
    result = "审核通过";
  } else {
    result = "驳回";
  }
  return result;
};

const operation = (nickname: string): void => {
  router.push({ name: "approvalManage", query: { nickname } });
};
</script>
