
<template>
  <f-table
    ref="pageOrigin"
    :systemRecordloader="getCountryList"
    :smartFilter="[...searchMap]"
  >
    <template
      #header-action-append-button-gourp="{
        refreshTrigger,
        refreshTriggerAllParmas,
      }"
    >
    </template>
    <template #default="attrs">
      <el-table-column type="selection" />
      <el-table-column label="编号" prop="id" sortable></el-table-column>
      <fms-colunm type="image" label="图标" prop="icon"></fms-colunm>
      <el-table-column label="国家名称" prop="name" sortAble></el-table-column>
      <el-table-column label="中文名称" prop="zh_name"></el-table-column>
      <el-table-column label="语言代码" prop="lang_code"></el-table-column>
      <el-table-column label="手机号前缀" prop="area_code"></el-table-column>
      <el-table-column label="国家代码" prop="country_code"></el-table-column>
      <el-table-column label="货币代码" prop="currency_code"></el-table-column>
      <el-table-column
        label="货币符号"
        prop="currency_symbol"
      ></el-table-column>
      <el-table-column
        label="兑换美元汇率"
        prop="exchange_rate"
      ></el-table-column>
      <el-table-column v-slot="{ row }" v-has="`system:country:status`" label="状态" prop="status" >
        <el-switch
          :inactive-value="0"
          :active-value="1"
          v-model="row.status"
          @change="
            async () => {
              await setCountryEdit(row);
              message.success('操作成功');
            }
          "
        ></el-switch>
      </el-table-column>
      <el-table-column v-slot="{ row }" v-has="`system:country:isDefault`"  label="是否默认" prop="is_default" >
        <el-switch
          v-model="row.is_default"
          :inactive-value="0"
          :active-value="1"
          @change="
            async () => {
              await setCountryDefault(row);
              message.success('操作成功');
              attrs.refreshTrigger();
            }
          "
        ></el-switch>
      </el-table-column>
    </template>
  </f-table>
</template>
<script setup lang="ts">
import ElPageOrigin from "@/components/Elgroup/Elorigin/index.vue";
import { getRolesList, actionRoleDelete } from "@/api/role/index";
import { useDateFormat } from "@vueuse/core";
import { useTableDelete } from "@/hooks/useTableDelete";
import { rulesClssify } from "@/interface/searchMap";
import { Refresh } from "@element-plus/icons-vue";

const searchMap = [
  {
    title: "国家名称",
    scheme: "name",
    type: "input",
  },
  {
    title: "语言代码",
    scheme: "lang_code",
    type: "input",
  },
  {
    title: "手机号前缀",
    scheme: "area_code",
    type: "input",
  },
  {
    title: "状态",
    scheme: "status",
    type: "select",
    options: dictMap["启用/禁用"],
  },
];
//@ts-ignore
const { onMessageBoxDelete } = useTableDelete(actionRoleDelete, {
  details: "确认删除该角色？",
  type: "warning",
});
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
