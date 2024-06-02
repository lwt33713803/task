<script lang="ts">
    export default { name: "FmsSteps" };
</script>

<script setup lang="ts">


</script>

<template>
	<el-steps>
		<template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>

	</el-steps>
</template>

<style lang="scss" scoped>

</style>
