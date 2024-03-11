<template>
  <div class="p5">
    <el-button @click="router.push('Gomoku')">五子棋</el-button>
    <el-button>炸金花</el-button>
  </div>
</template>

<script setup>

import { onMounted, ref } from "vue";

import { inject } from "vue";

const param = inject("param");

import {useRouter} from "vue-router";

const router = useRouter()

onMounted(() => {

})
</script>

<style scoped>

</style>
