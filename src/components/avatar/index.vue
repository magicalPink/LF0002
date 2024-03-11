<template>
  <div class="relative" :style="{width:size + 'px',height:size + 'px'}">
    <van-circle
        v-show="keepTime"
        v-model:current-rate="currentRate"
        :rate="rate"
        :speed="1"
        :stroke-width="120"
        :size="size"
        :color="color"
    >
      <template #default>
        <div class="flex items-center justify-center" style="width: 100%;height: 100%">
          <van-image
            round
            :width="imageSize"
            :height="imageSize"
            :src="src"
          />
        </div>
      </template>
    </van-circle>
    <van-image
        v-show="!keepTime"
        round
        :width="imageSize + 5"
        :height="imageSize + 5"
        class="mt2"
        :src="src"
    />
    <Meme ref="meme"/>
  </div>
</template>

<script setup>
import Meme from "../meme/meme.vue"

import {ref, defineProps, computed} from "vue"

const props = defineProps({
  size: {
    default: 60
  },
  src:{
    default:"/image/avatar/avatar5.png"
  }
})

const meme = ref(null)

const color = computed(() => {
  // 定义起始和结束颜色的RGB分量
  const startColor = {r: 0xEE, g: 0x08, b: 0x24}; // #EE0824
  const endColor = {r: 0x1A, g: 0x89, b: 0xFA}; // #1A89FA
  // 计算过渡颜色的RGB分量
  const r = Math.round(startColor.r + (endColor.r - startColor.r) * (currentRate.value / 100));
  const g = Math.round(startColor.g + (endColor.g - startColor.g) * (currentRate.value / 100));
  const b = Math.round(startColor.b + (endColor.b - startColor.b) * (currentRate.value / 100));
  // 将RGB分量转换为十六进制字符串并返回
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
});

const imageSize = computed(() => props.size - 10)

const currentRate = ref(100)

const keepTime = ref(false)

const rate = ref(100)

const start = () => {
  keepTime.value = true
  rate.value = 0
}
const reset = () => {
  keepTime.value = false
  rate.value = 100
  currentRate.value = 100
}

const showMeme = (index) => {
  meme.value.setActiveIndex(index)
}

defineExpose({
  start,
  reset,
  showMeme,
});
</script>

<style scoped>

</style>
