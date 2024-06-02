
<template>
  <goodsSelectModel @save="insetFormChange"></goodsSelectModel>
  <el-collapse v-model="activeOrderIndex">
    <div>
      <div class="flex flex-col align-center">
        <el-form :disabled="!cardItem?.parent_id" v-for="(cardItem, index) in goodsForm.rows" :key="index" class="flex-2"
          :inline="true" ref="ruleFormRef" label-position="left" :model="cardItem" :rules="rules">
          <el-collapse-item :name="index" class="relative my-6" v-loading="activeCardIndex == index">
            <template #title>
              <h3>第{{ index + 1 }}单</h3>
              <span v-if="cardItem.goods_info?.length > 0">任务总金额 : {{ cardItem.goods_info.reduce((sum, item) => sum +
                parseFloat(item?.price), 0).toFixed(2)
              }}</span>
              <el-tag class="mx-2" v-show="cardItem?.parent_id" type="danger">{{
                $t("userConfig.insetorder")
              }}</el-tag>
              <div class="flex justify-end">
                <el-tag class="mx-2" @click.stop="insetConfig(cardItem.id, index)" v-if="!cardItem?.parent_id">{{
                  $t("userConfig.insetconfig") }}</el-tag>
              </div>
            </template>

            <div class="flex">
              <el-form-item :label="$t('userConfig.mode')" prop="mode_type">
                <fms-select @change="(e) => numberChangeInput(e, cardItem)" size="small" v-model="cardItem.mode_type"
                  :options="goodsForm?.brush_mode_type" :key-name="'dict_label'" :val-name="'dict_value'" />
              </el-form-item>
              <el-form-item :label="$t('userConfig.matemode')" prop="balance_search_type">
                <fms-select @change="(e) => moneyChangeInput(e, cardItem)" size="small"
                  v-model="cardItem.balance_search_type" :options="goodsForm?.balance_search_type"
                  :key-name="'dict_label'" :val-name="'dict_value'" />
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
                  <el-input @input="(e) => goodsChangeInput(e, cardItem)" :min="0" size="small"
                    v-model="cardItem.balance_search_value" v-if="cardItem.mode_type == 'overlay'"
                    placeholder="请输入匹配模式值,以小数点隔开" />
                  <fms-input-number @input="(e) => goodsChangeInput(e, cardItem)" style="width: 100% !important;" v-else
                    :min="0" v-model="cardItem.balance_search_value" placeholder="请输入匹配模式值"></fms-input-number>
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
              <div class="mr-3" v-for="(goodsItem, goodIndex) in cardItem?.goods_info" :key="goodIndex">
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

            <div class="float-right m-3">
              <!-- <el-button type="primary" @click="copyItem(cardItem)">复制方案</el-button> -->
              <el-button type="danger" plain size="small" @click="deleteItem(index)"
                v-if="cardItem?.parent_id">删除</el-button>
            </div>
          </el-collapse-item>
        </el-form>
      </div>
    </div>
  </el-collapse>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { inject, ref, watch, reactive } from "vue";
import type { goodsNameType } from "./classify";
import { cloneDeep } from "lodash";

import {
  getmemberConfigGoods,
  setAppendMemberConfig,
} from "@/api/user/userAdmin";
import to from "await-to-js";
import useDetail from "@/hooks/useDetail";
import goodsModel from "./insetConfigToForm.vue";
const props = defineProps({
  formData: {
    type: Object,
    default: null,
  },
});
const goodsForm = ref(props.formData);
const activeIndex = ref(-1);
const activeCardIndex = ref(-1);
const activeGoodsIndexArr = ref(-1);
const activeArrIndex = ref(-1);
const currentGoods = ref({});
const deleteItem = (index: number) => {
  goodsForm.value.rows.splice(index, 1);
};
const activeOrderIndex = ref([]);
const goodsSelectModel = useDetail(currentGoods, goodsModel, "用户配置", true);

const getValue = () => {
  return goodsForm;
};

const ruleFormRef = ref(null);
const fetchLoading = ref(false); //loading 后续会改成hook

