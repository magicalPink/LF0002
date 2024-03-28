import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    alias: '/home',
    name: 'Home',
    component: () => import('@/views/home/home.vue'),
    children: [
      {
        path: '/game',
        name: 'Game',
        component: () => import('@/views/game/game.vue'),
      },
      {
        path: '/music',
        name: 'Music',
        component: () => import('@/views/music/music.vue'),
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user/user.vue'),
      },
      {
        path: '/chat',
        name: 'Chat',
        component: () => import('@/views/chat/chat.vue'),
      },
      {
        path: '/gomoku',
        name: 'Gomoku',
        component: () => import('@/views/gomoku/gomoku.vue'),
      },
      {
        path: '/deepFriedGoldenFlower',
        name: 'DeepFriedGoldenFlower',
        component: () => import('@/views/deepFriedGoldenFlower/index.vue'),
      },
    ]
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
  if (to.name === 'Login') {
    next()
  } if(to.name === 'Home') {
    token ? next('Game') : next('/login')
  } else {
    token ? next() : next('/login')
  }
})

export default router
