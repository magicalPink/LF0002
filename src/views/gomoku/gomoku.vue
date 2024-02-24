<template>
    <MobileView v-if="isMobile"/>
    <PCView v-else/>
</template>

<script setup>
import PCView from "./pc/pc.vue"

import MobileView from "./mobile/mobile.vue"

import { computed, provide } from "vue";

import { useUserStore } from "@/store/userStore.js";

import { useSettingStore } from "@/store/settingStore.js";

const settingsStore = useSettingStore()

const isMobile = computed(() => settingsStore.isMobile)

const userStore = useUserStore();

provide('param',{userStore,settingsStore})

</script>

<style scoped>

</style>
