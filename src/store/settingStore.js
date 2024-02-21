import { defineStore } from 'pinia'

export const useSettingStore = defineStore({
  id: "settingStore",
  state: () => ({
    theme: localStorage.getItem('theme'),
  }),
  actions: {
    setTheme(theme) {
      this.theme = theme
    }
    //获取用户信息
  },
  getters: {
  },
});
