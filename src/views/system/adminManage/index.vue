

<script setup lang="ts">
import { changeAdminStatus } from "@/api/user/userAdmin";
import { getRolesListAll } from "@/api/role";

const pageOrigin = ref(null);

const filterId = (item: any) => {
  return item?.id;
};

const { selectedItems, handleSelectionChange } = useTableSelection(filterId);

const schema = [
  {
    label: "所属组别",
    type: "select",
    key: "role_id",
    options: {
      action: getRolesListAll,
      nameProperty: "id",
      valueProperty: "name",
    },
    rules: {
      required: true,
    },
  },
  {
    label: "用户名",
    type: "input",
    key: "username",
    rules: {
      required: true,
    },
  },
  {
    label: "昵称",
    type: "input",
    key: "realname",
    rules: {
      required: true,
    },
  },
  {
    label: "手机号",
    type: "input",
    key: "mobile",
  },
  {
    label: "邮箱",
    type: "input",
    key: "email",
  },
  {
    label: "密码",
    type: "input",
    key: "password",
    rules: {
      required: true,
    },
  },
  {
    label: "状态",
    type: "radio",
    key: "status",
    rules: {
      required: true,
    },
    options: [
      {
        name: "正常",
        code: "1",
      },
      {
        name: "禁用",
        code: "0",
      },
    ],
  },
];
const schemaEdit = [
  {
    label: "所属组别",
    type: "select",
    key: "role_id",
    options: {
      action: getRolesListAll,
      nameProperty: "id",
      valueProperty: "name",
    },
    rules: {
      required: true,
    },
  },
  {
    label: "用户名",
    type: "input",
    key: "username",
    rules: {
      required: true,
    },
    disabled: true,
  },
  {
    label: "昵称",
    type: "input",
    key: "realname",
    rules: {
      required: true,
    },
  },
  {
    label: "手机号",
    type: "input",
    key: "mobile",
  },
  {
    label: "邮箱",
    type: "input",
    key: "email",
  },
  {
    label: "状态",
    type: "radio",
    key: "status",
    rules: {
      required: true,
    },
    options: [
      {
        name: "正常",
        code: "1",
      },
      {
        name: "禁用",
        code: "0",
      },
    ],
  },
];

//@ts-ignore
const [demoComponent, open] = new useFormDialog(schema, {
  title: "创建用户",
}).getComponentHook();
const [editComponent, openEdit] = new useFormDialog(schemaEdit, {
  title: "编辑用户",
}).getComponentHook();

const { onDelete, onMessageBoxDelete } = useTableDelete(deleteAdmin, {
  details: "确认删除选中项目",
  type: "error",
});
const { onDelete: resetPassword, onMessageBoxDelete: resetPasswordBox } =
  useTableDelete(resetDefaultPassword, {
    details: "确认重置密码",
    type: "error",
  });

//返回函数回调
const reloaderSave = async (form: any, cb: any) => {
  const _formatForm = {
    status: form.status,
    email: form.email,
    realname: form.realname,
    mobile: form.mobile,
    role_id: form.role_id,
    username: form.username,
    id: form.id ?? "",
    password: form.password ?? "",
    repassword: form.password ?? "",
  };
  return (
    (await executeMethods(
      form?.id ? editAdmin : createAdmin,
      { ..._formatForm },
      cb
    )) && pageOrigin.value.refreshTrigger()
  );
  // cb('hide') ('hideloading')
};

//弹窗逻辑
const uploadModel = ref(false);
const searchMap = [
  {
    title: "用户名",
    scheme: "username",
    type: "input",
  },
  {
    title: "昵称",
    scheme: "realname",
    type: "input",
  },
  {
    title: "状态",
    scheme: "status",
    type: "select",
    options: dictMap["启用/禁用"],
  },
  {
    scheme: "role_id",
    title: "所属组别",
    type: "select",
    options: {
      action: getRolesListAll,
      nameProperty: "id",
      valueProperty: "name",
    },
  },
];
</script>

<template>
  <demoComponent @save="reloaderSave"></demoComponent>
  <editComponent @save="reloaderSave"></editComponent>
  <f-table format ref="pageOrigin" :systemRecordloader="getAdminList" :smartFilter="[...searchMap]">
    <template #header-action-append-button-gourp="{
      refreshTrigger,
      getSelection,
      refreshTriggerAllParams,
    }">
      <el-button 
        v-has="`system:admin:create`"
        type="primary" 
        @click="() => open()" >{{
        $t("default.create")
      }}</el-button>
      <el-button 
        v-has="`system:admin:batchDelete`"
        type="danger"
        @click="
          onMessageBoxDelete(
            getSelection()
              .map((i) => i.id)
                .join(','),
                  () => {
                    refreshTriggerAllParams();
                  }
              )">{{ $t("default.deletes") }}</el-button>
    </template>
    <template #default="attrs">
      <el-table-column type="selection" />
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="昵称" prop="realname"></el-table-column>
      <el-table-column label="所属组别" prop="role_name"></el-table-column>
      <el-table-column label="手机号" prop="mobile"></el-table-column>
      <el-table-column label="邮箱" prop="email" width="150"></el-table-column>
      <el-table-column v-slot="{ row }" v-has="`system:admin:status`" label="状态" prop="status" >
        <el-switch inactive-value="0" active-value="1" v-model="row.status" @change="() =>
            changeAdminStatus(row.id, row.status) &&
            message.success('操作成功')
          "></el-switch>
      </el-table-column>
      <el-table-column label="最后登录时间" prop="last_login_time"></el-table-column>

      <el-table-column fixed="right" v-slot="{ row }" width="260" label="操作" #="{ attrs }">
        <el-button v-has="`system:admin:edit`" type="primary" @click="openEdit({ ...row })">{{
          $t("default.edit")
        }}</el-button>
        <el-button
          v-has="`system:admin:delete`"
          type="danger" @click="
          onMessageBoxDelete(row.id, () => {
            attrs.refreshTrigger();
          })
        ">{{ $t("default.delete") }}</el-button>
        <el-button 
          v-has="`system:admin:resetPw`"
          type="danger" @click="
          resetPasswordBox(row.id, () => {
            attrs.refreshTrigger();
          })
          ">重置密码</el-button>
      </el-table-column>
    </template>
  </f-table>
</template>
