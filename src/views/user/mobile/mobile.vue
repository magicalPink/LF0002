<template>
  <div class="pt10">
    <div class="userContent mx5 radius5 mb10 p5 flex justify-between">
      <div>
        <h3>{{param.userStore.userInfo.nickname || 'MeiHL'}}</h3>
      </div>
      <van-image
        width="70"
        height="70"
        src="/logo.png"
        radius="5"
      />
    </div>
    <van-cell title="编辑资料" is-link />
    <van-cell center title="暗黑主题">
      <template #right-icon>
        <van-switch
          v-model="theme"
          active-value="dark"
          inactive-value="auto"
          @click="param.toggle()"
          @change="(theme) => param.settingsStore.setTheme(theme)"
        >
        </van-switch>
      </template>
    </van-cell>
    <div class="mt10 mx5">
      <van-button :loading="loading" block @click="param.userStore.logout()">退出登录</van-button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import { inject } from 'vue';

import { useSettingStore } from "@/store/settingStore.js";

const settingsStore = useSettingStore()

const param = inject('param');

const theme = computed(() => settingsStore.theme)

</script>

<style scoped>
.userContent {
  border: 1px solid #e5e5e5;
}
</style>
