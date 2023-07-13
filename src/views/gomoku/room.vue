<script setup>
import { inject, ref } from "vue";

let roomList = inject('roomList')
let createRoom = inject('createRoom')
let joinRoom = inject('joinRoom')

</script>

<template>
  <div class="roomList flex">
    <div class="list radius10 m10" v-for="item in roomList" :key="item.roomId">
      <h3>{{item.name}}</h3>
      当前人数：<span>{{item.userList.length}} / {{item.playerNum}}</span>
      <p>
      <el-button :disabled="item.userList.length === item.playerNum" class="mt10" type="primary" @click="joinRoom(item.roomId)">加入房间</el-button>
      </p>
    </div>
  </div>
    <el-button type="primary" @click="createRoom()">创建房间</el-button>
</template>

<style lang="less" scoped>
.roomList {
  .list {
    width: 200px;
    height: 400px;
    border: 1px solid #ccc;
    background-image: linear-gradient(85deg, #f8c5e3, #f6a8e5, #a38aef, #8ac3f6);
    text-align: center;
  }
}
</style>
