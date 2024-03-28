<template>
  <div class="h100 cardBoard p10 flex">
    <div :class="'pos pos_' + index" v-for="(item,index) in userList" :key="item.id">
      <div :class="'flex card_content' + ' card_content' + index">
        <Card v-for="card in item.cardList" :cardObj="card"/>
      </div>
      <div>{{ item.nickname }}</div>
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
        value:13,
        color:4,
        show:false,
      },
      {
        value:12,
        color:4,
        show:false,
      },
      {
        value:11,
        color:4,
        show:false,
      }
    ]
  },
  {
    id:1,
    nickname:'zxx',
    cardList:[
      {
        value:2,
        color:4,
        show:true,
      },
      {
        value:2,
        color:1,
        show:true,
      },
      {
        value:2,
        color:2,
        show:true,
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
        show:true,
      },
      {
        value:2,
        color:1,
        show:true,
      },
      {
        value:2,
        color:2,
        show:true,
      }
    ]
  },
])

</script>

<style scoped>
.card_content {
  border: 3px solid #ff0000;
  border-radius:10px;
  padding: 5px;
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
  background-color: #277652;
}
</style>
