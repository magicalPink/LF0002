import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store/index.js'
import asideMenu from '@/router/asideMenu.js'
const modules = import.meta.glob('../views/**/*.vue')
const obtainFile = (path) => {
  return modules[`../views/${path}`]
}

const routeChildren = asideMenu.map((item) => {
  if (item.path) {
    //TODO: 保存缓存路由
    if (item.keepAlive) {
      store.commit('addCachedView', item.path)
    }
    return {
      path: item.path,
      name: item.name,
      component: item.fileAddress && obtainFile(item.fileAddress),
      children: item.children
        ? item.children.map((list) => {
            //TODO: 保存缓存路由
            if (list.keepAlive) {
              store.commit('addCachedView', list.path)
            }
            return {
              path: list.path,
              name: list.name,
              component: list.fileAddress && obtainFile(list.fileAddress)
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
