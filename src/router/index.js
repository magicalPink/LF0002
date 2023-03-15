import { createRouter, createWebHashHistory } from 'vue-router'
import asideMenu from '@/router/asideMenu.js'

const routeChildren = asideMenu.map((item) => {
  console.log(item)
  if (item.path) {
    return {
      path: item.path,
      name: item.name,
      component: item.fileAddress && import(`/src/views/${item.fileAddress}`),
      children: item.children
        ? item.children.map((list) => {
            return {
              path: list.path,
              name: list.name,
              component: list.fileAddress && import(`/src/views/${list.fileAddress}`)
            }
          })
        : []
    }
  }
})
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/home.vue'),
    children: [...routeChildren]
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
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/login') {
    next()
  } else {
    token ? next() : next('/login')
  }
})

export default router
