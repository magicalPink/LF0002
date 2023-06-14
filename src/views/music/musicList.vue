<script setup>
import {inject} from "vue";

let musicList = inject('musicList')
let current = inject('current')

function getClass(index) {
  let str = "list selectnone pointer"
  if(index == current.value) str += ' active'
  return str
}

function changeMusic(index) {
  current.value = index
}

</script>

<template>
  <div class="auto" style="width: 20%; height: 90%;">
    <div @click="changeMusic(index)" :class="getClass(index)" v-for="(item,index) in musicList" :key="item.name">
      <h1>{{item.musicInfo.name}}</h1>
      <p>{{item.musicInfo.artist}}</p>
    </div>
  </div>
</template>


<style scoped>
  .active {
    color: #ff9d76;
  }
</style>
