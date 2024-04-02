import { defineStore } from "pinia";
import musicList from "@/views/music/musicInfo.js";

export const useMusicStore = defineStore({
  id: "musicStore",
  state: () => ({
    audio: null,
    isPlay: false,
    timer: null,
    timer1: null,
    duration: 0,
    current: 3,
    currentTime: 0,
    rolling:false,
    playIndex:0,
  }),
  actions: {
    createMusicDom() {
      this.audio = document.createElement("audio");
      this.audio.setAttribute("src", `/music/music${this.current}.mp3`);
      this.getDuration();
    },
    //播放按钮
    play(flag = this.isPlay) {
      clearInterval(this.timer);
      if (flag) {
        this.audio.play();
        this.isPlay = true;
        this.timer = setInterval(() => {
          this.playIndex = document.querySelectorAll(".sign").length || 0;
          if (this.audio.ended || this.audio.paused) { //暂停或者结束清除定时器
            this.isPlay = false;
            clearInterval(this.timer);
          }
          if (this.audio.ended) {
            //下一首
            this.nextSong();
          }
          this.currentTime = this.audio.currentTime;
        }, 70);
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
      document.querySelector(".lrcList").scrollTo({
        top: 0,
        behavior:'smooth',
      })
      this.play(true);
    },

    nextSong() {
      this.current += 1;
      if (this.current > musicList.length - 1) {
        this.current = 0;
      }
      this.audio.setAttribute("src", `/music/music${this.current}.mp3`);
      this.getDuration();
      this.play(true);
      document.querySelector(".lrcList").scrollTo({
        top: 0,
        behavior:'smooth',
      })
      this.play(true);
    },

    setSong(index) {
      this.current = index;
      this.audio.setAttribute("src", `/music/music${this.current}.mp3`);
      this.getDuration();
      this.play(true);
    },

    getDuration(playBack) {
      this.audio.oncanplay = () => {
        this.duration = this.audio.duration;
        this.playIndex = 0;
        playBack && setTimeout(() => this.play(true), 100);
      };
    },

    //正在被拖动时改变当前播放值
    sliderStop() {
      clearInterval(this.timer);
      this.isPlay = false;
      this.audio.pause();
    },
    //继续播放
    sliderPlay(value) {
      this.audio.currentTime = value;
      this.play(true);
    },

    scrollLyric(behavior = 'smooth') {
      let currentLyric = document.querySelector(".currentLyric");
      if(!currentLyric) {
        return setTimeout(() => this.scrollLyric(),70)
      }
      document.querySelector(".lrcList").scrollTo({
        top: currentLyric.offsetTop - 350,
        behavior,
      })
    },

    scrollList() {
      if(this.timer1) {
        clearTimeout(this.timer1)
      }
      this.rolling = true
      this.timer1 = setTimeout(() => {
        this.rolling = false
        clearTimeout(this.timer1)
      }, 2000);
    }
  },
  getters: {}
});
