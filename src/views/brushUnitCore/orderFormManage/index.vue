<template>
  <f-table ref="pageOrigin" :systemRecordloader="getOrderList" :smartFilter="[
    ordersClssify.number,
    {
      scheme: 'nickname',
      title: $t(`table.username`),
      placeholder: $t(`placeholder_input`) + $t(`table.username`),
      type: 'input',
      value: route.query.nickname || '',
    },
    ordersClssify.rules,
    ordersClssify.productName,
    ordersClssify.state,
    ordersClssify.create,
    ordersClssify.finish,
  ]">
    <template #default="attrs">
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column :label="$t(`table.username`)" width="120" prop="username" />
      <el-table-column :label="$t(`table.user_status`)" width="120" prop="member_status_text" />
      <el-table-column v-slot="{ row }" :label="$t(`table.user_type`)" width="120" prop="member_sys_type" >
        {{
          dictMap.用户类型.filter(
            (item) => item.dict_value == row.member_sys_type
          )[0].dict_label
        }}
      </el-table-column>
      <el-table-column v-slot="{ row }" :label="$t(`budget.order_id`)" prop="order_sn" sortable width="220">
        <el-link class="order-sn">{{ row.order_sn }}</el-link>
      </el-table-column>
      <el-table-column :label="$t(`backlogCore.rule_type`)" width="120" prop="rule_type_text" />
      <el-table-column v-slot="{ row }" :label="$t(`backlogCore.rule_info`)" width="180" prop="rule_text" align="center">
        <div style="display: flex; flex-direction: column; align-items: center">
          <el-link v-for="item in row.rule_text.split(',')" :key="item" style="border-bottom: 1px dotted #eeeeee">{{ item
          }}</el-link>
        </div>
      </el-table-column>
      <el-table-column :label="$t(`good.goodname`)" width="200" prop="goods_name" />
      <el-table-column :label="$t(`good.goodtype`)" width="120" prop="goods_category_text" />
      <el-table-column v-slot="{ row }" :label="$t(`budget.order_money`)" width="120">
        <el-text tag="b">{{ row.order_amount }}</el-text>
      </el-table-column>
      <el-table-column v-slot="{ row }" :label="$t(`Gender.commission`)" width="100">
        <el-text tag="b">{{ row.order_profit }}</el-text>
      </el-table-column>
      <el-table-column v-slot="{ row }" :label="$t(`billing.users_money`)" width="120">
        <el-text tag="b">{{ row.balance }}</el-text>
      </el-table-column>
      <el-table-column v-slot="{ row }" :label="$t(`backlogCore.withdraw_deposit`)" width="120" prop="draw_balance">
        <el-text tag="b" type="success">{{ row.draw_balance }}</el-text>
      </el-table-column>
      <el-table-column v-slot="{ row }" :label="$t(`backlogCore.order_status`)" width="120" prop="status_text">
        <el-text tag="b" :type="filter_types[row.status_text]">{{
          row.status_text
        }}</el-text>
      </el-table-column>
      <el-table-column v-slot="{ row }" :label="$t(`billing.create_time`)" width="200" prop="create_time" >
        <el-text class="mx-1">{{
          useDateFormat(row.create_time, "YYYY-MM-DD HH:mm:ss").value
        }}</el-text>
      </el-table-column>
      <el-table-column v-slot="{ row }" :label="$t(`billing.over_time`)" width="200" prop="update_time" >
        <el-text class="mx-1">{{
          useDateFormat(row.update_time, "YYYY-MM-DD HH:mm:ss").value
        }}</el-text>
      </el-table-column>
      <el-table-column v-slot="{ row }" fixed="right"  width="200" :label="$t(`backlogCore.operation`)" #="{ attrs }">
        <el-button 
          v-has="`goods:order:thawOrder`"
          type="primary" 
          :disabled="row.status != 'lock'"
          @click="
            freezeBalance(row.id, () => {
              attrs.refreshTriggerAllParams();
            })
          ">{{ $t(`unfreeze_money`) }}</el-button>
        <el-button 
          v-has="`goods:order:cancelOrder`"
          type="danger" 
          :disabled="row.status != 'nopay'"
          @click="
            onMessageBoxDelete(row.id, () => {
              attrs.refreshTriggerAllParams();
            })
          ">{{ $t(`default.cancel`) }}</el-button>
      </el-table-column>
    </template>
  </f-table>
</template>
<script setup lang="ts">
import {
  getOrderList,
  actionOrderCancel,
  actionOrderFreeze,
} from "@/api/goods/index";
import { useDateFormat } from "@vueuse/core";
import { useTableDelete } from "@/hooks/useTableDelete";
import { ordersClssify } from "@/interface/searchMap";
import { useRoute } from "vue-router";
import FTable from "@/components/Elgroup/Elorigin/f-table.vue";
const route = useRoute();
const { onMessageBoxDelete } = useTableDelete(actionOrderCancel, {
  details: "确认取消该订单？",
  type: "error",
});
const { onMessageBoxDelete: freezeBalance } = useTableDelete(
  actionOrderFreeze,
  { details: "确认解冻本金吗？", type: "info" }
);

const filter_types = reactive<{
  未支付: string;
  已完成: string;
  已取消: string;
  冻结: string;
}>({
  未支付: "info",
  已完成: "success",
  已取消: "default",
  冻结: "primary",
});

//解冻本金
</script>
<style lang="scss">
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
</style>
