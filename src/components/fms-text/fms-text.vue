<script lang="ts">
    export default { name: "FmsText" };
</script>

<script setup lang="ts">


</script>

<template>
    <el-text>
        <template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
    </el-text>
</template>

<style lang="scss" scoped>

</style>
