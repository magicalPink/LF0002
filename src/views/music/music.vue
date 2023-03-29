<template>
  <div>
    音乐
    <el-input v-model="input" placeholder="请输入内容"></el-input>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const input = ref('')
</script>

<style scoped></style>
