<template>
  <div class="p5">
    <el-card>
      <div class="mx5 radius5 flex justify-between">
        <div>
          <h3>{{ userStore.userInfo.nickname || "MeiHL" }}</h3>
        </div>
        <van-image
          width="70"
          height="70"
          src="/logo.png"
          radius="5"
        />
      </div>
    </el-card>
    <el-card class="mt5">
      <div class="flex justify-between items-center">
        <h4>暗黑模式</h4>
        <el-switch
          inline-prompt
          v-model="theme"
          active-value="dark"
          inactive-value="auto"
          @click="param.toggle()"
          @change="(theme) => settingsStore.setTheme(theme)"
        >
        </el-switch>
      </div>
    </el-card>
    <el-card class="mt5">
      <div class="flex justify-between items-center">
        <h4>退出登录</h4>
        <el-button @click="userStore.logout()">退出登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { inject } from "vue";

import { useSettingStore } from "@/store/settingStore.js";

const settingsStore = useSettingStore();

import { useUserStore } from "@/store/userStore.js";

const userStore = useUserStore();

const param = inject("param");

const theme = computed(() => settingsStore.theme);

</script>

<style scoped>
</style>
