<template>
  <div class="h100 pt10 flex flex-column justify-center pb50" style="background-color: #F2F3F7">
    <h2 class="red">样式待优化，请切换移动端样式</h2>
    <p class="pr10 absolute" style="text-align: right;top:10px">房间号：<span
      class="blue">{{ roomData?.roomId?.slice(7, 15) }}</span></p>
    <!--  对手  -->
    <div class="flex items-center m5">
      <Avatar ref="opponentAvatar" size="60" :src="gomokuStore.opponent?.avatar" />
      <div class="flex flex-column justify-between" v-if="gomokuStore.opponent?.id">
        <p class="ml5 black mb5">{{ gomokuStore.opponent?.nickname }}</p>
        <div class="flex pl5">
          <div class="blackC mr5" v-if="gomokuStore.opponent?.chess == 'black'">
          </div>
          <div class="whiteC mr5" v-if="gomokuStore.opponent?.chess == 'white'">
          </div>
          <el-tag type="success" v-if="gomokuStore.opponent?.ready == true">已准备</el-tag>
        </div>
      </div>
      <p v-else class="ml5">正在等待对手</p>
    </div>
    <!--  棋盘  -->
    <div class="chessboard">
      <div class="flex" v-for="(item,x) in roomData.chessboard" :key="x">
        <div @click="drop(x,y,val)" class="chess-cell" v-for="(val,y) in item" :key="y">
          <van-icon v-if="location.x == x && location.y == y" color="#5c5c5c" class="spin" size="30" style="font-weight: 800" name="aim" />
          <div class="blackC" v-if="val == 'black'">
          </div>
          <div class="whiteC" v-if="val == 'white'">
          </div>
        </div>
      </div>
    </div>
    <!--  自己  -->
    <div class="flex items-center row-reverse mr5">
      <Avatar ref="oneSelfAvatar" size="60" :src="gomokuStore.oneSelf?.avatar" />
      <div class="flex flex-column justify-between">
        <p class="mr5 black mb5" style="text-align: right">{{ gomokuStore.oneSelf?.nickname }}</p>
        <div class="flex justify-right pr5">
          <el-tag type="success" v-if="gomokuStore.oneSelf?.ready == true">已准备</el-tag>
          <div class="blackC ml5" v-if="gomokuStore.oneSelf?.chess == 'black'">
          </div>
          <div class="whiteC ml5" v-if="gomokuStore.oneSelf?.chess == 'white'">
          </div>
        </div>
      </div>
    </div>
    <!-- 操作区   -->
    <div class="flex justify-between px10 absolute" style="bottom: 20px">
      <el-button @click="operation('leave')">离开</el-button>
      <el-button @click="operation('giveUp')">认输</el-button>
      <el-button @click="operation('regret')">悔棋</el-button>
      <el-button @click="operation('speak')">发言</el-button>
      <el-button @click="operation('Emote')">表情</el-button>
    </div>
    <div v-if="roomData.roomStatus != 'start'" class="flex justify-center pos-t50l50">
      <el-button style="margin-right: 10px" type="primary" round @click="start">开始游戏</el-button>
      <el-button style="margin-left: 10px" type="success" round @click="inviteFriend">邀请好友</el-button>
    </div>
    <van-popup
      v-model:show="friendShow"
      round
      position="bottom"
      :style="{ height: '60%' }"
    >
      <h4 class="pt5 align-center">邀请在线用户</h4>
      <div class="pt5">
        <div v-for="item in onlineList" class="border mx5 radius5 mb10 p5 flex justify-between items-center">
          <div class="flex">
            <van-image
              width="50"
              height="50"
              :src="item?.avatar"
              radius="5"
            />
            <div class="flex flex-column justify-between ml10">
              <h4>{{ item?.nickname || "MeiHL" }}</h4>
              <p v-if="item.state == 'Gomoku'" class="fs12" style="color: #ff499b">五子棋游戏中</p>
              <p v-else class="fs12" style="color: #00ff8c">在线</p>
            </div>
          </div>
          <div>
            <el-button style="margin-right: 5px" @click="invite(item.id,'game')" :disabled="!!item.state" size="small" color="linear-gradient(to right, #ff6034, #ee0a24)">
              邀请比赛
            </el-button>
            <el-button @click="invite(item.id,'witnessABattle')" :disabled="!!item.state" size="small" >
              邀请观战
            </el-button>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 右滑进入 -->
    <transition name="van-slide-right">
      <div v-show="startGame" class="absolute-t50 radius10 px30 py20" style="background-color: #00ff8c;right: 30%">开始游戏</div>
    </transition>
    <!-- 表情包   -->
    <van-popup
      v-model:show="memeShow"
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div class="p20">
        <Meme :show-all="true" size="50" @clickMeme="clickMeme"/>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import Message from "@/utils/message.js"
import MessageBox from "@/utils/messageBox.js"
import roundButton from "@/components/roundButton/index.vue";
import Meme from "@/components/meme/meme.vue"
import Avatar from "@/components/avatar/index.vue";
import { computed, onDeactivated, onMounted, ref, watch } from "vue";
import { useGomokuStore } from "@/store/gomokuStore.js";
import { useUserStore } from "@/store/userStore.js";
import { useRouter } from "vue-router";
import { getOnlineList } from "@/api/user.js";
const userStore = useUserStore();
const gomokuStore = useGomokuStore();
const roomData = computed(() => gomokuStore.roomData);

