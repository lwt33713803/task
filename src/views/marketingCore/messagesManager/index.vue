<template>
  <f-table 
    ref="pageOrigin" format  
    :systemRecordloader="getServiceList"
    :smartFilter="[messageClassify.messageName, messageClassify.agentName]">
    <template #header-action-append-button-gourp="{
      refreshTrigger,
      refreshTriggerAllParams,
      getSelection,
    }">
      <el-button v-has="`marketing:messages:create`" type="primary" @click="form_dialog_ref.show()">创建</el-button>
      <el-button 
        v-has="`marketing:messages:batchDelete`"
        @click="
        onMessageBoxDelete(
          getSelection()
            .map((i) => i.id)
            .join(','),
          () => {
            refreshTriggerAllParams();
          }
        )
        " type="danger">{{ $t("default.deletes") }}</el-button>
    </template>
    <template #default="attrs">
      <el-table-column type="selection" />
      <fms-colunm :label="$t('table.id')" prop="id" width="120" sortable align="center" />
      <el-table-column v-slot="{ row }" label="所属代理" prop="agent_name">
        <el-tag v-if="row.agent_name">{{ row.agent_name }}</el-tag>
      </el-table-column>
      <el-table-column label="客服名称" prop="name" />
      <el-table-column v-slot="{ row }" label="图标" align="center">
        <el-image style="width: 100px; height: 100px" :src="row.icon_url" fit="fill" :preview-teleported="true"
          :preview-src-list="[row.icon_url]" />
      </el-table-column>
      <el-table-column v-slot="{ row }" label="跳转地址" prop="url">
        <el-link :href="row.url" target="_blank">{{ row.url }}</el-link>
      </el-table-column>
      <el-table-column label="联系方式" prop="mobile" align="center" />
      <el-table-column v-slot="{ row }" label="操作人" prop="admin_name" align="center">
        <el-tag v-if="row.admin_name">{{ row.admin_name }}</el-tag>
      </el-table-column>
      <fms-colunm 
        v-has="`marketing:messages:status`"
        label="状态" prop="status" type="switch" sortable @change="(row) => {
        setStatus(row.id, row.status);
        message.success('操作成功');
      }
        " />
      <el-table-column  width="180" label="操作时间" prop="update_time" align="center" />
      <el-table-column fixed="right" width="180" v-slot="{ row }" label="操作" #="{ attrs }">
        <el-button
          v-has="`marketing:messages:edit`"
          type="primary" @click="editChange(row)">编 辑</el-button>
        <el-button 
          v-has="`marketing:messages:delete`"
          type="danger" @click="
          onMessageBoxDelete(row.id, () => {
            attrs.refreshTrigger();
          })
          ">删 除</el-button>
      </el-table-column>
    </template>
  </f-table>
  <form-dialog ref="form_dialog_ref" @up-data="pageOrigin.refreshTrigger()" />
</template>

<script setup lang="ts">
import FormDialog from "./components/FormDialog.vue";
import { messageClassify } from "@/interface/searchMap";
import { getServiceList, delService, descService, setStatus } from "@/api/marketing/index";
const form_dialog_ref = ref();
const pageOrigin = ref();
const { onDelete, onMessageBoxDelete } = useTableDelete(delService, {
  details: "确认删除选中项目",
  type: "error",
});
const editChange = async (row: any) => {
  const { id } = row;
  const result: any = await descService(id);
  form_dialog_ref.value.show(result);
};
</script>

<style scoped lang="scss">
._mouse {
  cursor: pointer;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}

._url:hover {
  color: #409eff;
  cursor: pointer;
}
</style>
