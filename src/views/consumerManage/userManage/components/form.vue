<!--
 * @Author: lvy lvy
 * @Date: 2023-06-27 19:55:13
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-06-30 16:10:22
 * @FilePath: /shop-backend-ele/src/views/brushUnitCore/goodsClassifyManage/components/form.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-form
    ref="ruleFormRef"
    label-width="80px"
    label-position="left"
    :model="goodsForm"
    :rules="rules"
  >
    <el-form-item label="商品名称" prop="goods_name">
      <el-input v-model="goodsForm.goods_name" placeholder="请输入商品名称" />
    </el-form-item>
    <el-form-item label="商品类型" prop="category_id">
      <el-input v-model="goodsForm.category_id" placeholder="请输入商品名称" />
    </el-form-item>
    <el-form-item label="商品图片" prop="image">
      <single-upload v-model="goodsForm.image"></single-upload>
    </el-form-item>
    <el-form-item label="商品价格" prop="price">
      <el-input-number :min="0" v-model="goodsForm.price"></el-input-number>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input-number :min="0" v-model="goodsForm.sort"></el-input-number>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-switch
        :inactive-value="0"
        :active-value="1"
        v-model="goodsForm.status"
      ></el-switch>
    </el-form-item>
    <el-form-item label="商品介绍" prop="desc">
      <el-input
        autosize
        type="textarea"
        placeholder="请输入商品介绍"
        v-model="goodsForm.desc"
      ></el-input>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { inject, reactive } from "vue";
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
  goods_name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
  image: [{ required: true, message: "请上传图片", trigger: "change" }],
  sort: [{ required: true, message: "请输入序号", trigger: "blur" }],
  status: [{ required: true, message: "请输入序号", trigger: "blur" }],
  price: [{ required: true, message: "请输入价格", trigger: "blur" }],
});

const goodsForm = inject("goodsForm") as goodsNameType;
const ruleFormRef = inject("ruleFormRef") as FormInstance;
</script>
