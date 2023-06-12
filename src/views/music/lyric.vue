<script setup>
import {inject} from "vue";
let musicList = inject('musicList')
let current = inject('current')
</script>

<template>
  <div class="mr10">
    <h1 class="p5">{{musicList[current].musicInfo.name}}</h1>
    <div class="lrc_content auto">
      <div class="p5" v-for="item in musicList[current].lrcList" :key="item.time">
        <el-icon class="relative top3 mr5" :size="20" ><CaretRight /></el-icon>
        <span>{{item.lineLyric}}</span>
      </div>
    </div>
  </div>
</template>


<style lang="less" scoped>
  .lrc_content {
    height: 70%;
    >div {
      border-bottom: 2px solid #f3f3f3;
    }
  }
</style>