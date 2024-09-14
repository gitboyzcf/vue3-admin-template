<template>
  <a-layout style="padding: 0 16px 16px">
    <a-breadcrumb>
      <a-breadcrumb-item href="">
        <Icon icon="solar:home-broken"/>
      </a-breadcrumb-item>
      <a-breadcrumb-item href="">
        <span>Application List</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Application</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout-content :style="{ overflow: 'auto' }">
      <slot></slot>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { Icon } from "@iconify/vue";

</script>

<style lang="scss" scoped>
.ant-layout {
  background-color: var(--zdy-c-bg);
  .ant-layout-content {
    background-color: var(--zdy-c-box-bg);
  }
}
</style>
