
<template>
  <el-config-provider :locale="appStore.locale" :size="appStore.size">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();
useCssvar("--el-table-header-bg-color", "#ffffff", false);

import { getConfigInfoNoAuth } from "@/api/system/system";
///获取配置信息,填充系统数据
const getConfigInfoMethod = async () => {
  const { data } = await getConfigInfoNoAuth("base");
  localStorage.setItem('site_config', JSON.stringify(data))
};

onMounted(() => {
  getConfigInfoMethod();
})
</script>
<style>
* .el-dialog__header {
  margin-right: 0 !important;
}

.el-input__inner {
  height: 35px !important;
  font-weight: 600 !important;
}

.el-form-item--default .el-form-item__label {
  color: #667788ff !important;
  font-weight: 500 !important;
  font-size: 14px !important;
}

:root {
  --fms-table-header-bg-color: "#e7eaf3";
}

.el-select .el-select-dropdown {
  position: absolute !important;
  top: auto !important;
  left: 0px !important;
}

/* .el-dialog__header {
  display: flex;
  align-items: center;
} */
</style>
