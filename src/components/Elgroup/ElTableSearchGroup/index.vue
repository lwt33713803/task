
<template>
  <!--    TODO  后续要支持多条件框，所以这里需要整理出去    -->
  <div class="flex items-center mx-2">
    <div class="min-w-20  mx-1  text-[#667788ff] text-sm font-[500]">
      {{ props.config.title }} :
    </div>
    <div class="mx-1">
      <fms-input v-if="props.config.type === 'input'" v-model="filterText" class="filter-input" :placeholder="placeholder"
        clearable @input="onChangeText"></fms-input>
      <el-autocomplete v-else-if="props.config.type === 'autoComplete'" v-model="filterText"
        :fetch-suggestions="props.config.originRequest" class="filter-input" :placeholder="placeholder" clearable
        :value-key="props.config?.key ?? 'id'" @select="onChangeText">
        <template #default="{ item }">
          <div class="value" v-if="props.config?.key_label">
            <el-tag type="success" class="mr-2">
              {{ props.config?.name_label ?? '' }} :
            </el-tag>
            {{ item[props.config?.key] }}33
          </div>
          <span class="link">
            <el-tag v-if="props.config?.name_label" class="mr-2">
              {{ props.config?.name_label ?? '' }}:
            </el-tag>
            {{ item[props.config?.name] }}</span>
        </template>
      </el-autocomplete>
      <div v-else-if="props.config.type === 'select'">
        <fms-select filterable v-model="filterText" class="filter-input" :placeholder="placeholder" clearable
          @input="onChangeText" :options="processParameterValue"
          :key-name="props.config?.options?.valueProperty ?? 'dict_label'"
          :val-name="props.config?.options?.nameProperty ?? 'dict_value'"></fms-select>
      </div>

      <fms-date-picker v-else-if="props.config.type === 'date'" v-model="filterText" class="filter-input"
        :placeholder="placeholder" clearable @change="onChangeText" type="daterange" start-placeholder="开始时间"
        end-placeholder="结束时间" />

    </div>
  </div>
</template>

<script setup lang="ts">

import request from "@/utils/requestContorller";
import { computed, PropType, ref, watch } from 'vue';
import { SmartFilterInput, SmartFilterInputSelect, SmartFilterParams } from './ElTableSearchGroup';
import { debounce } from 'lodash';
import { useDateFormat } from '@vueuse/core';
const props = defineProps({
  config: {
    type: Object as PropType<SmartFilterInputSelect>,
    required: true,
  },
});


const filterText = ref('');

const emits = defineEmits<{
  (name: 'change', filter: SmartFilterParams): void;
}>();

const placeholder = computed<string>(() => {
  return props.config.placeholder || `请${filterplaceholder(props.config.type)}`;
});
const filterplaceholder = (type: string) => `${type == 'input' ? '输入' : '选择'}`

const mixText = computed<number>(() => {
  return props.config?.mixText;
});
const reset = () => {
  filterText.value = undefined;
  usedFilterText.value = '';
};
defineExpose({ reset })
const emitTextDebounce = debounce(() => {
  const name = `${props.config.scheme}`;
  const params: SmartFilterParams = { [name]: props.config.type === 'date' ? formatDate<string[]>(filterText.value) : filterText.value };
  emits('change', params);
}, 100);

const textUseful = computed<boolean>(() => {
  return filterText.value.length >= mixText.value;
});
const processParameterValue = ref([])
function getValue<T>(obj: any): (prop?: string) => T {
  return function (prop?: string): T {
    if (!prop) {
      return obj;
    }
    return prop.split('.').reduce((o, key) => (o && o[key]), obj) as T;
  };
}
const processParameter = async (param: SmartFilterInputSelect): Promise<any> | void | unknown => {
  if (typeof param?.action === 'function') {
    const { action } = param
    await action().then((res) => {

      processParameterValue.value = getValue(res)(param.path);
    })
  } else if (typeof param === 'string') {
    const { action } = param
    const { data } = await request.get(action)
    processParameterValue.value = data
  } else if (Array.isArray(param)) {
    // 处理对象的逻辑

    processParameterValue.value = param
  } else if (typeof param === 'object') {
    // 其他情况
    const { action } = param

    const { data } = await request.get(action)
    processParameterValue.value = data
  }
}
onMounted(() => {
  if (props.config.type == 'select') {
    processParameter(props.config.options)
  }
  filterText.value = props.config.value
})
function formatDate<T>(text: T | any[]) {
  if (!text) return undefined
  return `${useDateFormat(text[0], 'YYYY-MM-DD').value},${useDateFormat(text[1], 'YYYY-MM-DD').value}`
}
/**
 * 真正用于搜索的文本
 */
const usedFilterText = ref('');
const onChangeText = () => {
  console.log('filterText.value', filterText.value)
  if (filterText.value) {

    filterText.value = filterText.value;

  } else {
    usedFilterText.value = '';
  }
};

watch(() => filterText.value, emitTextDebounce, { deep: true });
</script>

<style scoped>
.filter-input {
  min-width: 120px;
}
</style>
