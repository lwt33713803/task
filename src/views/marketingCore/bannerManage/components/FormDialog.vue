<template>
  <el-dialog
    v-model="SHOW_FLAG"
    :title="title"
    width="980"
    class="!rounded-2xl"
    @close="closeChange"
  >
    <div class="crated-form">
      <el-tabs
        v-model="form.lang"
        v-loading="LOADING"
        type="card"
				@tab-change="changeSelected"
      >
        <el-tab-pane :label="lang.label" :name="lang.value" v-for="lang in optoionLans"></el-tab-pane>
      </el-tabs>

      <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="dialogRules"
        label-position="top"
      >
        <fmsFormItem label="排序:" prop="sort">
          <fms-input-number v-model="form.sort" placeholder="请输入" />
        </fmsFormItem>
        <fmsFormItem label="跳转:" prop="url">
          <fmsInput v-model="form.url" placeholder="请输入跳转的链接地址" />
        </fmsFormItem>
        <fmsFormItem label="状态:" prop="status">
          <el-switch
            v-model="form.status"
            :inactive-value="0"
            :active-value="1"
          />
        </fmsFormItem>
        <fmsFormItem label="图片:" prop="img">
          <SingleUpload
            v-model="form.img"
            @up-info="handleUpInfo"
          ></SingleUpload>
        </fmsFormItem>
      </el-form>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeChange">取 消</el-button>
        <el-button
          :disabled="BTN_FLAG"
          type="primary"
          @click="handleConfirm(ruleFormRef)"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage, type FormInstance } from "element-plus";
import { resetObject } from "@/utils/reset";
import { setBanner, editBanner,gatLangView } from "@/api/system/banner";
import { Ref, ref, reactive, onMounted } from 'vue';
const emit = defineEmits(["update"]);
const SHOW_FLAG: Ref<boolean> = ref(false);
const LOADING: Ref<boolean> = ref(false);
const BTN_FLAG: Ref<boolean> = ref(false);
const ruleFormRef = ref<FormInstance>();
const title: Ref<string> = ref("创建");
const form = reactive({
  id: undefined,
  sort: undefined,
  url: "",
	image_url:"",
  status: 0,
  img: "",
  lang: "", // 语言配置
});
const dialogRules = reactive({
  sort: [{ required: true, trigger: "blur", message: "请输入排序" }],
  url: [{ required: true, trigger: "blur", message: "请输入跳转链接" }],
  status: [{ required: true, trigger: "change", message: "请选择" }],
  img: [{ required: true, trigger: "change", message: "请上传图片" }],
});
const imgPath: Ref<string> = ref("");
const handleUpInfo = (info: any) => {
  imgPath.value = info.path;
};

const handleConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (!valid) return;
    LOADING.value = true;
    BTN_FLAG.value = true;
    const { sort, url, status, id,lang } = form;
    const image = imgPath.value;
    title.value === "创建"
      ? handleSetBanner({ sort, url, status, image, lang })
      : handleEditBanner({ id, sort, url, status, image, lang});
  });
};
const handleSetBanner = (params: any) => {
  setBanner(params)
    .then((res: any) => {
      ElMessage.success(`操作成功`);
      closeChange();
      emit("update");
    })
    .catch(() => {
      LOADING.value = false;
      BTN_FLAG.value = false;
    });
};
const handleEditBanner = (params: any) => {
  editBanner(params)
    .then((res: any) => {
      ElMessage.success(`修改成功`);
      closeChange();
      emit("update");
    })
    .catch(() => {
      LOADING.value = false;
      BTN_FLAG.value = false;
    });
};

const show = (item = <any>{}) => {
	form.lang = defaultLang.value;
  SHOW_FLAG.value = true;
  title.value = "创建";
  if (item.id) {
    title.value = "编辑";
    Object.keys(form).forEach((key) => {
      form[key] = item[key];
      form[`img`] = item[`image`];
      imgPath.value = item[`image_url`];
    });
  }
};
const closeChange = () => {
  ruleFormRef?.value?.clearValidate();
  ruleFormRef?.value?.resetFields();
  imgPath.value = "";
  SHOW_FLAG.value = false;
  LOADING.value = false;
  BTN_FLAG.value = false;
  resetObject(form);
};

defineExpose({
  show,
});

//多语言
import useLangsHooks from '../../../../hooks/apis/useLangsHooks';
const {optoionLans,defaultLang} = useLangsHooks();
const changeSelected = (lang)=>{
	form.lang = lang;
	//获取新的banner信息
	if(form.id){
		genLangView(`${form.id}`,lang);
	}
}

//获取语言详情
const genLangView = (id,lang)=>{
	gatLangView(id,lang).then(res=>{
		const {sort,url,status,img,lang,image_url} = res.data;
		form.sort = sort;
		form.url = url;
		form.status = status;
		form.img = image_url;
		form.lang = lang;
		form.image_url = image_url;
	}).catch(err=>{
		ElMessage.error('Fail')
	})
}
</script>

<style scoped lang="scss">
.crated-form {
  padding: 0 4rem;
  box-sizing: border-box;
}

.el-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

:deep(.el-form-item__content) {
  width: 70%;
}

:deep(.el-form-item__label) {
  text-align: right;
  margin-bottom: 0 !important;
  margin-right: 1rem;
  width: 10%;
}

:deep(.el-input__wrapper) {
  width: 100%;
  max-width: 100% !important;
}
</style>
