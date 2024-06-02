
<template>
    <el-date-picker 
      v-model="result" 
      :type="pickerTypeEnum[props.pickerType] as IDatePickerType" 
      :placeholder="pickerTips.get(props.pickerType)" 
      value-format="x"
   />
</template>
<script lang="ts">
    export default { name: "FmsPickerDate" };
    export enum pickerTypeEnum{
        "year",
        "month",
        "date",
        "dates",
        "week",
        "datetime",
        "datetimerange",
        "daterange",
        "monthrange"
    }
</script>

<script setup lang="ts">

import { IDatePickerType } from 'element-plus/es/components/date-picker/src/date-picker.type';

const pickerTips = new Map();
pickerTips.set("year","Pick a year");
pickerTips.set("month","Pick a month");
pickerTips.set("date","Pick a date");
pickerTips.set("dates","Pick dates");
pickerTips.set("week","Pick a week");
pickerTips.set("datetime","Pick a datetime");
pickerTips.set("datetimerange","Pick a datetimerange");
pickerTips.set("daterange","Pick a daterange");
pickerTips.set("monthrange","Pick a monthrange");

const result:any = ref<any>('')

const props = withDefaults(defineProps<{
    pickerType?:pickerTypeEnum,
}>(),{
    pickerType:pickerTypeEnum.date,
})

</script>


<style lang="scss" scoped>
	:deep(.el-date-editor.el-input){
		height: 42px!important;
		line-height: 42px!important;
	}
</style>

