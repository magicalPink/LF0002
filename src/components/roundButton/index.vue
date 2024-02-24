<template>
  <div class="content flex justify-center flex-column items-center pointer">
    <van-icon :name="icon"/>
    <p class="fs10">{{ label }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  label:{
    default:"按钮"
  },
  icon:{
    default:""
  }
})

console.log(props)
</script>

<style scoped>
.content {
  color: #3d89ef;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); /* 添加阴影 */
}
</style>