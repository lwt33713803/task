<template>
  <el-dialog v-model="SHOW_FLAG" width="40%" class="!rounded-2xl custom-dialog" :title="title">
    <template #title>{{ title }}
      <TitleTooltip :content="CONTENT" />
    </template>
    <div class="crated-form">
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <fmsFormItem label="审批人:">
          <fmsInput v-model="form.username" disabled />
        </fmsFormItem>
        <fmsFormItem label="审批类型:">
          <fmsInput v-model="form.type" disabled />
        </fmsFormItem>
        <fmsFormItem label="审批内容:">
          <ContentDesc :content="contentData" :type="contentType" />
        </fmsFormItem>
        <fmsFormItem label="审批状态:" prop="audit_status">
          <el-radio-group v-model="form.audit_status">
            <el-radio :label="1">同意</el-radio>
            <el-radio :label="0">拒绝</el-radio>
          </el-radio-group>
        </fmsFormItem>
        <fmsFormItem v-if="form.audit_status &&
          form.type === '提现审批' &&
          last_node
          " label="转账方式:">
          <el-select v-model="form.trans_type_value" placeholder="请选择">
            <el-option v-for="item in transOpt" :label="item.name" :value="item.value" />
          </el-select>
        </fmsFormItem>
        <fmsFormItem label="备注:">
          <fmsInput v-model="form.remark" type="textarea" placeholder="请输入备注" />
        </fmsFormItem>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirmChange(formRef as any)">确 定</el-button>
        <el-button @click="closeChange">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { subApproval, getTrans } from "@/api/payment/approval";
import type { FormInstance } from "element-plus";
import ContentDesc from "./ContentDesc.vue";
const emit = defineEmits(["update"]);
const SHOW_FLAG = ref<boolean>(false);
const CONTENT: Ref<string> = ref(`<span>提示信息：<br />
      提现最后一个审核节点通过时，需要选择支付通道为用户打款；</span>`)
const title = ref<string>("审核");
const formRef = ref<FormInstance>();
const btnFlag = ref<boolean>(false);
const form = reactive<any>({
  id: undefined,
  username: "",
  type: undefined,
  content: undefined,
  audit_status: undefined,
  remark: "",
  trans_type_value: undefined,
  trans_type_name: undefined,
});
const transOpt = ref<any[]>([]);
const last_node = ref<boolean>(false);

let contentData = ref<string | undefined>("");
const contentType = ref("");
const rules = reactive({
  audit_status: [{ required: true, trigger: "change", message: "请选择" }],
});

const confirmChange = async (done: () => void) => {
  await formRef?.value?.validate((valid, fields) => {
    if (!valid) return;
    handleSubApproval(form);
  });
};

const closeChange = () => {
  SHOW_FLAG.value = false;
  btnFlag.value = false;
  Object.keys(form).forEach((key) => (form[key] = undefined));
};

const show = (item = {}) => {
  console.log("item", item);
  getTransOpts();
  const {
    audit_flow,
    remark,
    audit_status,
    audit_status_name,
    id,
    username,
    relation_data: relation_desc,
    trans_type_value,
    is_last_node,
  }: any = item;
  form.username = username;
  form.id = id;
  form.type = audit_flow.type_name;
  form.trans_type_value = trans_type_value;
  form.remark = remark;
  contentData.value = encodeURIComponent(JSON.stringify(relation_desc));
  contentType.value = audit_flow.type;
  last_node.value = is_last_node;
  if (audit_status_name === "待审核" || audit_status_name === "审核中") {
    form.audit_status = 0;
    btnFlag.value = true;
  } else {
    form.audit_status = audit_status === "pass" ? 1 : 0;
    btnFlag.value = false;
  }
  SHOW_FLAG.value = true;
};

const handleSubApproval = (form: any) => {
  let audit_status = form.audit_status === 1 ? "pass" : "reject";
  const { id, remark, trans_type_value }: any = form;
  subApproval({ audit_status, id, remark, trans_type_value }).then((res) => {
    if (res.code === 1) {
      ElMessage.success("审核成功");
    }
    closeChange();
    emit("update");
  });
};

const getTransOpts = async () => {
  transOpt.value = (await getTrans()) as any;
};

defineExpose({
  show,
});
</script>

<style scoped lang="scss">
.el-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

:deep(.el-form-item__content) {
  width: 70%;
}

:deep(.el-form-item__label) {
  text-align: right !important;
  margin-bottom: 0 !important;
  margin-right: 1rem;
  width: 18%;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
