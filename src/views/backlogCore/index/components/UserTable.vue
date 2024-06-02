
<template>
  <Elorigin format ref="pageOrigin" :systemRecordloader="getmemberList" style="padding: 0" height="100%"
    :view-control="`small`">
    <template #default="attrs">
      <el-table @selection-change="handleSelectionChange" v-loading="!attrs.dataMatchCursor" v-bind="{ ...$attrs }"
        :data="attrs.recordBoxList" :row-class-name="tableRowClassName"
        header-cell-class-name=" text-[#333333] font-[500]" :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }" border stripe height="400" element-loading-text="正在加载数据中..."
        :element-loading-svg="props.svg">
        <el-table-column v-slot="{ $index }" label="编号" width="60">
          {{ $index + 1 }}
        </el-table-column>
        <el-table-column :label="$t('table.username')" prop="username" />
        <el-table-column :label="$t('userConfig.brushmode')" prop="mode_type"></el-table-column>
        <el-table-column v-slot="{ row }" :label="$t('userConfig.userlevel')" prop="level">
          <el-tag>
            {{ row?.level?.level_name ?? $t('backlogCore.level_null') }}
          </el-tag>
        </el-table-column>
        <el-table-column v-slot="{ row }" :label="$t('backlogCore.nav_user')">
          <el-switch :inactive-value="0" :active-value="1" v-model="row.config_task_status" @change="async () => {
              await setStatus(row.id, row.config_task_status)
                .then((r) => {
                  message.success('操作成功');
                  attrs.refreshTrigger();
                })
                .catch()
                .finally((e) => {
                  attrs.refreshTrigger();
                });
            }
            "></el-switch>
        </el-table-column>
        <el-table-column :label="$t('backlogCore.operation')" align="right" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" plain @click="operation(row.username)">{{ $t('backlogCore.operation') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Elorigin>
</template>
<script setup lang="ts">
import { getmemberList, setStatus } from "@/api/backlog/index";
import { useRouter } from "vue-router";
const props = defineProps({
  svg: {
    type: String,
    default: ``,
  },
});
const router = useRouter();
const operation = (username: string): void => {
  router.push({ name: "userManage", query: { username } });
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
