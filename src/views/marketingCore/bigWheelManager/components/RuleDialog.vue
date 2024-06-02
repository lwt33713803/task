<!-- 规则维护 -->
<template>
  <el-dialog v-model="SHOW_FLAG" :title="$t(`activity.rule_title`)" class="!rounded-2xl custom-dialog" width="40%">
    <div class="crated-form">
      <el-form
        ref="form_ref"
        v-loading="LOADING"
        :model="form"
        :rules="rules"
        label-position="right"
      >
        <fmsFormItem :label="`${$t('title')}：`" prop="title">
          <fmsInput v-model="form.title" :placeholder="$t('placeholder_input') + $t('title')" />
        </fmsFormItem>
        <fmsFormItem :label="`${$t('background_image')}：`" prop="background_image">
          <el-radio-group v-model="form.background_image">
            <el-radio
              v-for="item in backgrounds"
              :key="item"
              :label="item"
              :value="item"
              size="large"
              border
              style="height: auto;margin-bottom:.5rem"
            >
              <el-image :src="item" style="width: 100px; height: 120px;"/>
            </el-radio>
          </el-radio-group>
        </fmsFormItem>
        <fmsFormItem :label="`${$t('text_color')}：`" prop="text_color">
          <el-color-picker v-model="form.text_color" />
        </fmsFormItem>
        <fmsFormItem :label="`${$t('activity.single_fee')}：`" prop="single_fee">
          <el-input-number v-model="form.single_fee" :min="1" :max="10" />
        </fmsFormItem>
        <fmsFormItem :label="`${$t('activity.day_free_times')}：`" prop="day_free_times">
          <el-input-number v-model="form.day_free_times" :min="1" :max="10" />
        </fmsFormItem>
        <fmsFormItem :label="`${$t('activity.rule_info')}：`">
          <fmsInput
            v-model="form.explain"
            type="textarea"
            :placeholder="$t('placeholder_input') + $t('activity.rule_info')"
          />
        </fmsFormItem>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirmChange(form_ref)"
          >{{ $t(`confirm`) }}</el-button
        >
        <el-button @click="closeChange">{{ $t(`cancel`) }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { getColors, subRules, getRules } from "@/api/marketing/index";
import { resetObject } from "@/utils/reset";
const SHOW_FLAG = ref<boolean>(false);
const LOADING = ref<boolean>(false);
const form_ref = ref();
const backgrounds = ref<any[]>([]); // 背景图片集
const form = reactive<any>({
  title: "",
  background_image: "",
  text_color: "",
  single_fee: undefined,
  day_free_times: undefined,
  explain: "",
});

const rules = reactive({
  title: [{ required: true, trigger: "blur", message: "请输入" }],
  background_image: [{ required: true, trigger: "change", message: "请选择" }],
  text_color: [{ required: true, trigger: "change", message: "请选择" }],
  single_fee: [{ required: true, trigger: "blur", message: "请输入" }],
  day_free_times: [{ required: true, trigger: "blur", message: "请输入" }],
});

const show = () => {
  initData();
  LOADING.value = true;
  SHOW_FLAG.value = true;
};

const handleSubRules = (rules: any) => {
  rules = JSON.stringify(rules);
  subRules(rules).then((res) => {
    console.log(res);
    SHOW_FLAG.value = false;
    ElMessage.success("规则提交成功");
  });
};

const confirmChange = async (done: () => void) => {
  await form_ref.value.validate((valid) => {
    if (!valid) return;
    handleSubRules(form);
  });
};

const closeChange = () => {
  resetObject(form);
  SHOW_FLAG.value = false;
};

const initData = async () => {
  getRules().then((data) => {
    Object.keys(form).forEach((key) => (form[key] = data[key]));
    LOADING.value = false;
  });
  backgrounds.value = await getColors();
};

defineExpose({
  show,
});
</script>
