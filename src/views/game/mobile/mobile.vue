<template>
  <div class="pt5">
    <van-grid :gutter="10">
      <van-grid-item class="pointer" :icon="getIcon('五子棋')" text="五子棋" @click="gomokuShow = true"/>
      <van-grid-item class="pointer" :icon="getIcon('炸金花')" text="棋牌" @click="router.push('DeepFriedGoldenFlower')"/>
    </van-grid>
    <van-action-sheet
        v-model:show="gomokuShow"
        :actions="actions"
        cancel-text="取消"
        close-on-click-action
        @select="selectGomoku"
    />
  </div>
</template>

<script setup>
import {ref} from "vue";

import { useUserStore } from "@/store/userStore.js";

import { useSettingStore } from "@/store/settingStore.js";

import {useRouter} from "vue-router";

const userStore = useUserStore()

const router = useRouter()

const settingsStore = useSettingStore()

const gomokuShow = ref(false);

const actions = [
  {name: '加入房间'},
  {name: '创建房间'},
];

const selectGomoku = (value, num) => {
  const {name} = value
  if (name == "加入房间") {
    userStore.sendMessage({
      Game:'Gomoku',
      user:userStore.userInfo,
      type:"joinRoom",
      roomId:23263
    })
  } else {
    userStore.sendMessage({
      Game:'Gomoku',
      user:userStore.userInfo,
      type:"createRoom",
    })
  }
}

const getIcon = (icon) => {
  if (icon == "五子棋") {
    if (settingsStore.theme === "auto") {
      return "/image/gomoku.png"
    } else {
      return "/image/gomokuWhite.png"
    }
  }
  if (icon == "炸金花") {
    if (settingsStore.theme === "auto") {
      return "/image/playingCard.png"
    } else {
      return "/image/playingCardWhite.png"
    }
  }
}

</script>

<style scoped>

</style>
