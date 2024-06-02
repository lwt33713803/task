
<template>
  <div class="overflow-wrapper">
    <el-tooltip v-if="isOverflow" :content="text" placement="bottom">
      <el-link>
        {{ text }}
      </el-link>
    </el-tooltip>
    <el-tooltip v-else :content="text" placement="bottom">
      <span>{{ text }}</span>
    </el-tooltip>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElTooltip, ElLink } from 'element-plus';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  maxWidth: {
    type: Number,
    default: 200,
  },
});

const isOverflow = computed(() => {
  const wrapper = document.createElement('div');
  wrapper.style.visibility = 'hidden';
  wrapper.style.whiteSpace = 'nowrap';
  wrapper.innerText = props.text;
  document.body.appendChild(wrapper);
  const isOverflow = wrapper.offsetWidth > props.maxWidth;
  document.body.removeChild(wrapper);
  return isOverflow;
});

const truncatedText = computed(() => {
  const truncatedText = props?.text?.substring(0, props.maxWidth - 3) + '...';
  return truncatedText;
});
</script>

<style scoped>
.overflow-wrapper {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
