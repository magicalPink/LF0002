import { defineStore } from "pinia";
let userId = JSON.parse(sessionStorage.getItem('userInfo'))?.id

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
      //房间信息
      if(message.type === "roomData") {
        this.roomData = message
        location.href = '/#/Gomoku'
      }
    }
  },
  getters: {
    oneSelf(){
      if(this.roomData.userList[0]?.id == userId) {
        return this.roomData.userList[0]
      }
      if(this.roomData.userList[1]?.id == userId) {
        return this.roomData.userList[1]
      }
      return this.roomData.userList[0]
    },
    opponent() {
      if(this.roomData.userList[0]?.id !== userId) {
        return this.roomData.userList[0]
      }
      if(this.roomData.userList[1]?.id !== userId) {
        return this.roomData.userList[1]
      }
      return this.roomData.userList[1]
    }
  },
  persist: true,
});
