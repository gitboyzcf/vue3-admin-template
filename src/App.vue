<script setup>
import { RouterView } from "vue-router";
import { useOutsideSystemStore } from "@/stores/modules/system.js";
import { defaultLightTheme, defaultDarkTheme } from "@/themes";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import enUS from "ant-design-vue/es/locale/en_US";

const useSystem = useOutsideSystemStore();

const locale = shallowRef(zhCN);
const themeN = shallowRef();
watch(
  [() => useSystem.language, () => useSystem.scheme],
  ([newL, newS]) => {
    switch (newL) {
      case "zh":
        locale.value = zhCN;
        break;
      case "en":
        locale.value = enUS;
        break;
    }
    themeN.value = newS === "dark" ? defaultDarkTheme : defaultLightTheme;
  },
  { immediate: true }
);
</script>

<template>
  <a-config-provider :locale="locale" :theme="themeN">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </a-config-provider>
</template>

<style scoped lang="scss">
/* 进入之前和离开后的样式 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* 离开和进入过程中的样式 */
.fade-enter-active,
.fade-leave-active {
  /* 添加过渡动画 */
  transition: opacity 0.2s ease;
}
/* 进入之后和离开之前的样式 */
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
