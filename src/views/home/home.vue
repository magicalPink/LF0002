<template>
  <div class="common-layout h100">
    <!--          添加路由缓存-->
    <router-view v-slot="{ Component }">
      <keep-alive :include="[]">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <van-tabbar v-if="isMobile" v-model="active">
      <van-tabbar-item name="Game" icon="gem-o" @click="router.push('Game')">游戏</van-tabbar-item>
      <van-tabbar-item name="Music" icon="music-o" @click="router.push('Music')">音乐</van-tabbar-item>
      <van-tabbar-item name="Chat" icon="chat-o" @click="router.push('Chat')">聊天</van-tabbar-item>
      <van-tabbar-item name="User" icon="contact-o" @click="router.push('User')">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>

import { ref, onBeforeMount, onDeactivated, computed, watch } from "vue";

import { useUserStore } from "@/store/userStore.js";

import { useRoute,useRouter } from "vue-router";

import { useSettingStore } from "@/store/settingStore.js";

const settingsStore = useSettingStore();

const isMobile = computed(() => settingsStore.isMobile)

const router = useRouter()

const route = useRoute()

const userStore = useUserStore();

const active = ref(route.name)

watch(route,() => active.value = route.name)

onBeforeMount(() => userStore.getUserInfo());

</script>

<style scoped>
.main {
  height: 100%;
}
</style>
