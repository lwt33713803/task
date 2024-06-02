
<template>
  <el-form ref="ruleFormRef" label-width="80px" label-position="left" :model="userInfo" :rules="rules">
    <el-form-item label="用户名称">
      <fms-input v-model="userInfo.username" placeholder="请输入" :disabled="formType !== 'create'" />
    </el-form-item>
    <el-form-item label="昵称">
      <fms-input v-model="userInfo.nickname" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="密码" v-if="formType === 'create'">
      <fms-input class="my-2" v-model="userInfo.password" placeholder="请输入" />
      <el-alert type="error" :closable="false" title="不填为默认密码，可在系统配置查看"></el-alert>
    </el-form-item>

    <el-form-item label="性别">
      <el-radio-group v-model="userInfo.sex">
        <el-radio :label="i.dict_value" v-for="i in dictMap?.性别" :key="i.dict_value" :value="i.dict_value">{{ i.dict_label
        }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="手机号">
      <fms-input v-model="userInfo.mobile"></fms-input>
    </el-form-item>
    <el-form-item label="邮箱号">
      <fms-input v-model="userInfo.email"></fms-input>
    </el-form-item>
    <el-form-item label="头像">
      <single-upload v-model="userInfo.avatar"></single-upload>
    </el-form-item>
    <el-form-item label="用户等级">
      <el-select v-model="userInfo.level_id" placeholder="请选择">
        <el-option v-for="item in levelMap" :label="item.level_name" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="用户类型">
      <el-radio-group v-model="userInfo.sys_type">
        <el-radio :label="i.dict_value" v-for="i in dictMap?.用户类型" :key="i.dict_value">{{ i.dict_label }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="所属上级">
      <el-select filterable v-model="userInfo.parent_username" placeholder="请选择" :disabled="props.formType === 'edit'">
        <el-option v-for="item in memberMap" :label="item.username" :value="item.id">
        </el-option>
      </el-select>
      <!-- <el-autocomplete v-model="userInfo.parent_username" :fetch-suggestions="getmemberListAll" placeholder="请输入"
        @select="handleUserName">
        <template #default="{ item }">
          <div class="value">{{ item.username }}</div>
        </template>
      </el-autocomplete> -->
    </el-form-item>
    <el-form-item label="所属代理">
      <el-select filterable v-model="userInfo.agent_id" placeholder="请选择">
        <el-option v-for="item in agentMap" :label="item.username" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="抢单权限">
      <el-switch :inactive-value="0" :active-value="1" v-model="userInfo.task_status"></el-switch>
    </el-form-item>
    <el-form-item label="登录状态">
      <el-switch :inactive-value="0" :active-value="1" v-model="userInfo.status"></el-switch>
    </el-form-item>
    <el-form-item label="提款状态">
      <el-switch :inactive-value="0" :active-value="1" v-model="userInfo.cash_status"></el-switch>
    </el-form-item>
    <el-form-item label="分享权限">
      <el-switch :inactive-value="0" :active-value="1" v-model="userInfo.share_status"></el-switch>
    </el-form-item>
  </el-form>
</template>
<script setup>
import {
  inject,
  ref,
  watch,
  reactive,
  nextTick,
  onMounted,
  defineExpose,
} from "vue";
const memberMap = ref([]);
const agentMap = ref([]);
onMounted(async () => {
  console.log(await getmemberListAll(), "data");
  memberMap.value = await getmemberListDefault();
  agentMap.value = await getmemberAgent();
});

const levelMap = JSON.parse(localStorage.getItem("levelList"));
const rules = reactive({});
const props = defineProps({
  formData: {
    type: Object,
    default: null,
  },
  formType: {
    type: String,
    default: "create",
  },
});
const getValue = () => {
  return userInfo;
};
const setForm = (form) => {
  userInfo = { ...form };
};
const getInterface = () => {
  return [ruleFormRef, userInfo];
};
defineExpose({ getValue, setForm, getInterface });
const userInfo = reactive({
  ...props.formData,
});
const ruleFormRef = inject("ruleFormRef");

const handleAgent = (e) => {
  userInfo.agent_id = e.id;
};

const handleUserName = (e) => {
  userInfo.parent_username = e?.username;
};
</script>
