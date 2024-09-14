<template>
  <a-layout-header class="header" :style="{ padding: '0 16px' }">
    <div class="logo">
      <a href="/"
        ><img src="@/assets/logo.png" alt="logo" /><span>设备管理平台</span></a
      >
    </div>
    <!-- <a-menu
      v-model:selectedKeys="selectedKeys1"
      theme="dark"
      mode="horizontal"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="1">nav 1</a-menu-item>
      <a-menu-item key="2">nav 2</a-menu-item>
      <a-menu-item key="3">nav 3</a-menu-item>
    </a-menu> -->
    <a-space warp>
      <a-button shape="circle">
        <template #icon>
          <Icon icon="SearchOutlined" />
        </template>
      </a-button>
      <ToggleTheme />
    </a-space>
    <div class="avatar-box mt--2px">
      <a-popover trigger="hover" placement="bottom" :arrow="false">
        <template #content>
          <p>ContentContent</p>
          <p>Content</p>
        </template>
        <a-avatar class="cursor-pointer" src="/avatar.png" alt="avatar" size="large" />
      </a-popover>
    </div>
  </a-layout-header>
</template>

<script setup>
const selectedKeys1 = ref(["2"]);
</script>

<style lang="scss" scoped>
.ant-layout-header {
  display: flex;
  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02),
    0 2px 4px 0 rgba(0, 0, 0, 0.02);
  background: var(--zdy-c-box-bg);
  z-index: 1;
  .logo {
    height: var(--header-height);
    overflow: hidden;
    line-height: var(--header-height);
    margin-right: 24px;
    a {
      display: flex;
      align-items: center;
      color: var(--site-text-color);
      font-size: 18px;
      white-space: nowrap;
      text-decoration: none;
    }
    img {
      margin-right: 16px;
    }
  }
  .ant-space {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
  }
}
</style>
