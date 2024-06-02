
<template>
  <el-select 
    v-if="item.formType == 'select'" v-model="fieldForm[item.field]" :disabled="item.disabled || disabled"
    :clearable="item.clearable || true" :placeholder="item.placeholder" :multiple="item.multiple"
    :collapse-tags="item.collapse" :collapse-tags-tooltip="item.tooltip" :size="size"
    :value-key="item.props?.valueKey || 'id'" filterable style="width: 100%" @change="commonChange(item, index, $event,item.formType)">
    <el-option 
      v-for="(items, i) in item.basicGroup || item.setting" :key="i" :label="
      !isEmptyValue(items[item.props?.value || 'value'])
        ? items[item.props?.label || 'label'] || items.name
        : items
    " :value="
  !isEmptyValue(items[item.props?.value || 'value'])
    ? items[item.props?.value || 'value']
    : items
" />
  </el-select>
  <el-radio-group 
    v-else-if="item.formType == 'radio-group'" v-model="fieldForm[item.field]" :size="size" :disabled="item.disabled || disabled"
     @change="commonChange(item, index, $event,item.formType)">
    <el-radio 
      v-for="(items, i) in item.setting" :key="i" :label="items.value" >{{ items.label }}</el-radio>
  </el-radio-group>
  <el-switch 
    v-else-if="item.formType == 'switch'" v-model="fieldForm[item.field]" inline-prompt :size="size"
    :active-color="(item.active && item.active.color) || '#67c23a'"
    :inactive-color="(item.inactive && item.inactive.color) || '#f56c6c'"
    :active-text="(item.active && item.active.text) || '是'"
    :inactive-text="(item.inactive && item.inactive.text) || '否'" />
  <el-checkbox-group 
    v-else-if="item.formType == 'checkbox-group'" v-model="fieldForm[item.field]" :size="size" :disabled="item.disabled || disabled"
     @change="commonChange(item, index, $event,item.formType)">
    <el-checkbox  v-for="(items, i) in item.setting" :key="i" :label="items.label" />
  </el-checkbox-group>
</template>
<script lang="ts" setup>
import Hooks from "../Hooks";
import { toRefs,PropType } from "vue";

// 定义props
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  item: {
    type: Object,
    default: () => { },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'' | 'large' | 'small'>,
    default: 'default',
  },
  index: {
    type: Number,
    default: null,
  },
  fieldForm: {
    type: Object,
    default: () => { },
  },
});
const { fieldForm, size } = toRefs(props);

// 定义$emit
const $emit = defineEmits(["change"]);

const { commonChange, isEmptyValue } = Hooks($emit);
</script>