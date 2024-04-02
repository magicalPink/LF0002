<template>
  <div class="pt10">
    <div class="border mx5 radius5 mb10 p5 flex justify-between">
      <div>
        <h4>{{ userStore.userInfo.nickname || "MeiHL" }}</h4>
      </div>
      <van-image
        width="70"
        height="70"
        :src="userStore.userInfo.avatar"
        radius="5"
      />
    </div>
    <van-cell title="修改头像" is-link @click="avatarShow = true" />
    <van-cell title="修改昵称" is-link @click="nicknameShow = true" />
    <van-cell title="修改密码" is-link />
    <van-cell center title="暗黑主题">
      <template #right-icon>
        <van-switch
          v-model="theme"
          active-value="dark"
          inactive-value="auto"
          @click="param.toggle()"
          @change="(theme) => settingsStore.setTheme(theme)"
        >
        </van-switch>
      </template>
    </van-cell>
    <div class="mt10 mx5">
      <van-button block @click="userStore.logout()">退出登录</van-button>
    </div>
    <!--  修改头像  -->
    <van-popup
      v-model:show="nicknameShow"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <van-nav-bar
        title="修改昵称"
        right-text="确认"
        left-arrow
        @click-left="nicknameShow = false"
        @click-right="setNickName"
      />
      <van-field v-model="nickName" maxlength="6" placeholder="请输入用户名" />
    </van-popup>
    <!--  修改头像  -->
    <van-popup
      v-model:show="avatarShow"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <div class="flex flex-column h100">
        <van-nav-bar
          title="修改头像"
          right-text="确认"
          left-arrow
          @click-left="avatarShow = false"
          @click-right="setAvatar"
        />
        <div class="flex justify-center my5">
          <van-image
            width="80%"
            :src="avatar"
            radius="10"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <div class="auto flex flex-wrap justify-center">
          <van-image
            class="ml5 mb5 flex-none"
            width="70"
            v-for="item in avatarList"
            :src="item"
            radius="10"
            @click="avatar = item"
          />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

import { inject } from "vue";

import { useSettingStore } from "@/store/settingStore.js";

const settingsStore = useSettingStore();

import { useUserStore } from "@/store/userStore.js";

const userStore = useUserStore();

const param = inject("param");

const nickName = ref("");

const theme = computed(() => settingsStore.theme);

let nicknameShow = ref(false);

const avatarShow = ref(false);

const avatar = ref("");

const avatarList = ref([
  "/image/avatar/avatar1.png",
  "/image/avatar/avatar2.png",
  "/image/avatar/avatar3.png",
  "/image/avatar/avatar4.png",
  "/image/avatar/avatar5.png",
  "/image/avatar/avatar6.png",
  "/image/avatar/avatar7.png",
  "/image/avatar/avatar8.png",
  "/image/avatar/avatar9.png",
  "/image/avatar/avatar10.png"
]);

const setNickName = () => {
  param.setNickName(
    { id: userStore.userInfo.id, nickname: nickName.value },
    () => {
      nicknameShow.value = false;
    }
  );
};

const setAvatar = () => {
  param.setUserAvatar(
    { id: userStore.userInfo.id, avatar: avatar.value },
    () => {
      avatarShow.value = false;
    }
  );
};

onMounted(() => {
  nickName.value = JSON.parse(sessionStorage.getItem("userInfo")).nickname;
  avatar.value = JSON.parse(sessionStorage.getItem("userInfo")).avatar;
});

</script>

<style scoped>
</style>
