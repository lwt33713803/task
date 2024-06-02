<template>
  <f-table
    ref="pageOrigin"
    :systemRecordloader="getPagesList"
    :smartFilter="[pagesClassify.title, pagesClassify.page_type]"
  >
    <template #header-action-append-button-gourp="{ refreshTrigger }">
      <el-button v-has="`system:page:create`" type="primary" @click="showCreateForm">创 建</el-button>
    </template>
    <template #default="attrs">
      <el-table-column type="selection" />
      <el-table-column label="序号" prop="id" width="100" sortable></el-table-column>
      <el-table-column label="标题" prop="title" sortAble> </el-table-column>
      <el-table-column label="类型" prop="type" v-slot="{ row }">
        <span>{{
          typePages.filter((item) => item.dict_value === row.type)[0].dict_label
        }}</span>
      </el-table-column>
      <el-table-column label="启用语言" prop="status" v-slot="{ row }">
        {{
          row.lang_list
            .map((res: any) => {
              //@ts-ignore
              return optoionLans.filter((item) => item?.value == res)[0]?.label;
            })
            .toString()
        }}
      </el-table-column>
      <el-table-column label="排序" prop="sort" width="60"></el-table-column>
      <el-table-column label="操作" prop="create_time" v-slot="{ row }">
        <el-button v-has="`system:page:edit`" type="primary" @click="actionEditPage(row)">编辑</el-button>
        <el-popconfirm title="确认删除吗?" @confirm="actionDelPage(row.id)">
          <template #reference>
            <el-button v-has="`system:page:delete`" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </el-table-column>
    </template>
  </f-table>

  <el-dialog
    v-model="ifCreateFormShow"
    title="单页"
    width="960"
    class="!rounded-2xl custom-dialog"
    @close="hideForm"
    destroy-on-close
  >
    <div px-16>
      <el-tabs
        type="card"
        :model-value="ruleForm.lang"
        @tab-change="changeLangs"
      >
        <el-tab-pane
          :label="lang.label"
          :name="lang.value"
          v-for="lang in optoionLans"
        ></el-tab-pane>
      </el-tabs>

      <el-form
        v-loading="LOADING"
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        status-icon
      >
        <el-form-item label="ID" label-width="100" v-if="ruleForm.id">
          <el-input v-model="ruleForm.id" disabled />
        </el-form-item>
        <el-form-item label="标题" label-width="100" prop="title">
          <el-input
            v-model="ruleForm.title"
            autocomplete="off"
            placeholder="请输入"
          />
        </el-form-item>

        <el-form-item label="类型" label-width="100">
          <el-select v-model="ruleForm.type" placeholder="请选择单页类型">
            <el-option
              :label="signPage.dict_label"
              :value="signPage.dict_value"
              v-for="signPage in typePages"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="100">
          <el-select v-model="ruleForm.status" placeholder="选择单页状态">
            <el-option
              :label="item.dict_label"
              :value="item.dict_value"
              v-for="item in typesOption"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" label-width="100">
          <el-input
            v-model="ruleForm.sort"
            autocomplete="off"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          label="内容"
          overflow-hidden
          label-width="100"
          prop="content"
        >
          <div class="b-1 border-color-gray-200 rd-1">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              mode="simple"
            />
            <Editor
              style="height: 400px; overflow: hidden"
              v-model="ruleForm.content"
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
        <el-button @click="hideForm">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
:deep(.w-e-text-container) {
  img {
    max-width: 100%;
  }

  video {
    max-width: 100%;
  }
}
</style>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { ref, reactive, onBeforeUnmount, shallowRef, onMounted } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { ElMessage, ElLoading } from "element-plus";
import {
  getPagesList,
  createPage,
  editPages,
  getPagesDetail,
  delPages,
  getLangs,
} from "@/api/system/signpage";
import { pagesClassify } from "@/interface/searchMap";
import { dictMap } from "../../../utils/dict";
import { uploadFileApi } from "@/api/file";

onMounted(async () => {
  await getLangsForSelect();
});

const optoionLans = ref([]);
const currentLang = ref("");
const LOADING = ref<boolean>(false);
//获取语言信息
const getLangsForSelect = () => {
  getLangs()
    .then((res) => {
      optoionLans.value = res;
      currentLang.value = res.filter((item) => item.is_default == 1)[0].value;
    })
    .catch((err) => {});
};

//富文本
const editorRef = shallowRef();
const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    // 配置上传服务器地址
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

const handleCreated = (editor: any) => {
  editorRef.value = editor;
};
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

// 枚举字典
const typesOption = dictMap["启用/禁用"];
const typePages = dictMap["单页类型"];
//创建表单
const ifCreateFormShow = ref(false);
const showCreateForm = () => {
  ruleForm.id = "";
  ruleForm.title = "";
  ruleForm.content = "";
  ruleForm.sort = "1";
  ruleForm.lang = currentLang.value;
  ifCreateFormShow.value = true;
};
interface RuleForm {
  id: string;
  title: string;
  type: string;
  content: string;
  status: string;
  sort: string;
  lang: string;
}
const pageOrigin = ref();
//表单
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  id: "",
  title: "",
  type: "",
  content: "",
  status: "1",
  sort: "1",
  lang: "",
});
ruleForm.type = typePages[0].dict_value;

//验证
const rules = reactive<FormRules<RuleForm>>({
  title: [{ required: true, message: "请输入标题信息", trigger: "blur" }],
  content: [{ required: true, message: "请输入单页内容", trigger: "blur" }],
});

//表单验证
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (ruleForm.id === "") {
        createPage(ruleForm)
          .then((res) => {
            ElMessage.success("操作成功");
            hideForm();
            pageOrigin.value.refreshTrigger();
          })
          .catch((err) => {});
      } else {
        editPages(ruleForm)
          .then((res) => {
            ElMessage.success("修改成功");
            hideForm();
            pageOrigin.value.refreshTrigger();
          })
          .catch((err) => {
            ElMessage.error("修改失败");
          });
      }
    } else {
      ElMessage.error("请按要求填写信息");
    }
  });
};
//重制表单
const hideForm = () => {
  Object.keys(ruleForm).forEach((key) => (ruleForm[key] = undefined));
  ifCreateFormShow.value = false;
};

//编辑表单
const actionEditPage = (row: any) => {
  LOADING.value = true;
  getLangView(row.id, currentLang.value);
  ifCreateFormShow.value = true;
};

//删除操作
const actionDelPage = (id: any) => {
  delPages(id)
    .then((res) => {
      ElMessage.success("删除成功！");
      pageOrigin.value.refreshTrigger();
    })
    .catch((err) => {
      ElMessage.error("删除失败！");
    });
};
//切换语言
const changeLangs = async (lang: any) => {
	ruleForm.lang = lang;
  if (ruleForm.id) {
    const loading = ElLoading.service({
      lock: true,
      text: "Loading",
      background: "rgba(0, 0, 0, 0)",
    });
    await getLangView(ruleForm.id, ruleForm.lang);
    loading.close();
  }
};

const getLangView = (id: string, lang: string) => {
  getPagesDetail(id, lang)
    .then((res) => {
      Object.keys(ruleForm).forEach((key) => {
        //@ts-ignore
        ruleForm[key] = res[key];
        ruleForm[`status`] = res[`status`].toString();
      });
      LOADING.value = false;
    })
    .catch((err) => {
      LOADING.value = false;
      ElMessage.error("获取失败，请重试");
    });
};
</script>
