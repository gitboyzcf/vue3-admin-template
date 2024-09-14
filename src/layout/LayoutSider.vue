<template>
  <a-layout-sider
    width="200"
    v-model:collapsed="useSettings.subMenuCollapseLastStatus"
    collapsible
    breakpoint="md"
    collapsedWidth="80"
    :theme="themeComputed"
    :style="styleUpdate"
  >
    <a-menu
      mode="inline"
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      :items="items"
      :style="{ ...styleUpdate, overflow: 'auto' }"
    ></a-menu>
    <template #trigger>
      <Icon
        icon="icon-park-outline:menu-fold-one"
        v-if="useSettings.subMenuCollapseLastStatus"
      />
      <Icon icon="icon-park-outline:menu-unfold-one" v-else />
    </template>
  </a-layout-sider>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useOutsideSystemStore } from "@/stores/modules/system.js";
import { useSettingsOutsideStore } from "@/stores/modules/settings.js";
const useSystem = useOutsideSystemStore();
const useSettings = useSettingsOutsideStore();

const state = reactive({
  selectedKeys: [],
  openKeys: [],
  preOpenKeys: [],
});
const styleUpdate = reactive({
  background: "var(--zdy-c-box-bg)",
  height: "100%",
});

const themeComputed = computed(() => {
  return useSystem.scheme != "dark" ? "light" : "dark";
});
const items = reactive([
  {
    icon: () => h(Icon, { icon: "ep:monitor" }),
    key: "1",
    label: "Option 1",
    title: "Option 1",
  },
  {
    icon: () => h(Icon, { icon: "ep:monitor" }),
    key: "2",
    label: "Option 2",
    title: "Option 2",
  },
  {
    icon: () => h(Icon, { icon: "ep:monitor" }),
    key: "3",
    label: "Option 3",
    title: "Option 3",
  },
  {
    icon: () => h(Icon, { icon: "ep:monitor" }),
    key: "sub1",
    label: "Navigation One",
    title: "Navigation One",
    children: [
      {
        key: "5",
        label: "Option 5",
        title: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
        title: "Option 6",
      },
      {
        key: "7",
        label: "Option 7",
        title: "Option 7",
      },
      {
        key: "8",
        label: "Option 8",
        title: "Option 8",
      },
    ],
  },
  {
    icon: () => h(Icon, { icon: "ep:monitor" }),
    key: "sub2",
    label: "Navigation Two",
    title: "Navigation Two",
    children: [
      {
        key: "9",
        label: "Option 9",
        title: "Option 9",
      },
      {
        key: "10",
        label: "Option 10",
        title: "Option 10",
      },
      {
        key: "sub3",
        label: "Submenu",
        title: "Submenu",
        children: [
          {
            key: "11",
            label: "Option 11",
            title: "Option 11",
          },
          {
            key: "12",
            label: "Option 12",
            title: "Option 12",
          },
        ],
      },
    ],
  },
]);
</script>

<style lang="scss">
.site-layout-background {
  background: #fff;
}
.ant-layout-sider-trigger {
  box-shadow:
    1px 0 2px 0 rgba(0, 0, 0, 0.03),
    1px 0 6px -1px rgba(0, 0, 0, 0.02),
    2px 0 4px 0 rgba(0, 0, 0, 0.02);
}
</style>
