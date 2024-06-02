
<script lang="ts">
    export default { name: "FmsDropdownItem" };
</script>

<script setup lang="ts">

</script>

<template>
     <el-dropdown-item>
		<template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
	 </el-dropdown-item>
</template>

<style lang="scss" scoped>

</style>
