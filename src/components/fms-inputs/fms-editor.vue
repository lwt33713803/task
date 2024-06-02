<script lang="ts">
    export default { name: "FmsEditor" };
	import '@wangeditor/editor/dist/css/style.css'
</script>

<script setup lang="ts">
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
const editorRef = shallowRef()
 const valueHtml = ref('<p>hello</p>')
 const mode:string = 'simple';

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
})
const handleCreated = (editor:any) => {
	editorRef.value = editor
}	
</script>

<template>
	<div class="editor-contaitor w-full">
		<Toolbar
			class="border-b bc-ddd"
			:editor="editorRef"
			:default-config="toolbarConfig"
			:mode="mode"
		/>
		<Editor
			v-model="valueHtml"
			style="height: 200px; overflow-y: hidden;"
			:default-config="editorConfig"
			:mode="mode"
			@on-created="handleCreated"
			text-wrap
		/>
	</div>
</template>

<style lang="scss" scoped>
.editor-contaitor{
	border-radius: 10px;
	border: 1px solid #ddd;
	overflow: hidden;
	#editor{
		height:300px;
		background: #ffffff;
		border: 1px solid #f5f5f5;
		border-radius: 6px;
	}
}
</style>
