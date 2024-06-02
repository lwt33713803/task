<template>
  <div
    class="bg-[rgba(248,250,253,1)] rd-6 w-full h-[182px] flex flex-col justify-center items-center"
  >
    <FmsImage :src="avatar" class="w-[56px] h-[56px] mb-0"></FmsImage>
    <p class="text-[16px] my-[10px] font-[500]">
      {{ administerName }}
    </p>
    <p class="text-[12px] my-0 font-[400] color-[#8C98A4]">
      {{ roleName }}
    </p>
  </div>
  <div class="form-wrap">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="right">
      <fmsFormItem label="后台旧密码:" prop="old_password">
        <fmsInput v-model="form.old_password" placeholder="请输入旧密码" />
      </fmsFormItem>
      <fmsFormItem label="新密码:" prop="new_password">
        <fmsInput v-model="form.new_password" placeholder="请输入新密码" />
      </fmsFormItem>
      <fmsFormItem label="重复新密码:" prop="renew_password">
        <fmsInput v-model="form.renew_password" placeholder="请输入新密码" />
      </fmsFormItem>
    </el-form>

    <el-button class="_btn" type="primary" @click="handleConfirm(formRef)"
      >修 改</el-button
    >
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { setPassword } from "@/api/system/user";
import { useRoute, useRouter } from "vue-router";
import { useUserStoreHook } from "@/store/modules/user";
import { useTagsViewStore } from "@/store/modules/tagsView";
import avatar from "@/assets/common/avaster.svg";
const route = useRoute();
const router = useRouter();
const userStore = useUserStoreHook();
const formRef = ref<FormInstance>();
const administerName: Ref<string> = ref("");
const roleName: Ref<string> = ref("");
const tagsViewStore = useTagsViewStore();
const form = reactive({
  old_password: "",
  new_password: "",
  renew_password: "",
});
const rules = reactive({
  old_password: [{ required: true, trigger: "blur", message: "请输入" }],
  new_password: [{ required: true, trigger: "blur", message: "请输入" }],
  renew_password: [{ required: true, trigger: "blur", message: "请输入" }],
});
const handleConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (!valid) return;
    handleSetPassword(form);
  });
};

const handleSetPassword = (form: any) => {
  setPassword(form).then((res) => {
    ElMessage.success("修改成功");
    userStore
      .logout()
      .then(() => {
        tagsViewStore.delAllViews();
      })
      .then(() => {
        router.push(`/login?redirect=${route.fullPath}`);
      });
  });
};

onMounted(() => {
  const { username, realname } = userStore;
  administerName.value = username;
  roleName.value = realname;
});
</script>

<style lang="scss" scoped>
.form-wrap {
  width: 40%;
  padding: 2rem 0;

  ._btn {
    display: flex;
    margin: 0 auto;
  }
}
</style>
