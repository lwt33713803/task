<template>
  <el-dialog
    v-model="exportFlag"
    width="40%"
    :title="$t(`budget.form_desc`)"
    @close="cancelChange"
  >
    <div class="export-wrap">
      <span>{{ $t(`budget.form_start_times`) }}:</span>
      <el-date-picker
        v-model="exportTime"
        type="daterange"
        :range-separator="$t(`to`)"
        :start-placeholder="$t(`start_time`)"
        :end-placeholder="$t(`end_time`)"
        @change="exportTimeChange"
      />
      <p>{{ $t(`budget.hint`) }}</p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button v-loading="loading" @click="createChange"
          >{{ $t(`budget.create_excel`) }}</el-button
        >
        <el-button :disabled="!btnFlag" @click="downloadChange"
          >{{ $t(`budget.down`) }}</el-button
        >
        <el-button type="primary" @click="cancelChange">{{ $t(`cancel`) }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { createExport, getExport } from "@/api/payment/record";
import { processDate } from "@/utils/date";
const timer = ref();
const loading = ref<boolean>(false);
const exportFlag = ref<boolean>(false);
const exportTime = ref<any>([]);
const download_url = ref<any>("");
const filename = ref<string>("");
const btnFlag = ref<boolean>(false);
const cancelChange = () => {
  exportFlag.value = false;
  exportTime.value = [];
  filename.value = "";
  download_url.value = "";
  btnFlag.value = false;
  clearInterval(timer.value);
};
const exportTimeChange = () => {
  console.log("exportTime", exportTime);
};

const createChange = () => {
  console.log(exportTime.value);
  if (exportTime.value.length === 0) {
    return ElMessage.warning("请选择时间");
  }
  const start: any = processDate(exportTime.value[0], 1);
  const end: any = processDate(exportTime.value[1], 1);
  const create_time_start = Math.round(start / 1000).toString();
  const create_time_end = Math.round(end / 1000).toString();
  loading.value = true;
  createExport({ create_time_start, create_time_end }).then(({ data }: any) => {
    const { filename: name } = data;
    filename.value = name;

    timer.value = setInterval(() => {
      setTimeout(async () => {
        const data: any = await getExport(name);
        console.log(data);
        console.log("finished", data.finished);
        if (data.finished) {
          loading.value = false;
          btnFlag.value = true;
          download_url.value = data.download_url;
          clearInterval(timer.value);
        }
      }, 10);
    }, 1000);
  });
};

const show = () => {
  exportFlag.value = true;
};

const downloadChange = () => {
  window.location.href = download_url.value;
};

defineExpose({
  show,
});
</script>
