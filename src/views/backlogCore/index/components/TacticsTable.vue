<template>
  <Elorigin
    format
    ref="pageOrigin"
    :systemRecordloader="getTacticsList"
    style="padding: 0"
    height="100%"
    :view-control="`small`"
  >
    <template #default="attrs">
      <el-table
        @selection-change="handleSelectionChange"
        v-loading="!attrs.dataMatchCursor"
        v-bind="{ ...$attrs }"
        :data="attrs.recordBoxList"
        header-cell-class-name=" text-[#333333] font-[500]"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        border
        stripe
        height="400"
        :element-loading-text="`${$t('loading_text')}...`" 
        :element-loading-svg="props.svg"
      >
        <el-table-column v-slot="{ $index }" :label="$t('id')" width="60">
          {{ $index + 1 }}
        </el-table-column>
        <el-table-column :label="$t('backlogCore.policy_name')" prop="group_name" />
        <el-table-column v-slot="{ row }" :label="$t('backlogCore.as_agent')" prop="agent_name">
          <el-tag v-if="row.agent_name">{{ row.agent_name }}</el-tag>
        </el-table-column>
        <el-table-column v-slot="{ row }"  :label="$t('backlogCore.scheme')">
          <el-button @click="planView.show(row.id)">{{ $t('backlogCore.view_plan') }}</el-button>
        </el-table-column>
        <el-table-column v-slot="{ row }" :label="$t('backlogCore.associating_users')">
          <el-button @click="userView.show(row.id)">{{ $t('backlogCore.view_associating') }}</el-button>
        </el-table-column>
        <el-table-column :label="$t('backlogCore.operation')" align="right" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" plain @click="operation(row.group_name)"
              >{{ $t('backlogCore.operation') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Elorigin>

  <PlanView ref="planView" />
  <UserView ref="userView" />
</template>
<script setup lang="ts">
import PlanView from "./PlanView.vue";
import UserView from "./UserView.vue";
import { getTacticsList } from "@/api/backlog/index";
import { useRouter } from "vue-router";
const props = defineProps({
  svg: {
    type: String,
    default: ``,
  },
});
const router = useRouter();
const planView = ref();
const userView = ref();

const operation = (group_name: string): void => {
  router.push({ name: "tacticsManage", query: { group_name } });
};
</script>
<style lang="scss">
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.order-sn {
  white-space: nowrap;
}

.goods-name {
  width: 200px;
  height: 64px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
}

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
