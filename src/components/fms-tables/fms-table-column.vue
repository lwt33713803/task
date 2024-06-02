<script lang="ts">
export default { name: "FmsTableColumn" };
</script>

<script setup lang="ts">
</script>

<template>
  <el-table-column align="center">
    <template v-for="(item, key, index) in $slots" :key="index" #[key]>
      <slot :name="key"></slot>
    </template>
  </el-table-column>
</template>

<style lang="scss">
</style>
