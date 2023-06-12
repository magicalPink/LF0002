import { createStore } from 'vuex'
import { getBasicInfo } from '@/api/home'

const userState = {
  userInfo: null
}

const routerState = {
  cachedViews: []
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
      })
    },
    addCachedView(state, name) {
      if (state.cachedViews.includes(name)) return
      state.cachedViews.push(name)
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
