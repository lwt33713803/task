

<script setup lang="ts">
import {
  getGoodsCategoryListPage,
  changeCategoryGoodStatus,
  deletegoodsClassfiy,
  editGoodsClassfiy,
  createGoodsClassfiy,
} from "@/api/goods/index";
import { useArrayMap } from "@vueuse/core";
import ElPageOrigin from "@/components/Elgroup/Elorigin/index.vue";
import { useTableSelection } from "@/hooks/useTableSelect";
import { useTableDelete } from "@/hooks/useTableDelete";
import { InputStatus, goodsClssify } from "@/interface/searchMap";
import useStudentDetail from "./components/useDetailHook";
import type { goodsNameType } from "./classify";
import to from "await-to-js";
import { ref, watchEffect } from "vue";
const goodForm = ref({
  category_name: undefined,
  category_pic: undefined,
  sort: undefined,
  status: "1",
});
const pageOrigin = ref(null);
const filterId = (item: any) => {
  return item?.id;
};
const { selectedItems, handleSelectionChange } = useTableSelection(filterId);

//@ts-ignore
const createGoodClassifyModel = useStudentDetail(goodForm);

const { onDelete, onMessageBoxDelete } = useTableDelete(deletegoodsClassfiy, {
  details: "确认删除选中项目",
  type: "error",
});
const onModelEdit = async (form: goodsNameType | { id: string }) => {
  goodForm.value = form;
  createGoodClassifyModel.onSaveChange({}, false);
};
const saveGoodsClassify = async (
  callbackForm: goodsNameType & { id: string },
  cb: any
) => {
  const { isTrusted, _vts, ..._ } = callbackForm;
  const [err, data] = await to<any>(
    callbackForm?.id
      ? editGoodsClassfiy({ ..._ })
      : createGoodsClassfiy({ ..._ })
  );
  if (!err) {
    pageOrigin.value.refreshTrigger();
    return ElMessage.success("操作成功") && cb("hide");
  }
};
const schema = [
  {
    label: "分类名称",
    type: "input",
    key: "category_name",
    rules: {
      required: true,
    },
  },
  {
    label: "分类权重",
    type: "input-number",
    key: "sort",
    rules: {
      required: true,
    },
  },
  {
    label: "分类图片",
    type: "upload",
    key: "category_pic",
    rules: {
      required: true,
    },
  },
  {
    label: "分类状态",
    type: "radio",
    key: "status",
    rules: {
      required: true,
    },
    keyStatus: "int",
    options: [
      {
        name: "显示",
        code: 1,
      },
      {
        name: "隐藏",
        code: 0,
      },
    ],
  },
];

const createGoods = async () => {
  goodForm.value = {};
  createGoodClassifyModel.onSaveChange({}, false);
};
const [createComponent, open] = new useFormDialog(schema, {
  title: "创建分类",
}).getComponentHook();
const [editComponent, openEdit] = new useFormDialog(schema, {
  title: "编辑分类",
}).getComponentHook();
const dialogStatus = ref(false);
</script>

<template>
  <!-- <create-good-classify-model @save="saveGoodsClassify" /> -->
  <createComponent @save="saveGoodsClassify"></createComponent>
  <editComponent @save="saveGoodsClassify"></editComponent>
  <f-table ref="pageOrigin" :systemRecordloader="getGoodsCategoryListPage" :smartFilter="[
    goodsClssify.goodsClassifyName,
    InputStatus({ text: '分类状态', target: 'smartFilterGoodsStatus' }),
  ]">
    <template #header-action-append-button-gourp="{
      refreshTrigger,
      refreshTriggerAllParmas,
      getSelection
    }">
      <el-button v-has="`goods:goodsClass:create`" type="primary" @click="open" >{{
        $t("default.create")
      }}</el-button>
      <el-button 
      v-has="`goods:goodsClass:batchDelete`"
      @click="
      onMessageBoxDelete(
        getSelection()
          .map((i) => i.id)
          .join(','),
        () => {
          refreshTrigger();
        }
      )
        " type="danger">{{ $t("default.deletes") }}</el-button>
    </template>
    <template #default="attrs">
      <el-table-column type="selection" width="55" />
      <el-table-column :label="$t('table.id')" prop="id" sortable></el-table-column>
      <el-table-column :label="$t('good.ifyname')" prop="category_name" v-slot="{ row }" sortable>
        {{ row.category_name }}
      </el-table-column>
      <fms-colunm :label="$t('good.ifyimage')" prop="category_pic" sortable type="image"></fms-colunm>
      <el-table-column :label="$t('good.ifywight')" prop="sort" sortable></el-table-column>
      <fms-colunm 
      v-has="`goods:goodsClass:status`"
      @change="(row) => {
        changeCategoryGoodStatus(row.id, row.status);
        message.success('操作成功');
      }
        " :label="$t('good.ifystatus')" prop="status" type="switch" sortable />
      <el-table-column :label="$t('good.byname')" prop="create_by" sortable />
      <el-table-column :label="$t('good.bytime')" prop="update_time" sortable></el-table-column>
      <el-table-column fixed="right" v-slot="{ row }" width="200" label="操作" #="{ attrs }">
        <el-button v-has="`goods:goodsClass:edit`" type="primary" @click="openEdit(row)">{{
          $t("default.edit")
        }}</el-button>
        <el-button 
        v-has="`goods:goodsClass:delete`" type="danger" @click="
        onMessageBoxDelete(row.id, () => {
          message.success('删除成功');
          attrs.refreshTrigger();
        })
          ">{{ $t("default.delete") }}</el-button>
      </el-table-column>
    </template>
  </f-table>
</template>
