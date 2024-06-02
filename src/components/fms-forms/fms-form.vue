<script lang="ts">
    export default { name: "FmsForm" };
</script>

<script setup lang="ts">

</script>

<template>
      <el-form>
        <template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
      </el-form>
</template>

<style lang="scss" scoped>

</style>
