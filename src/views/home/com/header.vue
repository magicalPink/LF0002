<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <div style="flex-grow: 1" />
      <el-sub-menu index="1">
        <template #title>{{ store.state.userInfo?.nickname }}</template>
        <el-menu-item index="edit">编辑</el-menu-item>
        <el-menu-item index="changePassword">修改密码</el-menu-item>
        <el-menu-item index="quit">退出</el-menu-item>
      </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const activeIndex = ref('1')

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key)
  switch (key) {
    case 'edit':
      break
    case 'changePassword':
      break
    case 'quit':
      //退出登录
      store.commit('logout')
      break
  }
}
</script>

<style scoped>

</style>
