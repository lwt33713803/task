
<template>
  <div class="flex align-center">
    <el-form class="flex-2" ref="ruleFormRef" label-width="100px" label-position="left" :model="verifyData.info">
      <el-form-item :label="$t('userConfig.nationality')" prop="country_code">
        <fms-select v-model="verifyData.info.country_code" :options="country" :key-name="'name'"
          :val-name="'country_code'"></fms-select>
      </el-form-item>
      <el-form-item :label="$t('userConfig.name')" prop="name">
        <fms-input v-model="verifyData.info.name"></fms-input>
      </el-form-item>
      <el-form-item :label="$t('userConfig.cardmode')" prop="verify_type">
        <fms-select v-model="verifyData.info.verify_type" :options="dictMap.用户实名认证类型" :val-name="'dict_value'"
          :key-name="'dict_label'"></fms-select>
      </el-form-item>
      <el-form-item :label="$t('userConfig.cardno')" prop="card_no">
        <fms-input :adisabled="true" v-model="verifyData.info.card_no"></fms-input>
      </el-form-item>
      <el-form-item :label="$t('userConfig.mancardup')" prop="image_a">
        <single-upload v-model="verifyData.info.image_a"></single-upload>
      </el-form-item>
      <el-form-item :label="$t('userConfig.mancarddown')" prop="image_b">
        <single-upload v-model="verifyData.info.image_b"></single-upload>
      </el-form-item>
      <el-form-item :label="$t('userConfig.handmancard')" prop="image_c">
        <single-upload v-model="verifyData.info.image_c"></single-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { inject, ref, watch, reactive } from "vue";

const props = defineProps({
  formData: {
    type: Object,
    default: null,
  },
});
const verifyData = ref(props.formData);
const country = ref(props.formData.country);

const ruleFormRef = ref(null);

const getInterface = () => {
  return [ruleFormRef, verifyData];
};
defineExpose({ getInterface });
</script>
