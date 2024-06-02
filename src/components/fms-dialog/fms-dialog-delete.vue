<script lang="ts">
    export default { name: "FmsDialogDelete" };
</script>

<script setup lang="ts">
import fmsDialog from './fms-dialog.vue';
import fmsButtonCancle from '../fms-buttons/fms-button-cancle.vue';
import fmsButtonConfirm from '../fms-buttons/fms-button-confirm.vue';
import fmsText from '@/components/fms-text/fms-text.vue';
const showDialog:Ref<boolean> = ref(true)

const close = ()=>{
	showDialog.value = false;
}

</script>

<template>
    <fmsDialog
		v-model="showDialog" 
		title="标题"
		width="480px" 
		:align-center="true"
		custom-class="delete-dialog"
		@close="close"
	>
		<div>
		 <fmsText>确认取消吗？</fmsText>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<fmsButtonCancle @click="close"></fmsButtonCancle>
				<fmsButtonConfirm></fmsButtonConfirm>
			</span>
		</template>
	</fmsDialog>
</template>

<style lang="scss">
.delete-dialog{
	box-shadow: 0px 0px 15px 0px rgba(140,152,164,0.15);
	border-radius: 12px;
	.el-dialog__header{
		height: 52px;
		padding-top: 14px;
		box-sizing: border-box;
		.el-dialog__headerbtn{
			top: 0;
		}
		.el-dialog__title{
			font-size: 16px;
		}
	}
	.el-dialog__body{
		border-top: 1px solid rgba(231,234,243,0.70);
		font-size: 14px;
		color: #667788;
	}
}
</style>
