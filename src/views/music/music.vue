<script setup>
import Lyric from "@/views/music/lyric.vue";
import Controller from "@/views/music/controller.vue";
import MusicList from "@/views/music/musicList.vue";
import musicList from "./musicInfo.js"
import { provide, ref, watch, onUnmounted } from "vue";
//当前播放的音乐ID
const current = ref(0)
const currentTime = ref(0)
const isPlay = ref(false)
const playIndex = ref(0)
const audio = ref(null)
let timer = ref(null)
const duration = ref(0)
const rolling = ref(false)

provide('musicList',musicList)
provide('current',current)
provide('currentTime',currentTime)
provide('isPlay',isPlay)
provide('playIndex',playIndex)
provide('rolling',rolling)
provide('audio',audio)
provide('timer',timer)
provide('duration',duration)
provide('play',flag => play(flag))

watch(isPlay, (val) => val ? audio.value.play() : audio.value.pause() )
//页面销毁
onUnmounted(() => {
  clearInterval(timer.value);
  timer.value = null;
  audio.value = null;
});

//播放按钮
function play(flag = isPlay.value) {
  clearInterval(timer.value);
  if (duration.value === 0) return;
  if (flag) {
    audio.value.play();
    isPlay.value = true;
    timer.value = setInterval(() => {
      // console.log('播放中...');
      playIndex.value = document.querySelectorAll(".sign").length;
      if(playIndex.value > 0) {
        !rolling.value && scrollLyric();
      }
      if (audio.value.ended || audio.value.paused) { //暂停或者结束清除定时器
        isPlay.value = false;
        clearInterval(timer.value);
      }
      if(audio.value.ended) {
        //下一首
        current.value +=1
        if(current.value > musicList.length - 1) {
          current.value = 0
        }
      }
      currentTime.value = audio.value.currentTime;
    }, 50);
  } else {
    audio.value.pause();
    isPlay.value = false;
  }
}

//滚动歌词
function scrollLyric() {
  let currentLyric = document.querySelector(".currentLyric");
  if(!currentLyric) return;
  console.log(currentLyric.offsetTop);
  let lrc_list = document.querySelector(".lrc_list");
  lrc_list.scrollTo({
    top: currentLyric.offsetTop - 400,
    behavior: "smooth",
  })
}

</script>

<template>
  <div class="container radius20 flex justify-between p10">
    <MusicList />
    <Controller />
    <Lyric />
    <audio :src="'/music/music' + current + '.mp3'" ref="audio" controls></audio>
  </div>
</template>

<style scoped>
 .container {
   width: 80%;
   height: 600px;
   margin: 20px auto;
   background-color: #ffffff;
 }
 audio {
   display: none;
 }
</style>
