
<script setup lang="ts">
import { FormInstance } from 'element-plus'
import type { PropType } from 'vue'
import { inject, ref, watch } from 'vue'
import { ElLoading } from 'element-plus'
import { isArray } from '@vue/shared'
const props = defineProps({
  modeWidth: {
    type: String,
    default: '800',
  },
  modeValue: {
    type: Object,
    default: false,
  },
  /**
   * Data for form components
   *
   * @type {Object}
   * @default false
   */
  formComponentsData: {
    type: Object,
    default: false,
  },
  tips: {
    type: Object,
    default: undefined,
  },
  /**
   * Whether it is used for the detail page
   *
   * @type {Boolean}
   * @default false
   */
  isForDetail: {
    type: Boolean,
    default: false,
  },

  /**
   * The title
   *
   * @type {String}
   * @default ''
   */
  title: {
    type: String,
    default: '',
  },

  /**
   * Whether it is fullscreen
   *
   * @type {Boolean}
   * @default false
   */
  fullscreen: {
    type: Boolean,
    default: false,
  },

  /**
   * The form component
   *
   * @type {Object}
   * @default false
   */
  formComponent: {
    type: Object,
    default: false,
  },

  /**
   * Iteration type
   *
   * @type {Object}
   * @default false
   * @enum {Boolean}
   */
  isIteration: {
    type: Object,
    default: false,
  },
  /**
  * options 
  *
  * @type {Object}
  * @default false
  */
  options: {
    type: Object,
    default: false,
  },
  isloading: {
    type: Object,
    default: false,
  },
})
const loading = ref(false)
const componentRef = ref(null)
const emit = defineEmits(['update:modelValue', 'save'])
const ruleFormRef = inject('ruleFormRef') as FormInstance
const close = () => {
  emit('update:modelValue', false)
}
function doSave() {
  const _d = document.querySelector('.el-dialog__body')
  let _loading = null
  if (props.isloading) {
    _loading = ElLoading.service({
      // target: _d,
      text: '正在加载中',
      fullscreen: true,
    })
    loading.value = true
  }
  emit('save', componentRef.value.getValue(), (isDone: any) => {
    if (isDone == 'hide') {
      loading.value = false
      _loading?.close()
      emit('update:modelValue', false)
      _resetComponentSystem()
      return
    }
    if (isDone == 'hideloading') {
      loading.value = false
      _loading?.close()
      return
    }
  })
}

const fullscreenStatus = ref(props.options.fullscreen)
const submitForm = async () => {
  const formEl = componentRef.value.formRef
  if (!formEl) {
    return doSave()
  }
  if (componentRef.value.submitForm) {
    componentRef.value.submitForm().then(res => {
      console.log('success')
      doSave()
    })
    return
  }
  if (isArray(formEl)) {

    let isAllValid = true;
    for (const [index, item] of formEl.entries()) {
      await new Promise((resolve) => {
        item.validate((valid: any) => {
          if (!valid) {
            console.log('error');
            isAllValid = false;
          }
          resolve();
        });
      });
    }

    if (isAllValid) {
      doSave()
      return
    }
    return
  }
  await formEl.validate((valid: any) => valid && doSave())
}
</script>

<template>
  <el-dialog @close="close" :close-on-click-modal="false" :append-to-body="true" :show-close="false"
    class=" !rounded-2xl custom-dialog " :fullscreen="fullscreenStatus" :width="modeWidth" :title="title" v-bind="$attrs">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header flex  items-center justify-between h-9">
        <div class="flex items-center ">
          <h4 :id="titleId" :class="titleClass">{{ title }}</h4>
          <TitleTooltip :content="tips" v-if="tips" />
        </div>
        <div class=" cursor-pointer text-lg">
          <el-icon class="el-icon--left mx-2 hover:scale-150 transition" @click="() => {
            close(); emit('update:modelValue', false)
          }">
            <Close />
          </el-icon>
        </div>
      </div>
    </template>
    <div class=" overflow-auto" style="height: 400px;">
      <component v-if="$attrs.modelValue" v-loading="loading" id="componentsId" :formRef="formComponent"
        :is="formComponent" ref="componentRef" :formData="formComponentsData" v-bind="{ ...props }">
      </component>
    </div>
    <template #footer>
      <div class="  right-0 bottom-1">
        <el-button type="primary" @click="submitForm()" :loading="loading">
          {{ props?.options?.confimText ?? '保存' }}
        </el-button>
        <el-button type="primary" plain @click="emit('update:modelValue', false)">
          {{ props?.options?.cancelText ?? '取消' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss"></style>