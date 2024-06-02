<script lang="ts">
    export default { name: "FmsTab" };
</script>

<script setup lang="ts">

</script>

<template>
    <el-tabs class="p-[10px]">
        <template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
    </el-tabs>
</template>

<style lang="scss" scoped>
    :deep(.el-tabs__nav-wrap::after){
        background-color:transparent!important;
    }
	:deep(.el-tabs__item){
		min-width: 70px;
		margin-right:10px;
		padding: 0;
		border-bottom: 2px solid transparent;
		&:hover{
			border-bottom: 2px solid rgba(231,234,243,0.7);
		}
	}
	:deep(.el-tabs__active-bar){
		min-width: 70px;
	}
</style>
