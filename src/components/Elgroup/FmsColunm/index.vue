
<template>
  <el-table-column :prop="prop" :label="label" :formatter="formatter" v-bind="$attrs">
    <template #default="{ row }">
      <template v-if="type === 'tags'">
        <el-tag :type="getTagType(row[prop])">{{ getTagText(row[prop]) }}</el-tag>
      </template>
      <template v-if="type === 'tag'">
        <el-tag :type="getType">{{ row[prop] }}</el-tag>
      </template>
      <template v-else-if="type === 'image'">
        <el-image :preview-teleported="true" fit="contain" class="w-12 h-12" :preview-src-list="[row[prop]]"
          :src="row[prop]"></el-image>
      </template>
      <template v-else-if="type === 'switch'">
        <el-switch v-model="row[prop]" :inactive-value="0" :active-value="1"
          @change="(event) => handleSwitchChange(event, row)"></el-switch>
      </template>
      <template v-else>
        <blockLable :text="row[prop]" :maxWidth="200"></blockLable>
      </template>
    </template>
  </el-table-column>
</template>

<script setup lang="ts" >
import { ElTableColumn, ElTag, ElImage, ElSwitch } from 'element-plus';
import blockLable from '@/components/block/Label.vue'

const props = defineProps({
  prop: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    required: false,
  },
  tagOption: {
    type: Object,
    default: () => ({}),
  },

});
const emit = defineEmits<{
  onSwitchChange: [id: number]
  bar: [name: string, ...rest: any[]]
  change: []
}>()
const getTagType = (value: string): string => {
  switch (value) {
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    case 'error':
      return 'danger';
    default:
      return 'info';
  }
};
const getType = () => {
  return 'info';
}
const getTagText = (value: string): string => {
  return props.tagOption[value] || value;
};

const handleSwitchChange = (value: boolean, row: any): void => {
  emit('change', row);
};
</script>
