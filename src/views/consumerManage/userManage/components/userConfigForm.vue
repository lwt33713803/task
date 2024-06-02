<template>
  <goodsSelectModel @save="insetFormChange"></goodsSelectModel>
  <div class="flex align-center flex-col">
    <div class=" h-80 overflow-y-auto ">
      <el-form class="flex-2 relative my-6" v-for="(cardItem, index) in  goodsForm.rows " :key="index" :inline="true"
        ref="ruleFormRef" label-position="left" :model="cardItem" :rules="rules">
        <el-card>
          <h3>第{{ index + 1 }}单</h3>
          <span v-if="cardItem.goods_info?.length > 0">任务总金额 : {{ cardItem.goods_info.reduce((sum, item) => sum +
            parseFloat(item?.price), 0).toFixed(2)
          }}</span>
          <div class="flex">
            <el-form-item :label="$t('userConfig.mode')" prop="mode_type">
              <fms-select @change="(e) => numberChangeInput(e, cardItem)" size="small" v-model="cardItem.mode_type"
                :options="goodsForm?.brush_mode_type" :key-name="'dict_label'" :val-name="'dict_value'" />
            </el-form-item>
            <el-form-item :label="$t('userConfig.matemode')" prop="balance_search_type">
              <fms-select @change="(e) => moneyChangeInput(e, cardItem)" size="small"
                v-model="cardItem.balance_search_type" :options="goodsForm?.balance_search_type" :key-name="'dict_label'"
                :val-name="'dict_value'" />
            </el-form-item>

          </div>
          <div>
            <el-form-item prop="balance_search_value" class=" w-full">
              <el-alert :closable="false" class="my-2" v-if="cardItem.mode_type == 'overlay'" type="warning"
                :title="cardItem.balance_search_type == 'amount' ? ' 请输入商品匹配金额，以英文“,”隔开 ' : '匹配值小数点保留两位，以英文 “,” 隔开'">
              </el-alert>
              <el-alert :closable="false" class="my-2" type="warning" v-else
                :title="`${cardItem.balance_search_type == 'amount' ? ' 请输入商品匹配金额 ' : '匹配值小数点保留两位'}`">
              </el-alert>
              <div class="my-2 w-full">
                <el-input @input="(e) => goodsChangeInput(e, cardItem)" size="small"
                  v-model="cardItem.balance_search_value" v-if="cardItem.mode_type == 'overlay'"
                  :placeholder="`${cardItem.balance_search_type == 'amount' ? ' 请输入商品匹配金额，以英文“,”隔开 ' : '匹配值小数点保留两位，以英文 “,” 隔开'}`" />
                <fms-input-number @input="(e) => goodsChangeInput(e, cardItem)" style="width: 100% !important;" v-else
                  :min="0" v-model="cardItem.balance_search_value" :precision="2"
                  :placeholder="`${cardItem.balance_search_type == 'amount' ? ' 请输入商品匹配金额 ' : '匹配值小数点保留两位'}`"></fms-input-number>
              </div>
            </el-form-item>
            <!-- <el-alert title="以小数点隔开" type="error" /> -->
          </div>
          <div class="flex">
            <el-form-item :label="$t('userConfig.moneymode')" prop="commission_settle_type">
              <fms-select size="small" v-model="cardItem.commission_settle_type"
                :options="goodsForm?.commission_settle_type" :key-name="'dict_label'" :val-name="'dict_value'" />
            </el-form-item>
            <el-form-item prop="commission_settle_value">
              <fms-input-number :min="0" size="small" v-model="cardItem.commission_settle_value" placeholder="请输入" />
            </el-form-item>
            <el-form-item :label="$t('userConfig.changelevel')" prop="trigger_level_id">
              <fms-select size="small" v-model="cardItem.trigger_level_id" :options="goodsForm?.level"
                key-name="level_name" val-name="id" />
            </el-form-item>
          </div>
          <div class="flex justify-between">
            <el-form-item :label="$t('userConfig.freezeorder')" prop="freeze_order">
              <el-switch :inactive-value="0" :active-value="1" v-model="cardItem.freeze_order"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button @click="createGoods(cardItem, index)"
                :loading="fetchLoading && activeIndex == index">生成商品</el-button>
            </el-form-item>
          </div>
          <div class="flex overflow-x-auto">
            <div class="mr-3" v-for="( goodsItem, goodIndex ) in  cardItem?.goods_info " :key="goodIndex">
              <el-card :body-style="{ padding: '0px' }">
                <el-button type="danger" class="my-2 mx-2 " style="width:90%" plain size="small"
                  @click="openGoodModel(cardItem, index, goodsItem, goodIndex)">替换商品</el-button>
                <div class="flex w-66">
                  <div class="flex-1">
                    <el-image fit="scale-down" class="h-36 w-20" :preview-teleported="true"
                      :preview-src-list="[goodsItem.image]" :src="goodsItem.image"></el-image>
                  </div>
                  <div class="p-2 flex-2 bg-[#e7eaf3b3]">
                    <div class="my-2 font-extrabold mx-2 text-xs">
                      {{ goodsItem.goods_name }}
                    </div>
                    <div class="my-2 font-extrabold mx-2 text-sm">
                      <span class="mx-2 text-warning-deep text-xl">
                        <fms-input-number :min="1" v-model="goodsItem.price" />
                      </span>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </div>

          <div class="float-right my-3">
            <el-button type="success" @click="copyItem(cardItem, 'create')" size="small"
              v-if="index == goodsForm.rows.length - 1">添加方案</el-button>
            <el-button plain size="small" @click="copyItem(cardItem, 'copy')">{{
              $t("userConfig.copyconfig")
            }}</el-button>
            <el-button plain size="small" type="danger" @click="deleteItem(index)">{{ $t("default.delete") + "方案"
            }}</el-button>
          </div>
        </el-card>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { inject, ref, watch, reactive } from "vue";
