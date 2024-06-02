<template>
  <el-dialog v-model="SHOW_FLAG" :title="TITLE" width="40%" class="!rounded-2xl custom-dialog" @close="closeChange">
    <div class="crated-form">
      <el-form ref="form_ref" v-loading="loading" :model="form" :rules="rules">
        <div class="dis-flex">
          <fmsFormItem :label="`${$t('tactics.gender')}:`" prop="level_value" class="flex-1">
            <fmsInput v-model="form.level_value" placeholder="请输入等级(数字)" />
          </fmsFormItem>
          <fmsFormItem :label="`${$t('tactics.level_name')}:`" prop="level_name" class="flex-1">
            <fmsInput v-model="form.level_name" placeholder="请输入等级名称" />
          </fmsFormItem>
        </div>
        <fmsFormItem :label="`${$t('icon')}:`" prop="icon" class="flex-1">
          <SingleUpload v-model="form.icon_path" @up-info="iconUpData" />
        </fmsFormItem>
        <fmsFormItem :label="`${$t('image')}:`" prop="image" class="flex-1">
          <el-radio-group v-model="form.image">
            <el-radio v-for="item in IMAGES_OPTS" :key="item" :label="item" :value="item" size="large"
              style="width: 90px; height: 90px; border-radius: 50%">
              <el-image style="width: 80px; height: 80px; border-radius: 50%" :src="item" fit="fill" />
            </el-radio>
          </el-radio-group>
        </fmsFormItem>
        <fmsFormItem :label="`${$t('Gender.dividend')}:`" prop="commission_method">
          <el-checkbox-group v-model="form.commission_method">
            <el-checkbox label="recharge">{{ $t('Gender.recharge') }}</el-checkbox>
            <el-checkbox label="consume">{{ $t('Gender.consume') }}</el-checkbox>
            <el-checkbox label="commission">{{ $t('Gender.commission') }}</el-checkbox>
          </el-checkbox-group>
        </fmsFormItem>
        <fmsFormItem :label="`${$t('tactics.matching_mode')}:`"  prop="balance_search_type" class="dis-flex">
          <fms-select v-model="form.balance_search_type" :placeholder="$t('tactics.mode_hint')" :options="dictMap.余额匹配模式"
            :key-name="'dict_label'" :val-name="'dict_value'" class="pad-r-2" />
          <fmsInput v-model="form.balance_search_value" :placeholder="$t('tactics._hint')" style="width: 120px; margin-left: 1rem"
            :disabled="!form.balance_search_type" />
        </fmsFormItem>
        <fmsFormItem :label="`${$t('Gender.settle_money_methods')}:`"  prop="commission_settle_type" class="dis-flex">
          <fms-select v-model="form.commission_settle_type" :placeholder="$t('Gender.settle_money_methods_hint')" :options="dictMap.佣金结算方式"
            :key-name="'dict_label'" :val-name="'dict_value'" class="fpad-r-2" />
          <fmsInput v-model="form.commission_settle_value" :placeholder="$t('tactics._hint')"  style="width: 120px; margin-left: 1rem"
            :disabled="!form.commission_settle_type" />
        </fmsFormItem>
        <div class="dis-flex">
          <fmsFormItem :label="`${$t('Gender.day_money_num')}:`"  prop="day_cash_num">
            <fms-input-number v-model="form.day_cash_num" :min="0" style="width: 130px" />
          </fmsFormItem>
          <fmsFormItem :label="`${$t('Gender.month_money_num')}:`"  prop="month_cash_num">
            <fms-input-number v-model="form.month_cash_num" :min="0" style="width: 130px" />
          </fmsFormItem>
          <fmsFormItem :label="`${$t('Gender.day_task_num')}:`" prop="day_task_num">
            <fms-input-number v-model="form.day_task_num" :min="0" style="width: 130px" />
          </fmsFormItem>
        </div>

        <fmsFormItem :label="`${$t('Gender.goods_class')}:`" prop="goods_category_ids">
          <el-select-v2 v-model="form.goods_category_ids" filterable :options="SHOPPING_TYPES_OPTS" placeholder="请选择"
            style="width: 100%" multiple />
        </fmsFormItem>
        <fmsFormItem :label="`${$t('Gender.achieve_methods')}:`" prop="select_type">
          <fms-select v-model="form.select_type" :options="MODE_OPTS" :key-name="'name'" :val-name="'type'" />
        </fmsFormItem>
        <!-- 达成方式-child -->
        <child-form ref="child_form_ref" :status="form.select_type" />
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeChange">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="handleConfirm(form_ref)">{{ $t('confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { createGrade, editGrade, getImgs, getGrade } from "@/api/system/grade";
import { getGoodsCategoryList } from "@/api/goods/index";
import { resetObject } from "@/utils/reset";
import type { FormInstance } from "element-plus";
import ChildForm from "./ChildForm.vue";
import { number } from "echarts";
const emit = defineEmits(["update"]);
const SHOW_FLAG = ref<boolean>(false);
const TITLE: Ref<string> = ref("创建");
const IMAGES_OPTS = ref<any[]>([]);
const SHOPPING_TYPES_OPTS = ref<any[]>([]);
const MODE_OPTS = [
  {
    type: "",
    name: "请选择",
  },
  {
    type: "auto",
    name: "自升级类",
  },
  {
    type: "buy",
    name: "购买类",
  },
];
const form_ref = ref<FormInstance>();
const child_form_ref = ref<FormInstance>();
const loading = ref<boolean>(false);

