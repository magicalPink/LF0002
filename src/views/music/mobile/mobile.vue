<template>
  <div class="pt10 h100">
    <div class="musicList">
      <div v-for="(item,index) in musicList" :key="item" class="flex mb10" @click="musicStore.setSong(index)">
        <van-image
          class="ml5 mr10"
          width="10vw"
          :src="item.musicInfo.pic"
          radius="5"
        />
        <div>
          <div :class="currentMusic.musicInfo.musicrid === item.musicInfo.musicrid ? 'fs16 mr5 red' : 'fs16 mr5'">{{ item.musicInfo.name }}</div>
          <div class="fs12 gray">{{ item.musicInfo.artist }}</div>
        </div>
      </div>
    </div>
    <div class="playbar flex items-center">
      <div class="flex items-center">
        <van-image
          class="ml5 mr10"
          width="10vw"
          :src="currentMusic.musicInfo.pic"
          radius="5"
        />
        <span class="fs16 mr5">{{ currentMusic.musicInfo.name }}</span>
        <span class="fs14 gray">{{ currentMusic.musicInfo.artist }}</span>
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
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

import musicList from "../musicInfo.js";

import { useMusicStore } from "@/store/musicStore.js";

const musicStore = useMusicStore();

const currentMusic = computed(() => musicList[musicStore.current]);

musicStore.createMusicDom();
</script>

<style lang="less" scoped>
.musicList {
  height: calc(100% - 26.666666vw);
  overflow: auto;
}

.playbar {
  position: absolute;
  bottom: 13.333333vw;
  width: 100%;
  height: 11.333333vw;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);

  > div:nth-of-type(1) {
    width: 100%;
  }
}
</style>
