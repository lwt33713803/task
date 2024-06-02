<script lang="ts">
    export default { name: "FmsCard" };
</script>

<script setup lang="ts">


</script>

<template>
   <el-card>
        <template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
    </el-card>
</template>

<style lang="scss" scoped>

</style>
