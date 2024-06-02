
<template>
  <div v-if="!loading">
    <el-row class="row-bg" justify="center" v-if="props.isSubmit">
      <el-col :span="24">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-col>
    </el-row>
    <el-form ref="ruleFormRef" :inline="props.isInline" v-bind="{ ...$attrs, props }" :label-width="inputWidth"
      label-position="left" :model="formData" :rules="rules">
      <div :class="`flex-wrap  ${props.direction == 'horizontal' ? '' : 'flex'}`">
        <div v-for=" widget  in   schema  " :key="widget.key" :class="`${widget.label ? '' : ''}`">
          <p class="text-[#d34b4b] font-medium text-xs" v-if="widget.tips">{{ widget.tips }}</p>
          <el-form-item :prop="widget.key" :label="widget?.label ?? ''">
            <template v-if="Array.isArray(widget.child)">
              <!-- 遍历 child 数组，渲染子组件 -->
              <template v-for="( childWidget, childIndex ) in  widget.child " :key="childIndex">
                <!-- 多选框 -->
                <!-- {{ getItemProps(childWidget) }} -->
                <div>
                  <el-time-picker v-if="childWidget.type === 'time'"
                    @change="(e) => dateFormat(childWidget.key, e, childWidget.type)" v-model="formData[childWidget.key]"
                    is-range range-separator="To" start-placeholder="Start time" end-placeholder="End time" />
                </div>
                <fms-select v-if="childWidget.type === 'select'" v-model="formData[childWidget.key]" class="filter-input"
                  clearable :options="childWidget.optionsData"
                  :key-name="childWidget?.options?.valueProperty ?? 'dict_value'"
                  :val-name="childWidget?.options?.nameProperty ?? 'dict_name'"></fms-select>
                <!-- {{ childWidget.optionsData }} -->
                <ELfmstree v-if="childWidget.type === 'tree-checkbox'" v-model="formData[childWidget.key]"
                  :options="childWidget.optionsData" :nodeProps="childWidget.nodeProps"
                  :defaultNodes="formData[childWidget.key]"></ELfmstree>

                <!-- 日期组件 -->
                <el-date-picker v-if="childWidget.type.includes('date')" v-model="formData[childWidget.key]"
                  :type="childWidget.type" v-bind="getItemProps(childWidget)" start-placeholder="开始时间"
                  end-placeholder="结束时间" @change="(e) => dateFormat(childWidget.key, e)" />
                <!-- 上传组件 -->
                <single-upload v-if="childWidget.type === 'upload'" v-model="formData[childWidget.key]"></single-upload>
                <!-- 普通input -->
                <fms-input v-if="childWidget.type === 'input'" v-model="formData[childWidget.key]" max-length="50"
                  v-bind="getItemProps(childWidget)"></fms-input>
                <fms-input v-if="childWidget.type === 'textarea'" type="textarea" v-model="formData[childWidget.key]"
                  max-length="50" v-bind="getItemProps(childWidget)"></fms-input>
                <!-- 数字框 -->
                <fms-input-number :min="0" v-if="childWidget.type === 'input-number'" v-bind="getItemProps(childWidget)"
                  v-model="formData[childWidget.key]" :controls="false" :precision="childWidget?.prop?.precision ?? 0"
                  :max="childWidget?.prop?.max ?? 10000000000000000" />
                <!-- 级联选择器 -->
                <!-- <el-cascader v-if="childWidget.type === 'cascader_lazy'" v-model="formData[childWidget.key]" v-bind="getItemProps(childWidget)"
