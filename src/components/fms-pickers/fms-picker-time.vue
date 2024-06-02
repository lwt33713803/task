<script lang="ts">
    export default { name: "FmsPickerTime" };
</script>

<script setup lang="ts">
const result:any = ref<any>('')

</script>

<template>
    <el-time-select
        v-model="result"
        start="00:00"
        step="00:30"
        end="23:59"
        placeholder="Select time"
    />
</template>

<style lang="scss" scoped>

</style>

