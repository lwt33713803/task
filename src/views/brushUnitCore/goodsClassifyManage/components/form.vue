
<template>
  <el-form ref="ruleFormRef" label-width="80px" label-position="left" :model="goodsForm" :rules="rules">
    <el-form-item label="分类名称" prop="category_name">
      <fms-input v-model="goodsForm.category_name" placeholder="请输入分类名称" />
    </el-form-item>
    <el-form-item label="分类图片" prop="category_pic">
      <single-upload v-model="goodsForm.category_pic"></single-upload>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <fms-input-number v-model="goodsForm.sort"></fms-input-number>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-switch :inactive-value="0" :active-value="1" v-model="goodsForm.status"></el-switch>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { inject, ref, watch, reactive } from "vue";
import type { goodsNameType } from "./classify";
enum statusEnum {
  show = 1,
  hide,
}
const statusMap: Readonly<Record<statusEnum, any>> = {
  [statusEnum.show]: "开启",
  [statusEnum.hide]: "关闭",
};
const rules = reactive({
  category_name: [
    { required: true, message: "请输入分类名称", trigger: "blur" },
  ],
  category_pic: [
    { required: true, message: "请上传分类图片", trigger: "change" },
  ],
  sort: [{ required: true, message: "请输入序号", trigger: "blur" }],
});

const goodsForm = inject("goodsForm") as goodsNameType;
const ruleFormRef = inject("ruleFormRef") as FormInstance;
</script>
