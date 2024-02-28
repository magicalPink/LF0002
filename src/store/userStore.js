import { defineStore } from "pinia";
import { getBasicInfo } from "@/api/user.js";
import router from "@/router/index.js";
import GoEasy from "goeasy";
import { wsBaseUrl } from "@/config.js";
import WebSocketManager from "@/utils/socket.js";
import { useGomokuStore } from "./gomokuStore.js"

export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    userInfo: {},
    onlineUser:[],
    basicsSocket:null,
  }),
  actions: {
    //获取用户信息
    async getUserInfo() {
      let { data } = await getBasicInfo();
      this.userInfo = data.data || {};
      sessionStorage.setItem("userInfo", JSON.stringify(data.data));
    },
    messageCallback(message) {
      let data = JSON.parse(message)
      //五子棋消息
      if(data.Game === "Gomoku") {
        return useGomokuStore().receiveMessage(data)
      }
      console.log(data)
    },
    sendMessage(message) {
      if(!this.basicsSocket) {
        console.error('socket未连接！')
      } else {
        this.basicsSocket.sendMessage(message);
      }
    },
    startSockst() {
      this.basicsSocket = new WebSocketManager(wsBaseUrl,this.messageCallback);
      this.basicsSocket.start();
    },
    //退出登录
    async logout() {
      this.closeWebSocket();
      this.userInfo = {};
      localStorage.removeItem("token");
      sessionStorage.removeItem("userInfo");
      router.replace("Login");
    },
    //关闭socket连接
    closeWebSocket() {
      this.basicsSocket && this.basicsSocket.closeWebSocket();
    }
  },
  getters: {},
  persist: true,
});