const form = reactive<any>({
  id: undefined,
  level_value: undefined,
  level_name: "",
  icon: "",
  icon_path: undefined,
  image: "",
  commission_method: undefined,
  balance_search_type: undefined,
  balance_search_value: undefined,
  commission_settle_type: undefined,
  commission_settle_value: undefined,
  day_cash_num: undefined,
  month_cash_num: undefined,
  day_task_num: undefined,
  goods_category_ids: [], // 商品类型
  select_type: "", // 达成方式：buy | auto
  reach_method: {
    select_type: "",
    buy: {},
    auto: {},
  },
});

const rules = reactive({
  level_value: [{ required: true, trigger: "blur", message: "请输入" }],
  level_name: [{ required: true, trigger: "blur", message: "请输入" }],
  icon: [{ required: true, trigger: "change", message: "请选择" }],
  image: [{ required: true, trigger: "change", message: "请选择" }],
  commission_method: [{ required: true, trigger: "change", message: "请选择" }],
  balance_search_type: [
    { required: true, trigger: "change", message: "请选择" },
  ],
  commission_settle_type: [
    { required: true, trigger: "change", message: "请选择" },
  ],
  day_cash_num: [{ required: true, trigger: "blur", message: "请输入" }],
  month_cash_num: [{ required: true, trigger: "blur", message: "请输入" }],
  day_task_num: [{ required: true, trigger: "blur", message: "请输入" }],
  select_type: [{ required: true, trigger: "change", message: "请选择" }],
  goods_category_ids: [
    { required: true, trigger: "change", message: "请选择" },
  ],
});

const iconUpData = (info: any) => {
  // 图片上传
  const { path } = info;
  form.icon = path;
};

const handleCreateGrade = (form: any) => {
  createGrade(form)
    .then(() => {
      ElMessage.success(`操作成功`);
      loading.value = false;
      emit("update");
      closeChange();
    })
    .catch(() => (loading.value = false));
};

const handleEditGrade = (form: any) => {
  editGrade(form)
    .then(() => {
      ElMessage.success(`修改成功`);
      loading.value = false;
      emit("update");
      closeChange();
    })
    .catch(() => (loading.value = false));
};

const handleConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (!valid) return;
    renderData(TITLE.value, form);
  });
};

const renderData = async (type: string, form: any) => {
  const { select_type, goods_category_ids, reach_method }: any = form;
  const { auto, buy }: any = child_form_ref.value;
  if (select_type === "buy") {
    form.reach_method.select_type = "buy";
    form.reach_method.buy = buy;
  } else if (select_type === "auto") {
    form.reach_method.select_type = "auto";
    form.reach_method.auto = auto;
  }
  form.reach_method = JSON.stringify(reach_method);
  form.goods_category_ids = goods_category_ids.join(",");
  form.commission_method = form.commission_method.join(",");
  form.category_rows = JSON.stringify(form.category_rows);
  loading.value = true;
  console.log("form", form.goods_category_ids);
  type === "创建" ? handleCreateGrade(form) : handleEditGrade(form);
};

const show = async (item: any = {}) => {
  TITLE.value = "创建";
  console.log(`item===========>`, item);
  if (item.id) {
    handleGetGrade(item.id);
    TITLE.value = "编辑";
  }
  SHOW_FLAG.value = true;
  handleGetImgs();
  handleGetGoodsCategoryList();
};

const handleGetImgs = () => {
  loading.value = true;
  getImgs().then((data: any) => {
    IMAGES_OPTS.value = data;
    loading.value = false;
  });
};

const handleGetGrade = async (id: number) => {
  const data = await getGrade(id);
  console.log(data);
  Object.keys(form).forEach((key) => {
    form[key] = data[key];
    form[`icon_path`] = data[`icon_domain`];
    form[`image`] = data[`image_domain`];
    form[`select_type`] = data[`reach_method_select_type`];
    form[`commission_method`] = data[`commission_method`].split(",");
    form[`goods_category_ids`] = data[`goods_category_ids`]
      .split(",")
      .map(Number);
    const type = data.reach_method_select_type;
    Object.keys(data.reach_method[type]).forEach(
      (c_key) =>
        (child_form_ref.value[type][c_key] = data.reach_method[type][c_key])
    );
  });
};

const handleGetGoodsCategoryList = () => {
  getGoodsCategoryList({ all: 1 }).then((data) => {
    SHOPPING_TYPES_OPTS.value = data.map((item: any) => {
      return {
        label: item.category_name,
        value: item.id,
      };
    });
  });
};

const closeChange = () => {
  SHOW_FLAG.value = false;
  form_ref.value.resetFields();
  resetObject(form);
  resetObject(child_form_ref.value.buy);
  resetObject(child_form_ref.value.auto);
  form.reach_method = {
    select_type: "",
    buy: {},
    auto: {},
  };
};

defineExpose({
  show,
});
</script>

<style scoped lang="scss">
:deep(.el-tag.el-tag--info) {
  color: #2467e5;
}

.dis-flex {
  display: flex;
  align-items: center;
}

.flex-1 {
  flex: 1;
}

.pad-r-2 {
  padding-right: 2rem;
}
</style>
