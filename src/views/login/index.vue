<template>
  <div class="login-container relative">
    <div class="login-bg flex flex-col justify-center items-center">
      <div id="lottie-logo" class="w-200 h-200">

      </div>
      <div class="flex flex-col text-center gap-4">
        <img src="@/assets/logo.webp" class="w-120" alt="" srcset="">
      </div>
      <!-- <img
        src="@/assets/common/logo.gif"
        class="w-full h-auto p-60 box-border"
        alt=""
        srcset=""
      /> -->
    </div>
    <div class="py-10 flex-col flex-center">
      <div class="text-7 color-gray-400">管理员登录</div>
      <el-form ref="ruleFormRef" v-loading="loading" :model="userInfo" :rules="loginRules"
        class="mt-[40px] flex-col w-[460px] gap-3 z-2">
        <el-form-item prop="username">
          <el-input v-model="userInfo.username" :placeholder="$t('login.place_user')" class="fms-input"
            @keyup.enter="actionLogin(ruleFormRef)" clearable>
            <template #prefix>
              <el-icon class="el-input__icon">
                <UserFilled />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="userInfo.password" :placeholder="$t('login.place_pw')" class="fms-input"
            show-password @keyup.enter="actionLogin(ruleFormRef)">
            <template #prefix>
              <el-icon class="el-input__icon">
                <GoodsFilled />
              </el-icon> </template></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="userInfo.code" :placeholder="$t('login.place_code')" class="fms-input flex-shrink-0"
            type="text" @keyup.enter="actionLogin(ruleFormRef)" clearable>
            <template #append>
              <img v-if="captchaBase64" :src="captchaBase64" @click="handleAuthCode" class="w-full h-[40px]" />
              <svg v-else t="1690863113797" class="icon w-[100px] h-[25px]" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2335">
                <path
                  d="M512 192c-12.8 0-21.333333-8.533333-21.333333-21.333333V85.333333c0-12.8 8.533333-21.333333 21.333333-21.333333s21.333333 8.533333 21.333333 21.333333v85.333334c0 12.8-8.533333 21.333333-21.333333 21.333333zM682.666667 236.8c-4.266667 0-6.4 0-10.666667-2.133333-10.666667-6.4-12.8-19.2-8.533333-29.866667l42.666666-74.666667c6.4-10.666667 19.2-12.8 29.866667-8.533333 10.666667 6.4 12.8 19.2 8.533333 29.866667l-42.666666 74.666666c-4.266667 8.533333-12.8 10.666667-19.2 10.666667zM808.533333 362.666667c-6.4 0-14.933333-4.266667-19.2-10.666667-6.4-10.666667-2.133333-23.466667 8.533334-29.866667l74.666666-42.666666c10.666667-6.4 23.466667-2.133333 29.866667 8.533333 6.4 10.666667 2.133333 23.466667-8.533333 29.866667l-74.666667 42.666666c-4.266667 2.133333-8.533333 2.133333-10.666667 2.133334zM938.666667 533.333333h-85.333334c-12.8 0-21.333333-8.533333-21.333333-21.333333s8.533333-21.333333 21.333333-21.333333h85.333334c12.8 0 21.333333 8.533333 21.333333 21.333333s-8.533333 21.333333-21.333333 21.333333zM881.066667 746.666667c-4.266667 0-6.4 0-10.666667-2.133334l-74.666667-42.666666c-10.666667-6.4-12.8-19.2-8.533333-29.866667 6.4-10.666667 19.2-12.8 29.866667-8.533333l74.666666 42.666666c10.666667 6.4 12.8 19.2 8.533334 29.866667-4.266667 6.4-10.666667 10.666667-19.2 10.666667zM725.333333 902.4c-6.4 0-14.933333-4.266667-19.2-10.666667l-42.666666-74.666666c-6.4-10.666667-2.133333-23.466667 8.533333-29.866667 10.666667-6.4 23.466667-2.133333 29.866667 8.533333l42.666666 74.666667c6.4 10.666667 2.133333 23.466667-8.533333 29.866667-4.266667 2.133333-6.4 2.133333-10.666667 2.133333zM512 960c-12.8 0-21.333333-8.533333-21.333333-21.333333v-85.333334c0-12.8 8.533333-21.333333 21.333333-21.333333s21.333333 8.533333 21.333333 21.333333v85.333334c0 12.8-8.533333 21.333333-21.333333 21.333333zM298.666667 902.4c-4.266667 0-6.4 0-10.666667-2.133333-10.666667-6.4-12.8-19.2-8.533333-29.866667l42.666666-74.666667c6.4-10.666667 19.2-12.8 29.866667-8.533333 10.666667 6.4 12.8 19.2 8.533333 29.866667l-42.666666 74.666666c-4.266667 6.4-12.8 10.666667-19.2 10.666667zM142.933333 746.666667c-6.4 0-14.933333-4.266667-19.2-10.666667-6.4-10.666667-2.133333-23.466667 8.533334-29.866667l74.666666-42.666666c10.666667-6.4 23.466667-2.133333 29.866667 8.533333 6.4 10.666667 2.133333 23.466667-8.533333 29.866667l-74.666667 42.666666c-4.266667 2.133333-8.533333 2.133333-10.666667 2.133334zM170.666667 533.333333H85.333333c-12.8 0-21.333333-8.533333-21.333333-21.333333s8.533333-21.333333 21.333333-21.333333h85.333334c12.8 0 21.333333 8.533333 21.333333 21.333333s-8.533333 21.333333-21.333333 21.333333zM215.466667 362.666667c-4.266667 0-6.4 0-10.666667-2.133334l-74.666667-42.666666c-10.666667-6.4-12.8-19.2-8.533333-29.866667s19.2-12.8 29.866667-8.533333l74.666666 42.666666c10.666667 6.4 12.8 19.2 8.533334 29.866667-4.266667 6.4-10.666667 10.666667-19.2 10.666667zM341.333333 236.8c-6.4 0-14.933333-4.266667-19.2-10.666667l-42.666666-74.666666c-6.4-10.666667-2.133333-23.466667 8.533333-29.866667 10.666667-6.4 23.466667-2.133333 29.866667 8.533333l42.666666 74.666667c6.4 10.666667 2.133333 23.466667-8.533333 29.866667-4.266667 2.133333-6.4 2.133333-10.666667 2.133333z"
                  fill="#2c2c2c" p-id="2336"></path>
              </svg>
            </template>
          </el-input>
        </el-form-item>
        <el-checkbox :label="$t('login.text')" class="my-[10px]"></el-checkbox>
        <el-button :loading-icon="Eleme" :loading="loading" @click="actionLogin(ruleFormRef)"
          class="fms-button-login login-button-shadow" type="primary">
          {{ $t("login.login") }}
        </el-button>
      </el-form>
    </div>
    <div class="text-5 absolute bottom-10 w-full text-center font-bold z-1 versions">
      <span>[ V08.25 - 版本 - {{ versions }} ]</span>
    </div>
    <div class="absolute top-10 right-5 w-60 cursor-pointer" @click="openConnect">
      <div id="lottie-connect"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { InfoType, RulesType } from "./index";
