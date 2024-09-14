import { defineStore } from "pinia";
import { piniaStore } from "@/stores";
import storage from "@/utils/storage";
import { useUrlSearchParams } from "@vueuse/core";

export const useUserStore = defineStore("user", {
  state: () => ({
    account: storage.local.get("account") || "",
    // token: storage.local.get('token') || '',
    token: 'true',
    failure_time: storage.local.get("failure_time") || "",
    permissions: [], // 权限列表
    removeRoutes: [], // 缓存删除路由
    menuList: [], // 菜单列表
    breadcrumb: [], // 面包屑导航
    isGenerate: false, // 是否已生成路由
  }),
  getters: {
    isLogin: (state) => {
      return !!state.token;
    },
  },
  actions: {
    login(data) {
      const { API_LOGIN } = useRequest();
      return new Promise((resolve, reject) => {
        // 通过 mock 进行登录
        API_LOGIN(data)
          .then((res) => {
            storage.local.set("account", res.account);
            storage.local.set("token", res.token);
            storage.local.set("failure_time", res.failure_time);
            this.account = res.account;
            this.token = res.token;
            this.failure_time = res.failure_time;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async logoutBeforeAsk(loginFailure) {
      if (loginFailure) return true;
      return ElMessageBox.confirm("是否退出当前用户？", "提示", {
        type: "warning",
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        draggable: true,
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "已成功退出登录",
          });
          return true;
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消退出登录",
          });
          return false;
        });
    },
    /**
     * 擦除 searchParams、storage和pinia
     */
    async logout() {
      const params = useUrlSearchParams("history");

      params.token = "";
      storage.local.remove("account");
      storage.local.remove("token");
      storage.local.remove("failure_time");
      this.account = "";
      this.token = "";
      this.failure_time = "";
      this.permissions = [];
    },
    // 获取我的权限
    getPermissions() {
      const { API_PERMISSION } = useRequest();
      return new Promise((resolve, reject) => {
        // 通过 mock 获取权限
        API_PERMISSION({ account: this.account }).then((res) => {
          if (!res) {
            reject(new Error("权限获取失败"));
          }
          this.permissions = res.permissions;
          resolve(res.permissions);
        });
      });
    },
    editPassword(data) {
      const { API_EDIT_PASSWORD } = useRequest();
      return new Promise((resolve) => {
        API_EDIT_PASSWORD({
          account: this.account,
          password: data.password,
          newpassword: data.newpassword,
        }).then(() => {
          resolve();
        });
      });
    },
    setCurrentRemoveRoutes(routes) {
      this.removeRoutes = routes;
    },
  },
});

export function useUserOutsideStore() {
  return useUserStore(piniaStore);
}
