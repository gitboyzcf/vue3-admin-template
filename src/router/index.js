import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { usePageTitle, urlParamsLogin, generateAsyncRouter } from "./helper";
import { constantRoutes } from "./system/settingRouter";
import Layout from "@/layout/index.vue";

const modules = import.meta.glob("./modules/**/*.js", { eager: true });

const routeModuleList = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

function sortRoute(a, b) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0);
}

routeModuleList.sort(sortRoute);

//需要验证权限
export const asyncRoutes = [...routeModuleList];
//普通路由 无需验证权限
export const constantRouter = [...constantRoutes];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // routes: [
  //   {
  //     path: "/",
  //     name: "Layout",
  //     component: Layout,
  //     redirect: "/demo",
  //     meta: {
  //       title: "测试",
  //     },
  //     children: [
  //       {
  //         path: "demo",
  //         name: "Demo",
  //         component: () => import("@/views/demo/index.vue"),
  //         meta: {
  //           title: "测试",
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     path: "/:pathMatch(.*)*",
  //     component: () => import("@/views/system/404/404.vue"),
  //     meta: {
  //       title: "找不到页面",
  //     },
  //   },
  // ],
  routes: constantRouter,
});

router.beforeEach((to, from, next) => {
  usePageTitle(to);
  next();
});

async function setupRouter(app) {
  await generateAsyncRouter(router, asyncRoutes);
  app.use(router);
}

export { router, setupRouter };
