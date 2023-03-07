import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/home/home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/logIn/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
