<script lang="ts">
export default { name: "FmsButtonCancel" };
</script>

<script setup lang="ts">

	import fmsButton from './fms-button.vue';

    function click(){
        console.log('取消按钮')
    }

    const props = withDefaults(defineProps<{
    buttonTitle?:string,
    }>(),{
        buttonTitle:"取消",
    })
</script>

<template>
    <fmsButton v-dclick="click" class="button-cancel">
        {{ props.buttonTitle }}
    </fmsButton>
</template>

<style lang="scss" scoped>
</style>
