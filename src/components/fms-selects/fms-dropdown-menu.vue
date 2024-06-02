
<script lang="ts">
    export default { name: "FmsDropdownMenu" };
</script>

<script setup lang="ts">

</script>

<template>
     <el-dropdown-menu>
		<template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
	 </el-dropdown-menu>
</template>

<style lang="scss" scoped>

</style>
