<script setup>
import { inject, onMounted, watch } from "vue";

let musicList = inject('musicList')
let currentTime = inject('currentTime')
let current = inject('current')
let isPlay = inject('isPlay')
let playIndex = inject('playIndex')
let duration = inject('duration')
let play = inject('play')
let timer = inject('timer')
let audio = inject('audio')
let scrollLyric = inject('scrollLyric')
let previousSong = inject('previousSong')
let nextSong = inject('nextSong')

//获取音乐时长
function getDuration(playBack) {
  audio.value.oncanplay = () => {
    duration.value = audio.value.duration;
    playIndex.value = 0;
    playBack && setTimeout(() => play(true), 100);
  };
}

//正在被拖动时改变当前播放值
function sliderStop() {
    clearInterval(timer.value);
    isPlay.value = false;
    audio.value.pause();
}
//继续播放
function sliderPlay(value) {
  audio.value.currentTime = value;
  play(true)
  setTimeout(() => {
    //瞬间滚动到当前播放歌词
    scrollLyric('instant')
  }, 100);
}

//时间处理
function transTime(time) {
  var duration = parseInt(time);
  var minute = parseInt(duration / 60);
  var sec = (duration % 60) + "";
  var isM0 = ":";
  if (minute === 0) {
    minute = "00";
  } else if (minute < 10) {
    minute = "0" + minute;
  }
  if (sec.length === 1) {
    sec = "0" + sec;
  }
  return minute + isM0 + sec;
}

watch(current, () => getDuration(true))
onMounted(() => getDuration())
</script>

<template>
  <div style="text-align: center;width: 40%">
    <div>
      <el-image class="radius50 musicPic" style="width: 300px; height: 300px" :src="musicList[current].musicInfo.pic"/>
    </div>
    <div>
      <div class="time mt10">
        <span>{{ transTime(currentTime) }}</span>
        <span> / </span>
        <span>{{ transTime(duration) }}</span>
      </div>

        <el-slider
            v-model="currentTime"
            :max="duration"
            @change="sliderPlay"
            @input="sliderStop"
            :format-tooltip="(val) => transTime(val)"
        ></el-slider>
    </div>
    <div class="controls radius10 center flex items-center justify-center">
      <el-icon :size="30" color="#fff" @click="previousSong">
        <CaretLeft/>
      </el-icon>
      <el-icon :size="30" color="#fff" v-if="!isPlay" @click="play(true)">
        <VideoPlay/>
      </el-icon>
      <el-icon :size="30" color="#fff" v-else @click="play(false)">
        <VideoPause/>
      </el-icon>
      <el-icon :size="30" color="#fff" @click="nextSong">
        <CaretRight/>
      </el-icon>
    </div>
    <h2 class="flex">
      <span class="mr10">{{ playIndex }}</span>
      <span>{{ currentTime }}</span>
    </h2>
  </div>

</template>


<style scoped>
.musicPic {
  transition: all .2s;
}
.controls {
  width: 200px;
  height: 50px;
  background-color: black;
  margin: 30px auto 0;
}
</style>
