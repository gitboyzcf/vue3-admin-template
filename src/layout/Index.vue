<template>
  <a-layout class="layout-box">
    <LayoutHeader></LayoutHeader>
    <a-layout>
      <LayoutSider></LayoutSider>
      <LayoutMain>
        <router-view />
      </LayoutMain>
    </a-layout>
  </a-layout>
</template>
<script setup>
import LayoutHeader from "./LayoutHeader.vue";
import LayoutSider from "./LayoutSider.vue";
import LayoutMain from "./LayoutMain.vue";
</script>
<style scoped>
.layout-box{
  height: 100%;
}
</style>
