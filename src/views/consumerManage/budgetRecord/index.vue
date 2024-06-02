<template>
  <Title :data="titleData" />
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <div style="display: flex">
      <Side @change="changeAction" />
      <el-tab-pane v-has="`consumer:budget:paySearch`" :label="$t(`Gender.recharge`)" name="first">
        <div class="m-user">
          <pay-table ref="payTables" :date="exportTime"/>
        </div>
      </el-tab-pane>
      <el-tab-pane v-has="`consumer:budget:withdrawalSearch`" :label="$t(`budget.deposit`)" name="second">
        <div class="m-user">
          <withdraw-table ref="withdrawTables" :date="exportTime"/>
        </div>
      </el-tab-pane>
    </div>
  </el-tabs>
</template>

<script lang="ts" setup>
import Title from "./components/Title.vue";
import PayTable from "./components/PayTable.vue";
import WithdrawTable from "./components/WithdrawTable.vue";
import Side from "./components/Side.vue";
import { formatDate } from "@/utils/filterDate";
import { getStatisticsDesc } from "@/api/payment/record";

const payTables = ref();
const withdrawTables = ref();
const activeName = ref<string>("first");
const titleData = ref<string>("");
const exportTime = ref("");
const left_id = ref<any>();

const changeAction = (data: any) => {
  const { id: agent_id } = data;
  left_id.value = agent_id;
  handleGetStatisticsDesc({ agent_id });
  if (activeName.value === "first") {
    payTables.value.getList(data);
    return;
  }
  withdrawTables.value.getList(data);
};

const handleClick = (tab: any, event: Event) => {
  const { props } = tab;
  activeName.value = props.name;
  activeName.value === "first"
    ? payTables.value.getList({ id: left_id.value })
    : withdrawTables.value.getList({ id: left_id.value });
};

const handleGetStatisticsDesc = async (form: any | undefined) => {
  const data: any = await getStatisticsDesc(form);
  const info: any = {};
  exportTime.value = formatDate(data.server_time) || undefined;
  console.log("exportTime.value", exportTime.value);
  Object.keys(data).forEach((key) => (info[key] = data[key]));
  titleData.value = encodeURIComponent(JSON.stringify(info));
  console.log("titleData.value", titleData.value);
};

onMounted(() => {
  handleGetStatisticsDesc();
});
</script>

<style scoped lang="scss">
@import "./index";
:deep(.el-tab-pane) {
  width: calc(100% - 280px);
}
</style>
