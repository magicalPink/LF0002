<template>
    <MobileView v-if="isMobile" :onlineList="onlineList"/>
    <PCView v-else/>
</template>

<script setup>
import PCView from "./pc/pc.vue"

import MobileView from "./mobile/mobile.vue"

import { ref, computed, onMounted } from "vue";

import { getOnlineList } from "@/api/user.js";

import { useSettingStore } from "@/store/settingStore.js";

const settingsStore = useSettingStore()

const isMobile = computed(() => settingsStore.isMobile)

let onlineList = ref([])

onMounted(() => {
  getOnlineList().then(res => {
    onlineList.value = res.data.data
  })
})
</script>

<style scoped>

</style>
