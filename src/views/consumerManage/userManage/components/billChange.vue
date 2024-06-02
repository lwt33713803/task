
<template #default="Form">
  <demoComponent></demoComponent>
  <ELprodialog v-model="dialogStatus" dialog-width="900">
    <billDialog :form-data="userInfo"></billDialog>
  </ELprodialog>
  <div class="my-2">
    <div title="" class="flex justify-around items-center">
      <div :label="$t('userConfig.account')" class="flex flex-col items-center">
        <div>
          {{ $t("userConfig.account") }}
        </div>
        <div class="font-[600] text-2xl">
          {{ userInfo.username }}
        </div>
      </div>
      <div :label="$t('userConfig.accountbalance')" class="flex flex-col items-center">
        <div>
          {{ $t("userConfig.accountbalance") }}
        </div>
        <div class="font-[600] text-2xl">{{ userInfo.balance }}</div>
      </div>
      <div :label="$t('userConfig.freezebalance')" class="flex flex-col items-center">
        <div>
          {{ $t("userConfig.freezebalance") }}
        </div>
        <div class="font-[600] text-2xl">{{ userInfo.freeze_balance }}</div>
      </div>

      <div>
        <el-button type="primary" @click="dialogStatus = true">{{
          $t("userConfig.catdetail")
        }}</el-button>
      </div>
    </div>
  </div>
  <div class="my-2">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="lable.label" :name="index" v-for="(lable, index) in lableList" :key="index">
      </el-tab-pane>
    </el-tabs>
    <el-form :rules="rules" :model="Form" label-width="100" ref="ruleFormRef">
      <div>
        <el-form-item :label="lableList[activeName].label" prop="amount">
          <fms-input-number :min="0" v-model="Form.amount" :max="activeName == 0
              ? 100000000000
              : activeName == 3
                ? userInfo?.freeze_balance
                : userInfo.balance
            "></fms-input-number>
          <el-button @click="Form.amount = userInfo?.balance" class="mx-3"
            v-if="activeName !== 0 && activeName !== 3">全部</el-button>
          <el-button @click="Form.amount = userInfo?.freeze_balance" class="mx-3" v-if="activeName === 3">全部</el-button>
        </el-form-item>
        <el-form-item :label="`备注  `" prop="remark">
          <fms-input v-model="Form.remark" class="!w-56"></fms-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<style scoped>
.el-tabs__header is-top {
  display: flex;
  justify-content: center;
}
</style>
<script setup>
import billDialog from "./billList.vue";
import i18n from "@/lang";
import billList from "./billList.vue";
const [demoComponent, open] = new useFormDialog(billList, {
  isloading: false,
  isForm: false,
  title: "账单明细",
}).getComponentHook();
const dialogStatus = ref(false);
const props = defineProps({
  formData: {
    type: Object,
    default: null,
  },
});
const activeName = ref(0);
const rules = reactive({
  amount: [{ required: true, message: "请输入", trigger: "blur" }],
});
const Form = reactive({
  amount: 0,
  remark: "",
});
const labelIndex = ref(0);
const handleClick = (index) => {
  ruleFormRef.value.resetFields();
  labelIndex.value = console.log(ruleFormRef.value.resetFields());
};
const userInfo = ref(props.formData);
const ruleFormRef = inject("ruleFormRef");

const getValue = () => {
  return {
    ...Form,
    member_id: userInfo.value.member_id,
    type: lableList[activeName.value].key,
  };
};

defineExpose({ getValue });
const lableList = [
  {
    label: i18n.global.t("userConfig.appendmoney"),
    key: "plus",
  },
  {
    label: i18n.global.t("userConfig.deductmoney"),
    key: "minus",
  },
  {
    label: i18n.global.t("userConfig.freezemoney"),
    key: "freeze",
  },
  {
    label: "金额解冻",
    key: "unfreeze",
  },
];
</script>
<style>
.el-descriptions__label:not(.is-bordered-label) {
  margin: 0 !important;
}
</style>
<style scoped lang="scss">
:deep() {}
</style>
