<template>
  <div class="h100 pt10 flex flex-column justify-center pb50" style="background-color: #F2F3F7">
    <p class="pr10 absolute w100" style="text-align: right;top:10px">房间号：<span class="blue">{{roomData?.roomId?.slice(7,15)}}</span></p>
    <!--  对手  -->
    <div class="flex items-center m5">
      <Avatar size="50" :src="gomokuStore.opponent?.avatar"/>
      <div v-if="gomokuStore.opponent?.id">
        <p class="ml5 black">{{ gomokuStore.opponent?.nickname }}</p>
      </div>
      <p v-else class="ml5">正在等待对手</p>
    </div>
    <!--  棋盘  -->
    <div class="chessboard">
          <div class="flex" v-for="(item,line) in roomData.chessboard" :key="line">
            <div @click="drop(line,cell,l)" class="chess-cell" v-for="(l,cell) in item" :key="cell">
              <div class="blackC" v-if="l == 1">
              </div>
              <div class="whiteC" v-if="l == 0">
              </div>
            </div>
          </div>
    </div>
    <!--  自己  -->
    <div class="flex items-center row-reverse mr5">
      <Avatar size="50" :src="gomokuStore.oneSelf?.avatar"/>
      <div>
        <p class="mr5 black" style="text-align: right">{{ gomokuStore.oneSelf?.nickname }}</p>
      </div>
    </div>
   <!-- 操作区   -->
    <div class="flex justify-between px10 absolute w100" style="bottom: 20px">
      <roundButton label="离开" icon="arrow-left" @click="router.go(-1)"/>
      <roundButton label="认输" icon="warning"/>
      <roundButton label="悔棋" icon="underway"/>
      <roundButton label="发言" icon="chat"/>
      <roundButton label="表情" icon="smile"/>
    </div>
    <div class="flex justify-center absolute-t50 w100">
      <van-button style="margin-right: 10px" type="primary" round>开始游戏</van-button>
      <van-button style="margin-left: 10px" type="success" round>邀请好友</van-button>
    </div>
  </div>
</template>

<script setup>
import roundButton from "@/components/roundButton/index.vue"

import Avatar from "@/components/avatar/index.vue"

import {computed, onMounted, ref} from 'vue'

import { useGomokuStore } from "@/store/gomokuStore.js";

import { useUserStore } from "@/store/userStore.js";

const userStore = useUserStore()

const gomokuStore = useGomokuStore()

const roomData = computed(() => gomokuStore.roomData)

import {useRouter} from "vue-router";

const router = useRouter()

const drop = () => {}
</script>

<style lang="less" scoped>
.chessboard {
  margin: 20px auto;
  width: calc(23px * 15);
  background-image: url("/image/chassbord.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover; /* 自动计算并缩放图像以完全覆盖元素 */
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4); /* 添加阴影 */
}
.blackC, .whiteC {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* 添加阴影 */
  border: 1px solid rgba(0, 0, 0, 0.2); /* 边框增加立体感 */
  position: relative;
}

.blackC {
  position: relative;
  background-color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 黑棋更深的阴影 */
  border: 1px solid rgba(255, 255, 255, 0.2); /* 为黑棋添加亮边以增加立体感 */
}

.whiteC {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* 白棋较浅的阴影 */
}
/* 以下是可选的光泽效果 */
.blackC::after, .whiteC::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 5% 53%, rgba(255, 255, 255, 0.5), transparent);
  border-radius: 50%;
}
.chess-cell {
  width: 23px;
  height: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
