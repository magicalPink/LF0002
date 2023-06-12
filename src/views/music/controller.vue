<script setup>
import {inject, onMounted, ref, watch} from "vue";

let musicList = inject('musicList')
let currentTime = inject('currentTime')
let current = inject('current')
let isPlay = inject('isPlay')
let timer = ref(null)
const audio = ref(null)
const isChange = ref(false)
const duration = ref(0)

//获取音乐时长
function getDuration(playBack) {
  audio.value.oncanplay = () => {
    duration.value = audio.value.duration;
    playBack && play(true)
  };
}

//播放按钮
function play(flag = isPlay.value) {
  clearInterval(timer.value);
  if (duration.value === 0) return;
  if (flag) {
    audio.value.play();
    isPlay.value = true;
    timer.value = setInterval(() => {
      console.log(transTime(audio.value.currentTime));
      if (audio.value.ended || audio.value.paused) { //暂停或者结束清除定时器
        isPlay.value = false;
        clearInterval(timer.value);
      }
      currentTime.value = audio.value.currentTime;
    }, 500);
  } else {
    audio.value.pause();
    isPlay.value = false;
  }
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
//正在被拖动时改变当前播放值
function sliderStop() {
  if (isChange.value) {
    clearInterval(timer.value);
    audio.value.pause();
    isPlay.value = false;
  }
}
//继续播放
function sliderPlay(value) {
  audio.value.currentTime = value;
  play(true);
  isChange.value = false;
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
  <div style="text-align: center">
    <div>
      <el-image style="width: 300px; height: 300px" :src="musicList[current].musicInfo.pic"/>
    </div>
    <div>
      <div class="time">
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
          @mousedown.native="isChange = true"
          @mouseup.native="isChange = false"
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
    <audio :src="musicList[current].url" ref="audio" controls></audio>
  </div>

</template>


<style scoped>
audio {
  display: none;
}
.controls {
  width: 200px;
  height: 50px;
  background-color: black;
  margin: 0 auto;
}
</style>