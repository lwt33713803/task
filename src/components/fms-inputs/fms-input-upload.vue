<script lang="ts">
    export default { name: "FmsInputUpload" };
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus'

import type { UploadProps } from 'element-plus'

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

</script>

<template>
   <el-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <div v-else class="avatar-uploader-icon"> 
			<svg t="1685603712575" class="icon-plus" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8347" height="40">
				<path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z" fill="#999" p-id="8348"></path>
				<path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z" fill="#999" p-id="8349"></path>
			</svg>	
		</div>
  </el-upload>
</template>

<style lang="scss" scoped>
.avatar-uploader-icon{
	background: repeating-linear-gradient(135deg, transparent, transparent 3px, #999 3px, #999 8px);
  overflow: hidden;
	width: 57px;
	height: 57px;
	animation: shine 3s infinite linear;
}
.icon-plus{
	width: 55px;
	height: 55px;
	padding: 8px;
	margin: 1px;
	background: #fff;
}
@keyframes shine {
    0% { background-position: -1px -1px;}
    100% { background-position: -12px -12px;}
}
</style>
