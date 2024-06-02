<template>
  <div class="title">
    <div class="title-left">
      <p>{{ $t(`Gender.recharge`) }}</p>
      <div class="_list">
        <el-statistic :title="`${$t(`budget.total_recharge`)}:`">
          <template #prefix>
            <count-to ref="example" class="count-to" :start-val="options.startValInput"
              :end-val="titleInfo.recharge.total" :duration="options.durationInput" :decimals="options.decimals"
              :autoplay="true" :separator="options.separator" />
          </template>
        </el-statistic>
        <el-statistic :title="`${$t(`budget.day_recharge`)}:`">
          <template #prefix>
            <count-to ref="example" class="count-to" :start-val="options.startValInput"
              :end-val="titleInfo.recharge.today" :duration="options.durationInput" :decimals="options.decimals"
              :autoplay="true" :separator="options.separator" />
          </template>
        </el-statistic>
        <el-statistic :title="`${$t(`budget.mouth_recharge`)}:`">
          <template #prefix>
            <count-to ref="example" class="count-to" :start-val="options.startValInput"
              :end-val="titleInfo.recharge.month" :duration="options.durationInput" :decimals="options.decimals"
              :autoplay="true" :separator="options.separator" />
          </template>
        </el-statistic>
      </div>
    </div>
    <div class="title-left">
      <p>{{ $t(`budget.deposit`) }}</p>
      <div class="_list">
        <el-statistic :title="`${$t(`budget.total_deposit`)}:`">
          <template #prefix>
            <count-to ref="example" class="count-to" :start-val="options.startValInput"
              :end-val="titleInfo.withdrawal.total" :duration="options.durationInput" :decimals="options.decimals"
              :autoplay="true" :separator="options.separator" />
          </template>
        </el-statistic>
        <el-statistic :title="`${$t(`budget.day_deposit`)}:`">
          <template #prefix>
            <count-to ref="example" class="count-to" :start-val="options.startValInput"
              :end-val="titleInfo.withdrawal.today" :duration="options.durationInput" :decimals="options.decimals"
              :autoplay="true" :separator="options.separator" />
          </template>
        </el-statistic>
        <el-statistic :title="`${$t(`budget.mouth_deposit`)}:`">
          <template #prefix>
            <count-to ref="example" class="count-to" :start-val="options.startValInput"
              :end-val="titleInfo.withdrawal.month" :duration="options.durationInput" :decimals="options.decimals"
              :autoplay="true" :separator="options.separator" />
          </template>
        </el-statistic>
      </div>
    </div>
    <div class="title-right">
      <p>{{ $t(`budget.difference`) }}</p>
      <div class="_list">
        <el-statistic :title="`${$t(`budget.total_difference`)}:`">
          <template #prefix>
            <count-to ref="example" class="count-to" :start-val="options.startValInput"
              :end-val="titleInfo.total_diff" :duration="options.durationInput" :decimals="options.decimals"
              :autoplay="true" :separator="options.separator" />
          </template>
        </el-statistic>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import CountTo from '@/components/CountTo/index.vue'
let options = reactive({
  startValInput: 0,
  endValInput: 9888,
  durationInput: 2000,
  decimals: 1,
  separator: ',',
})
const props = defineProps({
  data: {
    type: String,
    default: "",
  },
});

const titleInfo = reactive<any>({
  withdrawal: {},
  recharge: {},
  server_time: null,
  total_diff: null,
});
watch(
  () => props.data,
  (newValue) => {
    if (newValue) {
      const val = JSON.parse(decodeURIComponent(newValue));
      Object.keys(val).forEach((key) => (titleInfo[key] = val[key]));
      console.log("titleInfo", titleInfo);
    }
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(55, 125, 255, 0.1);
  border-radius: 12px;
  padding: 0 。5rem;
  margin-bottom: 1rem;
  box-sizing: border-box;

  .title-right {
    margin: 0 1rem;
  }

  .title-left,
  .title-right {
    width: 45%;
    padding: 0.4rem 1rem;

    p {
      margin: 0.5rem;
      font-size: 16px;
      font-weight: 500;
    }

    ._list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(55, 125, 255, 0.03);
      border: 1px solid;
      border-color: rgba(55, 125, 255, 0.1);
      border-radius: 12px;
      padding: 0.5rem 1.5rem;
    }
  }

  .title-right {
    width: 20%;
  }
}

:deep(.el-statistic__number) {
  display: none !important;
}
</style>
