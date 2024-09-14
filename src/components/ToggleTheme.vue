<!-- 主题切换 -->
<template>
  <a-button shape="circle" @click="toggleTheme">
    <template #icon>
      <div class="sun" v-if="!toggleDarkModel">
        <Icon
          icon="line-md:moon-to-sunny-outline-loop-transition"
          height="16"
          width="16"
          mb--2px
        />
      </div>
      <div class="moon" v-else>
        <Icon
          icon="line-md:sunny-outline-to-moon-loop-transition"
          height="16"
          width="16"
          mb--2px
        />
      </div>
    </template>
  </a-button>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useTheme } from "@/hooks/useTheme.js";
defineOptions({
  name: "ToggleTheme",
});
const { toggleDarkModel, toggleTheme } = useTheme();
</script>
