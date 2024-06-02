<script lang="ts">
export default { name: "FmsButtonAdd" };
</script>

<script setup lang="ts">

	import fmsButton from './fms-button.vue';

    function click(){
        console.log('新增按钮点击')
    }

    const props = withDefaults(defineProps<{
    	buttonTitle?:string,
    }>(),{
        buttonTitle:"新增",
    })
</script>

<template>
    <fmsButton v-dclick="click" class="button-add">
        {{ props.buttonTitle }}
    </fmsButton>
</template>

<style lang="scss" scoped>
	rect{
		width: 100px;
		height: 40px;
		fill: gold;
		transition: fill .3s linear,width .5s linear;
	}
	rect:hover{
		fill: red;
		width: 120px;
	}
	#rect1 { fill: url(#Gradient1); }
        .stop1 { stop-color: red; }
        .stop2 { stop-color: black; stop-opacity: 0; }
        .stop3 { stop-color: blue; }
</style>
