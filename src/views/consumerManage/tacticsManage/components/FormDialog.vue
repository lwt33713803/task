<template>
  <el-dialog v-model="SHOW_FLAG" width="50%" class="!rounded-2xl custom-dialog" @close="closeChange">
    <template #header>{{ TITLE }}
      <TitleTooltip :content="CONTENT" />
    </template>
    <el-form ref="dialog_ref" v-loading="LOADING" :model="form" :rules="rules">
      <div class="crated-items _flex">
        <fmsFormItem :label="`${$t('tactics.tactics_name')}:`" prop="group_name">
          <fmsInput v-model="form.group_name" :placeholder="$t('tactics.tactics_name_hint')" />
        </fmsFormItem>
        <fmsFormItem :label="`${$t('status')}:`" prop="status">
          <el-switch v-model="form.status" :inactive-value="0" :active-value="1" />
        </fmsFormItem>
        <fmsFormItem :label="`${$t('tactics.is_open')}:`" prop="is_open">
          <el-switch v-model="form.is_open" :inactive-value="0" :active-value="1" />
        </fmsFormItem>
      </div>
      <fmsFormItem :label="`${$t('tactics.relevance_users')}:`">
        <el-tag 
          v-for=" user  in   user_opt " :key="user.id" class="mx-1" :disable-transitions="false"
          @click="user_ref.show(user_opt)">
          {{ user.nickname }}
        </el-tag>
        <el-button class="button-new-tag" size="small"
          @click="user_ref.show(user_opt)">{{ $t('tactics.add') }}</el-button>
      </fmsFormItem>
      <el-collapse v-model="activeNames" accordion>
        <template v-for="( item, index ) in  form.data " :key="item.index">
          <el-collapse-item :title="`${$t('tactics.tactics')}${index + 1}`" :name="`${index}`">
            <div class="crated-items">
              <fmsFormItem :label="`${$t('tactics.under')}:`" :prop="`data.${index}['index']`">
                <fms-input-number v-model="item.index" :min="1" size="small" /><span
                  style="margin-left: .5rem;">{{ $t('tactics.unit') }}</span>
              </fmsFormItem>
              <fmsFormItem :label="`${$t('mode')}:`" :prop="`data.${index}['mode_type']`" style="display: flex;">
                <fms-select v-model="item.mode_type" :placeholder="$t('tactics.mode_hint')" :options="dictMap.刷单模式"
                  :key-name="'dict_label'" :val-name="'dict_value'" size="small" style="flex: 1;"
                  @change="modeChange(item.mode_type, item.balance_search_type)" />
              </fmsFormItem>
              <div style="width: 100%; display: flex;">
                <fmsFormItem :label="`${$t('tactics.matching_mode')}:`" :prop="`data.${index}['balance_search_type']`" style="width: 100%;">
                  <fms-select v-model="item.balance_search_type" :placeholder="$t('tactics.mode_hint')" :options="dictMap.余额匹配模式"
                    size="small" :key-name="'dict_label'" :val-name="'dict_value'" style="flex: 1;"
                    @change="modeChange(item.mode_type, item.balance_search_type)" />
                  <fmsInput v-model="item.balance_search_value" :placeholder="hint_text" size="small"
                    :disabled="!item.balance_search_type" style="width: 80%; !important"
                    :type="item.mode_type === 'default' ? 'number' : ''" />
                </fmsFormItem>
              </div>
              <div style="width: 100%; display: flex;">
                <fmsFormItem :label="`${$t('tactics.money_mode')}:`" :prop="`data.${index}['commission_settle_type']`" style="width: 100%;">
                  <fms-select v-model="item.commission_settle_type" :placeholder="$t('tactics.mode_hint')" :options="dictMap.佣金结算方式"
                    size="small" :key-name="'dict_label'" :val-name="'dict_value'" style="flex: 1;" />
                  <fmsInput v-model="item.commission_settle_value" :placeholder="$t('tactics._hint')" type="number" size="small"
                    style="width: 80%;" :disabled="!item.commission_settle_type" />
                </fmsFormItem>
              </div>
              <fmsFormItem :label="`${$t('change_gender')}:`">
                <fms-select v-model="item.trigger_level_id" :placeholder="$t(`tactics.select_level_hint`)" :options="GRADE_OPT" size="small"
                  :key-name="'level_name'" :val-name="'id'" />
              </fmsFormItem>
              <fmsFormItem :label="`${$t('change_strategy_group')}:`">
                <fms-select v-model="item.trigger_group_id" :placeholder="$t(`tactics.mode_hint`)" :options="TACTICS_OPT" size="small"
                  :key-name="'group_name'" :val-name="'id'" />
              </fmsFormItem>
              <fmsFormItem :label="`${$t('tactics.freeze')}:`" :prop="`data.${index}.freeze_order`">
                <el-switch v-model="item.freeze_order" :inactive-value="0" :active-value="1" size="small" />
              </fmsFormItem>
              <fmsFormItem :label="`${$t('tactics.change_up_image')}:`">
                <SingleUpload v-model="item.image_url" :index="index" size="small" @up-info="handleUpInfo" />
              </fmsFormItem>
            </div>
            <div class="crated-btn">
              <el-button type="primary" @click="copyItem(dialog_ref, index)">{{ $t('tactics.copy') }}</el-button>
              <el-button v-if="form.data.length > 1" type="danger" @click="delItem(index)">{{ $t('tactics.del') }}</el-button>
            </div>
          </el-collapse-item>
        </template>
      </el-collapse>
    </el-form>
    <div class="crated-add">
      <el-button @click="addItem(dialog_ref)"><el-icon size="20"><i-ep-plus /></el-icon>{{ $t('tactics.create') }}</el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeChange">{{ $t('cancel') }}</el-button>
        <el-button :disabled="BTN_FLAG" type="primary" @click="handleConfirm(dialog_ref)">{{ $t('confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>

  <user-select ref="user_ref" @add="handleAddUser" @del="handleDelUser" />
</template>

<script setup lang="ts">
import {
  setGradeItem,
  editGradeItem,
  getGradeList,
  queryGradeItem,
  getTacticsRelation,
  getTacticsSelect,
} from "@/api/goods/index";
import { FormInstance } from "element-plus";
import TitleTooltip from "@/components/TitleTooltip/index.vue";
import userSelect from "./userSelect.vue";
const emit = defineEmits(["upData"]);
const CONTENT: Ref<string> = ref(`<span>提示信息：<br />
  为某一部分用户添加策略；表示这一部分用户遵循该策略模式；<br />
  第多少单表示用户刷到第几单时走当前配置的策略；<br />
  【例如】第 4 单，表示用户刷到第4单的时候走当前配置的策略模式。
  </span>`)
const dialog_ref = ref<FormInstance>();
const user_ref = ref<FormInstance>();
const TITLE: Ref<string> = ref('创建');
const SHOW_FLAG: Ref<boolean> = ref(false);
const LOADING: Ref<boolean> = ref(false);
const BTN_FLAG = ref<boolean>(false);   // 确定按钮 防抖限制
const GRADE_OPT: any = ref([]); // 触发等级选择 list
const TACTICS_OPT: any = ref([]); // 触发策略组选择 
const form = reactive<any>({
  id: undefined,
  group_name: '',         // 策略名称
  status: 0,      // 状态
  is_open: 0,     // 是否公开
  member_id: [],          // 关联用户
  data: []
})
const rules: any = reactive({
  group_name: [{ required: true, trigger: "blur", message: '请输入' }],
  status: [{ required: true, trigger: "change", message: '请选择' }],
  is_open: [{ required: true, trigger: "change", message: '请选择' }],
  data: [
    {
      index: [{ required: true, trigger: "blur", message: '请输入' }],
      mode_type: [{ required: true, trigger: "change", message: '请选择' }],
      balance_search_type: [{ required: true, trigger: "change", message: '请选择' }],
      commission_settle_type: [{ required: true, trigger: "change", message: '请选择' }],
      freeze_order: [{ required: true, trigger: "change", message: '请选择' }],
    }
  ]
});
const user_opt: any = ref([]);
const activeNames = ref(['1']);
const hint_text = ref(`匹配值小数点保留两位`)


const copyItem = async (formEl: FormInstance | undefined, num: number) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (!valid) return;
    let newData: any = {}
    let id: any;
    Object.keys(form.data[num]).filter(key => newData[key] = form.data[num][key])
    delete newData[`id`];
    //获取当前max 
    let max = form.data.map(item => item.index);
    let index_max = Math.max(...max);
    newData['index'] = index_max + 1;
    form.data.push({ ...newData });
  })
}

