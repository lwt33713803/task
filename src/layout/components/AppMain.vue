
<script setup lang="ts">
import { useTagsViewStore } from "@/store/modules/tagsView";
const tagsViewStore = useTagsViewStore();
</script>

<template>
  <section class="app-main overflow-y-auto h-2/3">
    <router-view v-slot="{ Component, route }">
      <!-- <transition name="router-fade" mode="out-in"> -->
      <keep-alive :include="tagsViewStore.cachedViews">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>

      <!-- </transition> -->
    </router-view>
  </section>
</template>
<style scoped>
.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;
  padding: 28px;

  /* 50= navbar  50  */
  min-height: calc(100vh - 65px);
  height: 400px;
  overflow-y: auto;
  background-color: var(--el-bg-color-page);
}

.fixed-header+.app-main {
  padding-top: 65px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 65px);
  }

  .fixed-header+.app-main {
    min-height: 100vh;
    padding-top: 65px;
  }
}
</style>
