<script lang="ts">
    export default { name: "FmsTag" };
</script>

<script setup lang="ts">


</script>

<template>
      <el-tag closable color="rgba(231,234,243,0.4)" size="large">
		<template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
	  </el-tag>
</template>

<style lang="scss" scoped>
</style>
