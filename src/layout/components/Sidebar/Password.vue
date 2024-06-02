<template>
    <el-dialog v-model="SHOW_FLAG" title="修改密码" width="40%" style="border-radius: 2%;" @close="closeChange" >
        <div class="bg-[rgba(248,250,253,1)] rd-6 w-full h-[182px] flex flex-col justify-center items-center">
            <FmsImage :src="avatar" class="w-[80px] h-[80px] mb-0"></FmsImage>
            <p class="text-[16px] my-[10px] font-[500]">
                {{ aName }}
            </p>
            <p class="text-[12px] my-0 font-[400] color-[#8C98A4]">
                {{ rName }}
            </p>
        </div>
        <el-form ref="form_ref" :model="form" :rules="rules" label-position="right" style="display: flex; flex-direction: column; align-items: center;margin: 1rem 0 0;">
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
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closeChange">取 消</el-button>
                <el-button type="primary" :disabled="LOADING" @click="handleConfirm(form_ref)">修 改</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import avatar from '@/assets/common/avaster.svg';
import { useRoute, useRouter } from "vue-router";
import { useUserStoreHook } from '@/store/modules/user';
import { useTagsViewStore } from "@/store/modules/tagsView";
const props = defineProps({
    aName: {
        type: String,
        default: '',
    },
    rName: {
        type: String,
        default: '',
    }
})
const SHOW_FLAG = ref<boolean>(false);
const LOADING = ref<boolean>(false);
const form_ref = ref<FormInstance>();
const route = useRoute();
const router = useRouter();
const userStore = useUserStoreHook();
const tagsViewStore = useTagsViewStore();
const form = reactive({
    old_password: '',
    new_password: '',
    renew_password: ''
})
const rules = reactive({
    old_password: [{ required: true, trigger: "blur", message: '请输入' }],
    new_password: [{ required: true, trigger: "blur", message: '请输入' }],
    renew_password: [{ required: true, trigger: "blur", message: '请输入' }],
})

const handleConfirm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid) => {
        if (!valid) return;
        handleSetPassword(form)
    })
}
const handleSetPassword = (form: any) => {
    setPassword(form).then((res) => {
        ElMessage.success('修改成功');
        userStore.logout().then(() => {
            tagsViewStore.delAllViews();
        }).then(() => {
            SHOW_FLAG.value = false;
            router.push(`/login?redirect=${route.fullPath}`);
        }).catch(() => {
            SHOW_FLAG.value = false;
        })
    })
}

const closeChange = () => {
    form_ref.value?.clearValidate()
    SHOW_FLAG.value = false;
}

const show = () => {
    form_ref.value?.resetFields()
    SHOW_FLAG.value = true;
}


defineExpose({
    show
})
</script>