const delItem = (num: number) => {
  form.data.splice(num, 1)
}
const addItem = async (formEl: FormInstance | undefined) => {
  let child_form = {
    index: undefined, // 索引
    mode_type: dictMap.刷单模式[0][`dict_value`], // 模式
    balance_search_type: dictMap.余额匹配模式[0][`dict_value`],    // 匹配模式
    balance_search_value: undefined,   // 匹配模式-值
    commission_settle_type: undefined,  // 佣金结算模式
    commission_settle_value: undefined, // 佣金结算模式-值
    trigger_level_id: undefined,        // 触发等级
    trigger_group_id: undefined,        // 触发策略组
    freeze_order: undefined,            // 冻结本金
    image: ""
  }
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (!valid) return;
    form.data.push({ ...child_form })
  })
}

const handleConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  if (filterIndex(form.data)) return
  await formEl.validate((valid) => {
    const { data } = form;
    if (!valid) return;
    if (data.length === 0) return ElMessage.warning(`请添加方案`);
    // if (user_opt.value.length === 0) return ElMessage.warning(`请关联用户`);


    BTN_FLAG.value = true;
    let ids = user_opt.value.map((item: { id: number; }) => item.id);
    form.member_id = JSON.stringify(ids);
    TITLE.value === '创建' ? handleSetGradeItem({ ...form }) : handleEditGradeItem({ ...form })
  })
}

