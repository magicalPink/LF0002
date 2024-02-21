import { createStore } from 'vuex'
import { getBasicInfo } from '@/api/home'
import router from '@/router/index.js'
import { wsBaseUrl } from "@/config.js";
const userState = {
  userInfo: null,
  socket: null
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
        if(state.socket) return;
        state.socket = new WebSocket(wsBaseUrl + "?token=" + localStorage.getItem("token"));
        socket.value.onopen = () => {
          console.log("WebSocket连接已建立");
        };
      })
    },
    initSocket(state) {
      if(state.socket) return;
      state.socket = new WebSocket(wsBaseUrl + "?token=" + localStorage.getItem("token"));
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
      state.userInfo = {}
      state.cachedViews = []
      state.asideMenu = []
      state.socket.send(JSON.stringify({
        type: "logOut",
      }));
      state.socket.close()
      state.socket = null
      localStorage.removeItem('token')
      sessionStorage.removeItem('userInfo')
      router.replace('Login')
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
