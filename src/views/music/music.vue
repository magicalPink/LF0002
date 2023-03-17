<template>
  <div>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <audio ref="audio" src="http://f5.htqyy.com/play9/55/mp3/7" controls autoplay />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const input = ref('')
</script>

<style scoped></style>
