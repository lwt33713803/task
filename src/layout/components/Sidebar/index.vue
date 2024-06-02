
<template>
  <div>
    <div class="w-full h-[70px] p-5" :class="appStore.sidebar.opened ? 'menu-opened' : 'menu-closeed'">
      <img :src="logo" object-cover class="w-full h-[55px]">
    </div>
    <Member :collapse="!appStore.sidebar.opened" />
    <el-scrollbar>
      <el-menu :default-active="currRoute.path" :collapse="!appStore.sidebar.opened" :background-color="variables.menuBg"
        :text-color="variables.menuText" :active-text-color="variables.menuActiveText" :unique-opened="true"
        :collapse-transition="true" mode="vertical">
        <sidebar-item v-for="route in permissionStore.routes" :key="route.path" :item="route" :base-path="route.path"
          :is-collapse="!appStore.sidebar.opened" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>


<script setup lang="ts">
import { useRoute } from "vue-router";
import SidebarItem from "./SidebarItem.vue";
import Member from "./Member.vue";
import { useSettingsStore } from "@/store/modules/settings";
import { usePermissionStore } from "@/store/modules/permission";
import { useAppStore } from "@/store/modules/app";
import variables from "@/styles/variables.module.scss";

const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();
const appStore = useAppStore();
const currRoute = useRoute();
const logo = ref('')
onMounted(() => {
  const res = JSON.parse(localStorage.getItem('site_config') ?? '[]');
  logo.value = res.site_logo;
})
</script>

<style lang="scss" scoped></style>


