<template>
  <div>
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @select="handleClick"
    >
      <template v-for="item in store.state.asideMenu">
        <template v-if="!item.children">
          <el-menu-item :key="item.path" :index="item.path">{{ item.name }}</el-menu-item>
        </template>
        <template v-else>
          <el-sub-menu :key="item.path" :index="item.path">
            <template #title>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item :key="list.name" v-for="list in item.children" :index="list.path">
              {{ list.name }}
            </el-menu-item>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()

const active = ref('')
const isCollapse = ref(false)
const router = useRouter()

const handleClick = async (key, keyPath) => {
  active.value = key
  await router.push('/' + keyPath.join('/'))
}
</script>
