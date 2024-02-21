<script setup>
import { computed } from "vue";

import { useSettingStore } from "@/store/settingStore.js";

import { useDark } from "@vueuse/core";

const settingsStore = useSettingStore();

const theme = computed(() => settingsStore.theme);

const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
  storageKey: "theme",
  // 暗黑class名字
  valueDark: "dark",
  // 高亮class名字
  valueLight: "light"
});
</script>

<template>
  <van-config-provider :theme="theme">
    <router-view></router-view>
  </van-config-provider>
</template>

<style lang="less">
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.1);
  background: #78b4b4;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(87, 175, 187, 0.1);
  border-radius: 10px;
  background: #ededed;
}

* {
  margin: 0;
  padding: 0;
}

/* 在移动端视口宽度小于或等于768px时应用 */
@media (max-width: 768px) {
  body {
    font-size: 16px; /* 这里的px会被转换成vw单位 */
  }
}

body {
  height: 100vh;
  padding: 0;
  margin: 0;
}

#app {
  width: 100%;
  height: 100%;
}


</style>
