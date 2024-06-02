<script lang="ts">
    export default { name: "FmsCheckbox" };
	export interface checkboxOption{
		key:any,
		label:string
	}
</script>

<script setup lang="ts">

</script>

<template>
        <el-checkbox></el-checkbox>
</template>

<style lang="scss" scoped>
:deep(.el-checkbox__inner){
	width: 16px;
	height: 16px;
}
:deep(.el-checkbox__inner::after){
	left: 5px;
	top: 2px;
}
</style>
