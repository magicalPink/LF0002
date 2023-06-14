<script setup>
import Lyric from "@/views/music/lyric.vue";
import Controller from "@/views/music/controller.vue";
import MusicList from "@/views/music/musicList.vue";
import musicList from "./musicInfo.js"
import { provide, ref, watch, onUnmounted } from "vue";
// 当前播放的音乐索引
const current = ref(0)
// 当前播放的时间
const currentTime = ref(0)
// 是否正在播放
const isPlay = ref(false)
// 当前播放到歌曲的第index局
const playIndex = ref(0)
// audio
const audio = ref(null)
// 定时器
let timer = ref(null)
// 图片选择角度
let rotateDeg = ref(0)
// 歌曲总时长
const duration = ref(0)
// 歌曲被手动滚动状态
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
provide('scrollLyric', (val) => scrollLyric(val))
provide('play',flag => play(flag))
provide('previousSong',() => previousSong())
provide('nextSong',() => nextSong())

watch(isPlay, (val) => val ? audio.value.play() : audio.value.pause() )
watch(current, () => rotateDeg.value = 0)

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
      console.log('播放中...');
      playIndex.value = document.querySelectorAll(".sign").length;
      if(playIndex.value > 0) {
        !rolling.value && scrollLyric();
      }
      rotatePic()
      if (audio.value.ended || audio.value.paused) { //暂停或者结束清除定时器
        isPlay.value = false;
        clearInterval(timer.value);
      }
      if(audio.value.ended) {
        //下一首
        nextSong()
      }
      currentTime.value = audio.value.currentTime;
    }, 50);
  } else {
    audio.value.pause();
    isPlay.value = false;
  }
}

//滚动歌词
function scrollLyric(behavior = 'smooth') {
  let currentLyric = document.querySelector(".currentLyric");
  if(!currentLyric) return;
  document.querySelector(".lrc_list").scrollTo({
    top: currentLyric.offsetTop - 400,
    behavior,
  })
}

// 旋转头像
function rotatePic() {
    document.querySelector('.musicPic').style.transform = `rotate(${rotateDeg.value += 1}deg)`
}

function previousSong() {
  current.value -=1
  if(current.value < 0) {
    current.value = musicList.length - 1
  }
}

function nextSong() {
  current.value +=1
  if(current.value > musicList.length - 1) {
    current.value = 0
  }
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
   height: 100%;
   min-height: 600px;
   background-color: #ffffff;
 }
 audio {
   display: none;
 }

</style>
