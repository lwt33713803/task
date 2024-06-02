<script lang="ts">
    export default { name: "FmsTransfer" };
</script>

<script setup lang="ts">
const  data = [{
	key: 1,
	label: '项目1'
},{
	key: 2,
	label: '项目2'
},{
	key: 3,
	label: '项目3'
}];
</script>

<template>
     <el-transfer :data="data" filterable>
		<template  v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
	 </el-transfer>
</template>

<style lang="scss" scoped>
:deep(.el-transfer__buttons){
	padding: 0 20px;
	width: 80px;
	text-align: center;
}
:deep(.el-transfer-panel){
	border-radius: 13px;
	box-shadow: 0px 0px 15px 0px rgba(140,152,164,0.15);
	border: 1px solid rgba(231,234,243,0.7);
	width: 230px;
}
:deep(.el-transfer-panel__header){
	border: none;
	padding: 15px 20px;
	height: 50px;
	background-color: #fff;
	border-bottom: 1px solid rgba(231,234,243,0.70);;
}
:deep(.el-checkbox__label){
	font-size: 14px!important;
	color: #1E2022!important;
	font-weight: normal;
}
:deep(.el-transfer-panel__body){
	border: none;
}
:deep(.el-transfer-panel__item){
	padding:4px 0 4px 19px;
	height: 38px;
	line-height: 38px;
	width: 100%;
	background: rgba(55,125,255,0);
	&:hover{
		background: rgba(55,125,255,0.10);
		animation: bg-esay-in .5s linear 1 forwards;
	}
}

@keyframes bg-esay-in{
	0%{
		background: rgba(55,125,255,0);
	}
	100%{
		background: rgba(55,125,255,0.10);
	}
}

:deep(.el-transfer-panel__item .el-checkbox__input){
	top: 10px;
}
:deep(.el-transfer-panel .el-checkbox__inner){
	width: 16px;
	height: 16px;
}
:deep(.el-transfer-panel .el-checkbox__inner::after){
	width: 4px;
	height: 8px;
}
:deep(.el-transfer__buttons button){
	border-radius: 100%;
	width: 38px;
	height: 38px;
	margin: 0;
	margin-bottom: 20px;
}
:deep(.el-transfer-panel__filter .el-input__inner){
	height: 42px;
}
:deep(.el-transfer-panel__filter){
	padding: 15px 20px;
}
</style>
