<template>
  <div>
    <MobileView v-if="isMobile" :onlineList="onlineList"/>
    <PCView v-else/>
  </div>
</template>

<script setup>
import PCView from "./pc/pc.vue"

import MobileView from "./mobile/mobile.vue"

import { ref, computed, onMounted, provide } from "vue";

import { getOnlineList } from "@/api/user.js";

import { useUserStore } from "@/store/userStore.js";

import { useSettingStore } from "@/store/settingStore.js";

const settingsStore = useSettingStore()

const isMobile = computed(() => settingsStore.isMobile)

const userStore = useUserStore();

let onlineList = ref([])

onMounted(() => {
  getOnlineList().then(res => {
    onlineList.value = res.data.data
  })
})

provide('param',{userStore,settingsStore})

</script>

<style scoped>

</style>
