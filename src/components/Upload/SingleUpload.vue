<template>
  <!-- 上传组件 -->
  <el-upload v-model="imgUrl" class="single-uploader" :show-file-list="false" list-type="picture-card"
    :before-upload="handleBeforeUpload" :http-request="uploadFile">
    <img v-if="imgUrl" :src="imgUrl" class="single" object-contain />
    <el-icon v-else class="single-uploader-icon"><i-ep-plus /></el-icon>
  </el-upload>
</template>

<script setup lang="ts">
import { UploadRawFile, UploadRequestOptions } from "element-plus";
import { uploadFileApi } from "@/api/file";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  index: {
    type: Number,
    default: 0,
  }
});

const emit = defineEmits(["update:modelValue","upInfo"]);
const imgUrl = useVModel(props, "modelValue", emit);
// const path: Ref<string> = ref('')

/**
 * 自定义图片上传
 *
 * @param options
 */
async function uploadFile(options: UploadRequestOptions): Promise<any> {
  const { data: fileInfo } = await uploadFileApi(options.file);
  imgUrl.value = fileInfo.url;
  emit('upInfo', fileInfo,props.index);
}

/**
 * 限制用户上传文件的格式和大小
 */
function handleBeforeUpload(file: UploadRawFile) {
  if (file.size > 2 * 1048 * 1048) {
    ElMessage.warning("上传图片不能大于2M");
    return false;
  }
  return true;
}
</script>

<style scoped>
.single-uploader .single {
  display: block;
  width: 178px;
  height: 178px;
}
</style>

<style>
.single-uploader .el-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  transition: var(--el-transition-duration-fast);
}

.single-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.single-uploader-icon {
  width: 178px;
  height: 178px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
