<script setup>
import { computed, onBeforeMount, watch } from "vue";

import { useSettingStore } from "@/store/settingStore.js";

import { useDark } from "@vueuse/core";

import { useWindowSize } from "@vant/use";

const settingsStore = useSettingStore();

const theme = computed(() => settingsStore.theme);

const { width, height } = useWindowSize();

const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
  storageKey: "theme",
  // 暗黑class名字
  valueDark: "dark",
  // 高亮class名字
  valueLight: "light"
});

watch([width, height], () => {
  console.log("window resized");
  console.log("width", width.value);
  console.log("height", height.value);
  //宽度小于500设置为移动端样式
  settingsStore.setIsMobile(width.value < 500);
});
</script>

<template>
  <van-config-provider :theme="theme" class="h100">
    <transition name="el-fade-in-linear">
      <router-view></router-view>
    </transition>
  </van-config-provider>
</template>

<style lang="less">
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.dark {
  background-color: #454545;
}
.light {
  background-color: #fff;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.1);
  background: #ced0d0;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background: #ffffff;
}

/* 在移动端视口宽度小于或等于500px时应用 */
@media (max-width: 500px) {
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
