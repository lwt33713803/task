<template>
  <div class="child-form">
    <template v-if="props.status === 'auto'">
      <fmsFormItem :label="`${$t('Gender.cumulative_recharge')}:`">
        <fmsInput v-model="auto.recharge_plus" :placeholder="$t('Gender.cumulative_recharge_hint')" />
      </fmsFormItem>
      <fmsFormItem :label="`${$t('Gender.balance')}:`">
        <fmsInput v-model="auto.member_balance" :placeholder="$t('Gender.balance_hint')" />
      </fmsFormItem>
      <fmsFormItem :label="`${$t('Gender.invite_people_num')}:`">
        <fmsInput v-model="auto.invite_nums" :placeholder="$t('Gender.invite_people_num_hint')"/>
      </fmsFormItem>
      <fmsFormItem :label="`${$t('Gender.invite_people_money_num')}:`">
        <fmsInput
          v-model="auto.invite_recharge_plus"
          :placeholder="$t('Gender.balance_hint')"
        />
      </fmsFormItem>
      <!-- <fmsFormItem label="连续签到天数:">
        <fmsInput
          v-model="auto.continuous_sign_in"
          placeholder="请输入策略名称"
        />
      </fmsFormItem>
      <fmsFormItem label="累计签到天数:">
        <fmsInput v-model="auto.plus_sign_in" placeholder="请输入策略名称" />
      </fmsFormItem> -->
    </template>
    <template v-else-if="props.status === 'buy'">
      <fmsFormItem :label="`${$t('Gender.direct_buy')}:`">
        <fmsInput v-model="buy.amount" :placeholder="$t('Gender.direct_buy_hint')" />
      </fmsFormItem>
    </template>
  </div>
</template>

<script lang="ts" setup>
const auto = reactive({
  recharge_plus: "",
  member_balance: "",
  invite_nums: "",
  invite_recharge_plus: "",
  // continuous_sign_in: "",
  // plus_sign_in: "",
});

const buy = reactive({
  amount: "",
});

const props = defineProps({
  status: {
    type: String,
    default: "",
  },
});

defineExpose({
  buy,
  auto,
});
</script>

<style>
.el-form-item {
  display: flex !important;
  align-items: center;
  margin-bottom: 1.5rem;
}
.child-form {
  padding-left: 3rem;
}
:deep(.el-form-item__content) {
  width: 70%;
}

:deep(.el-form-item__label) {
  text-align: right !important;
  margin-bottom: 0 !important;
  margin-right: 1rem;
  width: 18%;
}
</style>
