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
        :style="{ width: '100%', height: '100%' }"
    >
      <div class="flex flex-column h100 justify-between">
        <van-nav-bar
            :title="friendInfo.nickname || 'MeiHL'"
            left-arrow
            @click-left="chatShow = false"
        />
        <div class="border flex-auto">
          <div v-for="item in msgList" class="flex justify-end mb10">
            {{item}}
          </div>
        </div>
        <div>
          <van-field
              v-model="msg"
              center
              clearable
              placeholder="请输入消息内容"
          >
            <template #button>
              <van-button size="small" type="primary" @click="sendMsg">发送</van-button>
            </template>
          </van-field>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import {ref, onMounted, defineProps, reactive} from "vue";

const props = defineProps({
  onlineList:{
    type: Object,
    default: null
  },
})

const chatShow = ref(false)

const msgList = ref([])

const sendMsg = () => {
  console.log(msg.value)
  msgList.value.push(msg.value)
}

let msg = ref("")

let friendInfo = reactive({})

const goChat = (item) => {
  chatShow.value = true
  friendInfo = item
}

onMounted(() => {
  console.log(props.onlineList);
})
</script>

<style scoped>

</style>
