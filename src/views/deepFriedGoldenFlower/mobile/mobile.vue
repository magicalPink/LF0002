<template>
  <div class="h100 cardBoard p10 flex">
    <div :class="'pos pos_' + index" v-for="(item,index) in userList" :key="item.id">
      <div :class="'card_content' + ' card_content' + index">
        <Card :scale="card.scale" v-for="card in item.cardList" :cardObj="card"/>
      </div>
      <div>
        <span style="color: #e6a23c">{{ item.nickname }}</span>
      </div>
      <van-button @click="userList[index].cardList[0].show = !userList[index].cardList[0].show ">看</van-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Card from "@/components/card/index.vue"
const userList = ref([
  {
    id:1,
    nickname:'方亮',
    cardList:[
      {
        value:1,
        color:4,
        show:false,
        scale:1.5
      },
      {
        value:1,
        color:3,
        show:true,
        scale:1.5
      },
      {
        value:1,
        color:2,
        show:true,
        scale:1.5
      },
    ]
  },
  {
    id:1,
    nickname:'zxx',
    cardList:[
      {
        value:2,
        color:4,
        show:false,
      },
      {
        value:2,
        color:1,
        show:false,
      },
      {
        value:2,
        color:2,
        show:false,
      }
    ]
  },
  {
    id:2,
    nickname:'zxx',
    cardList:[
      {
        value:2,
        color:4,
        show:false,
      },
      {
        value:2,
        color:1,
        show:false,
      },
      {
        value:2,
        color:2,
        show:false,
      }
    ]
  },
])

</script>

<style scoped>
.card_content {
  display: flex;
}
.pos {
  color: #fff;
  text-align: center;
}
.pos_0 {
  position:absolute;
  bottom:0;
  left:50%;
  transform:translateX(-50%);
}
.pos_1 {
  position:absolute;
  bottom:30%;
  right:0px;
}
.pos_2 {
  position:absolute;
  bottom:60%;
  right:0px;
}
.cardBoard {
  background-image: url('/image/cardDesk.png');
  background-repeat: no-repeat;
  background-size:100% 100%;
  background-color: #277652;
}
</style>
