<script lang="ts">
export default { name: "FmsButton" };
</script>

<script setup lang="ts">

</script>

<template>
	<el-button>
		<template v-for="(item, key, index) in $slots" :key="index" #[key]>
			<slot :name="key"></slot>
    	</template>
	</el-button>
</template>

<style lang="scss" scoped></style>
