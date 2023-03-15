<template>
  <div class="common-layout h100">
    <el-container class="h100">
      <el-header>
        <Header />
      </el-header>
      <el-container class="h100">
        <el-aside width="200px">
          <Aside />
        </el-aside>
        <el-main style="background-color: pink">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import Header from './com/header.vue'
import Aside from './com/aside.vue'
import { useStore } from 'vuex'

const store = useStore()
const getInfo = async () => {
  store.commit('getUserInfo')
}
onBeforeMount(() => {
  getInfo()
})
</script>

<style scoped></style>
