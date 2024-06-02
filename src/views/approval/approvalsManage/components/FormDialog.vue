<template>
  <el-dialog v-model="SHOW_FLAG" :title="TITLE" width="40%" class="!rounded-2xl custom-dialog">
    <template #title>{{ TITLE }}
      <TitleTooltip :content="CONTENT" />
    </template>
    <div class="crated-form">
      <el-form ref="form_ref" :model="form" v-loading="LOADING" :rules="rules" label-position="right">
        <fmsFormItem label="流程名称:" prop="name">
          <fmsInput v-model="form.name" placeholder="请输入名称" />
        </fmsFormItem>
        <fmsFormItem label="流程类型:" prop="type">
          <fms-select v-model="form.type" placeholder="请选择" :options="dictMap.审批流记录类型" :key-name="'dict_label'"
            :val-name="'dict_value'" class="flex-1 pad-r-2" />
        </fmsFormItem>
        <fmsFormItem>
          <el-table TableConfig :data="form.nodes" style="width: 100%" max-height="250">
            <el-table-column v-slot="{ row }" label="节点名称">
              <fmsInput v-model="row.title" />
            </el-table-column>
            <el-table-column v-slot="{ row }" label="审批人">
              <el-select-v2 v-model="row.approve_admin_id" filterable :options="userOpt" placeholder="请选择"
                style="width: 100%" multiple />
            </el-table-column>
            <el-table-column v-slot="{ row }" label="抄送人">
              <el-select-v2 v-model="row.copyto_admin_id" filterable :options="userOpt" placeholder="请选择"
                style="width: 100%" multiple />
            </el-table-column>
            <el-table-column fixed="right" v-slot="{ $index }" label="操作" #="{ attrs }">
              <el-button type="primary" @click="onDelItem($index)">删 除</el-button>
            </el-table-column>
          </el-table>
          <el-button class="mt-4" style="width: 100%" @click="onAddItem">添加节点</el-button>
        </fmsFormItem>
        <fmsFormItem label="流程状态:" prop="status">
          <el-switch v-model="form.status" inactive-value="0" active-value="1" />
        </fmsFormItem>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirmChange(form_ref)">确 定</el-button>
        <el-button @click="closeChange">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance } from "element-plus";
import {
  createApprovals,
  editApprovals,
  getAdminList,
} from "@/api/payment/approval";
const emit = defineEmits(["update"]);
const LOADING = ref<boolean>(false)
const form_ref = ref<FormInstance>();
const TITLE = ref<string>("创建");
const userOpt = ref<any>([]);
const SHOW_FLAG = ref<boolean>(false);
const CONTENT: Ref<string> = ref(`<span>提示信息：<br />
          审批流管理为审批管理的前置条件；<br />
          审批流管理类型分为充值、提现、实名认证三类；<br />
          用户可根据三种类型创建不同审批节点的审批流，但是每个审批类型有且只能启用一个审批流程；<br />
          提现审批：如没有启用的提现审批流，则用户无法发起提现审批。</span>`)
const form = reactive<any>({
  id: undefined,
  name: "",
  type: undefined,
  nodes: [],
  status: undefined,
});
const rules = reactive({
  name: [{ required: true, trigger: "blur", message: "请输入" }],
  type: [{ required: true, trigger: "change", message: "请选择" }],
  status: [{ required: true, trigger: "change", message: "请选择" }],
});

const onAddItem = () => {
  const child = {
    title: "",
    approve_admin_id: [],
    copyto_admin_id: [],
  };
  form.nodes.push(child);
};

const onDelItem = (index: number) => {
  form.nodes.splice(index, 1);
};

const show = (item: any = {}): void => {
  TITLE.value = "创建";
  SHOW_FLAG.value = true;
  if (item.id) {
    TITLE.value = "编辑";
    Object.keys(form).forEach((key) => {
      form[key] = item[key];
    });
  }
};

const confirmChange = async (done: () => void) => {
  await form_ref.value.validate((valid) => {
    if (!valid) return;
    if (form.nodes.length === 0) return ElMessage.warning("至少添加一条节点!");
    LOADING.value = true;
    TITLE.value === "创建"
      ? handleCreateApprovals(form)
      : handleEditApprovals(form);
  });
};

const handleCreateApprovals = async (form: any) => {
  let { name, nodes, status, type } = form;
  nodes = JSON.stringify(nodes)
  createApprovals({ name, nodes, status, type }).then(({ code }: any) => {
    ElMessage.success("操作成功～")
    emit("update");
    closeChange();
  }).catch(() => {
    LOADING.value = false;
  });
};

const handleEditApprovals = async (form: any) => {
  let { id, name, nodes, status, type } = form;
  nodes = JSON.stringify(nodes)
  editApprovals({ id, name, nodes, status, type }).then(({ code }: any) => {
    ElMessage.success("修改成功～")
    emit("update");
    closeChange();
  }).catch(() => {
    LOADING.value = false;
  });
};

const closeChange = () => {
  form_ref?.value?.clearValidate();
  form_ref?.value?.resetFields();
  SHOW_FLAG.value = false;
  LOADING.value = false;
  resetObject(form)
  console.log("closeChange=》", form.value);
};

onBeforeMount(async () => {
  const list = await getAdminList({ all: 1 });
  console.log("list", list);
  userOpt.value = list.map((item: any) => {
    return {
      value: item.id,
      label: item.username,
    };
  });
});

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

:deep(.el-tag.el-tag--info) {
  color: #2467e5;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
