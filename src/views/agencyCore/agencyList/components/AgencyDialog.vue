<template>
  <el-dialog v-model="SHOW_FLAG" :title="TITLE" width="35%"   class="!rounded-2xl custom-dialog" @close="close">
    <el-form
      ref="form_ref"
      v-loading="LOADING"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item :label="$t(`agency.agency_group`)" prop="group_name">
        <el-input v-model="form.group_name" :placeholder="$t(`placeholder_input`) + $t(`agency.agency_group`)" />
      </el-form-item>
      <el-form-item :label="$t(`sort`)" prop="sort">
        <el-input v-model="form.sort" :placeholder="$t(`placeholder_input`) + $t(`sort`)" />
      </el-form-item>
      <!-- <el-form-item label="国家" prop="country_id">
        <fms-select v-model="form.country_id" placeholder="请选择国家" :options="COUNTRY_OPT" :key-name="'name'"
          :val-name="'id'" class="pad-r-2" />
      </el-form-item> -->
      <el-form-item :label="$t(`status`)" prop="status">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="SHOW_FLAG = false">{{ $t(`default.cancel`) }}</el-button>
        <el-button
          type="primary"
          :disabled="LOADING"
          @click="handleConfirm(form_ref)"
          >{{ $t(`default.ok`) }}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { editAgencyGroupList, setAgencyGroupList } from "@/api/agency/index";
import { FormInstance } from "element-plus";
const emit = defineEmits(["upData"]);
const form_ref = ref<FormInstance>();
const SHOW_FLAG = ref<boolean>(false);
const LOADING = ref<boolean>(false);
const COUNTRY_OPT = ref<any[]>([]);
const TITLE = ref<string>("创建代理组");

const rules = reactive({
  group_name: [
    { required: true, message: "请输入", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  sort: [{ required: true, message: "请输入", trigger: "blur" }],
  // country_id: [{ required: true, message: '请选择', trigger: 'change', },],
  status: [{ required: true, message: "请选择", trigger: "change" }],
});

const form = reactive<any>({
  id: "",
  group_name: undefined,
  sort: undefined,
  // country_id: undefined,  // 国家
  status: undefined,
});

function close() {
  form_ref.value?.resetFields();
  Object.keys(form).forEach((key: any) => (form[key] = undefined));
  LOADING.value = false;
  SHOW_FLAG.value = false;
}

const show = (item = {}) => {
  console.log(`item`, item);
  TITLE.value = "创建代理组";
  // handleCountryList()
  SHOW_FLAG.value = true;
  if (item.group_name) {
    TITLE.value = "编辑代理组";
    Object.keys(form).forEach((key) => (form[key] = item[key]));
  }
};

const handleConfirm = async (done: () => void) => {
  await form_ref.value?.validate((valid) => {
    if (!valid) return;
    const { id, group_name, sort, status } = form;
    LOADING.value = true;
    TITLE.value === "创建代理组"
      ? handleCreate({ group_name, sort, status })
      : handleEdit({ id, group_name, sort, status });
  });
};

const handleCreate = (form = {}) => {
  setAgencyGroupList(form)
    .then((data) => {
      emit("upData");
      ElMessage.success("添加成功");
      LOADING.value = false;
      close();
    })
    .catch((err) => {
      ElMessage.success("添加失败");
      close();
    });
};

const handleEdit = (form = {}) => {
  editAgencyGroupList(form)
    .then((data) => {
      emit("upData");
      ElMessage.success("修改成功");
      LOADING.value = false;
      close();
    })
    .catch((err) => {
      ElMessage.success("修改失败");
      close();
    });
};

const handleCountryList = () => {
  LOADING.value = true;
  getCountryList().then(({ data }) => {
    COUNTRY_OPT.value = data;
    LOADING.value = false;
  });
};

defineExpose({
  show,
});
</script>
