<script lang="ts">
export default { name: "FmsButtonSearch" };
</script>

<script setup lang="ts">

const props = withDefaults(defineProps<{
   buttonTitle?:string,
}>(),{
    buttonTitle:"搜索",
})
</script>

<template>
    <el-button bg-green color-white>
        {{ props.buttonTitle }}
    </el-button>
</template>

<style lang="scss" scoped>

</style>
