/**
 * @author zcf
 * @E-mail boyzcf@qq.com
 * @description:
 * @date 2023-08-08 13:56
 */
import { cloneDeep, isArray, isString, has } from "lodash-es";
import { useOutsideSystemStore } from "@/stores/modules/system.js";
import { useUserOutsideStore } from "@/stores/modules/user.js";
import { useSettingsOutsideStore } from "@/stores/modules/settings.js";
import { lastRoute } from "./system/settingRouter";
import { Icon } from "@iconify/vue";
import consola from "consola";
function hasPermission(permissions, route) {
  let isAuth = false;
  if (route.meta && route.meta.auth) {
    isAuth = permissions.some((auth) => {
      if (isString(route.meta.auth)) {
        return route.meta.auth === auth;
      } else if (isArray(route.meta.auth)) {
        return route.meta.auth.some((routeAuth) => routeAuth === auth);
      }
      __DEV__ &&
        consola.error(
          new Error(
            `route.meta.auth 必须是字符串或者数组，当前为 ${typeof route.meta
              .auth}`
          )
        );
    });
  } else {
    isAuth = true;
  }
  return isAuth;
}

function filterAsyncRoutes(routes, permissions) {
  return routes.filter((route) => {
    if (hasPermission(permissions, route)) {
      has(route, "children") &&
        (route.children = filterAsyncRoutes(route.children, permissions));
      return true;
    }
    return false;
  });
}

// 将多层嵌套路由处理成平级
// 累加层级的 breadcrumb
function flatAsyncRoutes(routes, breadcrumb, baseUrl = "") {
  let res = [];
  routes.forEach((route) => {
    if (route.children) {
      let childrenBaseUrl = "";
      if (baseUrl == "") {
        childrenBaseUrl = route.path;
      } else if (route.path != "") {
        childrenBaseUrl = `${baseUrl}/${route.path}`;
      }
      let childrenBreadcrumb = cloneDeep(breadcrumb);
      if (route.meta.breadcrumb !== false) {
        childrenBreadcrumb.push({
          path: childrenBaseUrl,
          title: route.meta.title,
          i18n: route.meta.i18n,
        });
      }
      let tmpRoute = cloneDeep(route);
      tmpRoute.path = childrenBaseUrl;
      tmpRoute.meta.breadcrumbNeste = childrenBreadcrumb;
      delete tmpRoute.children;
      res.push(tmpRoute);
      let childrenRoutes = flatAsyncRoutes(
        route.children,
        childrenBreadcrumb,
        childrenBaseUrl
      );
      childrenRoutes.map((item) => {
        // 如果 path 一样则覆盖，因为子路由的 path 可能设置为空，导致和父路由一样，直接注册会提示路由重复
        if (res.some((v) => v.path == item.path)) {
          res.forEach((v, i) => {
            if (v.path == item.path) {
              res[i] = item;
            }
          });
        } else {
          res.push(item);
        }
      });
    } else {
      let tmpRoute = cloneDeep(route);
      if (baseUrl != "") {
        if (tmpRoute.path != "") {
          tmpRoute.path = `${baseUrl}/${tmpRoute.path}`;
        } else {
          tmpRoute.path = baseUrl;
        }
      }
      // 处理面包屑导航l,false 为了过滤掉undefined
      let tmpBreadcrumb = cloneDeep(breadcrumb);
      if (tmpRoute.meta.breadcrumb !== false) {
        tmpBreadcrumb.push({
          path: tmpRoute.path,
          title: tmpRoute.meta.title,
          i18n: tmpRoute.meta.i18n,
        });
      }
      tmpRoute.meta.breadcrumbNeste = tmpBreadcrumb;
      res.push(tmpRoute);
    }
  });
  return res;
}

export async function urlParamsLogin(router) {
  const useSystem = useOutsideSystemStore();
  let params = useUrlSearchParams("hash");
  if (params.t) {
    console.info("开启系统免等");
    useSystem.noLogin(params).then(() => {
      console.info("免登成功");
      router.replace({ path: "/" });
    });
  }
}

export const usePageTitle = (to) => {
  const projectTitle = import.meta.env.VITE_APP_TITLE;
  const rawTitle = normalizeTitle(to.meta.title);
  const title = useTitle();
  title.value = rawTitle ? `${projectTitle} | ${rawTitle}` : projectTitle;
  function normalizeTitle(raw) {
    return typeof raw === "function" ? raw() : raw;
  }
};

/**
 * @description 在具有token切不过期的情况下,重新鉴权router组
 */
export async function generateAsyncRouter(router, asyncRoutes) {
  const settingsOutsideStore = useSettingsOutsideStore();
  const userOutsideStore = useUserOutsideStore();

  if (userOutsideStore.isLogin) {
    // 启动前端控制路由 or 后端控制路由
    if (!settingsOutsideStore.app.enableBackendReturnRoute) {
      // 前端生成路由
      console.log(asyncRoutes);

      let accessedRoutes;
      try {
        // 如果权限功能开启，则需要对路由数据进行筛选过滤
        if (settingsOutsideStore.app.enablePermission) {
          // 可以调用接口获取权限列表
          // const permissions = await userStore.getPermissions();
          // 这里模拟权限列表
          const permissions = userOutsideStore.permissions;
          accessedRoutes = filterAsyncRoutes(
            cloneDeep(asyncRoutes),
            permissions
          );
        } else {
          accessedRoutes = cloneDeep(asyncRoutes);
        }
        console.log(accessedRoutes);

        const dg = (children) => {
          if (!children?.length) return [];
          return children.map((route) => {
            if (route.children) {
              let childrenBaseUrl = "";
              if (baseUrl == "") {
                childrenBaseUrl = route.path;
              } else if (route.path != "") {
                childrenBaseUrl = `${baseUrl}/${route.path}`;
              }
              let childrenBreadcrumb = cloneDeep(breadcrumb);
              if (route.meta.breadcrumb !== false) {
                childrenBreadcrumb.push({
                  path: childrenBaseUrl,
                  title: route.meta.title,
                  i18n: route.meta.i18n,
                });
              }
              let tmpRoute = cloneDeep(route);
              tmpRoute.path = childrenBaseUrl;
              tmpRoute.meta.breadcrumbNeste = childrenBreadcrumb;
            }
            return {
              icon: () => h(Icon, { icon: route.meta.icon }),
              key: route.name,
              label: route.meta.title ? route.meta.title : route.name,
              title: route.meta.title ? route.meta.title : route.name,
              path: route.path,
            };
          });
        };
        // 设置 routes 数据
        userOutsideStore.isGenerate = true;
        // userOutsideStore.menuList = dg(accessedRoutes);
        // userOutsideStore.breadcrumb = dg(accessedRoutes);

        console.log(flatAsyncRoutes(accessedRoutes, [], ""));
      } catch (err) {}
    } else {
      // 后端生成路由
      await userOutsideStore.generateRoutesAtBack();
    }
    // 记录需要卸载的路由栈
    // let removeRoutes = [];
    // routeOutsideStore.flatRoutes.forEach((route) => {
    //   if (!/^(https?:|mailto:|tel:)/.test(route.path)) {
    //     removeRoutes.push(router.addRoute(route));
    //   }
    // });
    // removeRoutes.push(router.addRoute(lastRoute));
    // // 记录路由数据，在登出时会使用到，不使用 removeRoute 是考虑配置的路由可能不一定有设置 name ，则通过调用 router.addRoute() 返回的回调进行删除
    // userOutsideStore.setCurrentRemoveRoutes(removeRoutes);
  }
}
