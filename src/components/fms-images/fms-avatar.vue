
<!-- 头像上传 -->
<template>
  <div v-for="fit in fits" :key="fit" class="block">
    <span class="title">{{ fit }}</span>
    <el-avatar shape="square" :size="100" :fit="fit" :src="url" />
  </div>
</template>
  

<script lang="ts">
export default { name: "FmsAvatar" };
import "@wangeditor/editor/dist/css/style.css";
</script>

<script setup lang="ts">
import { reactive, toRefs } from "vue";

const state = reactive({
  fits: ["fill", "contain", "cover", "none", "scale-down"],
  url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
});

const { fits, url } = toRefs(state);
</script>

<style lang="scss" scoped>
.demo-fit {
  display: flex;
  text-align: center;
  justify-content: space-between;
}
.demo-fit .block {
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
}

.demo-fit .title {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}   
</style>
