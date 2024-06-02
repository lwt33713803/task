
<template>
  <div class="form">
    <el-form 
      ref="formRef" label-position="left" :inline="inline" :rules="rules" :label-width="labelWidth"
      :model="fieldForm" :class="customClass">
      <el-form-item 
        v-for="(item, index) in fieldList" :key="index" :prop="item.field" :validate-on-rule-change="false"
        :style="{
          flexBasis: item.percent
            ? item.percent
            : item.percent
              ? `${item.percent}%!important`
              : '',
          width:
            item.width && isNaN(Number(item.width))
              ? item.width + '!important' || ''
              : item.width + 'px!important' || '',
        }" :class="[item.className || '', `is-${item.formType}`]" :rules="getRules(item)">
        <template v-if="item.name" #label>
          <div style="display: inline">
            <a :style="{ color: item.labelColor || '' }">{{
              item.name || ""
            }}</a>
          </div>
        </template>
        <template v-if="item.formType && item.mold && !item.hidden">
          <component 
            :is="com['M' + item.mold]" v-model="fieldForm[item.field]" :item="item" :index="index"
            :disabled="disabled" :size="size" :field-form="fieldForm" @change="commonChange" />
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>
<!-- <script lang="ts">
export default { name: "FmsFormtem" };
</script> -->

<script  lang="ts" setup>
import { toRefs, PropType } from "vue";
// 引入组件
import MInput from './components/MInput.vue';
import MDate from './components/MDate.vue';
import MSelect from './components/MSelect.vue';
// 自定义表单验证规则
import GenerateRules from "./GenerateRules";
// interface itemType {
//   field: string;
//   percent: string;
//   width: string;
//   className: string,
//   name: string;
//   mold: string;
//   formType: string;
//   labelColor: string;
//   isNull: number;
//   hidden: boolean,
// }
// const props = withDefaults(defineProps)
const props = defineProps({
  // 对齐方式 'right' | 'left' | 'top'
  // labelPosition: {
  //   type: String,
  //   default: 'right',
  // },
  // 行内表单
  inline: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Object,
    default: () => {
      return {};
    },
  },
  labelWidth: {
    type: Number,
    default: 90,
  },
  fieldForm: {
    type: Object,
    default: () => {
      return {};
    },
  },
  customClass: {
    type: String,
    default: "is-three-columns",
  },
  fieldList: {
    type: Array as PropType<any>,
    required: true, // 必填项
    default: () => [] as any[],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "default",
  },
});

const { customClass, rules, fieldForm, labelWidth, fieldList } = toRefs(props);
// 自定义验证规则
const { getRules } = GenerateRules();
//事件传递
const $emit = defineEmits(["change"]);

// 定义组件
const com: Record<string, any> = {
  MInput: MInput,
  MDate: MDate,
  MSelect: MSelect,
};

/**
 * 常规组件change事件
 * @param item 配置数据
 * @param index 下标
 * @param value 选中/输入的值
 * @param data 选中的整条数据
 */
const commonChange = (item: any, index: any, value: any, data: any) => {
  $emit("change", item, index, value, data);
};
</script>



<style lang="scss" scoped></style>