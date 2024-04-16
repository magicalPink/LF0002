<template>
  <div v-for="item in messageList" class="mb10">
    <div :class="{
      'flex row-reverse': item.sender === userStore.userInfo.id,
      'flex': item.sender !== userStore.userInfo.id
    }">
      <van-image
          width="40"
          height="40"
          :src="item?.avatar"
          :class="{
             'ml5': item.sender === userStore.userInfo.id,
             'mr5': item.sender !== userStore.userInfo.id
          }"
          round
      />
      <component :is="messageType[item.type]" :message="item" :isMe="item.sender === userStore.userInfo.id"/>
    </div>
  </div>
</template>

<script setup>
import Text from './text.vue'

import {useUserStore} from "@/store/userStore.js";

const userStore = useUserStore()

const props = defineProps({
  messageList: {
    type: Array,
    default: () => []
  }
})

//消息枚举
const messageType = {
  text: Text
}

</script>

<style scoped>

</style>