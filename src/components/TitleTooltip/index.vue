<template>
  <el-tooltip :content="props.content" effect="light" placement="bottom" raw-content>
    <el-icon style="margin-left: 4px" :size="18">
      <QuestionFilled />
    </el-icon>
  </el-tooltip>
</template>

<script setup lang="ts">
const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})
</script>
