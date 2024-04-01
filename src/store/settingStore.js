import { defineStore } from 'pinia'

export const useSettingStore = defineStore({
  id: "settingStore",
  state: () => ({
    theme: localStorage.getItem('theme') || 'auto',
    isMobile: window.innerWidth < 500,
  }),
  actions: {
    setTheme(theme) {
      this.theme = theme
    },
    setIsMobile(isMobile) {
      console.log(isMobile);
      this.isMobile = isMobile
    }
  },
  getters: {
  },
});
