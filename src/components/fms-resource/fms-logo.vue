<script lang="ts">
    export default { name: "FmsLogo" };
</script>

<script setup lang="ts">
import fmsImage from './fms-image.vue';
import logo from '@/assets/logo.png'
</script>

<template>
      <fmsImage :src="logo"></fmsImage>
</template>

<style lang="scss" scoped>
</style>
