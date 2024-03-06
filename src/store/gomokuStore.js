import { defineStore } from "pinia";
import Message from "@/utils/message.js"
import MessageBox from "@/utils/messageBox.js"
import { useUserStore } from "@/store/userStore.js";

export const useGomokuStore = defineStore({
  id: "gomokuStore",
  state: () => ({
    roomData: {
      userList:[],
    },
  }),
  actions: {
    receiveMessage(message) {
      console.log(message)
      if(message.type === "errorMessage") {
        Message({
          message: message.message,
          type: "error"
        })
        if(message.message == '房间已失效') {
          console.log(11111);
          location.replace('/#/Home')
        }
      }
      if(message.type === "message") {
        Message({
          message: message.message,
        })
      }
      if(message.type === "invite") {
        let roomId = message.roomId.slice(7, 15)
        MessageBox('confirm',{
          title:'五子棋邀请',
          message:message.message,
          type:'warning'
        },() => {
          let userStore = useUserStore()
          userStore.sendMessage({
            Game:'Gomoku',
            user:userStore.userInfo,
            type:"joinRoom",
            roomId:roomId
          })
          console.log(111);
        },() => {
          console.log(222);
        })
      }
      //房间 信息
      if(message.type === "roomData") {
        this.roomData = message
        location.href = '/#/Gomoku'
      }
      //房间 信息
      if(message.type === "leave") {
        location.replace('/#/Home')
      }
      //同意悔棋
      if(message.type === "regret") {
        let userStore = useUserStore()
        MessageBox('confirm',{
          title:'提示',
          message:message.message,
          type:'warning'
        },() => {
          userStore.sendMessage({
            Game:'Gomoku',
            user:userStore.userInfo,
            type:"regret",
            roomId:this.roomData.roomId,
            opponentId:this.opponent.id //对手Id
          })
        },() => {
          userStore.sendMessage({
            Game:'Gomoku',
            user:userStore.userInfo,
            type:"disagreeRegret",
            roomId:this.roomData.roomId,
            opponentId:this.opponent.id //对手Id
          })
        })
      }
    }
  },
  getters: {
    userId() {
      return useUserStore().userInfo.id
    },
    oneSelf(){
      if(this.roomData.userList[0]?.id == this.userId) {
        return this.roomData.userList[0]
      }
      if(this.roomData.userList[1]?.id == this.userId) {
        return this.roomData.userList[1]
      }
      return this.roomData.userList[0]
    },
    opponent() {
      if(this.roomData.userList[0]?.id !== this.userId) {
        return this.roomData.userList[0]
      }
      if(this.roomData.userList[1]?.id !== this.userId) {
        return this.roomData.userList[1]
      }
      return this.roomData.userList[1] || {}
    }
  },
  persist: true,
});
