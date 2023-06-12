<script setup>
import Lyric from "@/views/music/lyric.vue";
import Controller from "@/views/music/controller.vue";
import MusicList from "@/views/music/musicList.vue";
import musicList from "./musicInfo.js"
import {provide, reactive, ref} from 'vue'
//当前播放的音乐ID
const current = ref(0)
const currentTime = ref(0)
const isPlay = ref(false)

provide('musicList',musicList)
provide('current',current)
provide('currentTime',currentTime)
provide('isPlay',isPlay)

</script>

<template>
  <div class="container radius20 flex justify-between p10">
    <MusicList />
    <Controller />
    <Lyric />
  </div>
</template>

<style scoped>
 .container {
   width: 80%;
   height: 80%;
   margin: 20px auto;
   background-color: #ffffff;
 }
</style>
