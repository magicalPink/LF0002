import { defineStore } from "pinia";
import { getBasicInfo } from "@/api/user.js";
import router from "@/router/index.js";
import GoEasy from "goeasy";
import { wsBaseUrl } from "@/config.js";
import WebSocketManager from "@/utils/socket.js";
import { useGomokuStore } from "./gomokuStore.js"
import { getOnlineList } from "@/api/user.js";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    userInfo: {},
    onlineList:[],
    basicsSocket:null,
    timer:null,
  }),
  actions: {
    //获取用户信息
    async getUserInfo() {
      let { data } = await getBasicInfo();
      this.userInfo = data.data || {};
      sessionStorage.setItem("userInfo", JSON.stringify(data.data));
      this.getOnlineList()
    },
    //获取在线用户
    getOnlineList() {
      getOnlineList().then(res => {
        this.onlineList = res.data.data
      })
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        getOnlineList().then(res => {
          this.onlineList = res.data.data
        })
      }, 10000)
    },
    messageCallback(message) {
      let data = JSON.parse(message)
      //五子棋消息
      if(data.Game === "Gomoku") {
        return useGomokuStore().receiveMessage(data)
      }
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
      clearInterval(this.timer);
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
