<template>
  <div class="h100 pt30" style="background-color: #F2F3F7">
    <!--  对手  -->
    <div class="flex items-center m5">
      <Avatar size="50" src="/image/avatar/avatar5.png"/>
      <div v-if="true">
        <p class="ml5 black">樟脑丸</p>
        <div class="ml5 mt2 flex black">
          <span>局时</span>
          <van-count-down class="ml3 relative top3 black" :time="300000"  format="mm:ss"/>
        </div>
      </div>
      <p v-else class="ml5">正在等待对手</p>
    </div>
    <!--  棋盘  -->
    <div class="chessboard">
          <div class="flex" v-for="(item,line) in chessboard" :key="line">
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
      <Avatar size="50" src="/image/avatar/avatar1.png"/>
      <div>
        <p class="mr5 black">梅干花菜鹿</p>
        <div class="mr5 mt2 flex black">
          <span>局时</span>
          <van-count-down class="ml3 relative top3 black" :time="300000"  format="mm:ss"/>
        </div>
      </div>
    </div>
   <!-- 操作区   -->
    <div class="flex justify-between p20">
      <roundButton label="离开" icon="arrow-left" @click="router.go(-1)"/>
      <roundButton label="认输" icon="warning"/>
      <roundButton label="悔棋" icon="underway"/>
      <roundButton label="发言" icon="chat"/>
      <roundButton label="表情" icon="smile"/>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

import Avatar from "@/components/avatar/index.vue"

import roundButton from "@/components/roundButton/index.vue"

import {useRouter} from "vue-router";

const router = useRouter()

const drop = () => {

}

const chessboard = ref([
  [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1],
  [9, 1, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 1, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 1, 0, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 1, 0, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [1, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
]
)
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