<template>
  <div>
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @select="handleClick"
    >
      <div v-for="item in asideMenu" :key="item.path">
        <el-menu-item v-if="!item.children" :index="item.path">{{ item.name }}</el-menu-item>
        <el-sub-menu v-else :index="item.path">
          <template #title>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item :index="list.path" v-for="list in item.children" :key="list.name">
            {{ list.name }}
          </el-menu-item>
        </el-sub-menu>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import asideMenu from '../../../router/asideMenu'

const active = ref(asideMenu[0].path)

const isCollapse = ref(false)
const handleClick = (key, keyPath) => {
  active.value = key
  router.push('/' + keyPath.join('/'))
}
</script>

<style scoped></style>