:props="childWidget?.props" /> -->
                <!-- 单选框 -->
                <el-radio-group v-if="childWidget.type === 'radio'" v-model="formData[childWidget.key]" class="ml-4">

                  <el-radio v-for="(  item, index  ) in   childWidget?.optionsData " :key="index"
                    :label="item[childWidget?.options?.nameProperty ?? 'code']">{{
                      item[childWidget?.options?.valueProperty
                        ?? 'name']
                    }}
                  </el-radio>
                </el-radio-group>
                <el-switch :active-value="1" :inactive-value="0" v-if="childWidget.type === 'switch'"
                  v-model="formData[childWidget.key]" class="ml-4">
                </el-switch>
                <el-autocomplete v-if="childWidget.type === 'autocomlpete'" v-model="formData[childWidget.key]"
                  :fetch-suggestions="childWidget?.options.action"
                  :value-key="childWidget?.options?.valueProperty ?? 'code'" class="filter-input"
                  v-bind="getItemProps(childWidget)">
                </el-autocomplete>
              </template>
            </template>
            <template v-else>
              <!-- 多选框 -->
              <!-- {{ getItemProps(widget) }} -->
              <div>
                <el-time-picker v-if="widget.type === 'time'" @change="(e) => dateFormat(widget.key, e, widget.type)"
                  v-model="formData[widget.key]" is-range range-separator="To" start-placeholder="Start time"
                  end-placeholder="End time" />
              </div>
              <fms-select v-if="widget.type === 'select'" v-model="formData[widget.key]" class="filter-input" clearable
                :options="widget.optionsData" :key-name="widget?.options?.valueProperty ?? 'dict_value'"
                :val-name="widget?.options?.nameProperty ?? 'dict_name'"></fms-select>
              <!-- {{ widget.optionsData }} -->
              <ELfmstree v-if="widget.type === 'tree-checkbox'" v-model="formData[widget.key]"
                :options="widget.optionsData" :nodeProps="widget.nodeProps" :defaultNodes="formData[widget.key]">
              </ELfmstree>

              <!-- 日期组件 -->
              <el-date-picker v-if="widget.type.includes('date')" v-model="formData[widget.key]" :type="widget.type"
                v-bind="getItemProps(widget)" start-placeholder="开始时间" end-placeholder="结束时间"
                @change="(e) => dateFormat(widget.key, e)" />
              <!-- 上传组件 -->
              <single-upload v-if="widget.type === 'upload'" v-model="formData[widget.key]"></single-upload>
              <!-- 普通input -->
              <fms-input v-if="widget.type === 'input'" v-model="formData[widget.key]" max-length="50"
                v-bind="getItemProps(widget)"></fms-input>
              <fms-input v-if="widget.type === 'textarea'" type="textarea" v-model="formData[widget.key]" max-length="50"
                v-bind="getItemProps(widget)"></fms-input>
              <!-- 数字框 -->
              <fms-input-number :min="0" v-if="widget.type === 'input-number'" v-bind="getItemProps(widget)"
                v-model="formData[widget.key]" :controls="false" :precision="widget?.prop?.precision ?? 2"
                :max="widget?.prop?.max ?? 10000000000000000" />
              <!-- 级联选择器 -->
              <!-- <el-cascader v-if="widget.type === 'cascader_lazy'" v-model="formData[widget.key]" v-bind="getItemProps(widget)"
          :props="widget?.props" /> -->
              <!-- 单选框 -->

              <el-radio-group v-if="widget.type == 'radioImage'" v-model="formData[widget.key]" class="ml-4">

                <div class="flex">

                  <div v-for="(  item, index  ) in   widget?.optionsData " :key="index">
                    <el-image class=" w-44 h-88 mx-5" :src="item.preview_image">
                    </el-image>
                    <el-radio class="ml-6" :label="item[widget?.options?.nameProperty ?? 'code']">
                      {{ item[widget?.options?.valueProperty ?? 'name']
                      }}
                    </el-radio>
                  </div>
                </div>
              </el-radio-group>
              <el-radio-group v-if="widget.type === 'radio'" v-model="formData[widget.key]" class="ml-4">

                <el-radio v-for="(  item, index  ) in   widget?.optionsData " :key="index"
                  :label="item[widget?.options?.nameProperty ?? 'code']">{{ item[widget?.options?.valueProperty ??
                    'name']
                  }}
                </el-radio>
              </el-radio-group>
              <el-switch :active-value="1" :inactive-value="0" v-if="widget.type === 'switch'"
                v-model="formData[widget.key]" class="ml-4">
              </el-switch>
              <el-autocomplete v-if="widget.type === 'autocomlpete'" v-model="formData[widget.key]"
                :fetch-suggestions="widget?.options.action" :value-key="widget?.options?.valueProperty ?? 'code'"
                class="filter-input" v-bind="getItemProps(widget)">
              </el-autocomplete>
            </template>
          </el-form-item>
        </div>
      </div>


    </el-form>

  </div>
</template>
<script lang="ts" setup>
import request from "@/utils/requestContorller";
import { isArray } from "@vue/shared";
import { useDateFormat } from '@vueuse/core';
import { ElLoading } from "element-plus";
import { cloneDeep } from "lodash";
import { onMounted, PropType, reactive, ref, render } from 'vue'
import { Widget, RulesType } from './ELproform'
const loading = ref(false)
const props = defineProps({
  onSubmit: defineListenerProp<(form: any) => void>(),
  onError: defineListenerProp<(form: any) => void>(),
  isSubmit: {
    type: Boolean,
    default: false
  },
  isInline: {
    type: Boolean,
    default: false
  },
  api: {
    type: String,
    default: '',
    required: false
  },
  schema: {
    type: Object as PropType<Widget[]>,
    default: () => [],
  },
  formData: {
    type: Object as PropType<object>,
    default: () => { }
  },
  inputWidth: {
    type: String,
    default: 'auto'
  },
  direction: {
    type: String,
    default: 'horizontal'
  }
})
const vmRef = ref(null)
const timeArr = ref([])
const processParameterValue = ref([])
const _schema = ref([])
const formatSchema = () => {
  return props.schema?.forEach(
    async ({ options, ...i }: any) => {
      _schema.value.push({
        optionsData: options ? processParameter(i.options) : null,
        ...i
      });
    }
  );
}

