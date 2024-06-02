<script lang="ts">
    export default { name: "FmsCollapse" };
</script>

<script setup lang="ts">


</script>

<template>
   <el-collapse>
        <template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
    </el-collapse>
</template>

<style lang="scss" scoped>

</style>
