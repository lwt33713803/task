
<script setup >
import { inject, ref, watch } from 'vue'
import { ElLoading } from 'element-plus'
import proForm from '@/components/Elgroup/ELproform/index.vue'
import { isArray } from '@vue/shared'
const props = defineProps({
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
  ruleFormRef: {
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
  /**
  * options 
  *
  * @type {Object}
  * @default false
  */
  isAction: {
    type: Object,
    default: true,
  },
  isVm: {
    type: Object,
    default: false,
  },
  schema: {
    type: Object,
    default: [],
  },
  isForm: {
    type: Object,
    default: true,
  },
  isFooter: {
    type: Object,
    default: true,
  },
  dialogWidth: {
    type: Object,
    default: '400',
  }
})
const loading = ref(false)
const componentRef = ref(null)
const emit = defineEmits(['update:modelValue', 'save'])
const close = () => {
  emit('update:modelValue', false)
}
function doSave () {
  const _d = document.querySelector('.el-dialog__body')
  let _loading = null
  if (props.isloading) {
    _loading = ElLoading.service({
      target: _d,
      text: '正在加载中',
      fullscreen: true,
    })
    loading.value = true
  }
  if (!props.isForm) {
    emit('update:modelValue', false)
  }
  emit('save', componentRef.value.form, (isDone) => {
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

const _resetComponentSystem = _ => {
  loading.value = false
  fullscreenStatus.value = false
  componentRef.value.formRef?.resetFields()
}


const fullscreenStatus = ref(props.options.fullscreen)
const submitForm = async () => {
  console.log(componentRef.value.form, 'formEl')
  const formEl = componentRef.value.formRef
  console.log(props.isForm, 'formEl')
  if (!props.isForm) {
    return doSave()
  }
  if (isArray(formEl)) {
    let V = true
    await formEl.map((id) => {
      i.validate((valid, fields) => {
        if (!valid) {
          console.log('error')
          V = false
        }
      })
    })
    return V && doSave()
  }
  await formEl.validate((valid) => valid && doSave())
}
defineExpose({
  getComponentValue: () => {
    setTimeout(() => {
      console.log(componentRef.value, 'componentRef.value')
      return componentRef.value
    })

  },
  setComponentValue: (form) => {
    setTimeout(() => {
      componentRef.value.form = { ...form }
    })
  }
})

</script>

<template>
  <el-dialog @close="close" destroy-on-close :close-on-click-modal="false" :append-to-body="true" :show-close="false"
    class="  !rounded-2xl custom-dialog " :fullscreen="fullscreenStatus" :width="dialogWidth" :title="title"
    v-bind="$attrs">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header flex  items-center justify-between h-9">
        <h4 :id="titleId" :class="titleClass">{{ title }}</h4>
        <div class=" cursor-pointer text-lg">
          <el-icon class="el-icon--left mx-2 hover:scale-150 transition"
            @click="() => { _resetComponentSystem(); emit('update:modelValue', false); close; }">
            <Close />
          </el-icon>
        </div>
      </div>
    </template>
    <div class="overflow-auto " style="height: 400px;">
      <div>
        <component v-if="isVm" id="componentsId" :is="formComponent" ref="componentRef" :formData="formComponentsData"
          v-bind="{ ...props }">
        </component>
      </div>
      <div v-if="!isVm">
        <proForm :schema="schema" id="componentsId" :is="formComponent" ref="componentRef" :formData="formComponentsData"
          v-bind="{ ...props }"></proForm>
      </div>
    </div>
    <template #footer v-if="isFooter">
      <div class="right-0 bottom-1">
        <el-button type="primary" @click="submitForm(ruleFormRef)" :loading="loading">
          {{ props?.options?.confimText ?? $t('default.save') }}
        </el-button>
        <el-button type="primary" plain @click="emit('update:modelValue', false); _resetComponentSystem()">
          {{ props?.options?.cancelText ?? $t('default.cancel') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss"></style>