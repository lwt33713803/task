<script setup lang="ts">
import { account_operations } from "@/api/user/index";
import { accountOperationsClassify } from "@/interface/searchMap";
import FTable from "@/components/Elgroup/Elorigin/f-table.vue";
</script>

<template>
  <f-table
    ref="pageOrigin"
    :systemRecordloader="account_operations"
    :smartFilter="[
      accountOperationsClassify.username,
      accountOperationsClassify.trade_type,
    ]"
  >
    <template #default="attrs">
      <!-- <el-table-column type="selection" /> -->
      <el-table-column :label="$t(`table.id`)" prop="id" sortable/>
      <el-table-column
        v-slot="{ row }"
        :label="$t(`billing.users`)"
        prop="remark.member?.username"
        sortAble
      >
        <span>{{ row.member?.username }}</span>
      </el-table-column>
      <el-table-column
        v-slot="{ row }"
        :label="$t(`backlogCore.withdraw_deposit`)"
        prop="before_balance"
      >
        <el-text class="mx-1" tag="b" type="success">{{
          row.before_balance
        }}</el-text>
      </el-table-column>
      <el-table-column v-slot="{ row }" :label="$t(`userConfig.freezebalance`)" prop="before_freeze">
        <el-text class="mx-1" tag="b">{{ row.before_freeze }}</el-text>
      </el-table-column>
      <el-table-column v-slot="{ row }" :label="$t(`billing.trade_type`)" prop="trade_type">
        <span>{{ row.trade_type }}</span>
      </el-table-column>
      <el-table-column v-slot="{ row }" :label="$t(`billing.trade_money`)">
        <el-text
          class="mx-1"
          tag="b"
          :type="row.amount.indexOf('+') != -1 ? 'success' : 'danger'"
          >{{ row.amount }}</el-text
        >
      </el-table-column>
      <el-table-column v-slot="{ row }" :label="$t(`good.byname`)" prop="create_by" >
        <el-tag v-if="row.create_by">{{ row.create_by }}</el-tag>
      </el-table-column>
      <el-table-column :label="$t(`create_time`)" prop="create_time"></el-table-column>
    </template>
  </f-table>
</template>

<style scoped lang="scss"></style>
