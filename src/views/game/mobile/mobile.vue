<template>
  <div class="pt5">
    <van-grid :gutter="10">
      <van-grid-item :icon="getIcon('五子棋')" text="五子棋" />
      <van-grid-item :icon="getIcon('炸金花')" text="炸金花" />
    </van-grid>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";

const param = inject("param");

const getIcon = (icon) => {
  if(icon == "五子棋") {
    if(param.settingsStore.theme === "auto") {
      return "/image/gomoku.png"
    } else {
      return "/image/gomokuWhite.png"
    }
  }
  if(icon == "炸金花") {
    if(param.settingsStore.theme === "auto") {
      return "/image/playingCard.png"
    } else {
      return "/image/playingCardWhite.png"
    }
  }
}
</script>

<style scoped>

</style>
