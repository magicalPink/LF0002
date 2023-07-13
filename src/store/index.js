import { createStore } from 'vuex'
import { getBasicInfo } from '@/api/home'
import router from '@/router/index.js'
const userState = {
  userInfo: null
}

const routerState = {
  cachedViews: [],
  asideMenu: []
}



// Create a new store instance.
export default createStore({
  state() {
    return { ...userState, ...routerState }
  },
  mutations: {
    getUserInfo(state) {
      getBasicInfo().then((res) => {
        state.userInfo = res.data.data
        sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
      })
    },
    addCachedView(state, name) {
      if (state.cachedViews.includes(name)) return
      state.cachedViews.push(name)
    },
    setAsideMenu(state, asideMenu) {
      state.asideMenu = asideMenu
    },
    //退出登录
    logout(state) {
      state.userInfo = null
      state.cachedViews = []
      state.asideMenu = []
      localStorage.removeItem('token')
      router.replace('login')
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  },
  getters: {
    double(state) {
      return 2 * state.count
    }
  }
})
