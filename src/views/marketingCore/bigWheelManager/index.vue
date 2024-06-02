<template>
  <div class="table-wrap">
    <f-table
      format
      ref="pageOrigin"
      :systemRecordloader="getWheelList"
      :smartFilter="[rewardClassify.name, rewardClassify.reward]"
    >
      <template
        #header-action-append-button-gourp="{
          refreshTrigger,
          refreshTriggerAllParams,
        }"
      >
        <el-button 
        v-has="`marketing:bigWheel:rule`" 
        type="primary" 
        @click="rule_dialog_ref.show()"  
          ><el-icon style="margin-right: 0.5rem">
            <Memo /> </el-icon
          >规则维护</el-button
        >
        <el-button
        v-has="`marketing:bigWheel:award`" 
        type="primary" auto-insert-space
        @click="prize_dialog_ref.show()"
          ><el-icon style="margin-right: 0.5rem">
            <Coin /> </el-icon
          >奖项维护</el-button
        >
      </template>
      <template #default="attrs">
        <!-- <el-table-column type="selection" /> -->
        <el-table-column label="单号" prop="id" align="center" />
        <el-table-column label="奖品名称" prop="reward_name" />
        <el-table-column
          v-slot="{ row }"
          label="关联用户"
          prop="member_username"
        >
          <el-tag>{{ row.member_username }}</el-tag>
        </el-table-column>
        <el-table-column label="状态" prop="status_label" align="center" />
        <el-table-column label="中奖时间" prop="create_time" align="center" />
      </template>
    </f-table>
  </div>

  <!-- ruleDialog -->
  <rule-dialog ref="rule_dialog_ref" />
  <!-- prizeDialog -->
  <prize-dialog ref="prize_dialog_ref" />
</template>

<script setup lang="ts">
import { rewardClassify } from "@/interface/searchMap";
import { getWheelList } from "@/api/marketing/index";
import RuleDialog from "./components/RuleDialog.vue";
import PrizeDialog from "./components/PrizeDialog.vue";
const rule_dialog_ref = ref();
const prize_dialog_ref = ref();
</script>

<style scoped lang="scss">
.box {
  display: flex;

  // align-items: center;
  .prize-wrap {
    width: 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: auto;
    margin-bottom: 1rem;
    padding: 1rem;
    box-shadow: var(--el-box-shadow-light);
    border-radius: 0.5rem;
    margin-right: 1rem;
    border: 1px solid var(--el-card-border-color);
  }

  .table-wrap {
    flex: 1;
  }
}
</style>
