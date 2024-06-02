
<script lang="ts">
export default { name: "FmsDropdown" };
</script>

<script setup lang="ts">

</script>

<template>
  <el-dropdown v-bind="{ ...$attrs, }">
    <template v-for="(item, key, index) in $slots" :key="index" #[key]>
      <slot :name="key"></slot>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped></style>
