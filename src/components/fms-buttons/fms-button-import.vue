<script lang="ts">
export default { name: "FmsButtonImport" };
</script>

<script setup lang="ts">



const props = withDefaults(defineProps<{
   buttonTitle?:string,
}>(),{
    buttonTitle:"导入",
})
</script>

<template>
    <el-button bg-green color-white>
        {{ props.buttonTitle }}
    </el-button>
</template>

<style lang="scss" scoped>

</style>
