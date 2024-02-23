<template>
  <div class="pt5">
    <div v-for="item in onlineList" class="border mx5 radius5 mb10 p5 flex justify-between">
      <div>
        <h4>{{ item?.nickname || "MeiHL" }}</h4>
        <p class="fs12 mt5" style="color: #00ff8c">在线</p>
      </div>
      <van-image
        width="50"
        height="50"
        :src="item?.avatar"
        radius="5"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted,defineProps } from "vue";

const param = inject("param");

const props = defineProps({
  onlineList:{
    type: Object,
    default: null
  },
})

onMounted(() => {
  console.log(props.onlineList);
})
</script>

<style scoped>

</style>
