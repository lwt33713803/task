<script setup lang="ts">
import { getBannerList, setBanner, editBanner } from "@/api/system/banner";
import { useArrayMap } from "@vueuse/core";
import ElPageOrigin from "@/components/Elgroup/Elorigin/index.vue";
import { useTableSelection } from "@/hooks/useTableSelect";
import { useTableDelete } from "@/hooks/useTableDelete";
import { formatDate } from "@/utils/filterDate";
import type { FormInstance } from "element-plus";
import { resetObject } from "@/utils/reset";
const { selectedItems, handleSelectionChange } = useTableSelection();
// const { onDelete, onMessageBoxDelete } = (deletegoodsClassfiy, { details: '确认删除选中项目', type: 'error' })
const dialogVisible: Ref<boolean> = ref(false);
const imgPath: Ref<string> = ref("");
const ruleFormRef = ref<FormInstance>();
const pageOrigin = ref<FormInstance | any>();
const dialogTitle: Ref<string> = ref("创建");
const createGoods = () => { };
const dialogForm = reactive({
  id: undefined,
  sort: "",
  url: "",
  status: 0,
  img: "",
});
const dialogRules = reactive({
  sort: [{ required: true, trigger: "blur", message: "请输入排序" }],
  url: [{ required: true, trigger: "blur", message: "请输入跳转链接" }],
  img: [{ required: true, trigger: "blur", message: "请上传图片" }],
});
const handleUpInfo = (info: any) => {
  imgPath.value = info.path;
};
const handleConfirm = async (formEl: FormInstance | undefined) => {
  console.log(formEl);
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (!valid) return;
    const { sort, url, status, id } = dialogForm;
    const image = imgPath.value;
    dialogTitle.value === "创建"
      ? handleSetBanner({ sort, url, status, image })
      : handleEditBanner({ id, sort, url, status, image });
  });
};
const handleSetBanner = (params: any) => {
  setBanner(params).then((res: any) => {
    closeChange();
    ElMessage.success(`操作成功`);
    pageOrigin.value.refreshTrigger();
  });
};

const closeChange = () => {
  resetObject(dialogForm);
  imgPath.value = "";
  dialogVisible.value = false;
};

const handleEdit = (row: any | undefined) => {
  dialogTitle.value = "编辑";
  dialogVisible.value = true;
  const { sort, image_url, image, status, url } = row;
  dialogForm.id = row.id;
  dialogForm.sort = sort.toString();
  dialogForm.url = url;
  dialogForm.status = status;
  dialogForm.img = image_url;
  imgPath.value = image;
};
const handleEditBanner = (params: any) => {
  editBanner(params).then((res: any) => {
    closeChange();
    ElMessage.success(`修改成功`);
    pageOrigin.value.refreshTrigger();
  });
};
</script>

<template>
  <el-page-origin ref="pageOrigin" :system-recordloader="getBannerList">
    <template #header-action-append-button-gourp="{ refreshTrigger }">
      <el-button type="primary" @click="dialogVisible = true">创 建</el-button>
      <el-button type="danger" @click="refreshTrigger">批量删除</el-button>
    </template>
    <template #default="attrs">
      <el-table TableConfig v-loading="!attrs.dataMatchCursor" v-bind="{ ...$attrs, ...TableConfig }" border
        :data="attrs.recordBoxList" highlight-current-row row-class-name="row-class"
        header-cell-class-name="!py-5 text-[#333333] font-[500]" :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }">
        <el-table-column v-slot="{ $index }" label="编号" width="80">
          {{ $index + 1 }}
        </el-table-column>
        <el-table-column v-slot="{ row }" label="图片" prop="image_url">
          <el-image style="width: 100px; height: 100px" :src="row.image_url" fit="fill" />
        </el-table-column>
        <el-table-column label="排序" prop="sort" sortable></el-table-column>
        <el-table-column label="语言" prop="lang_list" />
        <el-table-column v-slot="{ row }" label="分类状态" prop="status">
          {{ row.status === 0 ? "开启" : "关闭" }}
        </el-table-column>
        <el-table-column label="跳转地址" prop="url" />
        <el-table-column v-slot="{ row }" label="创建时间" sortable>
          {{ formatDate(row.create_time) }}
        </el-table-column>
        <el-table-column v-slot="{ row }" fixed="right" label="操作" #="{ attrs }" width="180">
          <el-button type="primary" @click="handleEdit(row)">编 辑</el-button>
          <el-button type="danger" @click="
            onMessageBoxDelete(row.id, () => {
              attrs.refreshTrigger();
            })
            ">删 除</el-button>
        </el-table-column>
      </el-table>
    </template>
  </el-page-origin>

  <!-- create Dialog -->
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%">
    <div class="crated-form">
      <el-form ref="ruleFormRef" :model="dialogForm" :rules="dialogRules" label-position="top">
        <fmsFormItem label="排序:" prop="sort">
          <fmsInput v-model="dialogForm.sort" placeholder="请输入策略名称" />
        </fmsFormItem>
        <fmsFormItem label="跳转:" prop="url">
          <fmsInput v-model="dialogForm.url" placeholder="请输入跳转的链接地址" />
        </fmsFormItem>
        <fmsFormItem label="状态:">
          <el-radio-group v-model="dialogForm.status">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </fmsFormItem>
        <fmsFormItem label="图片:" prop="img">
          <SingleUpload v-model="dialogForm.img" @up-info="handleUpInfo"></SingleUpload>
        </fmsFormItem>
      </el-form>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeChange">取 消</el-button>
        <el-button type="primary" @click="handleConfirm(ruleFormRef)">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

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
</style>
