import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  //登录页面
  {
    path: "/login",
    name: 'login',
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error-page/404.vue"),
    meta: { hidden: true },
  }
];


/**
 * notFoundRouter(找不到路由)
 */
export const notFoundRouter = {
  path: '/:pathMatch(.*)',
  name: "notFound",
  redirect: '/404'
};

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
}

export default router;