import { Eleme } from "@element-plus/icons-vue";
import { useRoute, LocationQueryValue, LocationQuery } from "vue-router";
import router from "@/router";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/modules/user";
import { allDicts } from "@/store/modules/dict";
import type { FormInstance } from "element-plus";
import { optionsStore } from "@/store/modules/otions";
import Lottie from "lottie-web";
import animationConnect from "@/assets/json/connect.json";
import animationLogin from "@/assets/json/login-bg.json";
//APIS
import { getCaptcha } from "@/api/auth";

const route = useRoute();
const ruleFormRef = ref<FormInstance>();
const userStore = useUserStore();
const getDicts = allDicts();
const logo = ref("");
const versions = ref("v.0.0.0");
const captchaBase64: Ref<string> = ref("");
const loading = ref<boolean>(false);
const userInfo: InfoType = reactive({
  username: "", // 账号
  password: "", // 密码
  code: "", // code
  hash: "",
});

const loginRules: RulesType = reactive({
  username: [{ required: true, trigger: "blur", message: "请输入账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入密码" }],
  code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
});

const actionLogin = (formEl: FormInstance | undefined): void => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true;
      userStore
        .login(userInfo)
        .then(() => {
          ElMessage.success(`登录成功`);
          const query: LocationQuery = route.query;
          const redirect = (query.redirect as LocationQueryValue) ?? "/";
          router.push({ path: redirect });
          /*
           * @describe：初始调用all 字典类型
           */
          getDicts.querySearchDictMap();
          console.log(optionsStore, "optionsStore");
          optionsStore().setDictMap();
        })
        .catch(() => {
          // 验证失败，重新生成验证码
          handleAuthCode();
          loading.value = false;
        });
    }
  });
};

const handleAuthCode = (): void => {
  getCaptcha().then(({ data }) => {
    const { code, hash } = data;
    captchaBase64.value = code;
    userInfo.hash = hash;
  });
};

onMounted(() => {
  handleAuthCode();
  const res = JSON.parse(localStorage.getItem("site_config") ?? "[]");
  versions.value = res.site_version;
  logo.value = res.site_logo;
  animationConnectAction();
});

onBeforeUnmount(() => {
  loading.value = false;
});

const openConnect = () => {
  window.open('https://t.me/huiruan04');
}

const animationConnectAction = () => {
  Lottie.loadAnimation({
    container: document.getElementById("lottie-connect") as any, // the dom element that will contain the animation
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: animationConnect, // the path to the animation json
  });
  Lottie.loadAnimation({
    container: document.getElementById("lottie-logo") as any, // the dom element that will contain the animation
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: animationLogin, // the path to the animation json
  });

}
</script>

<style lang="scss" scoped>
.login-bg {
  background: url("@/assets/common/bg.jpg");
  background-position: center;
  background-size: cover;
  border-right: 1px solid #f5f5f5;
  background-color: #f5f5f5;
}

.versions {
  color: #ccc;
  z-index: 1;
}
</style>
