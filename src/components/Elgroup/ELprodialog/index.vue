
<template>
  <el-dialog @close="close" destroy-on-close :close-on-click-modal="false" :append-to-body="true" :show-close="false"
    class="  !rounded-2xl custom-dialog" v-bind="$attrs" :width="dialogWidth">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header flex  items-center justify-between h-9">
        <div class="flex items-center ">
          <h4 :id="titleId" :class="titleClass">{{ title }}</h4>
          <TitleTooltip :content="tips" v-if="tips" />
        </div>
        <div class=" cursor-pointer text-lg">
          <el-icon class="el-icon--left mx-2 hover:scale-150 transition"
            @click="() => { emit('update:modelValue', false); close; }">
            <Close />
          </el-icon>
        </div>
      </div>
    </template>
    <div class="overflow-auto min-h-60 max-h-100 " :style="{ height: dialogHeight + 'px' }">
      <slot></slot>
    </div>
    <template #footer>
      <slot name="footer"></slot>
      <div class="right-0 bottom-1" v-if="footer">
        <el-button type="primary" @click="Confirm()">
          {{ props?.confimText ?? $t('default.save') }}
        </el-button>
        <el-button type="primary" plain @click="emit('update:modelValue', false);">
          {{ props?.cancelText ?? $t('default.cancel') }}
        </el-button>
      </div>
    </template>

  </el-dialog>
</template>
<style lang="scss"></style>
<script lang="ts" setup>
const emit = defineEmits(['update:modelValue', 'save'])
const props = defineProps({
  dialogWidth: {
    type: String,
    default: '500'
  },
  tips: {
    type: Object,
    default: undefined
  },
  dialogHeight: {
    type: String,
    default: '500'
  },
  footer: {
    type: Boolean,
    default: true
  },
  confimText: {
    type: String,
    default: null
  },
  cancelText: {
    type: String,
    default: null
  },
  title: {
    type: String,
    default: ''
  }
})
const Confirm = () => {
  emit('update:modelValue', false)
  emit('save')
}
const close = () => {
  emit('update:modelValue', false)
}
</script>