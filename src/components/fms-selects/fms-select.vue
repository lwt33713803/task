
<script lang="ts">
export default { name: "FmsSelect" };
</script>

<script setup lang="ts">
import { Ref, ref, PropType } from 'vue';

const result: Ref<string> = ref('')

const props = defineProps({
  options: {
    type: Array as PropType<any>,
    required: true, // 必填项
    default: () => [] as any[]
  },
  keyName: {
    type: String,
    default: 'label'
  },
  valName: {
    type: String,
    default: 'id'
  },
  inputWidth: {
    type: String,
    default: '140'
  },
})

</script>

<template>
  <span :input-data-width="props.inputWidth"></span>
  <el-select :style="{ '--heightVar': inputWidth + 'px' }" ref="category" size="small" :popper-append-to-body="false"
    clearable v-bind="{ ...$attrs, ...TableConfig }" placeholder="请选择">
    <el-option v-for="item in props.options" :key="item.id" :label="item[keyName]" :value="item[valName]">
    </el-option>
  </el-select>
</template>
<style></style>
<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  padding: 0 0px 0px 10px !important;
  border-radius: 5px;
  border: 1px solid rgba(231, 234, 243, 0.7);
  box-shadow: 0px 0px 0px 0px rgba(140, 152, 164, 0.15);
  transition: box-shadow 0.15s ease-in-out;
}

:deep(.el-input__suffix) {
  border-left: 1px solid;
  padding: 11px;
  border-color: rgba(231, 234, 243, 0.7);
}

:deep(.el-input__suffix-inner>:first-child) {
  margin: 0 !important;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0px 0px 10px 0px rgba(140, 152, 164, 0.15) !important;
  border: 1px solid rgba(231, 234, 243, 0.7) !important;
  background: #ffffff;
  transition: box-shadow 0.15s ease-in-out;
}

:deep(.el-select .el-input.is-focus .el-input__wrapper) {
  box-shadow: 0px 0px 10px 0px rgba(140, 152, 164, 0.15) !important;
  border: 1px solid rgba(231, 234, 243, 0.7);
  background: #ffffff;
  transition: box-shadow 0.15s ease-in-out;
}

:deep(.el-input__inner) {
  height: 42px;
}

:deep(.el-input) {
  --el-input-focus-border: '#333';
  width: var(--heightVar) !important;
}
</style>
