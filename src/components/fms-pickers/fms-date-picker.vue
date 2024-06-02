
<!-- <template>
  <fms-date-picker size="small"  v-model="filterText" class="filter-input"
        :placeholder="placeholder" clearable @change="onChangeText" type="daterange" start-placeholder="开始时间"
        end-placeholder="结束时间" />
</template> -->
<template>
  <el-date-picker v-bind="{ ...$attrs, }" class="filter-input  !w-56 !h-9" :placeholder="placeholder" clearable
    type="daterange" start-placeholder="开始时间" end-placeholder="结束时间" />
</template>
<script>
export default {

}
</script>
<style scoped lang="scss">
:deep(.el-date-editor--daterange, .el-date-editor--timerange) {
  width: 200px !important;
}

:root {
  --el-date-editor-width: '200px' !important;
}
</style>