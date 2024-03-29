<template>
  <div class="h100 cardBoard flex" style="flex-direction: column-reverse;">
    <div class="flex w100 justify-between p10">
      <van-button color="#fff" style="background-color: #ffffff45" size="small">离开</van-button>
      <van-button color="#fff" style="background-color: #ffffff45" size="small">表情</van-button>
      <van-button color="#fff" style="background-color: #ffffff45" size="small">看牌</van-button>
      <van-button color="#fff" style="background-color: #ffffff45" size="small">跟注</van-button>
      <van-button color="#fff" style="background-color: #ffffff45" size="small">加注</van-button>
      <van-button color="#fff" style="background-color: #ffffff45" size="small">弃牌</van-button>
    </div>
    <!--  自己   -->
    <div class="flex justify-center pt20">
      <div class="flex flex-column items-center justify-center mr10">
        <Avatar ref="oneSelfAvatar" size="60" :src="'/image/avatar/avatar2.png'" />
        <p style="color: #ec4040">{{ userList[0].nickname }}</p>
        <p style="color: #e6a23c">筹码：300</p>
      </div>
      <div class="card_content">
        <Card class="mr5" :scale="card.scale" v-for="card in userList[0].cardList" :cardObj="card" />
      </div>
    </div>
    <div class="flex justify-between" style="flex: auto">
      <div class="flex justify-between py10 pl5" style="flex-direction: column-reverse;">
        <div>
          <div class="flex items-center" style="justify-content: right">
            <Avatar ref="oneSelfAvatar" size="50" :src="'/image/avatar/avatar2.png'" />
            <div class="card_content">
              <Card style="margin-right: -10px" :scale="card.scale" v-for="card in userList[1].cardList" :cardObj="card" />
            </div>
          </div>
          <div class="flex flex-column justify-center items-center">
            <p class="mr10" style="color: #ec4040">牛魔王大王</p>
            <p class="mr10" style="color: #e6a23c">筹码：300</p>
          </div>
        </div>
      </div>
      <div class="flex justify-between py10" style="flex-direction: column-reverse;">
        <div>
          <div class="flex items-center" style="justify-content: right">
            <div class="card_content mr5">
              <Card style="margin-left: -10px" :scale="card.scale" v-for="card in userList[1].cardList" :cardObj="card" />
            </div>
            <Avatar ref="oneSelfAvatar" size="50" :src="'/image/avatar/avatar2.png'" />
          </div>
          <div class="flex flex-column justify-center items-center">
            <p class="mr10" style="color: #ec4040">牛魔王大王</p>
            <p class="mr10" style="color: #e6a23c">筹码：300</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Avatar from "@/components/avatar/index.vue";
import Card from "@/components/card/index.vue";

const userList = ref([
  {
    id: 1,
    nickname: "方亮",
    cardList: [
      {
        value: 1,
        color: 4,
        show: true,
        scale: 1.5
      },
      {
        value: 1,
        color: 3,
        show: true,
        scale: 1.5
      },
      {
        value: 1,
        color: 2,
        show: true,
        scale: 1.5
      }
    ]
  },
  {
    id: 2,
    nickname: "zxx",
    cardList: [
      {
        value: 2,
        color: 4,
        show: true,
        scale: 0.5
      },
      {
        value: 2,
        color: 1,
        show: true,
        scale: 0.5
      },
      {
        value: 2,
        color: 2,
        show: true,
        scale: 0.5
      }
    ]
  },
  {
    id: 3,
    nickname: "zxx",
    cardList: [
      {
        value: 2,
        color: 4,
        show: false
      },
      {
        value: 2,
        color: 1,
        show: false
      },
      {
        value: 2,
        color: 2,
        show: false
      }
    ]
  }
]);

</script>

<style scoped>
.card_content {
  display: flex;
}

.cardBoard {
  background-image: url('/image/cardDesk.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-color: #277652;
}
</style>
