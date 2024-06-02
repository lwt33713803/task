<template>
    <div class="w-full f-c-c box-border" :class="!collapse ? 'p-[24px]' : 'p-[14px]'">
        <div class="bg-[rgba(248,250,253,1)] rd-6 w-full h-[182px] flex flex-col justify-center items-center"
            v-if="!collapse">
            <el-image :src="avatar" class="w-[56px] h-[56px] mb-0"></el-image>
            <p class="text-[16px] my-[10px] font-[500]">
                {{ administerName }}
            </p>
            <p class="text-[12px] my-0 font-[400] color-[#8C98A4]">
                {{ roleName }}
            </p>
            <div>
                <fmsButton class="_out" @click="quitChange">退出</fmsButton>
                <fmsButton class="_out" @click="password_ref.show()">修改</fmsButton>
            </div>

        </div>
        <div class="bg-[rgba(248,250,253,1)] rd-6 w-[75px] h-[46px] flex flex-col justify-center items-center" v-else>
            <el-image :src="avatar" class="w-[56px] h-[56px] mb-0"></el-image>
        </div>
    </div>

    <!-- 修改密码 -->
    <Password ref="password_ref" :a-name="administerName" :r-name="roleName" />
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import avatar from '@/assets/common/avaster.svg';
import { useRouter, useRoute } from "vue-router";
import { useUserStoreHook } from '@/store/modules/user';
import { useTagsViewStore } from "@/store/modules/tagsView";
import Password from "./Password.vue"

const password_ref = ref()
const userStore = useUserStoreHook();
const administerName: Ref<string> = ref('')
const roleName: Ref<string> = ref('')
const tagsViewStore = useTagsViewStore();
const router = useRouter();
const route = useRoute();
const quitChange = () => {
    userStore.logout().then(() => {
        tagsViewStore.delAllViews();
    }).then(() => {
        localStorage.removeItem(`roleNodes`)
        router.push(`/login?redirect=${route.fullPath}`);
    })
}
onMounted(() => {
    const { username, realname } = userStore;
    administerName.value = username;
    roleName.value = realname
})

defineProps({
    collapse: {
        type: Boolean,
        required: true
    }
});
</script>
<style scoped lang="scss">
._out {
    height: 0;
    width: 0;
    border: none;
    margin-top: .8rem;
}
</style>


