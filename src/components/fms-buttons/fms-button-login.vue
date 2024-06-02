<script lang="ts">
export default { name: "FmsButtonLogin" };
</script>

<script setup lang="ts">

	import fmsButton from './fms-button.vue';

    function click(){
        console.log('登录按钮点击')
    }
</script>

<template>
    <fmsButton  v-dclick="click" class="button-add w-full">登录</fmsButton>
</template>

<style lang="scss" scoped>
</style>
