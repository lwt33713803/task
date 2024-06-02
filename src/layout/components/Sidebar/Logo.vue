<script lang="ts" setup>
import { useSettingsStore } from '@/store/modules/settings';

const settingsStore = useSettingsStore();

defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
});

const logo = ref(new URL(`../../../assets/logo.webp`, import.meta.url).href);
</script>

<template>
  <div class="w-full h-[62px] bg-white dark:bg-[var(--el-bg-color-overlay)] f-c-c">
    <router-link
        v-if="collapse"
        key="collapse"
        class="h-full w-full flex items-center justify-center"
        to="/"
      >
        <img v-if="settingsStore.sidebarLogo" :src="logo" class="w-10 h-10" object-cover style="object-position: left center;" />
      </router-link>

      <router-link
        v-else
        key="expand"
        class="h-full w-full flex items-center justify-center"
        to="/"
      >
        <img v-if="settingsStore.sidebarLogo" :src="logo" class="w-35 h-10" object-cover  />
      </router-link>
  </div>
</template>

<style lang="scss" scoped>

</style>
