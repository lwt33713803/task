<script setup lang="ts">
import blockLable from "@/components/block/Label.vue";
import anyForm from "./components/form.vue";
import upload from "./components/upload.vue";
import {
  getBrushGoodsList,
  deletegood,
  editGood,
  createGood,
  changeGoodStatus,
} from "@/api/goods/index";
import { getGoodsCategoryListAll } from "@/api/user/userAdmin";

const pageOrigin = ref(null);

const filterId = (item: any) => {
  return item?.id;
};
const selectedItems = ref([]);
const setSelection = (e: any) => {
  selectedItems.value = [[]];
  console.log(selectedItems.value, "selectedItems");
};
const schema = [
  {
    label: "商品名称",
    type: "input",
    key: "goods_name",
    rules: {
      required: true,
    },
  },
  {
    label: "商品类型",
    type: "select",
    key: "category_id",
    rules: {
      required: true,
    },
    options: {
      action: getGoodsCategoryListAll,
      nameProperty: "id",
      valueProperty: "category_name",
    },
  },
  {
    label: "商品图片",
    type: "upload",
    key: "image",
    rules: {
      required: true,
    },
  },
  {
    label: "商品价格",
    type: "input-number",
    key: "price",
    rules: {
      required: true,
    },
  },
  {
    label: "排序",
    type: "input-number",
    key: "sort",
    rules: {
      required: true,
    },
  },
  {
    label: "状态",
    type: "switch",
    key: "status",
    rules: {
      required: true,
    },
  },
  {
    label: "商品介绍",
    type: "input",
    key: "desc",
    rules: {
      required: true,
    },
  },
];

//@ts-ignore
const [demoComponent, open] = new useFormDialog(schema, {
  title: "创建商品",
}).getComponentHook();
const [editComponent, openEdit] = new useFormDialog(schema, {
  title: "编辑商品",
}).getComponentHook();
const [uploadComponent, openUpload] = new useFormDialog(upload, {
  title: "导入数据",
  isForm: false,
  isloading: false,
  isFooter: false,
}).getComponentHook();

const { onDelete, onMessageBoxDelete } = useTableDelete(deletegood, {
  details: "确认删除选中项目",
  type: "error",
});

//返回函数回调
const reloaderSave = async (form: any, cb: any) => {
  return (
    (await executeMethods(form?.id ? editGood : createGood, form, cb)) &&
    pageOrigin.value.refreshTrigger()
  );
  // cb('hide') ('hideloading')
};

//弹窗逻辑
const uploadModel = ref(false);
const uploadStatus = ref(false);
const onClose = () => {
  uploadStatus.value = false;
  pageOrigin.value.refreshTrigger();
};
</script>

<template>
  <demoComponent @save="reloaderSave"></demoComponent>
  <editComponent @save="reloaderSave"></editComponent>
  <ELprodialog v-model="uploadStatus" :footer="false">
    <upload @close="uploadStatus = false" @onUploadClose="onClose"></upload>
  </ELprodialog>
  <uploadComponent></uploadComponent>
  <f-table format ref="pageOrigin" :systemRecordloader="getBrushGoodsList" :smartFilter="[
    smartFilterGoodsId,
    {
      title: '商品类型',
      scheme: 'category_id',
      placeholder: '请选择商品类型',
      type: 'select',
      options: {
        action: getGoodsCategoryListAll,
        nameProperty: 'id',
        valueProperty: 'category_name',
      },
    },
    {
      title: '商品最小价格',
      scheme: 'min_price',
      type: 'input',
    },
    {
      title: '商品最大价格',
      scheme: 'max_price',
      type: 'input',
    },
    smartFilterGoodsName,
    smartFilterGoodsStatus,
    {
      title: '操作时间',
      scheme: 'update_time',
      type: 'date',
    },
  ]">
    <template #header-action-append-button-gourp="{
      refreshTrigger,
      refreshTriggerAllParams,
      getSelection,
    }">
      <el-button v-has="`goods:index:create`" @click="() => open()" type="primary">{{
        $t("default.create")
      }}</el-button>
      <el-button v-has="`goods:index:import`" @click="uploadStatus = true" type="primary">导入数据</el-button>

      <el-button 
        v-has="`goods:index:batchDelete`" @click="
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
      <el-table-column type="selection" />
      <fms-colunm :label="$t('table.id')" prop="id" sortable></fms-colunm>
      <fms-colunm :label="$t('good.goodname')" prop="goods_name" />
      <fms-colunm :label="$t('good.goodimage')" prop="image" type="image"></fms-colunm>
      <fms-colunm :label="$t('good.goodtype')" prop="category_name" type="tag"></fms-colunm>
      <el-table-column :label="$t('good.goodprice')" prop="price" sortable></el-table-column>
      <el-table-column v-slot="{ row }" :label="$t('good.goodstatus')" prop="status" >
        <el-switch 
          v-has="`goods:index:status`" :inactive-value="0" :active-value="1" v-model="row.status" @change="() =>
          changeGoodStatus(row.id, row.status) &&
          message.success('操作成功')
          "></el-switch>
      </el-table-column>
      <fms-colunm :label="$t('good.byname')" prop="create_by" type="tag"></fms-colunm>
      <el-table-column :label="$t('good.bytime')" prop="update_time" sortable>
      </el-table-column>
      <el-table-column v-slot="{ row }" fixed="right"  width="240" label="操作" #="{ attrs }">
        <el-button v-has="`goods:index:edit`" type="primary" @click="openEdit(row)">{{
          $t("default.edit")
        }}</el-button>
        <el-button 
          v-has="`goods:index:delete`" type="danger" @click="
          onMessageBoxDelete(row.id, () => {
            attrs.refreshTrigger();
          })
          ">{{ $t("default.delete") }}</el-button>
      </el-table-column>
    </template>
  </f-table>
</template>
