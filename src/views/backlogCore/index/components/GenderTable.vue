<template>
  <Elorigin
    format
    ref="pageOrigin"
    :systemRecordloader="getGenderList"
    style="padding: 0"
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
        element-loading-text="正在加载数据中..."
        :element-loading-svg="props.svg"
      >
        <el-table-column v-slot="{ $index }" :label="$t('id')" width="60">
          {{ $index + 1 }}
        </el-table-column>
        <el-table-column :label="$t('backlogCore.gender')" prop="level_value" width="100" />
        <el-table-column
          v-slot="{ row }"
          :label="$t('backlogCore.level_name')"
          prop="level_name"
          width="120"
        >
          <el-tag>
            {{ row.level_name ?? $t('backlogCore.level_null') }}
          </el-tag>
        </el-table-column>
        <el-table-column
          v-slot="{ row }"
          :label="$t('backlogCore.money') "
          prop="commission_method_label"
          width="250"
          align="center"
        >
          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <span
              v-for="item in row.commission_method_label"
              :key="item.path"
              style="border-bottom: 1px dashed #ebeef5"
            >
              {{ item }}
            </span>
          </div>
        </el-table-column>
        <el-table-column :label="$t('backlogCore.goods_class') " prop="category_name" />
        <el-table-column :label="$t('backlogCore.up_methods')" prop="upgrade_desc" />
      </el-table>
    </template>
  </Elorigin>
</template>
<script setup lang="ts">
import { getGenderList } from "@/api/backlog/index";
const props = defineProps({
  svg: {
    type: String,
    default: ``,
  },
});
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
