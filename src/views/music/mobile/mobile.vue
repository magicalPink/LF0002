<template>
  <div class="pt10">
    <van-button @click="musicStore.play(true)">播放</van-button>
    <van-button @click="musicStore.play(false)">暂停</van-button>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useMusicStore } from "@/store/musicStore.js";

const musicStore = useMusicStore()

musicStore.createMusicDom()
</script>

<style scoped>

</style>
