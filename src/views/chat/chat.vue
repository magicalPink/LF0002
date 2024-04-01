<template>
    <MobileView v-if="isMobile" :onlineList="onlineList"/>
    <PCView v-else/>
</template>

<script setup>
import PCView from "./pc/pc.vue"

import MobileView from "./mobile/mobile.vue"

import { ref, computed } from "vue";

import { useSettingStore } from "@/store/settingStore.js";

import { useUserStore } from "@/store/userStore.js";

const settingsStore = useSettingStore()

const userStore = useUserStore()

const isMobile = computed(() => settingsStore.isMobile)

const onlineList = computed(() => userStore.onlineList)
</script>

<style scoped>

</style>
