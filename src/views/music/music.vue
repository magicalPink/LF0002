<template>
  <audio :src="'/music/music' + 1 + '.mp3'" ref="audio" controls></audio>
  <MobileView v-if="isMobile"/>
  <PCView v-else/>
</template>

<script setup>
import PCView from "./pc/pc.vue"

import MobileView from "./mobile/mobile.vue"

import { computed } from "vue";

import { useSettingStore } from "@/store/settingStore.js";

const settingsStore = useSettingStore()

const isMobile = computed(() => settingsStore.isMobile)

</script>

<style scoped>

</style>
