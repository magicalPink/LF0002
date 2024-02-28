<template>
  <div class="h100">
    <!--          添加路由缓存-->
    <div class="h100 flex">
      <el-menu
        :default-active="active"
        :collapse="true"
        v-if="!isMobile"
        router
      >
        <el-menu-item index="Game">
          <van-icon name="gem" size="24"/>
        </el-menu-item>
        <el-menu-item index="Music">
          <van-icon name="music" size="24"/>
        </el-menu-item>
        <el-menu-item index="Chat">
          <van-icon name="chat" size="24"/>
        </el-menu-item>
        <el-menu-item index="User">
          <van-icon name="contact" size="24"/>
        </el-menu-item>
      </el-menu>
      <div style="flex: 1">
        <router-view v-slot="{ Component }">
          <keep-alive :include="[]">
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
      </div>
    </div>
    <van-tabbar v-if="isMobile && showTabbar" v-model="active">
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

import { useRoute, useRouter } from "vue-router";

import { useSettingStore } from "@/store/settingStore.js";

const settingsStore = useSettingStore();

const isMobile = computed(() => settingsStore.isMobile);

const router = useRouter();

const route = useRoute();

const userStore = useUserStore();

const active = ref(route.name);

const showTabbar = computed(() => {
  return active.value === "Game" || active.value === "Music" || active.value === "Chat" || active.value === "User"
})

watch(route, () => active.value = route.name);

onBeforeMount(() => userStore.getUserInfo());

onBeforeMount(() => userStore.startSockst());

</script>

<style scoped>
</style>
