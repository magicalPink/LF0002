import { defineStore } from "pinia";
import musicList from "@/views/music/musicInfo.js";

export const useMusicStore = defineStore({
  id: "musicStore",
  state: () => ({
    audio: null,
    isPlay: false,
    timer: null,
    duration: 0,
    current:3,
    currentTime: 0,
  }),
  actions: {
    createMusicDom() {
      this.audio = document.createElement("audio");
      this.audio.setAttribute("src", `/music/music${this.current}.mp3`);
    },
    //播放按钮
    play(flag = this.isPlay) {
      clearInterval(this.timer);
      if (flag) {
        console.log(this.audio);
        this.audio.play();
        this.isPlay = true;
        this.timer = setInterval(() => {
          console.log("播放中...");
          // playIndex.value = document.querySelectorAll(".sign").length;
          // if (playIndex.value > 0) {
          //   !rolling.value && scrollLyric();
          // }
          if (this.audio.ended || this.audio.paused) { //暂停或者结束清除定时器
            this.isPlay = false;
            clearInterval(this.timer);
          }
          if (this.audio.ended) {
            //下一首
            this.nextSong();
          }
          this.currentTime = this.audio.currentTime;
        }, 50);
      } else {
        this.audio.pause();
        this.isPlay = false;
      }
    },
    previousSong() {
      this.current -= 1;
      if (this.current < 0) {
        this.current = musicList.length - 1;
      }
      this.audio.setAttribute("src", `/music/music${this.current}.mp3`);
      this.play(true)
    },

    nextSong() {
      this.current += 1;
      if (this.current > musicList.length - 1) {
        this.current = 0;
      }
      this.audio.setAttribute("src", `/music/music${this.current}.mp3`);
      this.play(true)
    },

    setSong(index) {
      this.current = index;
      this.audio.setAttribute("src", `/music/music${this.current}.mp3`);
      this.play(true)
    }
  },
  getters: {}
});
