

<script setup lang="ts">
import blockLable from "@/components/block/Label.vue";
import anyForm from "./components/form.vue";
import {
  getAccountList,
  deletegood,
  editGood,
  createGood,
  changeGoodStatus,
} from "@/api/goods/index";
const props = defineProps({
  formData: {
    type: Object,
    default: null,
  },
});
const pageOrigin = ref(null);

const filterId = (item: any) => {
  return item?.id;
};
// const formData = ref(props.formData)
const { selectedItems, handleSelectionChange } = useTableSelection(filterId);
const { onDelete, onMessageBoxDelete } = useTableDelete(deletegood, {
  details: "确认删除选中项目",
  type: "error",
});
const searchArr = [
  {
    scheme: "username",
    type: "input",
    title: "账号",
    value: props.formData.username,
  },
];
onMounted(() => {
  pageOrigin.value.refreshTrigger();
});
</script>

<template>
  <Elorigin v-if="formData" format ref="pageOrigin" :systemRecordloader="getAccountList" :smartFilter="[...searchArr]">
    <template #default="attrs">
      <el-table TableConfig @selection-change="handleSelectionChange" v-loading="!attrs.dataMatchCursor"
        v-bind="{ ...$attrs, ...TableConfig }" :data="attrs.recordBoxList" highlight-current-row
        row-class-name="row-class" header-cell-class-name="!py-5 text-[#333333] font-[500]">
        <el-table-column type="selection" />
        <fms-colunm :label="$t('table.id')" prop="id" sortable></fms-colunm>
        <el-table-column :label="`账号`" prop="goods_name" v-slot="{ row }">
          {{ row.member.username }}
        </el-table-column>
        <fms-colunm :label="`可提现金额`" prop="before_balance" type="tag"></fms-colunm>
        <el-table-column :label="`冻结金额`" prop="before_freeze"></el-table-column>
        <el-table-column label="账变金额" prop="amount" sortable></el-table-column>
        <fms-colunm label="账变类型" prop="trade_type"> </fms-colunm>
        <el-table-column :label="$t('good.byname')" prop="create_by"></el-table-column>
        <el-table-column :label="$t('good.bytime')" prop="update_time" sortable></el-table-column>
        <el-table-column label="备注" prop="remark" sortable> </el-table-column>
      </el-table>
    </template>
  </Elorigin>
</template>