import type { goodsNameType } from "./classify";
import { cloneDeep } from "lodash";
import goodsModel from "./insetConfigToForm.vue";

import { getmemberConfigGoods } from "@/api/user/userAdmin";
import to from "await-to-js";
const formdemo = ref({});
const rules = ref({
  balance_search_value: [
    { required: true, message: "未填必填项", trigger: "blur" },
  ],
  commission_settle_type: [
    { required: true, message: "请选择佣金结算模式", trigger: "change" },
  ],
  commission_settle_value: [
    { required: true, message: "请输入佣金结算值", trigger: "change" },
  ],
});
const props = defineProps({
  formData: {
    type: Object,
    default: null,
  },
});

const goodsForm = ref(props.formData);
const activeIndex = ref(-1);
const activeCardIndex = ref(-1);

const ruleFormRef = ref(null);
const fetchLoading = ref(false); //loading 后续会改成hook
const cardLoading = ref(false); //loading 后续会改成hook
const activeGoodsIndexArr = ref(-1);
const emptyGoodsIndexes = ref([]);
const activeArrIndex = ref(-1);
const currentGoods = ref({});
const insetFormChange = async (form: any, cb: any) => {
  goodsForm.value.rows[activeArrIndex.value].goods_info[
    activeGoodsIndexArr.value
  ] = form.value;
  cb(true);
  message.success("替换成功");
  // const [err, data] = await to(setAppendMemberConfig(goodsForm.value.memberId, JSON.stringify(form.value.insetForm)))
};
const moneyChangeInput = (e: any, item: any) => {
  item.goods_info = [];
  item.balance_search_value = 0;
};
const goodsSelectModel = useDetail(currentGoods, goodsModel, "用户配置", true);
const createGoods = async (
  item: any,
  index: number,
  isReplace: 0 | 1 = 0,
  order_num = 1
) => {
  if (!item.balance_search_value) return message.success("请输入数值");
  // if (item.mode_type === "overlay" && !item.order_num) return message.success("叠加模式下请输入数量");
  activeIndex.value = index;
  fetchLoading.value = true;
  const [err, data] = await to(
    getmemberConfigGoods({
      member_id: goodsForm.value.memberId,
      balance_search_type: item.balance_search_type,
      balance_search_value: item.balance_search_value,
      is_replace: isReplace,
      order_num: item.order_num ?? 1,
    })
  );

  fetchLoading.value = false;
  if (data?.length == 0) return message.error("暂无匹配商品");
  item.goods_info = data.map((i) => {
    return {
      ...i,
      goodIndex: index,
    };
  });
  fetchLoading.value = false;
};
const openGoodModel = (
  item: any,
  index: number,
  childrenItem: any,
  goodIndex: number
) => {
  currentGoods.value = {
    member_id: goodsForm.value.memberId,
    balance_search_type: item.balance_search_type,
    balance_search_value: item.balance_search_value,
    is_replace: 1,
    order_num: item.order_num ?? 1,
    items: childrenItem,
    goods_index: goodIndex
  };
  activeGoodsIndexArr.value = goodIndex;
  activeArrIndex.value = index;
  goodsSelectModel.open({}, false);

  // insetConfigForm.onSaveChange({}, false)
};
const goodsChangeInput = (e: any, item: any) => {
  item.goods_info = [];
};

