<template>
  <div class="pt10 h100">
    <div class="musicList">
      <div v-for="(item,index) in musicList" :key="index" class="flex mb10" @click="musicStore.setSong(index)">
        <van-image
          class="ml5 mr10"
          width="11vw"
          :src="item.musicInfo.pic"
          radius="5"
        />
        <div class="flex flex-column justify-between">
          <div :class="currentMusic.musicInfo.musicrid === item.musicInfo.musicrid ? 'fs16 mr5 red' : 'fs16 mr5'">{{ item.musicInfo.name }}</div>
          <div class="fs12 gray">{{ item.musicInfo.artist }}</div>
        </div>
      </div>
    </div>
    <div class="playbar flex items-center">
      <div class="flex items-center van-ellipsis" @click="show = true">
        <van-image
          class="ml5 mr10 flex-none"
          width="10vw"
          :src="currentMusic.musicInfo.pic"
          radius="5"
        />
        <span class="fs14 mr5">{{ currentMusic.musicInfo.name }}</span>
        <span class="fs12 gray relative top1">{{ currentMusic.musicInfo.artist }}</span>
      </div>
      <div class="pt3 flex-none pr10">
        <el-icon :size="30" @click="musicStore.previousSong">
          <CaretLeft />
        </el-icon>
        <el-icon class="mx10" :size="30" v-if="!musicStore.isPlay" @click="musicStore.play(true)">
          <VideoPlay />
        </el-icon>
        <el-icon class="mx10" :size="30" v-else @click="musicStore.play(false)">
          <VideoPause />
        </el-icon>
        <el-icon :size="30" @click="musicStore.nextSong">
          <CaretRight />
        </el-icon>
      </div>
    </div>
    <van-popup v-model:show="show" :style="{ height: '100%' }"  position="bottom">
      <div class="musicControl flex flex-column">
        <div class="pt20 px10 flex justify-between items-center">
          <van-icon name="arrow-down" color="#fff" @click="show = false"/>
          <span class="white">{{ currentMusic.musicInfo.name }}</span>
          <van-icon name="hot-o" color="#fff"/>
        </div>
        <div class="mt40 flex justify-center">
          <van-image
            :class="{slowSpin:musicStore.isPlay}"
            width="50vw"
            :src="currentMusic.musicInfo.pic"
            radius="50%"
          />
        </div>
        <div
          @mousewheel="musicStore.scrollList()"
          @touchstart="musicStore.scrollList()"
          class="fs13 lrcList white h100 my10 auto align-center"
        >
          <div class="mt50" v-if="!currentMusic.lrcList.length">暂无歌词</div>
          <p :class="getClass(item,index)" :key="index" v-for="(item,index) in currentMusic.lrcList">{{item.lineLyric}}</p>
        </div>
        <div class="relative" style="width: 80%;margin: 0 auto;">
          <el-slider
            v-model="currentTime"
            :max="musicStore.duration"
            @change="musicStore.sliderPlay"
            @input="musicStore.sliderStop"
            :show-tooltip="false"
          ></el-slider>
          <div class="absolute fs12 white" style="left: 0;margin-top: -5px">{{ transTime(currentTime) }}</div>
          <div class="absolute fs12 white" style="right: 0;margin-top: -5px">{{ transTime(musicStore.duration) }}</div>
        </div>
        <div class="flex justify-center mb40">
          <el-icon :size="50" color="#fff" @click="musicStore.previousSong">
            <CaretLeft />
          </el-icon>
          <el-icon class="mx10" color="#fff" :size="50" v-if="!musicStore.isPlay" @click="musicStore.play(true)">
            <VideoPlay />
          </el-icon>
          <el-icon class="mx10" color="#fff" :size="50" v-else @click="musicStore.play(false)">
            <VideoPause />
          </el-icon>
          <el-icon :size="50" color="#fff" @click="musicStore.nextSong">
            <CaretRight />
          </el-icon>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

import musicList from "../musicInfo.js";

import { useMusicStore } from "@/store/musicStore.js";

const musicStore = useMusicStore();

const show = ref(false);

const currentMusic = computed(() => musicList[musicStore.current]);

const currentTime = ref(0);

watch(() => musicStore.currentTime,(val) => {
  if(show.value) {
    currentTime.value = val;
  }
})

musicStore.createMusicDom();

function getClass(data,index) {
  let cls = 'p5'
  if(musicStore.playIndex - 1 === index) {
    cls += ' currentLyric'
  }
  if(data.time <= currentTime.value) {
    cls += ' sign'
  }
  return cls
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

</script>

<style lang="less" scoped>
.musicList {
  height: calc(100% - 24.333333vw);
  overflow: auto;
}

.currentLyric {
  color: #4fc6c7;
  font-weight: 600;
  font-size: 16px;
}

.playbar {
  position: absolute;
  bottom: 13.333333vw;
  width: 100%;
  height: 11.333333vw;
  box-shadow: 0px -2.466667vw 3.066667vw 0px rgb(243 241 241 / 50%);
  > div:nth-of-type(1) {
    width: 100%;
  }
}

::-webkit-scrollbar {
  width: 0;
}

.musicControl {
  width: 100%;
  height: 100%;
  font-family: 'Quicksand', sans-serif;
  background-color: #535a6c;
  background-image:
    radial-gradient(closest-side, rgb(246, 145, 124), rgba(235, 105, 78, 0)),
    radial-gradient(closest-side, rgb(88, 243, 11), rgba(243, 11, 164, 0)),
    radial-gradient(closest-side, rgb(131, 217, 254), rgba(254, 234, 131, 0)),
    radial-gradient(closest-side, rgba(170, 142, 245, 1), rgba(170, 142, 245, 0)),
    radial-gradient(closest-side, rgba(248, 192, 147, 1), rgba(248, 192, 147, 0));
  background-size:
    70vmax 130vmax,
    80vmax 80vmax,
    90vmax 90vmax,
    110vmax 110vmax,
    90vmax 90vmax;
  background-position:
      -80vmax -80vmax,
      60vmax -30vmax,
    10vmax 10vmax,
      -30vmax -10vmax,
    50vmax 50vmax;
  background-repeat: no-repeat;
  animation: 10s movement linear infinite;
}

@keyframes movement {
  0%, 100% {
    background-size: 130vmax 130vmax,
    80vmax 80vmax,
    90vmax 90vmax,
    110vmax 110vmax,
    90vmax 90vmax;
    background-position: -80vmax -80vmax,
      60vmax -30vmax,
    10vmax 10vmax,
      -30vmax -10vmax,
    50vmax 50vmax;
  }
  25% {
    background-size: 100vmax 100vmax,
    90vmax 90vmax,
    100vmax 100vmax,
    90vmax 90vmax,
    60vmax 60vmax;
    background-position: -60vmax -90vmax,
      50vmax -40vmax,
      0vmax -20vmax,
      -40vmax -20vmax,
    40vmax 60vmax;
  }
  50% {
    background-size: 80vmax 80vmax,
    110vmax 110vmax,
    80vmax 80vmax,
    60vmax 60vmax,
    80vmax 80vmax;
    background-position: -50vmax -70vmax,
      40vmax -30vmax,
    10vmax 0vmax,
    20vmax 10vmax,
    30vmax 70vmax;
  }
  75% {
    background-size: 90vmax 90vmax,
    90vmax 90vmax,
    100vmax 100vmax,
    90vmax 90vmax,
    70vmax 70vmax;
    background-position: -50vmax -40vmax,
      50vmax -30vmax,
    20vmax 0vmax,
    -10vmax 10vmax,
    40vmax 60vmax;
  }
}

</style>
