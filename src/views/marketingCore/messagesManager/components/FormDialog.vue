<template>
  <!-- form-dialog -->
  <el-dialog v-model="showFlag" :title="title" width="35%" class="!rounded-2xl custom-dialog" @close="closeChange">
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="所属代理：" prop="agent_uid">
        <el-select-v2 v-model="form.agent_uid" filterable :options="userOpt" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="客服名称：" prop="name">
        <el-input v-model="form.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="图标上传：" prop="icon_url">
        <SingleUpload v-model="form.icon_url" @up-info="handleUpInfo"></SingleUpload>
      </el-form-item>
      <el-form-item label="联系电话：" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="跳转链接：" prop="url">
        <el-input v-model="form.url" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-switch v-model="form.status" :inactive-value="0" :active-value="1" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeChange">取 消</el-button>
        <el-button type="primary" @click="handleConfirm(formRef)">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance } from "element-plus";
import { createService, editService } from "@/api/marketing/index";
import { getAgencyList } from "@/api/agency/index";
const formRef = ref<FormInstance>();
const userOpt = ref<any[]>([]);
const showFlag = ref<boolean>(false);
const form = reactive<any>({
  id: undefined,
  url: "",
  icon: "",
  icon_url: "",
  status: 0,
  name: undefined,
  mobile: undefined,
  username: undefined,
  agent_uid: undefined,
});
const rules = reactive<any>({
  name: [{ required: true, trigger: "blur", message: "请输入" }],
  url: [{ required: true, trigger: "blur", message: "请输入" }],
  status: [{ required: true, trigger: "change", message: "请选择" }],
  agent_uid: [{ required: true, trigger: "change", message: "请选择" }],
  icon_url: [{ required: true, trigger: "change", message: "请上传" }],
  mobile: [{ required: true, trigger: "blur", message: "请输入" }],

});
const title = ref<string>("创建");
const loading = ref<boolean>(false);
const emit = defineEmits(["upData"]);

const handleUpInfo = (info: any) => {
  const { path } = info;
  form.icon = path;
};

const closeChange = () => {
  formRef.value.resetFields();
  resetObject(form);
  showFlag.value = false;
};

const show = (item = {}) => {
  console.log('======item=======>', item)
  title.value = "创建";
  handleGetAgencyList();
  if (item.id) {
    title.value = "编辑";
    Object.keys(item).forEach((key) => {
      form[key] = item[key];
    });
    console.log(`form`, form)
  }
  showFlag.value = true;
};

const handleConfirm = async (done: () => void) => {
  await formRef.value.validate((valid, fields) => {
    if (!valid) return;
    refreshList(title.value, form);
  });
};

const refreshList = (change: string, params: any) => {
  const { id, agent_uid, name, icon, url, mobile, status } = params;
  if (change === "创建") {
    createService({ agent_uid, name, icon, url, mobile, status }).then((res: any) => {
      emit("upData");
      ElMessage.success("操作成功");
    });
  } else {
    editService({ id, agent_uid, name, icon, url, mobile, status }).then((res: any) => {
      emit("upData");
      ElMessage.success("编辑成功");
    });
  }
  closeChange();
};

const handleGetAgencyList = async () => {
  loading.value = true;
  getAgencyList({ all: 1 }).then((data) => {
    userOpt.value = data.map((item: any) => {
      return {
        label: item.username,
        value: item.id,
      };
    });
    loading.value = false;
  });
};

defineExpose({
  show,
});
</script>
