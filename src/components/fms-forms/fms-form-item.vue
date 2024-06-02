<script lang="ts">
    export default { name: "FmsFormtem" };
</script>

<script setup lang="ts">

</script>

<template>
      <el-form-item label-width="100">
        <template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
      </el-form-item>
</template>

<style lang="scss" scoped>
:deep(.el-form--default.el-form--label-top .el-form-item .el-form-item__label){
	margin-bottom: 2px;
	font-size: 12px;
}
</style>
