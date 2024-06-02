<script lang="ts">
    export default { name: "FmsCollapseItem" };
</script>

<script setup lang="ts">


</script>

<template>
    <el-collapse-item>
        <template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
    </el-collapse-item>
</template>

<style lang="scss" scoped>

</style>
