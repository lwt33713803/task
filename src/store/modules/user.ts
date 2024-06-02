import { defineStore } from "pinia";

import { getLogin, cancelLogin } from "@/api/auth";
import { getUserInfo } from "@/api/user";
import { resetRouter } from "@/router";
import { store } from "@/store";

import { LoginData } from "@/api/auth/types";
import { UserInfo } from "@/api/user/types";

import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {
  // state
  const token = useStorage("accessToken", "");
  const username = ref("");
  const realname = ref("")
  const roles = ref<Array<string>>([]); // 用户角色编码集合 → 判断路由权限
  const perms = ref<Array<string>>([]); // 用户权限编码集合 → 判断按钮权限

  /**
   * 登录调用
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      getLogin(loginData)
        .then((response) => {
          const { access_token } = response.data as any;
          token.value = access_token;
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function getInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      getUserInfo()
        .then(({ data }) => {
          if (!data) {
            return reject("Verification failed, please Login again.");
          }
          // if (!data.roles || data.roles.length <= 0) {
          //   reject("getUserInfo: roles must be a non-null array!");
          // }
          username.value = data.username;
          realname.value = data.roles[0].name || '';
          roles.value.push(data.realname);
          // perms.value = data.perms;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 注销
  function logout() {
    return new Promise<void>((resolve, reject) => {
      cancelLogin()
        .then((res) => {
          console.log('res', res)
          resetRouter();
          resetToken();
          location.reload(); // 清空路由
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 重置
  function resetToken() {
    token.value = "";
    username.value = "";
    roles.value = [];
    perms.value = [];
  }
  return {
    token,
    username,
    realname,
    roles,
    perms,
    login,
    getInfo,
    logout,
    resetToken,
  };
});

// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
