<script lang="ts">
    export default { name: "FmsRadio" };
</script>

<script setup lang="ts">
    const checkList:Ref<string> = ref('')
</script>

<template>
     <el-radio-group>
		<template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
	 </el-radio-group>
</template>

<style lang="scss" scoped>

</style>
