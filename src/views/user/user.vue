<template>
  <div>
    <MobileView v-if="isMobile"/>
    <PCView v-else/>
  </div>
</template>

<script setup>
import PCView from "./pc/pc.vue"

import MobileView from "./mobile/mobile.vue"

import Message from "@/utils/message.js"

import { setNickname, setAvatar } from "@/api/user.js";

import { computed, provide } from "vue";

import { useToggle } from '@vueuse/shared'

import { useDark } from "@vueuse/core";

import { useUserStore } from "@/store/userStore.js";

import { useSettingStore } from "@/store/settingStore.js";

const settingsStore = useSettingStore()

const theme = computed(() => settingsStore.theme)

const isMobile = computed(() => settingsStore.isMobile)

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

const setNickName = (data,callback) => {
  setNickname(data).then(res => {
    console.log(res);
    Message({
      message: '修改成功',
      type:'success'
    })
    userStore.getUserInfo()
    callback()
  })
}

const setUserAvatar = (data,callback) => {
  setAvatar(data).then(res => {
    Message({
      message: '修改成功',
      type:'success'
    })
    userStore.getUserInfo()
    callback()
  })
}

provide('param',{userStore,settingsStore,theme,isDark,toggle,setNickName,setUserAvatar})

</script>

<style scoped>

</style>
