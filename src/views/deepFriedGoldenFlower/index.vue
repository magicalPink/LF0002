<template>
  <div class="h100 cardBoard p10 flex">
    <div class="flex" v-for="item in userList" :key="item.id">
      <div>{{ item.nickname }}</div>
      <div class="flex">
        <Card v-for="card in item.cardList" :cardObj="card"/>
      </div>
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
])

</script>

<style scoped>
.cardBoard {
  background-color: #277652;
}
</style>
