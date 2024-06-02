<script lang="ts">
    export default { name: "FmsCheckboxGroup" };
</script>

<script setup lang="ts">

</script>

<template>
     <el-checkbox-group>
		<template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
	 </el-checkbox-group>
</template>

<style lang="scss" scoped>

</style>
