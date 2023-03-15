import { createStore } from 'vuex'
import { getBasicInfo } from '@/api/home'

const userState = {
  userInfo: null
}

// Create a new store instance.
export default createStore({
  state() {
    return { ...userState }
  },
  mutations: {
    getUserInfo(state) {
      getBasicInfo().then((res) => {
        state.userInfo = res.data.data
      })
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
