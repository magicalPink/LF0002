<template>
  <div :class="'card'">
    <div :class="getClass()" :style="{transform:cardObj.show ? 'rotateY(0deg)' : 'rotateY(180deg)'}"></div>
    <div class="back" :style="{transform:cardObj.show ? 'rotateY(180deg)' : 'rotateY(0deg)'}"></div>
  </div>
</template>

<script setup>
import { defineProps,computed,watch,ref } from "vue";

import { useSettingStore } from "@/store/settingStore.js";

const settingsStore = useSettingStore()

const isMobile = computed(() => settingsStore.isMobile)

const props = defineProps({
  cardObj: {
    default: {
      value:1,
      color:4,
      show:false,
    }
  },
  scale: {
    default: 1
  }
});

const scale = computed(() => props.scale)

watch(() => props.show,(val) => {
  console.log(val);
})

const getClass = () => {
  return "cover card" + props.cardObj.value + "_" + props.cardObj.color;
};
</script>

<style scoped>
.card {
  position: relative;
  perspective: 800px;
  width: calc(57px * v-bind(scale));
  height: calc(89px * v-bind(scale));
  border-radius: calc(7px * v-bind(scale));
  overflow: hidden;
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
  background-size: calc(1095px * v-bind(scale));
}

.back {
  z-index: 1;
  background-image: url("/image/cards.png");
  background-size: calc(1095px * v-bind(scale));
  background-position: calc(-86px * v-bind(scale)) calc(-81px * v-bind(scale));
}

.card13_4 {
  background-position: calc(133px * v-bind(scale)) calc(-81px * v-bind(scale));
}

.card13_3 {
  background-position: calc(133px * v-bind(scale)) calc(-177px * v-bind(scale));
}

.card13_2 {
  background-position: calc(133px * v-bind(scale)) calc(-273px * v-bind(scale));
}

.card13_1 {
  background-position: calc(133px * v-bind(scale)) calc(-369px * v-bind(scale));
}

.card12_4 {
  background-position: calc(200px * v-bind(scale)) calc(-81px * v-bind(scale));
}

.card12_3 {
  background-position: calc(200px * v-bind(scale)) calc(-177px * v-bind(scale));
}

.card12_2 {
  background-position: calc(200px * v-bind(scale)) calc(-273px * v-bind(scale));
}

.card12_1 {
  background-position: calc(200px * v-bind(scale)) calc(-369px * v-bind(scale));
}

.card11_4 {
  background-position: calc(267px * v-bind(scale)) calc(-81px * v-bind(scale));
}

.card11_3 {
  background-position: calc(267px * v-bind(scale)) calc(-177px * v-bind(scale));
}

.card11_2 {
  background-position: calc(267px * v-bind(scale)) calc(-273px * v-bind(scale));
}

.card11_1 {
  background-position: calc(267px * v-bind(scale)) calc(-369px * v-bind(scale));
}

.card10_4 {
  background-position: calc(335px * v-bind(scale)) calc(-81px * v-bind(scale));
}

.card10_3 {
  background-position: calc(335px * v-bind(scale)) calc(-177px * v-bind(scale));
}

.card10_2 {
  background-position: calc(335px * v-bind(scale)) calc(-273px * v-bind(scale));
}

.card10_1 {
  background-position: calc(335px * v-bind(scale)) calc(-369px * v-bind(scale));
}

.card9_4 {
  background-position: calc(402px * v-bind(scale)) calc(-81px * v-bind(scale));
}

.card9_3 {
  background-position: calc(402px * v-bind(scale)) calc(-177px * v-bind(scale));
}

.card9_2 {
  background-position: calc(402px * v-bind(scale)) calc(-273px * v-bind(scale));
}

.card9_1 {
  background-position: calc(402px * v-bind(scale)) calc(-369px * v-bind(scale));
}

.card8_4 {
  background-position: calc(470px * v-bind(scale)) calc(-81px * v-bind(scale));
}

.card8_3 {
  background-position: calc(470px * v-bind(scale)) calc(-177px * v-bind(scale));
}

.card8_2 {
  background-position: calc(470px * v-bind(scale)) calc(-273px * v-bind(scale));
}

.card8_1 {
  background-position: calc(470px * v-bind(scale)) calc(-369px * v-bind(scale));
}

.card7_4 {
  background-position: calc(537px * v-bind(scale)) calc(-81px * v-bind(scale));
}

.card7_3 {
  background-position: calc(537px * v-bind(scale)) calc(-177px * v-bind(scale));
}

.card7_2 {
  background-position: calc(537px * v-bind(scale)) calc(-273px * v-bind(scale));
}

.card7_1 {
  background-position: calc(537px * v-bind(scale)) calc(-369px * v-bind(scale));
}

.card6_4 {
  background-position: calc(604px * v-bind(scale)) calc(-81px * v-bind(scale));
}

.card6_3 {
  background-position: calc(604px * v-bind(scale)) calc(-177px * v-bind(scale));
}

.card6_2 {
  background-position: calc(604px * v-bind(scale)) calc(-273px * v-bind(scale));
}

.card6_1 {
  background-position: calc(604px * v-bind(scale)) calc(-369px * v-bind(scale));
}

.card5_4 {
  background-position: calc(672px * v-bind(scale)) calc(-81px * v-bind(scale));
}

.card5_3 {
  background-position: calc(672px * v-bind(scale)) calc(-177px * v-bind(scale));
}

.card5_2 {
  background-position: calc(672px * v-bind(scale)) calc(-273px * v-bind(scale));
}

.card5_1 {
  background-position: calc(672px * v-bind(scale)) calc(-369px * v-bind(scale));
}

.card4_4 {
  background-position: calc(739px * v-bind(scale)) calc(-81px * v-bind(scale));
}

.card4_3 {
  background-position: calc(739px * v-bind(scale)) calc(-177px * v-bind(scale));
}

.card4_2 {
  background-position: calc(739px * v-bind(scale)) calc(-273px * v-bind(scale));
}

.card4_1 {
  background-position: calc(739px * v-bind(scale)) calc(-369px * v-bind(scale));
}

.card3_4 {
  background-position: calc(807px * v-bind(scale)) calc(-81px * v-bind(scale));
}

.card3_3 {
  background-position: calc(807px * v-bind(scale)) calc(-177px * v-bind(scale));
}

.card3_2 {
  background-position: calc(807px * v-bind(scale)) calc(-273px * v-bind(scale));
}

.card3_1 {
  background-position: calc(807px * v-bind(scale)) calc(-369px * v-bind(scale));
}

.card2_4 {
  background-position: calc(874px * v-bind(scale)) calc(-81px * v-bind(scale));
}

.card2_3 {
  background-position: calc(874px * v-bind(scale)) calc(-177px * v-bind(scale));
}

.card2_2 {
  background-position: calc(874px * v-bind(scale)) calc(-273px * v-bind(scale));
}

.card2_1 {
  background-position: calc(874px * v-bind(scale)) calc(-369px * v-bind(scale));
}

.card1_4 {
  background-position: calc(941px * v-bind(scale)) calc(-81px * v-bind(scale));
}

.card1_3 {
  background-position: calc(941px * v-bind(scale)) calc(-177px * v-bind(scale));
}

.card1_2 {
  background-position: calc(941px * v-bind(scale)) calc(-273px * v-bind(scale));
}

.card1_1 {
  background-position: calc(941px * v-bind(scale)) calc(-369px * v-bind(scale));
}

</style>
