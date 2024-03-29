<template>
  <div class="flex">
    <el-card style="width: 200px" class="m5" shadow="always" @click="gomoku">五子棋</el-card>
    <el-card style="width: 200px" class="m5" shadow="always" @click="router.push('DeepFriedGoldenFlower')">炸金花
    </el-card>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";

import MessageBox from "@/utils/messageBox.js";

import { useUserStore } from "@/store/userStore.js";

import { useRouter } from "vue-router";

const userStore = useUserStore();

const router = useRouter();

const param = inject("param");

const gomoku = () => {
  MessageBox(
    "confirm",
    {
      message: "请选择你的操作",
      title: "提示",
      confirmButtonText:'创建房间',
      cancelButtonText:'加入房间'
    },
    () => {
      userStore.sendMessage({
        Game: "Gomoku",
        user: userStore.userInfo,
        type: "createRoom"
      });
    },
    () => {
      userStore.sendMessage({
        Game: "Gomoku",
        user: userStore.userInfo,
        type: "joinRoom",
        roomId: 23263
      });
    }
  );
};

</script>

<style scoped>

</style>
