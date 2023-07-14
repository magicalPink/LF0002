<script setup>
import { onMounted, provide, ref, watch,computed } from "vue";
import { useStore } from 'vuex'
import RoomList from "./room.vue";
const store = useStore()
import { ElMessage } from "element-plus";
import { formatDate } from "@/utils/tool.js";
const input = ref("");
let roomList = ref([]);
let gameRoom = ref({});

let socket = computed(() => store.state.socket);
let oneself = computed(() => gameRoom.value.userList.find(item => item.id === store.state.userInfo.id) || {});
let allReady = computed(() => gameRoom.value.userList.every(item => item.ready));
let userInfo = store.state.userInfo || JSON.parse(sessionStorage.getItem("userInfo"));
provide("roomList", roomList);
provide("createRoom", (room) => createRoom(room));
provide("joinRoom", (roomId) => joinRoom(roomId));
//监听房间列表变化，从而加入自己的房间
watch(roomList, (roomList) => {
  if (roomList) {
    console.log(roomList);
    gameRoom.value = roomList.find(item => item.userList.some(user => user.id === userInfo.id));
  }
});

watch(socket, (s) => {
  initSocket();
}, { deep:true });

const initSocket = () => {
  if(!socket.value) return;
  // 监听连接成功事件
  socket.value.onopen = () => {
    console.log("WebSocket连接已建立");
  };
// 监听连接关闭事件
  socket.value.onclose = () => {
    console.log("WebSocket连接已关闭");
  };

// 监听接收到消息事件
  socket.value.onmessage = (event) => {
    const message = JSON.parse(event.data);
    // 处理接收到的消息
    console.log("接收到消息:", message);
    if( message.type === "success") {
      ElMessage.success(message);
    }
    if( message.message === "游戏已开始") {
      gameRoom.value.status = 1;
      gameRoom.value.gameList = [
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
        [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
      ];
    }
    if( message.type === "warning") {
      ElMessage.warning(message);
    }
    if (message.type === "roomList") {
      roomList.value = message.roomList;
    }
    if (message.type === "chatList") {
      gameRoom.value.chatList = message.chatList;
    }
    if( message.type === "drop") {
      gameRoom.value.gameList[message.info.x][message.info.y] = message.info.role;
      gameRoom.value.currentUser = message.info.role === 1 ? 0 : 1;
    }
    if( message.type === "gameOver") {
      gameRoom.value.status = 2;
      gameRoom.value.ending = message.ending;
      if(message.ending === oneself.value.role) {
        ElMessage.success("你赢了");
      } else {
        ElMessage.error("你输了");
      }
    }
  };
}

const sendMsg = () => {
  // 发送消息
  if(input.value === "") return ElMessage.warning("消息不能为空");
  socket.value.send(JSON.stringify({ type: "message", roomId: gameRoom.value.roomId, message: input.value }));
  input.value = "";
};

//离开房间
function leaveRoom() {
  console.log(socket.value);
  socket.value.send(JSON.stringify({
    type: "leaveRoom",
    roomId: gameRoom.value.roomId
  }));
}

//创建房间
function createRoom(room) {
  socket.value.send(JSON.stringify({
    type: "createRoom"
  }));
}

//加入房间
function joinRoom(roomId) {
  socket.value.send(JSON.stringify({
    type: "joinRoom",
    roomId: roomId
  }));
}

//断开连接
function closeSocket() {
  socket.value.close();
}

//就绪
function ready() {
  socket.value.send(JSON.stringify({
    type: "ready",
    roomId: gameRoom.value.roomId
  }));
}

//开始游戏
function startGame() {
  if(!allReady.value) return ElMessage.warning("请等待对方就绪");
  if(gameRoom.value.userList.length < 2) return ElMessage.warning("请等待对方加入");
  socket.value.send(JSON.stringify({
    type: "startGame",
    roomId: gameRoom.value.roomId
  }));
}

//取消就绪
function unready() {
  socket.value.send(JSON.stringify({
    type: "unready",
    roomId: gameRoom.value.roomId
  }));
}

//提醒
function remind() {
  socket.value.send(JSON.stringify({
    type: "remind",
    roomId: gameRoom.value.roomId
  }));
}

//悔棋
function regret() {
  socket.value.send(JSON.stringify({
    type: "regret",
    roomId: gameRoom.value.roomId
  }));
}

//drop
function drop(line,cell,l) {
  if(gameRoom.value.status !== 1) return;
  if(gameRoom.value.currentUser !== oneself.value.role) return ElMessage.warning("还没轮到您");
  if(l !== 9) return;
  console.log(line,cell);
  socket.value.send(JSON.stringify({
    type: "drop",
    info: {
      x:line,
      y:cell,
      role: oneself.value.role,
      roomId: gameRoom.value.roomId
    },
  }));
}

//投降
function giveUp() {
  socket.value.send(JSON.stringify({
    type: "giveUp",
    roomId: gameRoom.value.roomId,
    role: oneself.value.role
  }));
}

</script>
<template>
  <div v-if="gameRoom && gameRoom.roomId">
    <h2>
      <span style="color: #186e06" class="pr10" v-if="gameRoom.status === 1">
        游戏已开始
        <span v-if="gameRoom.currentUser === oneself.role" style="color: #186e06">您的回合</span>
        <span v-else style="color:darkred;">对方回合</span>
      </span>
      <span v-else-if="gameRoom.status === 2">
        游戏已经结束
        <span v-if="gameRoom.ending === oneself.role" style="color: #186e06">您赢了</span>
        <span v-else style="color:darkred;">您输了</span>
      </span>
      <span style="color:darkred;" v-else>游戏未开始</span>

    </h2>

    <div class="flex">
      <div class="gameContent">
        <div class="line" v-for="(item,line) in gameRoom.gameList" :key="line">
          <div @click="drop(line,cell,l)" class="cell" v-for="(l,cell) in item" :key="cell">
            <div class="blackC" v-if="l == 1"></div>
            <div class="whiteC" v-if="l == 0"></div>
          </div>
        </div>
      </div>
      <div>
        <div v-if="gameRoom.chatList" class="chatContent">
          <div
            :style="userInfo.id === item.userId && {  backgroundImage: 'linear-gradient(85deg, #f8c5e3, #f6a8e5, #a38aef, #8ac3f6)'}"
            class="chatlist radius10 p3 m5 wrap" v-for="(item,index) in gameRoom.chatList" :key="index">
            <div>{{ formatDate(item.sendTime) }}</div>
            <div>
              <span>{{ item.nickname }}:</span>
              <span>{{ item.message }}</span>
            </div>
          </div>
        </div>
        <div class="flex">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-button @click="sendMsg">发送</el-button>
        </div>
        <div>
          <p>
            <span class="mr10">您当前是</span>
            <span style="color: red" v-if="oneself.role === 1">黑子</span>
            <span style="color: red" v-else>白子</span>
          </p>
          <p v-if="oneself.ready" style="color: #186e06">已准备</p>
          <p v-else style="color:darkred;">未准备</p>
          <el-button type="success" v-if="oneself.role === 1 && gameRoom.status !== 1" @click="startGame">开始游戏</el-button>
          <el-button type="success" v-if="!oneself.ready && gameRoom.status !== 1" @click="ready">就绪</el-button>
          <el-button type="warning" v-else-if="oneself.role !== 1 && gameRoom.status !== 1" @click="unready">取消就绪</el-button>
          <el-button type="primary"  v-if="gameRoom.currentUser !== oneself.role && gameRoom.status" @click="remind">提醒对方下棋</el-button>
          <el-button type="danger" v-if="gameRoom.status === 1" @click="regret" round>悔棋</el-button>
          <el-button @click="giveUp" v-if="gameRoom.status === 1">投降</el-button>
          <el-button type="danger" v-if="gameRoom.status !== 1" @click="leaveRoom">离开房间</el-button>
        </div>
      </div>

    </div>
  </div>
  <RoomList v-else />


</template>

<style lang="less" scoped>
.gameContent{
  flex-shrink:0;
}

.line {
  width: 600px;
  height: 40px;
  display: flex;
  background-color: #3781f8;
  .cell {
    width: 40px;
    height: 40px;
    margin: 0;
    border: 1px solid #ccc;
    box-sizing: border-box;
    .blackC {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #000;
      margin: 5px;
    }
    .whiteC {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #fff;
      margin: 5px;
    }
  }
}

.chatContent {
  width: 400px;
  height: 500px;
  overflow: auto;
}
.chatlist {
  background-image: linear-gradient(85deg, #8fcdff, #a8f6d3, #8ad1ef, #9ef68a);
}
</style>