function getValue<T>(obj: any): (prop?: string) => T {
  return function (prop?: string): T {
    if (!prop) {
      return obj;
    }
    return prop.split('.').reduce((o, key) => (o && o[key]), obj) as T;
  };
}
const processParameter = async (param: any): Promise<any> | void | unknown => {
  const promises = param.map(async (element: any) => {
    if (['select', 'radio', 'tree-checkbox', 'radioImage'].includes(element.type)) {
      const { options } = element;
      if (typeof options?.action === 'function') {
        console.log(getValue(await options.action())(options.path))
        element.optionsData = getValue(await options.action())(options.path);
      } else if (typeof options === 'string') {
        const { data } = await request.get(options.action);
        element.optionsData = data;
      } else if (Array.isArray(options)) {
        element.optionsData = options;
      } else if (typeof options === 'object') {
        const { data } = await request.get(options.action);
        element.optionsData = data;
      }
    }
    if (element.type === 'daterange' || element.type === 'date' || element.type === 'time') {
      if (element.type === 'time') {
        return
      }
      if (formData.value[`${element.key}`]) {
        if (element.type != 'date') {
          formData.value[`${element.key}replace`] = formData.value[`${element.key}`]
          formData.value[`${element.key}`] = convertToDateArray(formData.value[`${element.key}`])
        } else {
          formData.value[`${element.key}replace`] = formData.value[`${element.key}`]
          formData.value[`${element.key}`] = convertToDate(formData.value[`${element.key}`])
        }
      }
    }

    // 如果存在 child 字段，则递归处理
    if (element.child) {
      await processParameter(element.child);
    }
  });

  await Promise.all(promises);
}

const setDefaultOptionsValue = () => {
  props.schema.forEach((element: any) => {
    if (element.type === 'select') {
      // formData.value[element.key] = element.optionsData[0][element.options.nameProperty]
    }
  });
}
onMounted(async () => {
  loading.value = true
  let _loading = {}
  const _d = document.querySelector('.el-dialog__body')
  _loading = ElLoading.service({
    target: _d,
    text: '正在加载中',
    fullscreen: true,
  })
  await processParameter(props.schema)
  generateRules(props.schema)
  setDefaultOptionsValue()
  loading.value = false
  _loading.close()

})
/**
 * @description: 在formatToSearch后生成formdata处理form数据 有效避免直接使用formatToSearch
 * 带来的重复生成model的问题
 * @return {*}
 */
const formData = ref(
  props.formData
    ? props.formData
    : {}
);
// 统一处理bind
const getItemProps = (items: any) => {
  return {
    ...items,
    // style: `margin:5px`,
    placeholder: `${(items.placeholder ||= `请${filterplaceholder(items.type)}`)}`,
    clearable: true,
    disabled: items.disabled
  };
};

const filterplaceholder = (type: string) => `${type.includes('select') ? '选择' : '输入'}`
const rules = reactive({});
const generateRules = (schema: Widget[]) => {
  for (const key in schema) {
    if (schema.hasOwnProperty(key) && schema[key].rules) {
      if (schema[key].rules.validator) {
        rules[schema[key].key] = [
          {
            required: schema[key].rules.required || false,
            message: schema[key].rules.message || `${schema[key]?.label}${filterplaceholder(schema[key].type)}错误`,
            trigger: schema[key].rules.trigger || 'blur',
            validator: schema[key].rules.validator
          }
        ]
      } else {
        rules[schema[key].key] = [
          {
            required: schema[key].rules.required || false,
            message: schema[key].rules.message || `${schema[key]?.label}${filterplaceholder(schema[key].type)}错误`,
            trigger: schema[key].rules.trigger || 'change',
          }
        ]
      }

    }
  }

};
const rules1 = reactive({
  test: [
    { required: true, message: '请上传图片', trigger: 'change' },
  ],
})
const dateFormat = (
  name: string,
  date: string | number | Date,
  type?: string
) => {
  if (isArray(date)) {
    if (type == 'time') {
      formData.value[`${name}replace`] = `${useDateFormat(date[0], 'HH:mm').value},${useDateFormat(date[1], 'HH:mm').value}`
    } else {
      formData.value[`${name}replace`] = `${useDateFormat(date[0], 'YYYY-MM-DD HH:mm:ss').value},${useDateFormat(date[1], 'YYYY-MM-DD HH:mm:ss').value}`
    }
  } else {
    formData.value[`${name}replace`] = useDateFormat(date, 'YYYY-MM-DD HH:mm:ss');
  }
  console.log(formData.value[`${name}`])
};
const ruleFormRef = ref(null)
defineExpose({
  form: formData,
  formRef: ruleFormRef,
})
const submitForm = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.validate((valid) => {
      if (valid) {
        console.log(formData.value)
        const _value = cloneDeep(formData.value)
        console.log(_value)
        console.log(formData.value, '11')
        call(props.onSubmit, processObject(_value))
      } else {
        console.log('error submit!!')
        call(props.onError, formData.value)
      }
    })
  }
}
</script>
