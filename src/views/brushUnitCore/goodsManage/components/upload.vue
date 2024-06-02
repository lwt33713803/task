
<template>
  <div class="flex flex-col justify-center">
    <el-steps :active="stepIndex + 1" align-center>
      <el-step title="第一步" description="上传文件" />
      <el-step title="第二步" description="上传结果" />
    </el-steps>
    <div v-show="stepIndex == 0">
      <div class="my-4">
        <el-card class="flex flex-col justify-center">
          <div class="font-[500] my-2 text-xl">下载模版</div>
          <div class="text-[#666666] my-2 text-sm">
            点击下方按钮文字，下载模版，并按照规定格式填写数据，每次填写数据综总和不超过10000条
          </div>
          <el-button @click="down" type="primary" class="my-2">
            下载模版<el-icon class="ml-2">
              <Files />
            </el-icon>
          </el-button>
        </el-card>
      </div>
      <el-card class="mt-2">
        <div class="font-[500] my-2 text-xl">上传文件</div>
        <div class="text-[#666666] my-2 text-sm">
          上传文件格式仅支持xls,xlsx,且文件大小不得超过5m
        </div>

        <el-upload :before-upload="beforeUpload" accept=".xlsx,.xls" :limit="1" class="mt-4 upload-demo" ref="uploadRef"
          :http-request="uploadFile" :auto-upload="false">
          <template #trigger>
            <el-button type="primary">
              上传文件<el-icon class="ml-2">
                <UploadFilled />
              </el-icon>
            </el-button>
          </template>
        </el-upload>
      </el-card>
      <div class="flex items-center justify-center mt-20">
        <el-button plain @click="onClose">取消</el-button>
        <el-button type="primary" @click="submitUpload">下一步</el-button>
      </div>
    </div>
    <div v-if="stepIndex == 1">
      <el-alert class="mb-4" :title="tableData.error?.length == 0
          ? `导入成功共导入${tableData.error?.length}条`
          : `导入失败${tableData.error?.length}条`
        " :type="tableData.error?.length == 0 ? 'success' : 'error'" show-icon />
      <el-table TableConfig height="300" :data="tableData.error" v-bind="{ ...$attrs, ...TableConfig }"
        highlight-current-row row-class-name="row-class" header-cell-class-name="!py-5 text-[#333333] font-[500]">
        <el-table-column :label="`商品编号`" prop="index"></el-table-column>
        <el-table-column :label="`错误原因`" prop="err" sortable>
        </el-table-column>
      </el-table>
      <div class="flex items-center justify-center mt-20">
        <el-button plain @click="stepIndex--">上一步</el-button>
        <el-button type="primary" @click="onClose">完成</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { UploadInstance } from "element-plus";
import { FileInfo } from "@/api/file/types";

const uploadRef = ref<UploadInstance>();
const fileInfo = ref<FileInfo>();
const loading = ref<any>(false);
const stepIndex = ref(0);
const submitUpload = () => {
  uploadRef.value!.submit();
};
const emit = defineEmits(["onUploadClose"]);
const tableData = ref([]);
const down = async () => {
  downTemplateFile().then((r) => downloadFile(r.data.url, "商品模版.xlsx"));
};
const beforeUpload = (file: any) => {
  return true;
};
const onClose = () => {
  emit("onUploadClose");
};
async function uploadFile(options: any): Promise<any> {
  const loadingInstance = ElLoading.service({
    fullscreen: true,
  });
  try {
    await checkImportGoods(options.file).then((r) => {
      stepIndex.value++;
      tableData.value = r.data;
      if (r.data.error.length === 0) onClose();
    });
    loadingInstance.close();
  } catch (error) {
    loadingInstance.close();
  }

  loadingInstance.close();
}
</script>
