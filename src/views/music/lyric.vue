<script setup>
import { inject, onUnmounted, ref, watch } from "vue";
let timer = ref(null);
let musicList = inject("musicList");
let current = inject("current");
let audio = inject('audio')
let play = inject('play')
let rolling = inject('rolling')
let scrollLyric = inject('scrollLyric')

let currentTime = inject("currentTime");
let playIndex = inject('playIndex')

function getClass(data,index) {
  let cls = 'p5'
  if(playIndex.value - 1 === index) {
    cls += ' currentLyric'
  }
  if(data.time <= currentTime.value) {
    cls += ' sign'
  }
  return cls
}

function setCurrentTime(time) {
  if(!time) return;
  audio.value.currentTime = time * 1
  play(true)
}

function scrollList() {
  if(timer.value) {
    clearTimeout(timer.value)
  }
  // console.log('滚动了');
  rolling.value = true
  timer.value = setTimeout(() => {
    rolling.value = false
    scrollLyric('instant')
    clearTimeout(timer.value)
  }, 2000);
}

//歌词高度滚动为0
function setScrollTop() {
  document.querySelector('.lrc_list').scrollTop = 0
}

watch(current, () => setScrollTop())

//页面销毁
onUnmounted(() => {
  clearInterval(timer.value);
});
</script>

<template>
  <div class="lrc_content mr10 ml10">
    <h1 class="p5">{{ musicList[current].musicInfo.name }}</h1>

    <div @mousewheel="scrollList" class="lrc_list auto pr10">
      <div v-if="!musicList[current].lrcList.length">暂无歌词</div>
      <div :class="getClass(item,index)" v-for="(item,index) in musicList[current].lrcList" :key="item.time">
        <el-icon @click="setCurrentTime(item.time)" class="relative top3 mr5 pointer" :size="20">
          <CaretRight />
        </el-icon>
        <span>{{ item.time }} </span>
        <span>{{ item.lineLyric }}</span>
      </div>
    </div>
  </div>
</template>


<style lang="less" scoped>
.lrc_content {
  width: 30%;
  .lrc_list {
    height: 80%;
    > div {
      border-bottom: 1px solid #ffeeee;
      transition: all 0.3s;
    }

    .currentLyric {
      color: deeppink;
    }

  }
}


</style>
