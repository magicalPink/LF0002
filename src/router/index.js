import { createRouter, createWebHashHistory } from 'vue-router'
import { getMenuList } from '@/api/system.js'

import store from '@/store/index.js'
const modules = import.meta.glob('../views/**/*.vue')
const obtainFile = (path) => {
  return modules[`../views/${path}`]
}

// 判断路由是否需要缓存
const shouldKeepAlive = (route) => route.keepAlive

// 构建路由配置项
const buildRoute = (item) => {
  const children = item.children || []
  const route = {
    path: item.path || '',
    name: item.name || '',
    component: item.fileAddress ? obtainFile(item.fileAddress) : null,
    children: children.map(buildRoute)
  }
  if (shouldKeepAlive(item)) {
    store.commit('addCachedView', item.path)
  }
  return route
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/home.vue'),
    children: store.state.asideMenu.map(buildRoute)
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/logIn/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
//路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 获取菜单列表
  const token = localStorage.getItem('token')
  if (to.path === '/login') {
    next()
  } else {
    if (!store.state.asideMenu.length && token) {
      let { data } = await getMenuList()
      data &&
        data.data.map(buildRoute).forEach((item) => {
          router.addRoute('Home', item)
        })
      router.addRoute({
        path: '/:pathMatch(.*)',
        component: () => import('../views/404.vue')
      })
      store.commit('setAsideMenu', data.data)
      next({ ...to, replace: true })
    } else {
      token ? next() : next('/login')
    }
  }
})

export default router
