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
        <el-main class="bgc-ccc">
          <!--          添加路由缓存-->
          <router-view v-slot="{ Component }">
            <keep-alive :include="store.state.cachedViews">
              <component :is="Component"></component>
            </keep-alive>
          </router-view>
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

onBeforeMount(() => store.commit('getUserInfo'))
</script>

<style scoped></style>
