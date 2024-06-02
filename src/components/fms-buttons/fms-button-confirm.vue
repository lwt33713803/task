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
        buttonTitle:"确认",
    })
</script>

<template>
    <fmsButton v-dclick="click" class="button-add">
        {{ props.buttonTitle }}
    </fmsButton>
</template>

<style lang="scss" scoped>
</style>
