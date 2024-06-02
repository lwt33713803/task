<template>
  <f-table
    ref="pageOrigin"
    :systemRecordloader="getRolesList"
    :smartFilter="[
      rulesClssify.number,
      rulesClssify.quantity,
      rulesClssify.status,
    ]"
  >
    <template
      #header-action-append-button-gourp="{
        refreshTrigger,
        refreshTriggerAllParmas,
      }"
    >
      <el-button
        v-has="`system:role:create`"
        type="primary"
        @click="openCreateForm"
        >创建</el-button
      >
    </template>
    <template #default="attrs">
      <el-table-column type="selection" />
      <el-table-column label="编号" prop="id" sortable></el-table-column>
      <el-table-column label="权重" prop="sort" sortAble></el-table-column>
      <el-table-column label="角色名称" prop="name"></el-table-column>
      <el-table-column
        v-slot="{ row }"
        v-has="`system:role:status`"
        label="状态"
        prop="status"
      >
        <el-switch
          v-model="row.status"
          active-value="1"
          inactive-value="0"
          @change="actionEditRoleState(row)"
        />
      </el-table-column>
      <el-table-column label="备注" prop="description"></el-table-column>
      <el-table-column label="操作时间" prop="update_time" v-slot="{ row }">
        <el-text class="mx-1" size="large">{{
          useDateFormat(row.update_time, "YYYY-MM-DD HH:mm:ss").value
        }}</el-text>
      </el-table-column>
      <el-table-column
        v-slot="{ row }"
        fixed="right"
        width="200"
        label="操作"
        #="{ attrs }"
      >
        <el-button
          v-has="`system:role:accredit`"
          type="primary"
          @click="openEditForm(row)"
          >授权</el-button
        >
        <el-button
          v-has="`system:role:delete`"
          type="danger"
          @click="
            onMessageBoxDelete(row.id, (res:any) => {
							console.log('res',res)
              attrs.refreshTrigger();
            })
          "
          >删除</el-button
        >
      </el-table-column>
    </template>
  </f-table>

  <el-dialog
    v-model="ifShowRoleForm"
    title="角色管理"
    class="!rounded-2xl custom-dialog"
    width="50%"
    destroy-on-close
  >
    <div class="grid grid-cols-2 gap-10">
      <div>
        <el-form ref="refFormDialog" :model="roleForm" label-width="120px">
          <el-form-item label="角色ID" prop="role_id">
            <el-input v-model="roleForm.id" placeholder="请输入" disabled />
          </el-form-item>

          <el-form-item label="角色名称" prop="role_name">
            <el-input v-model="roleForm.name" placeholder="请输入" />
          </el-form-item>

          <el-form-item label="权重" prop="role_quantity">
            <el-input
              v-model="roleForm.sort"
              type="number"
              min="1"
              placeholder="请输入"
            />
          </el-form-item>

          <el-form-item label="状态" prop="role_state">
            <el-switch
              v-model="roleForm.status"
              size="large"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>

          <el-form-item label="备注信息" prop="role_bak">
            <el-input
              type="textarea"
              placeholder="请输入"
              rows="6"
              v-model="roleForm.description"
            />
          </el-form-item>
        </el-form>
      </div>
      <el-tree
        ref="treeRef"
        :data="data"
        show-checkbox
        node-key="id"
        accordion
        :props="defaultProps"
        :default-checked-keys="checkedNodes"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="ifShowRoleForm = false">取消</el-button>
        <el-button type="primary" @click="submitForm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDateFormat } from "@vueuse/core";
import { useTableDelete } from "@/hooks/useTableDelete";
import { rulesClssify } from "@/interface/searchMap";
import {
  getAllNode,
  createRoles,
  getRoleDetail,
  editRoles,
  delRole,
  editRoleState,
  getRolesList,
} from "@/api/system/roles";
import { ElMessage } from "element-plus";
//@ts-ignore
const { onMessageBoxDelete } = useTableDelete(delRole, {
  details: "确认删除该角色？",
  type: "warning",
	hide:'hide'
});

const pageOrigin = ref();
onMounted(() => {
  getAllNodes();
});
//mounted
const NodeList = ref([]);
const getAllNodes = () => {
  getAllNode()
    .then((res) => {
      console.log(`res`, res);
      data.value = res as any;
    })
    .catch((err) => {});
};

//状态管理
const actionEditRoleState = (row: any) => {
  editRoleState(row.id, row.status)
    .then((res) => {
      ElMessage.success("修改成功");
    })
    .catch((err) => {
      ElMessage.error("修改失败");
    });
};

//创建弹窗
const ifShowRoleForm = ref(false);

const checkedNodes = ref([]);

const roleForm = ref({
  id: "",
  name: "",
  sort: 1,
  description: "",
  status: 1,
  node_ids: "",
});

const hideDialog = () => {
  ifShowRoleForm.value = false;
};
const refFormDialog = ref();

//;
const resetForms = () => {
  checkedNodes.value = [];
  roleForm.value.id = "";
  roleForm.value.name = "";
  roleForm.value.sort = 1;
  roleForm.value.description = "";
  roleForm.value.status = 1;
  // nextTick(()=>{
  // 	refFormDialog.value.resetFiles();
  // })
};

const openCreateForm = () => {
  ifShowRoleForm.value = true;
  resetForms();
};
const openEditForm = (item: any) => {
  checkedNodes.value = [];
  getRoleDetail(item.id).then((res) => {
    checkedNodes.value = res.node_ids;
    roleForm.value.id = res.id;
    roleForm.value.name = res.name;
    roleForm.value.sort = res.sort;
    roleForm.value.description = res.name;
    roleForm.value.status = res.status;
  });
  ifShowRoleForm.value = true;
};
//tree控件
const defaultProps = {
  children: "children",
  label: "name",
};
const data = ref([]);
const treeRef = ref();

const submitForm = () => {
  if (roleForm.value.name === "") {
    ElMessage.error("请输入角色名称");
    return false;
  }
  let nodes = treeRef.value!.getCheckedKeys(false).join(",");
  if (nodes.length <= 0) {
    ElMessage.error("请选择权限节点");
    return false;
  }
  roleForm.value.node_ids = nodes;

  if (roleForm.value.id) {
    editRoles(roleForm.value)
      .then((res) => {
        ElMessage.success("修改成功");
        hideDialog();
        pageOrigin.value.refreshTrigger();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    createRoles(roleForm.value)
      .then((res) => {
        if (res.code === 1) {
          ElMessage.success("操作成功");
          hideDialog();
          pageOrigin.value.refreshTrigger();
        } else {
          ElMessage.error("创建失败");
        }
      })
      .catch((err) => {
        ElMessage.error("创建失败");
      });
  }
};
</script>
<style lang="scss">
.order-sn {
  white-space: nowrap;
}

.goods-name {
  width: 200px;
  height: 64px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
}
</style>
