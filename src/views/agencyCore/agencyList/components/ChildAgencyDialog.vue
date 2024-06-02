<template>
  <el-dialog v-model="SHOW_FLAG" :title="TITLE" width="35%" class="!rounded-2xl custom-dialog" @close="close">
    <el-form ref="form_ref" v-loading="LOADING" :model="form" :rules="rules" label-width="180px">
      <el-form-item :label="`${$t('agency.group')}：`" prop="group_id">
        <el-select-v2 v-model="form.group_id" filterable :options="user_opt" :placeholder="$t('placeholder_select')" />
      </el-form-item>
      <el-form-item :label="`${$t('billing.users')}：`" prop="username">
        <el-input v-model="form.username" :placeholder="$t('placeholder_input')"  />
      </el-form-item>
      <el-form-item :label="`${$t('login.password')}：`">
        <el-input v-model="form.password" :placeholder="$t('placeholder_input')"  />
        <p class="_hint">{{ $t('agency.password_hint') }}</p>
      </el-form-item>
      <el-form-item :label="`${$t('status')}：`" prop="status">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item :label="`${$t('agency.auth_goods_order')}：`"  prop="auth_goods_order">
        <el-switch v-model="form.auth_goods_order" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item :label="`${$t('agency.auth_account')}：`"  prop="auth_account">
        <el-switch v-model="form.auth_account" :active-value="1" :inactive-value="0" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="handleClose(form_ref)">{{ $t('confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessage, FormInstance } from 'element-plus'
import { reactive, ref } from "vue";
import { setAgencyList, editAgencyList, getAgencyGroupList } from "@/api/agency/index";
const emit = defineEmits(['upData']);
const SHOW_FLAG = ref<boolean>(false);
const LOADING = ref<boolean>(false);
const TITLE = ref<string>('创建');
const form_ref = ref<FormInstance>()
const user_opt = ref<any[]>([]);
const filterName = (rule: any, val: any, callback: any) => {
  let reg = /^[a-zA-Z0-9_@*.-]{6,18}$/;
  if (!val || !reg.test(val)) return callback(new Error('用户名格式错误，只允许含有：字母，数字，_@*.- ，长度6-18'))
  callback()
}
const rules = reactive({
  group_id: [{ required: true, message: '请选择代理组', trigger: 'change' }],
  username: [{ validator: filterName, required: true, trigger: 'blur', }],
  status: [{ required: true, message: '请选择状态', trigger: 'change', },],
  auth_goods_order: [{ required: true, message: '请选择状态', trigger: 'change', },],
  auth_account: [{ required: true, message: '请选择状态', trigger: 'change', },]
})

const form = reactive({
  id: undefined,
  group_id: undefined,
  username: undefined,
  password: undefined,
  status: 0,
  auth_goods_order: 0,
  auth_account: 0
})



const close = () => {
  form_ref.value?.resetFields();
  resetObject(form)
  // Object.keys(form).forEach(key => form[key] = undefined)
  SHOW_FLAG.value = false;
  LOADING.value = false;
}

const show = (item = {}) => {
  handleOpt()
  TITLE.value = '创建'
  SHOW_FLAG.value = true;
  LOADING.value = true;
  if (item.id) {
    TITLE.value = '编辑'
    Object.keys(form).forEach(key => form[key] = item[key])
  }

}

const handleClose = async (done: () => void) => {
  await form_ref?.value?.validate((valid) => {
    if (!valid) return;
    refreshList()
  })
}

const refreshList = () => {
  const { group_id, status, username, auth_goods_order, auth_account, password } = form
  TITLE.value === '创建' ? handleCreate({ group_id, status, username, auth_goods_order, auth_account, password }) : handleEdit(form);
}

const handleOpt = () => {   // 获取代理选择列表
  getAgencyGroupList().then((data) => {
    user_opt.value = data.map((item: any) => {
      return {
        label: item.group_name,
        value: item.id
      }
    })
    LOADING.value = false;
  })
}

const handleCreate = (form = {}) => {
  setAgencyList(form).then(() => {
    emit('upData')
    close()
    ElMessage.success('创建成功')
  }).catch(() => {
    close()
  })
}

const handleEdit = (form = {}) => {
  editAgencyList(form).then(() => {
    emit('upData')
    close()
    ElMessage.success('修改成功')
  }).catch(() => {
    close()
  })
}


defineExpose({
  show,
})

</script>

<style scoped lang="scss">
._hint {
  font-size: 12px;
  margin: 0;
  line-height: 12px;
  margin-top: 0.3rem;
  color: #999;
}
</style>

