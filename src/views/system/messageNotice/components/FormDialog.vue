<template>
  <el-dialog v-model="SHOW_FLAG" :title="TITLE" width="40%" class="!rounded-2xl custom-dialog" @close="closeChange">
    <div class="crated-form">
      <el-form ref="form_ref" v-loading="LOADING" :model="form" :rules="rules" label-position="right">
        <div style="display: flex; align-items: center">
          <fms-form-item label="消息名称:" prop="title">
            <fms-input v-model="form.title" placeholder="请输入消息名称" />
          </fms-form-item>
          <fms-form-item label="消息类型:" prop="type">
            <fms-select v-model="form.type" placeholder="请选择消息类型" :options="dictMap.消息分类" :key-name="'dict_label'"
              :val-name="'dict_value'" />
          </fms-form-item>
        </div>
        <fms-form-item label="消息内容:" prop="content">
          <fms-textarea v-model="form.content" placeholder="请输入消息内容" />
        </fms-form-item>
        <fms-form-item label="发送时间:" prop="send_time">
          <fms-picker-date v-model="form.send_time" :picker-type="pickerTypeEnum.datetime" />
        </fms-form-item>
        <fms-form-item label="接收人:" prop="receive_id">
          <el-tag v-for="user in user_opt" :key="user.id" class="mx-1 _mouse" :disable-transitions="false"
            @click="user_select_ref.show(user_opt)">
            {{ user.nickname }}
          </el-tag>
          <el-button v-if="!user_opt.length" class="button-new-tag ml-1" size="small"
            @click="user_select_ref.show(user_opt)">添 加</el-button>
        </fms-form-item>
        <fms-form-item label="接收代理:" prop="receive_id">
          <el-tag v-for="agency in agency_opt" :key="agency.id" class="mx-1 _mouse" :disable-transitions="false"
            @click="agency_select_ref.show(agency_opt)">
            {{ agency.username }}
          </el-tag>
          <el-button v-if="!agency_opt.length" class="button-new-tag ml-1" size="small"
            @click="agency_select_ref.show(agency_opt)">添 加</el-button>
        </fms-form-item>
        <fms-form-item label="状态:" prop="status">
          <el-switch v-model="form.status" :inactive-value="0" :active-value="1" />
        </fms-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeChange">取 消</el-button>
        <el-button :disabled="BTN_FLAG" type="primary" @click="handleConfirm(form_ref)">确 定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- user Dialog-->
  <user-select ref="user_select_ref" @up-users="upUsers" @del="upUsers" />
  <!--  Dialog-->
  <agency-select ref="agency_select_ref" @up-agency="upAgency" @del="upAgency" />
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { pickerTypeEnum } from "@/components/fms-pickers/fms-picker-date.vue";
import userSelect from "./userSelect.vue";
import AgencySelect from "./AgencySelect.vue";
import { setNotice, editNotice } from "@/api/system/notice";

const emit = defineEmits(["upData"]);
const SHOW_FLAG = ref<boolean>(false);
const LOADING = ref<boolean>(false);
const BTN_FLAG = ref<boolean>(false);
const TITLE = ref<string>("创建");
const user_select_ref = ref(); // user-select
const agency_select_ref = ref(); // agency-select
const form_ref = ref<FormInstance>();
const user_opt = ref<any>([]);
const agency_opt = ref<any>([]);
const form = reactive<any>({
  id: undefined,
  title: "",
  type: undefined,
  content: "",
  send_time: 0,
  receive_id: [],
  agent_ids: [],
  status: 0,
});
const rules = reactive({
  title: [{ required: true, trigger: "blur", message: "请输入消息类型" }],
  type: [{ required: true, trigger: "change", message: "请选择类型" }],
  content: [{ required: true, trigger: "blur", message: "请输入消息内容" }],
  send_time: [{ required: true, trigger: "change", message: "请选择发送时间" }],
  status: [{ required: true, trigger: "change", message: "请选择状态" }],
});

const upUsers = (result: any) => {
  user_opt.value = result;
};

const upAgency = (result: any) => {
  agency_opt.value = result;
};

const handleConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (!valid) return;
    if (user_opt.value.length === 0 && agency_opt.value.length === 0)
      return ElMessage.warning(`接收人和接收代理不能同时为空`);
    // if () return ElMessage.warning(`请添加代理`);
    LOADING.value = true;
    BTN_FLAG.value = true;
    renderData();
  });
};

const renderData = () => {
  let user_arr: any[];
  let agency_arr: any[];
  const { send_time } = form;
  user_arr = user_opt.value.map((item: { id: number }) => item.id);
  agency_arr = agency_opt.value.map((item: { id: number }) => item.id);
  form[`receive_id`] = JSON.stringify(user_arr);
  form[`agent_ids`] = JSON.stringify(agency_arr);
  form[`send_time`] = Math.round(send_time / 1000);
  TITLE.value === "创建" ? handleSetNotice(form) : handleEditNotice(form);
};
const handleSetNotice = (form: any) => {
  const { title, type, content, send_time, receive_id, agent_ids, status } =
    form;
  setNotice({
    title,
    type,
    content,
    send_time,
    receive_id,
    agent_ids,
    status,
    annex: "",
  })
    .then((res: any) => {
      closeChange();
      ElMessage.success(`操作成功`);
      emit("upData");
    })
    .catch(() => {
      closeChange();
    });
};
const handleEditNotice = (form: any) => {
  editNotice({ annex: "", ...form })
    .then((res: any) => {
      closeChange();
      ElMessage.success(`修改成功`);
      emit("upData");
    })
    .catch(() => {
      closeChange();
    });
};

const show = (item = <any>{}) => {
  SHOW_FLAG.value = true;
  TITLE.value = "创建";
  if (item.id) {
    console.log(`item`, item);
    TITLE.value = "编辑";
    Object.keys(form).forEach((key: any) => {
      form[key] = item[key];
      form[`send_time`] = Math.round(item[`send_time`] * 1000);
      user_opt.value = item[`receives`];
      agency_opt.value = item[`agents`];
    });
    console.log(`form`, form);
  }
};

const closeChange = () => {
  form_ref?.value?.resetFields();
  form_ref?.value?.clearValidate();
  SHOW_FLAG.value = false;
  LOADING.value = false;
  BTN_FLAG.value = false;
  user_opt.value = [];
  agency_opt.value = [];
  resetObject(form);
};

defineExpose({
  show,
});
</script>

<style scoped lang="scss">
:deep(.el-input__wrapper) {
  width: 100% !important;
  max-width: 100% !important;
}

._mouse {
  cursor: pointer;
}
</style>
