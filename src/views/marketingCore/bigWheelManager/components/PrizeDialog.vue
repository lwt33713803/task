<!-- 奖品维护 -->
<template>
  <el-dialog v-model="SHOW_FLAG" :title="$t(`activity.prize_title`)" class="!rounded-2xl custom-dialog" width="40%">
    <div class="crated-form">
      <el-form
        ref="form_ref"
        v-loading="LOADING"
        :model="form"
        label-position="right"
      >
        <fmsFormItem :label="`${$t(`activity.sectors_num`)}：`">
          <div class="num-wrap">
            <el-button class="_btn" :disabled="minus_btn" @click="minusChange"
              ><el-icon>
                <Minus /> </el-icon
            ></el-button>
            <el-input v-model="form.sector_num" readonly class="_input" />
            <el-button class="_btn" :disabled="add_btn" @click="addChange"
              ><el-icon>
                <Plus /> </el-icon
            ></el-button>
          </div>
        </fmsFormItem>
        <fmsFormItem v-if="form.child.length > 0">
          <el-collapse v-model="activeNames" accordion>
            <el-collapse-item
              v-for="(item, index) in form.child"
              :key="item"
              :title="`${$t(`activity.sectors_num`) + (index + 1)}`"
              :name="`${index}`"
            >
              <fmsFormItem :label="`${$t(`activity.sectors_bg`)}：`" style="margin: 1rem 0">
                <el-color-picker v-model="form.child[index].background_color" />
              </fmsFormItem>
              <fmsFormItem :label="`${$t(`activity.sectors_f_c`)}：`" style="margin: 1rem 0">
                <el-color-picker v-model="form.child[index].text_color" />
              </fmsFormItem>
              <fmsFormItem :label="`${$t(`activity.prize_rate`)}：`" style="margin: 1rem 0">
                <el-input-number
                  :min="0"
                  v-model="form.child[index].probability"
                />
              </fmsFormItem>
              <fmsFormItem :label="`${$t(`activity.prize_select`)}：`" style="margin: 1rem 0">
                <fms-select 
                  v-if="reward_radio.length > 0" v-model="form.child[index].reward_key" :placeholder="$t(`placeholder_select`)" :options="reward_radio" :key-name="'dict_label'" :val-name="'dict_value'" />
              </fmsFormItem>
              <fmsFormItem
                v-if="form.child[index]?.reward_key && form.child[index]?.reward_key != 'thanks' "
                :label="filterLabel(form.child[index].reward_key)"
              >
                <el-input-number
                  v-if="form.child[index].reward_key === 'integral'"
                  v-model="form.child[index].reward_value"
                  :min="0"
                />
                <el-input-number
                  v-if="form.child[index].reward_key === 'cash'"
                  v-model="form.child[index].reward_value"
                  :min="0"
                />
                <el-select-v2
                  v-if="form.child[index].reward_key === 'coupon'"
                  v-model="form.child[index].reward_value"
                  :options="coupon_options"
                  :label="`name`"
                  :value="`id`"
                  filterable
                  :placeholder="$t(`placeholder_select`)"
                  style="width: 100%"
                  multiple
                />
              </fmsFormItem>
              <fmsFormItem :label="`${$t(`icon`)}`" style="margin: 1rem 0">
                <SingleUpload v-model="form.child[index].icon" />
              </fmsFormItem>
            </el-collapse-item>
          </el-collapse>
        </fmsFormItem>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirmChange(form_ref)"
          >{{ $t(`confirm`) }}</el-button
        >
        <el-button @click="closeChange">{{ $t(`cancel`) }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { getPrize, subPrize } from "@/api/marketing/index";
const SHOW_FLAG = ref<boolean>(false);
const LOADING = ref<boolean>(false);
const form_ref = ref();
const minus_btn = ref<boolean>(false);
const add_btn = ref<boolean>(false);
const activeNames = ref([""]);
const reward_radio = ref<any>([]);
const coupon_options = ref<any>([]);
const form = reactive<any>({
  sector_num: 4,
  child: [],
});
const show = (item: any) => {
  LOADING.value = true;
  SHOW_FLAG.value = true;
  initData();
};

const filterLabel = (val: string) => {
  if (val === "thanks") return "谢谢惠顾";
  else if (val === "cash") return "现金:";
  else if (val === "coupon") return "优惠卷:";
  else return "积分:";
};

const handleSubPrize = (prize: any) => {
  prize = JSON.stringify(prize);
  subPrize(prize).then((res) => {
    console.log(res);
    SHOW_FLAG.value = false;
    ElMessage.success("奖项提交成功");
  });
};

const confirmChange = async (done: () => void) => {
  await form_ref.value.validate((valid: any) => {
    if (!valid) return;
    handleSubPrize(form);
    console.log("form", form);
  });
};

const closeChange = () => {
  resetObject(form.child);
  form.sector_num = 4;
  SHOW_FLAG.value = false;
};

const initData = async () => {
  const data: any = await getPrize();
  form.child = data.child;
  form.sector_num = data.sector_num;
  reward_radio.value = data.reward_radio;
  coupon_options.value = data.coupon_options.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  LOADING.value = false;
};
const addChange = () => {
  let childInfo = {
    icon: undefined, // 图标
    reward_key: undefined, // 奖品选择Key
    reward_value: undefined, // 奖品对应值
    text_color: `#000000`, // 扇区字体颜色
    probability: undefined, // 中奖概率
    background_color: `#000000`, //
  };
  if (form.sector_num < 9) {
    add_btn.value = false;
    minus_btn.value = false;
    form.sector_num++;
    form.child.push(childInfo);
    return;
  }
  return (add_btn.value = true);
};

const minusChange = () => {
  if (form.sector_num > 4) {
    add_btn.value = false;
    minus_btn.value = false;
    form.sector_num--;
    form.child.splice(form.child.length - 1, 1);
    return;
  }
  return (minus_btn.value = true);
};

defineExpose({
  show,
});
</script>

<style scoped lang="scss">
.num-wrap {
  display: flex;
  align-items: center;

  ._btn {
    width: 30px;
    height: 30px;
  }

  ._input {
    width: 50px;
    text-align: center;
    margin: 0 1rem;
  }
}

:deep(.el-tag.el-tag--info) {
  color: #2467e5;
}
</style>