const rules = reactive({
  balance_search_value: [
    { required: true, message: "未填必填项", trigger: "blur" },
  ],
  commission_settle_type: [
    { required: true, message: "请选择佣金结算模式", trigger: "blur" },
  ],
  commission_settle_value: [
    { required: true, message: "请输入佣金结算值", trigger: "blur" },
  ],
});

const openGoodModel = (
  item: any,
  index: number,
  childrenItem: any,
  goodsIndex: number
) => {
  if (!item?.parent_id) return message.error("不可修改非打针单");
  currentGoods.value = {
    member_id: goodsForm.value.memberId,
    balance_search_type: item.balance_search_type,
    balance_search_value: item.balance_search_value,
    is_replace: 1,
    order_num: item.order_num ?? 1,
    items: childrenItem,
    goods_index: goodsIndex
  };
  activeGoodsIndexArr.value = goodsIndex;
  activeArrIndex.value = index;
  goodsSelectModel.open({}, false);

  // insetConfigForm.onSaveChange({}, false)
};

const emptyGoodsIndexes = ref(null);
const createGoods = async (
  item: any,
  index: number,
  isReplace: 0 | 1 = 0,
  order_num = 1
) => {
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
  console.log(item.goods_info, "goods_info");

  fetchLoading.value = false;
};
const goodsChangeInput = (e: any, item: any) => {
  item.goods_info = [];
};

const moneyChangeInput = (e: any, item: any) => {
  item.goods_info = [];
  item.balance_search_value = 0;
};
const numberChangeInput = (e: any, item: any) => {
  item.order_num = 1;
  item.goods_info = [];
};
const { rows, ...arg } = goodsForm.value;
console.log(arg, "arg");
const insetFrom = ref({
  mode_type: arg.brush_mode_type[0].dict_value,
  balance_search_type: arg.balance_search_type[0].dict_value,
  parent_id: null,
});
const modelForm = ref({
  insetFrom: insetFrom,
  other: arg,
});

const insetConfig = async (id: string, index: number, isSave?: false) => {
  activeOrderIndex.value = Array.from(new Set(activeOrderIndex.value));
  submitForm().then(async (res) => {
    let isAllValid = true;
    for (const [index, item] of ruleFormRef.value.entries()) {
      await new Promise((resolve) => {
        item.validate((valid: any) => {
          if (!valid) {
            console.log("error");
            activeOrderIndex.value.push(index);
            isAllValid = false;
          }
          resolve();
        });
      });
    }
    if (isAllValid) {
      activeIndex.value = index;
      goodsForm.value.rows.splice(activeIndex.value + 1, 0, {
        mode_type: arg.brush_mode_type[0].dict_value,
        balance_search_type: arg.balance_search_type[0].dict_value,
        parent_id: id,
        order_num: 1,
      });
    }
  });

  // insetConfigForm.onSaveChange({}, false)
};

const submitForm = (): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    activeOrderIndex.value = Array.from(new Set(activeOrderIndex.value));
    let isAllValid = true;
    for (const [index, item] of ruleFormRef.value.entries()) {
      await item.validate((isValid: any) => {
        if (!isValid) {
          console.log("error");
          isAllValid = false;
          activeOrderIndex.value.push(index);
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
      message.error(
        `${emptyGoodsIndexes.value.map((s) => `第${s + 1}条未生成商品`)}`
      );
    } else {
      resolve(true); // 校验成功
    }
  });
};
defineExpose({ getValue, formRef: ruleFormRef, submitForm });

const insetFormChange = async (form: any, cb: any) => {
  console.log(form.value, "value");
  console.log(goodsForm.value.rows[form.value.goodIndex.goodIndex]);
  goodsForm.value.rows[activeArrIndex.value].goods_info[
    activeGoodsIndexArr.value
  ] = form.value;
  cb(true);
  message.success("替换成功");
  // const [err, data] = await to(setAppendMemberConfig(goodsForm.value.memberId, JSON.stringify(form.value.insetForm)))
};
</script>
