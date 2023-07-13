<script setup>
import { provide, ref, watch } from "vue";
import RoomList from "./room.vue";
import store from "@/store/index.js";
import { ElMessage } from "element-plus";
import { formatDate } from "@/utils/tool.js";

const input = ref("");
let roomList = ref([]);
let gameRoom = ref({});
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

// 创建WebSocket连接
const socket = new WebSocket("ws://127.0.0.1:3001" + "?token=" + localStorage.getItem("token"));

// 监听连接成功事件
socket.onopen = () => {
  console.log("WebSocket连接已建立");
};

// 监听接收到消息事件
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  // 处理接收到的消息
  console.log("接收到消息:", message);
  if (message.type === "roomList") {
    roomList.value = message.roomList;
  }
  if (message.type === "leaveRoom") {
    ElMessage.warning(message);
  }
  if (message.type === "joinRoom") {
    ElMessage.success(message);
  }
  if (message.type === "chatList") {
    gameRoom.value.chatList = message.chatList;
  }
};

// 监听连接断开事件
socket.onclose = () => {
  console.log("WebSocket连接已断开");
};

const sendMsg = () => {
  // 发送消息
  socket.send(JSON.stringify({ type: "message", roomId: gameRoom.value.roomId, message: input.value }));
  input.value = "";
};

//离开房间
function leaveRoom() {
  socket.send(JSON.stringify({
    type: "leaveRoom",
    roomId: gameRoom.value.roomId
  }));
}

//创建房间
function createRoom(room) {
  socket.send(JSON.stringify({
    type: "createRoom"
  }));
}

//加入房间
function joinRoom(roomId) {
  socket.send(JSON.stringify({
    type: "joinRoom",
    roomId: roomId
  }));
}
</script>
<template>
  <RoomList v-if="!gameRoom" />
  <div v-else>

    <div class="flex">

      <div class="gameContent percentw7"></div>
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
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button @click="sendMsg">发送</el-button>
        <el-button @click="leaveRoom">离开房间</el-button>
      </div>
    </div>

  </div>

</template>

<style lang="less" scoped>
.gameContent {
  border: 1px solid #ccc;
  width: 700px;
  height: 700px;
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
