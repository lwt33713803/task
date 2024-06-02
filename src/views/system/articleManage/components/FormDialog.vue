<template>
  <el-dialog
    v-model="showFlag"
    :title="dialogTitle"
    width="960"
    class="!rounded-2xl custom-dialog"
    @close="closeChange"
    destroy-on-close
  >
    <div class="crated-form">

			<el-tabs
        type="card"
        :model-value="dialogForm.lang"
        @tab-change="changeLangs"
      >
        <el-tab-pane
          :label="lang.label"
          :name="lang.value"
          v-for="lang in optoionLans"
        ></el-tab-pane>
      </el-tabs>

      <el-form
        ref="ruleFormRef"
        :model="dialogForm"
        :rules="rules"
        label-position="right"
        class="overflow-hidden"
        label-width="150"
      >
        <el-form-item label="标题:" prop="title">
          <el-input v-model="dialogForm.title" placeholder="请输入文章标题" />
        </el-form-item>

        <el-form-item label="生效时间:" prop="effective_time">
          <el-date-picker
            v-model="dialogForm.effective_time"
            placeholder="请选择生效时间"
            :picker-type="pickerTypeEnum.datetime"
          />
        </el-form-item>


        <el-form-item label="文章状态:" prop="status">
          <el-switch
            v-model="dialogForm.status"
            inactive-value="0"
            active-value="1"
          />
        </el-form-item>

        <el-form-item label="文章缩略图:" prop="img">
          <SingleUpload
            v-model="dialogForm.img"
            @up-info="handleUpInfo"
            object-cover
          ></SingleUpload>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <div class="b-1 border-color-gray-200 rd-1">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              mode="simple"
            />
            <Editor
              style="height: 400px"
              v-model="dialogForm.content"
              :defaultConfig="editorConfig"
              mode="default"
              @onCreated="handleCreated"
              text-wrap
            />
          </div>
        </el-form-item>
      </el-form>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeChange">取 消</el-button>
        <el-button type="primary" @click="handleConfirm(ruleFormRef)"
          >确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import type { FormInstance } from "element-plus";
import { resetObject } from "@/utils/reset";
import { setArticle, editArticle } from "@/api/system/article";
import { pickerTypeEnum } from "@/components/fms-pickers/fms-picker-date.vue";
const emit = defineEmits(["update"]);
const showFlag: Ref<boolean> = ref(false);
const ruleFormRef = ref<FormInstance>();
const dialogTitle: Ref<string> = ref("创建");
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

////富文本
const handleCreated = (editor: any) => {
  editorRef.value = editor;
};
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
const editorRef = shallowRef();
const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    uploadImage: {
      base64LimitSize: 5 * 1024, // 5kb
      maxFileSize: 2 * 1024 * 1024, // 1M
      maxNumberOfFiles: 5,
      allowedFileTypes: ["image/*"],
      async customUpload(file: File, insertFn: any) {
        // 文件上传
        let result = await uploadFileApi(file);
        insertFn(result.data.url, result.data.url, result.data.url);
      },
    },
  },
};


//切换语言
const changeLangs = async (lang: any) => {
	dialogForm.lang = lang;
  if (dialogForm.id) {
    const loading = ElLoading.service({
      lock: true,
      text: "Loading",
      background: "rgba(0, 0, 0, 0)",
    });
    await getLangView(dialogForm.id, dialogForm.lang);
    loading.close();
  }
};

////// Diaolog表单
//语言表单
const dialogForm = reactive<{
  id: string;
  img: string;
  title: string;
  lang: string;
  content: string;
  status: undefined | string;
  effective_time: number;
  sort: undefined | string;
}>({
  id: "",
  img: "",
  title: "",
  lang: "",
  content: "",
  status: undefined,
  effective_time: 0,
  sort: undefined,
});

const handleSetArticle = (params: any) => {
  setArticle(params).then((res: any) => {
    closeChange();
    ElMessage.success(`操作成功`);
    emit("update");
  });
};

const handleEditArticle = (params: any) => {
  editArticle(params).then((res: any) => {
    closeChange();
    ElMessage.success(`修改成功`);
    emit("update");
  });
};

const show = (item: any) => {
	getLangsForSelect();
  resetObject(dialogForm);
  dialogTitle.value = "创建";
  if (item?.id) {
    dialogTitle.value = "编辑";
    Object.keys(item).forEach((key) => {
      if (key === "image_url") {
        dialogForm.img = item.image_url;
        // imgPath.value = item.image;
      } else if (key === "effective_time") {
        dialogForm.effective_time = Math.round(item.effective_time * 1000);
      } else {
				//@ts-ignore
        dialogForm[key] = item[key];
      }
    });
  }else{
		dialogForm.lang = currentLang
	}
  showFlag.value = true;
};

//
defineExpose({
  show
});

//切换语言'
const currentLang = ref("");
const optoionLans = ref<any[]>();
//获取语言列表
const getLangsForSelect = () => {
	getLangs()
		.then((res:any) => {
			optoionLans.value = res;
			currentLang.value = res.filter((item) => item.is_default == 1)[0].value;
		})
		.catch((err) => {});
};


const getLangView = (id: string, lang: string | undefined) => {
  editorRef.value.clear();
  queryDesc(id, lang)
    .then((res) => {
      const { id, title, status, content, effective_time, image_url } = res;
      dialogForm.id = id;
      dialogForm.title = title;
      dialogForm.status = status.toString();
      dialogForm.content = content;
      dialogForm.effective_time = effective_time * 1000;
      dialogForm.img = image_url;
    })
    .catch((err) => {
      ElMessage.error("获取失败，请重试");
    });
};
//表单校验规则
const rules = reactive({
  title: [{ required: true, trigger: "blur", message: "请输入文章标题" }],
  status: [{ required: true, trigger: "change", message: "请选择展示状态" }],
  lang: [{ required: true, trigger: "select", message: "请选择语言" }],
  effective_time: [
    { required: true, trigger: "change", message: "请选择生效时间" },
  ],
  content: [{ required: true, trigger: "blur", message: "请输入文章内容" }],
  img: [{ required: true, trigger: "blur", message: "请上传图片" }],
});

//封面上传操作
const imgPath: Ref<string> = ref("");
const handleUpInfo = (info: any) => {
  imgPath.value = info.path;
};

const closeChange = () => {
  resetObject(dialogForm);
  imgPath.value = "";
  showFlag.value = false;
  ruleFormRef?.value?.resetFields();
};

const handleConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (!valid) return;
    let { title, content, status, effective_time, id, sort, img, lang } =
      dialogForm;
    if (imgPath.value) {
      img = imgPath.value;
    }
    effective_time = Math.round(effective_time / 1000);
    dialogTitle.value === "创建"
      ? handleSetArticle({
          title,
          content,
          status,
          image: img,
          effective_time,
          lang,
        })
      : handleEditArticle({
          id,
          sort,
          title,
          content,
          status,
          image: img,
          effective_time,
          lang: lang,
        });
  });
};
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

:deep(.el-tabs__nav-wrap) {
  display: flex;
}

.langs {
  .active {
    background-color: #fff;
  }
}

:deep(.single) {
  object-fit: cover;
  object-position: center;
}
</style>
