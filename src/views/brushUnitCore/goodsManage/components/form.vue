
<template>
  <el-form ref="ruleFormRef" label-width="80px" label-position="left" :model="goodsForm" :rules="rules">
    <el-form-item label="商品名称" prop="goods_name">
      <fms-input v-model="goodsForm.goods_name" placeholder="请输入商品名称" />
    </el-form-item>
    <el-form-item label="商品类型" prop="category_id">
      <fms-input v-model="goodsForm.category_id" placeholder="请输入商品名称" />
    </el-form-item>
    <el-form-item label="商品图片" prop="image">
      <single-upload v-model="goodsForm.image"></single-upload>
    </el-form-item>
    <el-form-item label="商品价格" prop="price">
      <fms-input-number v-model="goodsForm.price"></fms-input-number>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <fms-input-number v-model="goodsForm.sort"></fms-input-number>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-switch :inactive-value="0" :active-value="1" v-model="goodsForm.status"></el-switch>
    </el-form-item>
    <el-form-item label="商品介绍" prop="desc">
      <fms-input autosize type="textarea" placeholder="请输入商品介绍" v-model="goodsForm.desc"></fms-input>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import Xform from "@/components/Elgroup/ELproform/index.vue";
import type { FormInstance, FormRules } from "element-plus";
import { inject, ref, watch, reactive } from "vue";
const schema = [
  {
    label: "文本",
    type: "input",
    key: "test",
    rules: {
      required: true,
    },
  },
  {
    label: "上传",
    type: "upload",
    key: "image",
    rules: {
      required: true,
    },
  },
  {
    label: "select",
    type: "select",
    key: "select",
    options: [
      { dict_name: "1", dict_value: "2" },
      { dict_name: "1", dict_value: "2" },
      { dict_name: "1", dict_value: "2" },
      { dict_name: "1", dict_value: "2" },
      { dict_name: "1", dict_value: "2" },
    ],
  },
  {
    label: "select",
    type: "select",
    key: "select",
    options: {
      action: getBankListAll,
      nameProperty: "name",
      valueProperty: "code",
    },
  },
];

const props = defineProps({
  formData: {
    type: Object,
    default: null,
  },
  ruleFormRef: {
    type: Object,
    default: null,
  },
});

const rules = reactive({
  goods_name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
  image: [{ required: true, message: "请上传图片", trigger: "change" }],
  sort: [{ required: true, message: "请输入序号", trigger: "blur" }],
  status: [{ required: true, message: "请选择状态", trigger: "blur" }],
  price: [{ required: true, message: "请输入价格", trigger: "blur" }],
});

const goodsForm = reactive(props.formData);
const ruleFormRef = reactive(props.ruleFormRef);

defineExpose({
  form: goodsForm,
  formRef: ruleFormRef,
});
</script>
