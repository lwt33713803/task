import { LoginData } from "@/api/auth/types";
import { useUserStoreHook } from "@/store/modules/user";

import { useRoute, useRouter } from "vue-router";

export function useUsers(): any {
  const {
    login: actionLogin,
    logout: actionLogout,
    getInfo,
  } = useUserStoreHook();
	 
  const router = useRouter();

	type infoType = {
		username: string;
		password: string;
		code: string;
		hash: string;
	};
	
  async function login(userInfo) {
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
  function logout() {}
  function forgetPassword() {}
  onMounted(() => {});
  return { login, logout, forgetPassword };
}
