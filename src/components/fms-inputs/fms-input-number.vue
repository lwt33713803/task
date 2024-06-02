
<script lang="ts">
export default { name: "FmsInputNumber" };
export enum typeInputEnum {
  "password",
  "text",
  "number",
}
</script>

<script setup lang="ts">

const result: Ref<number> = ref(0)

</script>

<template>
  <el-input-number v-bind="{ ...$attrs, ...TableConfig }" />
</template>

<style lang="scss" scoped>
:deep(.el-input-number__decrease) {
  border-right: none !important;
  background: inherit !important;
}

:deep(.el-input-number__increase) {
  border-left: none !important;
  background: inherit !important;
}
</style>
