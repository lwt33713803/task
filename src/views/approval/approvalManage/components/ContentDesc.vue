<template>
  <el-descriptions :column="1" border>
    <!-- 充值 -->
    <template v-if="props.type === 'order_recharge'">
      <el-descriptions-item label="订单号" label-align="right" align="center">{{
        relation_data.order_sn
      }}</el-descriptions-item>
      <el-descriptions-item
        label="充值金额"
        label-align="right"
        align="center"
        >{{ relation_data.order_amount }}</el-descriptions-item
      >
      <el-descriptions-item
        label="充值渠道"
        label-align="right"
        align="center"
        >{{ relation_data.pay_type }}</el-descriptions-item
      >
      <el-descriptions-item
        label="充值状态"
        label-align="right"
        align="center"
        >{{ relation_data.pay_status_name }}</el-descriptions-item
      >
      <el-descriptions-item label="充值凭证" label-align="right" align="center">
        <template v-for="item in relation_data.vouchers" :key="item.id">
          <el-image
            :preview-teleported="true"
            class="w-12"
            :preview-src-list="[item.image_url]"
            :src="item.image_url"
          />
        </template>
      </el-descriptions-item>
    </template>
    <!-- 提现 -->
    <template v-if="props.type === 'order_withdrawal'">
      <el-descriptions-item label="订单号" label-align="right" align="center">{{
        relation_data.order_sn
      }}</el-descriptions-item>
      <el-descriptions-item
        label="提现金额"
        label-align="right"
        align="center"
        >{{ relation_data.order_amount }}</el-descriptions-item
      >
      <el-descriptions-item label="手续费" label-align="right" align="center">{{
        relation_data.order_fee
      }}</el-descriptions-item>
      <el-descriptions-item
        label="提现类型"
        label-align="right"
        align="center"
        >{{ relation_data.trans_type }}</el-descriptions-item
      >
    </template>
    <!-- 实名认证 -->
    <template v-if="props.type === 'member_verify'">
      <el-descriptions-item label="国家" label-align="right" align="center">{{
        relation_data.country_name
      }}</el-descriptions-item>
      <el-descriptions-item label="姓名" label-align="right" align="center">{{
        relation_data.name
      }}</el-descriptions-item>
      <el-descriptions-item
        label="认证类型"
        label-align="right"
        align="center"
        >{{ relation_data.verify_type_name }}</el-descriptions-item
      >
      <el-descriptions-item
        label="证件号码"
        label-align="right"
        align="center"
        >{{ relation_data.card_no }}</el-descriptions-item
      >
      <el-descriptions-item
        label="证件照正面"
        label-align="right"
        align="center"
      >
        <el-image
          :preview-teleported="true"
          class="w-12"
          :preview-src-list="[relation_data.image_a]"
          :src="relation_data.image_a"
        />
      </el-descriptions-item>
      <el-descriptions-item
        label="证件照反面"
        label-align="right"
        align="center"
      >
        <el-image
          :preview-teleported="true"
          class="w-12"
          :preview-src-list="[relation_data.image_b]"
          :src="relation_data.image_b"
        />
      </el-descriptions-item>
      <el-descriptions-item
        label="手持证件照"
        label-align="right"
        align="center"
      >
        <el-image
          :preview-teleported="true"
          class="w-12"
          :preview-src-list="[relation_data.image_c]"
          :src="relation_data.image_c"
        />
      </el-descriptions-item>
    </template>
  </el-descriptions>
</template>

<script lang="ts" setup>
const props = defineProps({
  content: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
});
const relation_data = reactive({});

watch(
  () => props.content,
  (newVal) => {
    const value = JSON.parse(decodeURIComponent(newVal));
    Object.keys(value).forEach((key) => {
      relation_data[key] = value[key];
    });
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
