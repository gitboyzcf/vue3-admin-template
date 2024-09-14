import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { usePageTitle, urlParamsLogin } from "./helper";
import Layout from "@/layout/index.vue";

const whiteList = ["/login"]; // 白名单
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Layout",
      component: Layout,
      redirect: "/demo",
      meta: {
        title: "测试",
      },
      children: [
        {
          path: "demo",
          name: "Demo",
          component: () => import("@/views/demo/index.vue"),
          meta: {
            title: "测试",
          },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/system/404/404.vue"),
      meta: {
        title: "找不到页面",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  usePageTitle(to);
  next();
});

async function setupRouter(app) {
  app.use(router);
}

export { router, setupRouter };