const oneSelfAvatar = ref(null)

const opponentAvatar = ref(null)

const router = useRouter();

const friendShow = ref(false)

const memeShow = ref(false)

const startGame = ref(false)

const location = ref({
  x:null,
  y:null,
})

const onlineList = ref([])

watch(() => roomData.value.currentUser,(val)=>{
  location.value.x = null
  location.value.y = null
  opponentAvatar.value.reset()
  oneSelfAvatar.value.reset()
  if(val == gomokuStore.opponent.id) {
    console.log(opponentAvatar.value);
    opponentAvatar.value.start()
  }
  if(val == gomokuStore.oneSelf.id) {
    oneSelfAvatar.value.start()
  }
  console.log(val);
  //音效等
})

watch(() => roomData.value.roomStatus,(val)=> {
  console.log(val);
  if(val === 'start') {
    startGame.value = true
    setTimeout(() => startGame.value = false,1000)
  } else if(val === 'over') {
    opponentAvatar.value.reset()
    oneSelfAvatar.value.reset()
  }
})

watch(() => gomokuStore.memeData,(data)=> {
  console.log(data);
  if(data.userId == gomokuStore.opponent?.id) {
    opponentAvatar.value?.showMeme(data.memeIndex)
  }
  if(data.userId == gomokuStore.oneSelf?.id) {
    oneSelfAvatar.value?.showMeme(data.memeIndex)
  }
})

const operation = (type) => {
  if(type == 'leave') {
    userStore.sendMessage({
      Game:'Gomoku',
      type:"leave",
      user:userStore.userInfo,
      roomId:roomData.value.roomId
    })
  }
  if(type == 'giveUp') {
    if(gomokuStore.roomData.roomStatus != "start") {
      return Message({message:"对局未开始"})
    }
    MessageBox('confirm',{
      title:'认输',
      message:'确定要认输吗',
      type:'warning'
    },() => {
      userStore.sendMessage({
        Game:'Gomoku',
        user:userStore.userInfo,
        type:"giveUp",
        roomId:roomData.value.roomId
      })
    },() => {
    })
  }
  if(type == 'regret') {
    if(gomokuStore.roomData.currentUser == userStore.userInfo.id) {
      return Message({message:"当前不能悔棋"})
    }
    MessageBox('confirm',{
      title:'悔棋申请',
      message:'申请悔棋需要对手同意，确定申请悔棋吗？',
      type:'warning'
    },() => {
      userStore.sendMessage({
        Game:'Gomoku',
        user:userStore.userInfo,
        chess:gomokuStore.oneSelf?.chess,
        type:"applyForRegret",
        roomId:roomData.value.roomId,
        opponentId:gomokuStore.opponent.id //对手Id
      })
    },() => {
    })
  }
  if(type == 'Emote') {
    memeShow.value = true
  }
}

const clickMeme = (val) => {
  console.log(val);
  userStore.sendMessage({
    Game:'Gomoku',
    type:"meme",
    user:userStore.userInfo,
    roomId:roomData.value.roomId,
    memeIndex:val
  })
  memeShow.value = false
}

const invite = (inviteUserId,type) => {
  if(type == "game") {
    userStore.sendMessage({
      Game:'Gomoku',
      type:"invite",
      user:userStore.userInfo,
      roomId:roomData.value.roomId,
      inviteUserId,
    })
  }else {
    console.log(9999);
  }
}

const drop = (x,y,val) => {
  if(gomokuStore.roomData.roomStatus == "start") {
    if(gomokuStore.oneSelf.id === roomData.value.currentUser) {
      //自己回合
      console.log(x,y,val);
      if(val === 9) {
        if(location.value.x == x && location.value.y == y) {
          userStore.sendMessage({
            Game:'Gomoku',
            type:"drop",
            user:userStore.userInfo,
            roomId:roomData.value.roomId,
            drop:{x,y,chess:gomokuStore.oneSelf.chess},
            opponentId:gomokuStore.opponent.id //对手Id
          })
        }
        location.value.x = x
        location.value.y = y
      }
    }
  }
};

const inviteFriend = () => {
  friendShow.value = true
  getOnlineList().then(res => {
    onlineList.value = res.data.data
  })
}

const start = () => {
  if(gomokuStore.oneSelf?.ready) {
    return Message({
      message:"已准备",
    })
  }
  userStore.sendMessage({
    Game:'Gomoku',
    type:"start",
    user:userStore.userInfo,
    roomId:roomData.value.roomId
  })
}
</script>

<style lang="less" scoped>
.chessboard {
  margin: 20px auto;
  width: calc(23px * 15);
  background-image: url("/image/chassbord.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover; /* 自动计算并缩放图像以完全覆盖元素 */
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4); /* 添加阴影 */
}

.blackC, .whiteC {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* 添加阴影 */
  border: 1px solid rgba(0, 0, 0, 0.2); /* 边框增加立体感 */
  position: relative;
}

.blackC {
  position: relative;
  background-color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 黑棋更深的阴影 */
  border: 1px solid rgba(255, 255, 255, 0.2); /* 为黑棋添加亮边以增加立体感 */
}

.whiteC {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* 白棋较浅的阴影 */
}

/* 以下是可选的光泽效果 */
.blackC::after, .whiteC::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 5% 53%, rgba(255, 255, 255, 0.5), transparent);
  border-radius: 50%;
}

.chess-cell {
  width: 23px;
  height: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
