<script lang="ts">
    export default { name: "FmsTableColumn" };
</script>

<script setup lang="ts">


</script>

<template>
    <el-calendar ref="calendar">
        <template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
    </el-calendar>
</template>

<style lang="scss" scoped>

</style>
