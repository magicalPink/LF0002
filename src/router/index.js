import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store/index.js'
import asideMenu from '@/router/asideMenu.js'
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
    children: asideMenu.map(buildRoute)
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/logIn/login.vue')
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../views/404.vue')
  }
]
console.log(routes)
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
//路由前置守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/login') {
    next()
  } else {
    token ? next() : next('/login')
  }
})

export default router
