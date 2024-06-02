
import router from "@/router";
import { useUserStoreHook } from "@/store/modules/user";
import {
  usePermissionStoreHook,
  usePermissionStore,
} from "@/store/modules/permission";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import { filter } from "lodash";
import { RouteLocationNormalized } from "vue-router";

NProgress.configure({ showSpinner: true, minimum: 0.1 }); // 进度条

const permissionStore = usePermissionStoreHook();
// 白名单
const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = localStorage.getItem("accessToken");
  const userStore = useUserStoreHook();
  if (hasToken) {
    // 已登录
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      const hasRoles = userStore.roles && userStore.roles.length > 0;
      // 未匹配到任何路由，跳转404
      if (hasRoles) {
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name }) : next("404");
        } else {
          next();
        }
      } else {
        try {
          const PermissionStore = usePermissionStore();
          // 路由添加进去了没有及时更新 需要重新进去一次拦截
          if (!PermissionStore.routes.length) {
            const { realname } = await userStore.getInfo();
            const accessRoutes = await permissionStore.generateRoutes(realname);
            accessRoutes.forEach((route, index) => {
              router.addRoute(route);
            });
            next({ ...to, replace: true });
          } else {
            next(); // // 如果不传参数就会重新执行路由拦截，重新进到这里
          }
        } catch (error) {
          console.log("error", error);
          //  移除 token 并跳转登录页
          await userStore.resetToken();
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    // 未登录可以访问白名单页面
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach((to: RouteLocationNormalized) => {
  NProgress.done();
});
