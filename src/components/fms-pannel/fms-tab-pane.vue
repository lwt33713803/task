<script lang="ts">
    export default { name: "FmsTabPane" };
</script>

<script setup lang="ts">

const is_disabled:Ref<boolean> = ref(false)

</script>

<template>
    <el-tab-pane :disabled="is_disabled" class="px-[5px]">
        <template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
    </el-tab-pane>
</template>

<style lang="scss" scoped>

</style>
