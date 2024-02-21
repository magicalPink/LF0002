import { defineStore } from 'pinia'
import { getBasicInfo } from "@/api/home.js";
import router from "@/router/index.js";
import WebSocketManager from "@/utils/socket.js"
const basicsSocket = new WebSocketManager(wsBaseUrl)

import GoEasy from 'goeasy';
import { wsBaseUrl } from "@/config.js";
export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    userInfo: null,
  }),
  actions: {
    //获取用户信息
    async getUserInfo() {
      let { data } = await getBasicInfo()
      this.userInfo = data.data
      await basicsSocket.start()
      sessionStorage.setItem('userInfo', JSON.stringify(data.data))
    },
    callback(msg) {
      console.log(msg);
    },
    //退出登录
    logout() {
      this.userInfo = {}
      localStorage.removeItem('token')
      sessionStorage.removeItem('userInfo')
      router.replace('Login')
      basicsSocket && basicsSocket.closeWebSocket()
    }
  },
  getters: {
  },
});
