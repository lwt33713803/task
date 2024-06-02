<script lang="ts">
    export default { name: "FmsStep" };
</script>

<script setup lang="ts">

</script>

<template>
	<el-step>
		<template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
	</el-step>
</template>

<style lang="scss" scoped>
.el-step :deep(.el-step__line){
	background-color: rgba(231,234,243,0.7)!important;
	top:19px;
}
:deep(.el-step__head){
	overflow: hidden;
}
:deep(.el-step__icon){
	border: none;
	background-color: rgba(231, 234, 243, 1) !important;
	width: 38px;
	height: 38px;
}
:deep(.is-finish  .el-step__icon){
	background-color: rgba(55,125,255,1) !important;
	color: #fff;
}

.el-step.is-vertical {
	:deep(.el-step__head){
		width: 40px!important;
		min-width: 40px;
	}
	:deep(.el-step__line){
		left: 19px;
	}
}
</style>
