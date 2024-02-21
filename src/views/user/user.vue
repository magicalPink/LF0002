<template>
  <div>
    <el-switch
      inline-prompt
      :model-value="theme"
      active-value="dark"
      inactive-value="auto"
      @click="toggle()"
      @change="(theme) => settingsStore.setTheme(theme)"
    >
    </el-switch>
        <el-button @click="userStore.logout()">退出登录</el-button>
        <van-button type="primary" >退出登录</van-button>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import { useToggle } from '@vueuse/shared'

import { useDark } from "@vueuse/core";

import { useUserStore } from "@/store/userStore.js";

import { useSettingStore } from "@/store/settingStore.js";

const settingsStore = useSettingStore()

const theme = computed(() => settingsStore.theme)

const userStore = useUserStore();

const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
  storageKey: 'theme',
  // 暗黑class名字
  valueDark: 'dark',
  // 高亮class名字
  valueLight: 'light',
})

const toggle = useToggle(isDark);

</script>

<style scoped>

</style>
