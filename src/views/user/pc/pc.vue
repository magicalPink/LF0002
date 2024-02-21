<template>
  <div>
    pc
    <el-switch
      inline-prompt
      v-model="theme"
      active-value="dark"
      inactive-value="auto"
      @click="param.toggle()"
      @change="(theme) => param.settingsStore.setTheme(theme)"
    >
    </el-switch>
    <el-button @click="param.userStore.logout()">退出登录</el-button>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { inject } from 'vue';

import { useSettingStore } from "@/store/settingStore.js";

const settingsStore = useSettingStore()

const param = inject('param');

const theme = computed(() => settingsStore.theme)

</script>

<style scoped>

</style>
