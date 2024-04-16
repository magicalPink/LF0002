<template>
  <div class="pt5">
    <div v-for="item in onlineList" @click="goChat(item)" class="border mx5 radius5 mb10 p5 flex justify-between">
      <div class="flex flex-column justify-between">
        <h4>{{ item?.nickname || "MeiHL" }}</h4>
        <p class="fs12" style="color: #00ff8c">在线</p>
      </div>
      <van-image
        width="50"
        height="50"
        :src="item?.avatar"
        radius="5"
      />
    </div>
    <!--  chat  -->
    <van-popup
        v-model:show="chatShow"
        position="right"
        :style="{ width: '100%', height: '100vh' }"
    >
      <div class="flex flex-column h100 justify-between">
        <van-nav-bar
            :title="friendInfo.nickname || 'MeiHL'"
            left-arrow
            @click-left="chatShow = false"
        />
        <div ref="messageContent" class="dynamicBackground border flex-auto auto p10" style="scroll-behavior: smooth">
          <MessageList :message-list="msgList"/>
        </div>
        <div>
          <van-field
              v-model="msg"
              center
              placeholder="请输入消息内容"
              enterkeyhint="enter"
              @focus="scrollToBottom"
              @keydown.enter.prevent="sendMsg"
          >
            <template #button>
              <van-button v-if="judgeDeviceType() === 'PC'" size="small" type="primary" @click="sendMsg">发送</van-button>
            </template>
          </van-field>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import MessageList from "@/components/message/index.vue"
import {ref, onMounted, defineProps, reactive,nextTick} from "vue";
import { judgeDeviceType } from "@/utils/tool.js";
import {useUserStore} from "@/store/userStore.js";
const userStore = useUserStore()
const props = defineProps({
  onlineList:{
    type: Object,
    default: null
  },
})

const chatShow = ref(false)

const messageContent = ref(null)

const msgList = ref([])

let msg = ref("")

let friendInfo = reactive({})

const sendMsg = () => {
  console.log(msg.value)
  msgList.value.push({
    type:"text",
    message:msg.value,
    avatar:'/image/avatar/avatar10.png',
    sender:userStore.userInfo.id
  })
  msgList.value.push({
    type:"text",
    message:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
    avatar:'/image/avatar/avatar10.png',
    sender:6353
  })
  scrollToBottom()
}

const goChat = (item) => {
  chatShow.value = true
  friendInfo = item
}

// 创建一个方法来滚动到底部
function scrollToBottom() {
  nextTick(() => {
    if (messageContent.value) {
      //带过渡滚动效果
      messageContent.value.scrollTop = messageContent.value.scrollHeight;
    }
  });
}

onMounted(() => {
  console.log(props.onlineList);
})
</script>

<style scoped>

</style>
