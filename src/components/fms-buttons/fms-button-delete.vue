<script lang="ts">
export default { name: "FmsButtonDelete" };
</script>

<script setup lang="ts">
import fmsButton from "./fms-button.vue";
import { useDebounceFn } from "@vueuse/core";

const dialogVisible: Ref<boolean> = ref(false);
const emit = defineEmits(["actionCancel", "actionConfirm"]);
const handleClose = () => {
  dialogVisible.value = false;
};

const confirmDialog = () => {
  dialogVisible.value = true;
};

const actionCancel = useDebounceFn(
  () => {
    handleClose();
    emit("actionCancel");
  },
  500,
  { maxWait: 5000 }
);

const actionConfirm = useDebounceFn(
  () => {
    handleClose();
    emit("actionConfirm");
  },
  500,
  { maxWait: 5000 }
);

const props = withDefaults(
  defineProps<{
    buttonTitle?: string;
    buttonConfirm?: string;
    buttonCancel?: string;
  }>(),
  {
    buttonTitle: "删除",
    buttonConfirm: "确认",
    buttonCancel: "取消",
  }
);
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :before-close="handleClose"
    v-bind="$attrs"
    width="30%"
  >
    <span>删除确认</span>

    <template #header>
      <span>提示信息</span>
    </template>

    <template #footer>
      <el-button hover:color-black @click="actionCancel">
        {{ props.buttonCancel }}
      </el-button>
      <el-button bg-red color-white hover:color-black @click="actionConfirm">
        {{ props.buttonConfirm }}
      </el-button>
    </template>

    <template v-for="(item, key, index) in $slots" :key="index" #[key]>
      <slot :name="key"></slot>
    </template>
  </el-dialog>
  <fmsButton
    class="button-delete"
    :disabled="dialogVisible"
    @click="confirmDialog"
  >
    {{ props.buttonTitle }}
  </fmsButton>
</template>

<style lang="scss" scoped>
rect {
  width: 100px;
  height: 40px;
  fill: gold;
  transition: fill 0.3s linear, width 0.5s linear;
}
</style>
