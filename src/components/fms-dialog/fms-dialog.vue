<script lang="ts">
    export default { name: "FmsDialog" };
</script>

<script setup lang="ts">

</script>

<template>
    <el-dialog width="800px" class="p-[20px]">
		<template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
	</el-dialog>
</template>

<style lang="scss">
.el-dialog{
	border-radius: 6px!important;
}
</style>
