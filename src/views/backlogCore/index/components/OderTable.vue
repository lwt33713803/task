<template>
  <Elorigin
    format
    ref="pageOrigin"
    :systemRecordloader="getOrderList"
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
        :row-class-name="tableRowClassName"
        header-cell-class-name=" text-[#333333] font-[500]"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        border
        height="290"
        element-loading-text="正在加载数据中..."
        :element-loading-svg="props.svg"
      >
        <el-table-column v-slot="{ $index }" :label="$t('id')" width="60">
          {{ $index + 1 }}
        </el-table-column>
        <el-table-column :label="$t('backlogCore.nickname')" prop="nickname" width="120" />
        <el-table-column :label="$t('backlogCore.rule_type')" width="120" prop="rule_type_text" />
        <el-table-column v-slot="{ row }" :label="$t('backlogCore.goods_name')" width="250">
          <el-tooltip
            effect="dark"
            :content="row.goods_name"
            placement="bottom"
          >
            <div class="ellipsis">{{ row.goods_name }}</div>
          </el-tooltip>
        </el-table-column>
        <el-table-column :label="$t('backlogCore.money')" width="100" prop="order_profit" />
        <el-table-column :label="$t('backlogCore.withdraw_deposit')" width="120" prop="draw_balance" />
        <el-table-column :label="$t('backlogCore.order_status')" width="120" prop="status_text" />
        <el-table-column :label="$t('backlogCore.operation')" align="right" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" plain @click="operation(row.nickname)"
              >{{ $t('backlogCore.operation') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Elorigin>
</template>
<script setup lang="ts">
import ElPageOrigin from "@/components/Elgroup/Elorigin/index.vue";
import { getOrderList } from "@/api/backlog/index";
import { useRouter } from "vue-router";
const props = defineProps({
  svg: {
    type: String,
    default: ``,
  },
});
const router = useRouter();
interface dataType {
  nickname: string;
  rule_type_text: string;
  goods_name: string;
  order_profit: string;
  draw_balance: string;
  status_text: string;
}
const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: dataType;
  rowIndex: number;
}) => {
  if (row.status_text === "未支付") {
    return "warning-row";
  }
  return "";
};

const operation = (nickname: string): void => {
  router.push({ name: "orderFormManage", query: { nickname } });
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
