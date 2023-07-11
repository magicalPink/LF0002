<script setup>
import { ref } from 'vue'
const input = ref('')
import socket from '@/socket.js'
socket.connect()
socket.onmessage = function (evt) {
  console.log("Received Message: " + evt.data);
};
function sendMsg() {
  socket.sendMsg(input.value)
}
</script>
<template>
  <div>
    聊天
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button @click="sendMsg">发送</el-button>
  </div>
</template>

<style scoped></style>
