<script lang="ts">
export default { name: "FmsButtonReset" };
</script>

<script setup lang="ts">



const props = withDefaults(defineProps<{
   buttonTitle?:string,
}>(),{
    buttonTitle:"重制",
})
</script>

<template>
    <el-button bg-green color-white>
        {{ props.buttonTitle }}
    </el-button>
</template>

<style lang="scss" scoped>

</style>
