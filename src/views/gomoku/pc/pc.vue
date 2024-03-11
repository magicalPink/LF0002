<template>
  <div class="playingCard">
    <div class="cardContent"></div>
    <el-button @click="shuffle(1)">洗牌1</el-button>
    <el-button @click="shuffle(2)">洗牌2</el-button>
    <el-button @click="shuffle(3)">洗牌3</el-button>
    <el-button @click="shuffle(4)">洗牌4</el-button>
  </div>
</template>

<script setup>
import anime from 'animejs/lib/anime.es.js';

import { onMounted, ref } from "vue";

import { inject } from "vue";

const param = inject("param");

onMounted(() => {
  const cardContent = document.querySelector('.cardContent');
  const fragment = document.createDocumentFragment();
  const numberOfElements = 52;
  for (let i = 0; i < numberOfElements; i++) {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    if(i%2 == 1) {
      cardEl.classList.add('evenNumbers');
    } else {{
      cardEl.classList.add('oddNumber');
    }}
    cardEl.style.top = i + 'px';
    cardEl.style.left = i + 'px';
    fragment.appendChild(cardEl);
  }
  cardContent.appendChild(fragment);
})

const shuffle = (type) => {
  if(type == 1) {
    anime({
      targets: ".oddNumber",
      keyframes: [
        {translateY: -60},
        {translateX: -250},
        {translateY: -40},
        {translateX: 0},
        {translateY: 0}
      ],
      duration: 2000,
      delay: anime.stagger(120, {direction: 'reverse'})
    });
    anime({
      targets: ".evenNumbers",
      keyframes: [
        {translateY: 60},
        {translateX: 250},
        {translateY: 40},
        {translateX: 0},
        {translateY: 0}
      ],
      duration: 2000,
      delay: anime.stagger(100, {easing: 'easeOutQuad'})
    });
  }
  if(type == 2) {
    anime({
      targets: ".oddNumber",
      keyframes: [
        {translateY: -300},
        {translateX: -250},
        {translateY: -40},
        {translateX: 0},
        {translateY: 0}
      ],
      duration: 4000,

      delay: anime.stagger(200, {grid: [14, 5], from: 'center'})
    });
    anime({
      targets: ".evenNumbers",
      keyframes: [
        {translateY: 300},
        {translateX: 250},
        {translateY: 40},
        {translateX: 0},
        {translateY: 0}
      ],
      duration: 4000,
      delay: anime.stagger(200, {grid: [14, 5], from: 'center'})
    });
  }
  if(type == 3) {
    anime({
      targets: ".oddNumber",
      keyframes: [
        {translateY: -200},
        {translateY: 200},
        {translateY: -200},
        {translateY: 200},
        {translateX: 200},
        {translateY: 0},
        {translateX: 0}
      ],
      duration: 3000,
      delay: anime.stagger(50, {grid: [30, 10], from: 'center'})
    });
    anime({
      targets: ".evenNumbers",
      keyframes: [
        {translateY: 200},
        {translateY: -200},
        {translateY: 200},
        {translateY: -200},
        {translateX: -200},
        {translateY: 0},
        {translateX: 0}
      ],
      duration: 3000,
      delay: anime.stagger(50, {grid: [30, 10], from: 'center'})
    });
  }
  if(type == 4) {
    anime({
      targets: ".evenNumbers",
      keyframes: [
        {translateX: -200},
        {rotateZ: 90},
        {rotateX: 180},
        {translateX: 200},
        {translateX: -100},
        {translateX: 50},
        {translateX: 0},
        {rotateZ: 0},
      ],
      duration: 2000,
      delay: anime.stagger(50, {grid: [30, 10], from: 'center'})
    });
    anime({
      targets: ".oddNumber",
      keyframes: [
        {translateX: 200},
        {rotateZ: 90},
        {rotateX: 180},
        {translateX: -200},
        {translateX: 100},
        {translateX: -50},
        {translateX: 0},
        {rotateZ: 0},
      ],
      duration: 4000,
      delay: anime.stagger(50, {grid: [30, 10], from: 'center'})
    });

  }
}
</script>

<style scoped>
  .playingCard {
    background-repeat:no-repeat;
    background-color: #ffdada;
    background-position: center;
    width: 100%;
    height:100%;
  }
</style>

<style>
.cardContent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform:translate(-50%, -50%);
  width: 10rem;
  height: 30rem;
}
.card {
  position: absolute;
  width: 25px;
  height: 35px;
  border-radius: 3px;
  background-color: #000000;
  background-image: url("/logo.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size:100%;
  border: 1px solid #bfff00;
}
</style>
