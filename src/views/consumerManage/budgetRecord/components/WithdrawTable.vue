<template>
  <div class="m-user-table">
    <div class="header">
      <el-form :inline="true" label-position="left">
        <el-form-item :label="`${$t(`budget.order_id`)}`">
          <el-input v-model="form.order_sn" :placeholder="$t(`budget.placeholder_id`)" />
        </el-form-item>
        <el-form-item :label="`${$t(`budget.launch_time`)}`">
          <el-date-picker v-model="exportTime" type="daterange" :range-separator="$t(`to`)"
            :start-placeholder="$t(`start_time`)" :end-placeholder="$t(`end_time`)" @change="exportTimeChange" />
        </el-form-item>
        <el-form-item :label="`${$t(`budget.transfer_accounts_methods`)}`">
          <fms-select v-model="form.trans_type" :placeholder="$t(`placeholder_select`)" :options="dictMap.提现订单转账方式"
            :key-name="`dict_label`" :val-name="`dict_value`" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :icon="Search">{{ $t(`budget.search`) }}</el-button>
          <el-button @click="reset">{{ $t(`budget.refresh`) }}</el-button>
          <div class="title-btn">
            <el-button v-has="`consumer:budget:excel`" type="success" :icon="Paperclip" @click="exportRef.show()">{{
              $t(`budget.down_form`) }}</el-button>
            <div class="btn-wrap">
              {{ $t(`budget.new_time_info`) }}:<span>{{ props.date }}</span>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <div class="table-inner">
        <el-table TableConfig v-loading="loading" :data="tableData" style="width: 100%; height: 100%" border
          :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }" stripe
          :element-loading-text="`${$t(`loading_text`)}...`" :element-loading-svg="svg">
          <el-table-column v-slot="{ $index }" :label="$t(`id`)" width="80">
            {{ $index + 1 }}
          </el-table-column>
          <el-table-column prop="order_sn" :label="$t(`budget.order_id`)" width="150" />
          <el-table-column prop="trans_type" :label="$t(`budget.transfer_accounts_methods`)" />
          <el-table-column v-slot="{ row }" :label="$t(`budget.order_money`)">
            <el-text class="mx-1" tag="b">{{ row.order_amount }}</el-text>
          </el-table-column>
          <el-table-column v-slot="{ row }" prop="trans_amount" :label="$t(`budget.transfer_accounts_money`)">
            <el-text class="mx-1" tag="b">{{ row.trans_amount }}</el-text>
          </el-table-column>
          <el-table-column prop="order_fee" :label="$t(`budget.procedure_money`)" />
          <el-table-column prop="remark" :label="$t(`budget.remark`)" />
          <el-table-column v-slot="{ row }" :label="$t(`budget.user_info`)" width="200">
            <span>{{ $t(`budget.type`) }}：<el-link>{{ row.member.sys_type_name }}</el-link></span><br />
            <span>{{ $t(`budget.user_name`) }}： <el-link>{{ row.member.nickname }}</el-link></span>
          </el-table-column>
          <el-table-column v-slot="{ row }" :label="$t(`budget.launch_time`)" width="150">
            {{ formatDate(row.create_time) }}
          </el-table-column>
          <el-table-column v-slot="{ row }" prop="update_time" :label="$t(`budget.updata_time`)" width="150">
            {{ formatDate(row.update_time) }}
          </el-table-column>
          <el-table-column prop="audit_status_name" :label="$t(`budget.audit_type`)" fixed="right" width="130" />
        </el-table>
      </div>
      <div class="flex justify-between items-center width-100">
        <div class="ml-3">
          <el-pagination layout="sizes,slot" class="my-6 float-right ml-1" v-model:current-page="page_index"
            v-model:page-size="page_size" background :hide-on-single-page="false" :total="tableTotal"
            @size-change="handleSizeChange" @current-change="handleCurrentChange">
            <div class="text-[#667788] ml-2">
              共 {{ tableTotal || 0 }} 条记录
            </div>
          </el-pagination>
        </div>
        <el-pagination ref="pagination" layout=" prev, pager, next, jumper" class="my-6 float-right ml-1"
          v-model:current-page="page_index" v-model:page-size="page_size" background :hide-on-single-page="false"
          :total="tableTotal" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
  <Export ref="exportRef" />
</template>
<script lang="ts" setup>
import Export from "./Export.vue";
import { FormInstance } from "element-plus";
import { formatDate } from "@/utils/filterDate";
import { Search } from "@element-plus/icons-vue";
import { getWithdrawList } from "@/api/payment/record";
const props = defineProps({
  date: {
    type: String,
    default: "",
  },
});
const exportRef = ref();
const tableData = ref([]);
const tableTotal = ref<number>(0);
const loading = ref(false);
const exportTime = ref<any>([]);
const page_index = ref()
const page_size = ref([10, 20, 30, 40, 50, 60])
const form = reactive<any>({
  order_sn: undefined,
  create_time: "",
  create_time_start: undefined,
  create_time_end: undefined,
  trans_type: undefined,
  agent_id: undefined,
  page: 1,
  list_rows: 10,
});
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
const onSubmit = () => {
  loading.value = true;
  handleGetWithdrawList(form);
};

const reset = () => {
  loading.value = true;
  form.order_sn = undefined;
  form.create_time_start = undefined;
  form.create_time_end = undefined;
  form.trans_type = undefined;
  form.page = 1;
  exportTime.value = [];

  const { page, list_rows, agent_id } = form;
  handleGetWithdrawList({ page, list_rows, agent_id });
};

const getList = async (data: any) => {
  const { id: agent_id } = data || undefined;
  form.agent_id = agent_id;
  loading.value = true;
  handleGetWithdrawList(form);
};

const handleGetWithdrawList = (params: any) => {
  getWithdrawList({ ...params }).then((res: any) => {
    const { data, total } = res;
    tableData.value = data;
    tableTotal.value = total;
    loading.value = false;
  });
};

const exportTimeChange = () => {
  form.create_time_start = Math.round(
    exportTime.value[0] / 1000
  ).toString();
  form.create_time_end = Math.round(exportTime.value[1] / 1000).toString();
};

const handleCurrentChange = (val: number) => {
  form.page = val;
  handleGetWithdrawList(form);
};

const handleSizeChange = (val: number) => {
  form.list_rows = val;
  handleGetWithdrawList(form);
}

defineExpose({
  getList,
});
</script>
<style lang="scss" scoped>
@import "../index";
</style>