const numberChangeInput = (e: any, item: any) => {
  item.order_num = 1;
  item.goods_info = [];
};
const copyItem = async (item: any, type: string) => {
  const _ = cloneDeep(item);
  let isAllValid = true;
  let ordeNumToError = [];
  for (const [index, item] of ruleFormRef.value.entries()) {
    await new Promise((resolve) => {
      item.validate((valid: any) => {
        if (!valid) {
          isAllValid = false;
        }
        resolve();
      });
    });
    emptyGoodsIndexes.value = [];
  }
  for await (const [index, iterator] of goodsForm.value.rows.entries()) {
    if (!iterator.goods_info || iterator.goods_info?.length == 0) {
      // 检查goods_info是否为空
      emptyGoodsIndexes.value.push(index);
      console.log(emptyGoodsIndexes.value, "item.goods_info");
    }
    if (
      iterator.goods_info?.length !== iterator.order_num &&
      iterator.mode_type === "overlay"
    ) {
      // 检查goods_info是否为空
      ordeNumToError.push(index);
    }
  }
  if (isAllValid) {
    if (emptyGoodsIndexes.value?.length != 0) {
      console.log("====>", emptyGoodsIndexes.value);
      return message.error(
        `${emptyGoodsIndexes.value.map((s) => `第${s + 1}条未生成商品`)}`
      );
    }
    // if (ordeNumToError?.length != 0) {
    //   return message.error(
    //     `${ordeNumToError.map(
    //       (s) => `第${s + 1}匹配商品的商品与订单数量不符 \n`
    //     )}`
    //   );
    // }

    goodsForm.value.rows.push(
      type === "copy"
        ? _
        : {
          mode_type: _.mode_type,
          balance_search_type: _.balance_search_type,
        }
    );
  }
};
const deleteItem = (index: number) => {
  activeCardIndex.value = index;
  goodsForm.value.rows.splice(index, 1);
  activeCardIndex.value = -1;
};
const getValue = () => {
  return goodsForm;
};
const submitForm = (): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    let isAllValid = true;
    for (const [index, item] of ruleFormRef.value.entries()) {
      await item.validate((isValid: any) => {
        if (!isValid) {
          console.log("error");
          isAllValid = false;
        }
        if (index === ruleFormRef.value.length - 1) {
          if (isAllValid) {
            resolve(true); // 校验成功
          } else {
            reject(false); // 校验失败
          }
        }
      });
    }

    emptyGoodsIndexes.value = [];
    for (const [index, iterator] of goodsForm.value.rows.entries()) {
      if (!iterator.goods_info || iterator.goods_info.length === 0) {
        emptyGoodsIndexes.value.push(index);
        console.log(emptyGoodsIndexes.value, "item.goods_info");
      }
    }

    if (emptyGoodsIndexes.value.length !== 0) {
      console.log("====>", emptyGoodsIndexes.value);
      reject(false); // 校验失败
      return message.error(
        `${emptyGoodsIndexes.value.map((s) => `第${s + 1}条未生成商品`)}`
      );
    } else {
      resolve(true); // 校验成功
    }
  });
};
defineExpose({ getValue, formRef: ruleFormRef, submitForm });
</script>
<style lang="scss">
.el-form--inline .el-form-item {
  align-items: center;
}



.el-form-item--default {
  margin-right: 14px !important;
}
</style>
