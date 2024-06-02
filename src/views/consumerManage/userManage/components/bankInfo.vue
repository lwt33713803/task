
<template>
  <el-card v-for="(cardItem, index) in goodsForm" :key="index" class="relative my-6" v-loading="activeCardIndex == index">
    <div class="flex align-center">
      <el-form class="flex-2" :inline="true" ref="ruleFormRef" label-width="100px" label-position="left"
        :model="cardItem">
        <el-form-item :label="$t('userConfig.bankname')" prop="bank_name">
          <el-autocomplete v-model="cardItem.bank_name" :fetch-suggestions="getBankList" placeholder="Please input"
            @select="(e) => handleUserName(e, index)">
            <template #default="{ item }">
              <div class="value">{{ item.name }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <!-- 匹配模式 -->
        <!-- <el-form-item label="银行编码" prop="bank_code">
          <fms-input v-model="cardItem.bank_code"></fms-input>
        </el-form-item> -->
        <el-form-item :label="$t('userConfig.address')" prop="bank_address">
          <fms-input v-model="cardItem.bank_address"></fms-input>
        </el-form-item>
        <el-form-item :label="$t('userConfig.bindtime')" prop="crete_time">
          <fms-input :disabled="true" v-model="useDateFormat(cardItem.update_time * 1000, 'YYYY-MM-DD').value
            "></fms-input>
        </el-form-item>
        <!-- 佣金结算模式 -->
        <el-form-item :label="$t('userConfig.onbankbranch')" prop="bank_branch">
          <fms-input v-model="cardItem.bank_branch"></fms-input>
        </el-form-item>
        <el-form-item :label="$t('userConfig.handcarduser')" prop="bank_username">
          <fms-input v-model="cardItem.bank_username"></fms-input>
        </el-form-item>
        <el-form-item :label="$t('userConfig.bindphone')" prop="bank_user_mobile">
          <fms-input v-model="cardItem.bank_user_mobile"></fms-input>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { inject, ref, watch, reactive } from "vue";
import type { goodsNameType } from "./classify";
import { cloneDeep } from "lodash";

import { getmemberConfigGoods } from "@/api/user/userAdmin";
import to from "await-to-js";
import { useDateFormat } from "@vueuse/core";
import { getBankList } from "@/api/user/userAdmin";
enum statusEnum {
  show = 1,
  hide,
}
const statusMap: Readonly<Record<statusEnum, any>> = {
  [statusEnum.show]: "开启",
  [statusEnum.hide]: "关闭",
};
const rules = reactive({
  balance_search_value: [
    { required: true, message: "请输入商品名称", trigger: "blur" },
  ],
});
const props = defineProps({
  formData: {
    type: Object,
    default: null,
  },
});
const goodsForm = reactive(props.formData);
console.log(goodsForm, "goodsForm");
const activeIndex = ref(-1);
const activeCardIndex = ref(-1);

const ruleFormRef = ref(null);

const handleUserName = ({ code, name }, index): any => {
  goodsForm[index].bank_code = code;
  goodsForm[index].bank_name = name;
};

const copyItem = (item: any) => {
  const _ = cloneDeep(item);
  goodsForm.value.rows.push(_);
};
const deleteItem = (index: number) => {
  activeCardIndex.value = index;
  goodsForm.value.rows.splice(index, 1);
  activeCardIndex.value = -1;
};
const getInterface = () => {
  return [ruleFormRef, goodsForm];
};
defineExpose({ getInterface });
</script>