const filterIndex = (data: any) => {  // 遍历索引是否重复
  let index_arr: any[];
  index_arr = data.map((i: any) => i.index);
  const filterUnique = (arr: any[]) => arr.filter((i: any) => arr.indexOf(i) !== arr.lastIndexOf(i))
  let order_repeat = [...new Set(filterUnique(index_arr))];
  return order_repeat.length > 0 ? ElMessage.warning(`第${order_repeat.toString()}单存在重复索引！`) : false
}

const handleSetGradeItem = (form: any) => {
  let { data, group_name, is_open, member_id, status } = form;
  data = JSON.stringify(data);
  setGradeItem({ data, group_name, is_open, member_id, status }).then(() => {
    closeChange()
    emit(`upData`);
    ElMessage.success(`操作成功`);
  }).catch(() => {
    closeChange()
  })
}
const handleEditGradeItem = (data: any) => {
  data.data = JSON.stringify(data.data)
  data.plan = JSON.stringify(data.plan);
  data.member = JSON.stringify(data.member)
  editGradeItem({ ...data }).then(() => {
    closeChange()
    emit(`upData`)
    ElMessage.success(`修改成功`);
  }).catch(() => {
    closeChange()
  })
}
const handleGetList = async () => {
  TACTICS_OPT.value = await getTacticsSelect({ all: 1 });
  getGradeList().then(({ data }) => {
    GRADE_OPT.value = data;
    GRADE_OPT.value.unshift({ id: 0, level_name: '请选择' })
    LOADING.value = false
  })
  TACTICS_OPT.value.unshift({ id: 0, group_name: '请选择' })
}

const getEditItems = async (id: number) => {
  const { data: users } = await getTacticsRelation({ group_id: id });
  user_opt.value = users;
  const { data }: any = await queryGradeItem({ id });
  Object.keys(form).forEach((key: any) => {
    form[key] = data[key];
    form[`data`] = data[`plan`];
    form[`member_id`] = data[`member`];
  })
}

const show = (id: number | undefined) => {
  dialog_ref?.value?.resetFields();
  LOADING.value = true;
  SHOW_FLAG.value = true;
  TITLE.value = '创建';
  handleGetList()
  if (id) {
    TITLE.value = '编辑';
    getEditItems(id)
  }
}
const modeChange = (mode_type: any, balance_type: any) => {
  console.log(`mode_type`, mode_type)
  // ‘默认模式 && ‘余额百分比
  if (mode_type === 'default' && balance_type === 'percent') return hint_text.value = `匹配值小数点保留两位`;
  // ‘默认模式 && ‘固定金额
  if (mode_type === 'default' && balance_type === 'amount') return hint_text.value = `请输入商品匹配金额`;
  // ‘叠加模式 && ‘余额百分比
  if (mode_type === 'overlay' && balance_type === 'percent') return hint_text.value = `匹配值小数点保留两位，以英文","隔开`;
  // ‘叠加模式 && ‘固定金额
  if (mode_type === 'overlay' && balance_type === 'amount') return hint_text.value = `请输入商品匹配金额，以英文","隔开`;
}
const handleUpInfo = (info: any, index: number) => {
  form.data[index].image = info.path;
}

const handleAddUser = (users: any) => {
  user_opt.value = users;
}
const handleDelUser = (users: any) => {
  user_opt.value = users;
}

const closeChange = () => {
  dialog_ref?.value?.clearValidate();
  resetObject(form);
  SHOW_FLAG.value = false;
  BTN_FLAG.value = false;
  user_opt.value = [];
}


defineExpose({
  show
})
</script>

<style scoped lang="scss">
@import "../index.scss";

:deep(.el-input__wrapper) {
  max-width: 100% !important
}
</style>
