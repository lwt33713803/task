<script lang="ts">
    export default { name: "FmsTextCopyable" };
</script>

<script setup lang="ts">
import fmsText from './fms-text.vue';

</script>

<template>
    <fmsText>
		<template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
	</fmsText>
</template>

<style lang="scss" scoped>

</style>
