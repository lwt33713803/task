
<template>
  <el-tree ref="treeRef" :data="options" show-checkbox node-key="id" highlight-current :props="defaultProps"
    @check-change="handleCheckChange" @node-click="handleNodeClick" default-checked-keys="" />
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
const defaultProps = {
  children: 'children',
  label: 'name',
}
const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  defaultNodes: {
    type: Array,
    default: () => []
  },
  nodeProps: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['update:modelValue'])
// props
const { nodeProps, options } = props;

// refs
const treeRef = ref(null);

// // 监听widget.options的变化
// watch(() => widget.options, () => {
//   nextTick(() => {
//     treeRef.value.setCheckedKeys(value);
//   });
// }, { deep: true });

// 处理选中状态变化
const handleCheckChange = (checkedKeys) => {
  let checkedNodes = treeRef.value.getCheckedNodes(true)
  let menuIds = []
  checkedNodes.forEach(nodes => {
    menuIds.push(nodes.id, nodes.pid)
  })
  console.log(Array.from(new Set(menuIds)))

  emit('update:modelValue', Array.from(new Set(menuIds)).filter(item => item !== undefined));
};

// 处理节点点击事件
const handleNodeClick = (node) => {
  // 处理节点点击事件的逻辑
};
</script>
