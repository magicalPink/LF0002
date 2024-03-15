<template>
  <div :class="isMobile ? 'card' : 'card reduce'">
    <div :class="getClass()"></div>
    <div class="back" :style="{transform:cardObj.show ? 'rotateY(180deg)' : 'rotateY(0deg)'}"></div>
  </div>
</template>

<script setup>
import { defineProps,computed,watch } from "vue";

import { useSettingStore } from "@/store/settingStore.js";

const settingsStore = useSettingStore()

const isMobile = computed(() => settingsStore.isMobile)

const props = defineProps({
  cardObj: {
    default: {
      value:1,
      color:4,
      default:false,
    }
  },
});

watch(() => props.show,(val) => {
  console.log(val);
})

const getClass = () => {
  return "cover card" + props.cardObj.value + "_" + props.cardObj.color;
};
</script>

<style scoped>
@import './index.less';

.card {
  position: relative;
  perspective: 800px;
  border-radius: 5px;
  width: 61px;
  height: 89px;
  border-radius: 5px;
  overflow: hidden;
}

.reduce {
  margin: -12.2px;
  transform: scale(.6);
}

.cover,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 25px;
  text-align: center;
  line-height: 150px;
  backface-visibility: hidden;
  transition: all 0.3s;
}

.cover {
  background-image: url("/image/cards.png");
  background-color: purple;
  background-size: 265px;
}

.back {
  z-index: 1;
  background-image: url("/image/back.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 110%;
}

</style>
