import { defineStore } from "pinia";

export const useGomokuStore = defineStore({
  id: "gomokuStore",
  state: () => ({
    roomData: {
      userList:[],
    },
    userInfo:JSON.parse(sessionStorage.getItem('userInfo'))
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
      if(this.roomData.userList[0]?.id == this.userInfo.id) {
        return this.roomData.userList[0]
      }
      if(this.roomData.userList[1]?.id == this.userInfo.id) {
        return this.roomData.userList[1]
      }
      return this.roomData.userList[0]
    },
    opponent() {
      if(this.roomData.userList[0]?.id !== this.userInfo.id) {
        return this.roomData.userList[0]
      }
      if(this.roomData.userList[1]?.id !== this.userInfo.id) {
        return this.roomData.userList[1]
      }
      return this.roomData.userList[1]
    }
  },
  persist: true,
});
