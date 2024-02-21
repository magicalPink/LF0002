<script setup>
  import { ref } from "vue"
  // 豹子 100000 金花 10000 顺子 500 对子 50
  let boards = [
    {
      label:1,
      value:14
    },
    {
      label:2,
      value:2
    },
    {
      label:3,
      value:3
    },
    {
      label:4,
      value:4
    },
    {
      label:5,
      value:5
    },
    {
      label:6,
      value:6
    },
    {
      label:7,
      value:7
    },
    {
      label:8,
      value:8
    },
    {
      label:9,
      value:9
    },
    {
      label:10,
      value:10
    },
    {
      label:11,
      value:11
    },
    {
      label:12,
      value:12
    },
    {
      label:13,
      value:13
    },
  ]
  let colors = [
    {
      label:"黑桃",
      value:4,
    },
    {
      label:"红心",
      value:3,
    },
    {
      label:"梅花",
      value:2,
    },
    {
      label:"方片",
      value:1,
    },
  ]
  let decks = ref([
    {
      label:1,
      value:14,
      color:4
    },
    {
      label:12,
      value:12,
      color:4
    },
    {
      label:13,
      value:13,
      color:4
    },
  ])
  const getWeight = (deck) => {
    let decks = deck
    let obj = {
      multiple:0,//权重
      pattern:'',
    } //权重
    let board1 = decks[0]
    let board2 = decks[1]
    let board3 = decks[2]
    //豹子判断
    if (board1.value === board2.value && board1.value === board3.value) {
      obj.multiple += board1.value * 100000
      obj.pattern = '豹子'
    }
    //同花判断
    if(board1.color === board2.color && board1.color === board3.color) {
      obj.multiple += board1.color * 10000
      if(obj.pattern) {
        obj.pattern = '同花豹'
      }else {
        obj.pattern = '同花'
      }
    }
    //顺子判断
    if(board1.label + 1 == board2.label && board1.label + 2 == board3.label) {
      obj.multiple += board3.value * 500
      if(obj.pattern) {
        obj.pattern = '同花顺'
      } else {
        obj.pattern = '顺子'
      }
    } else if(board1.label == 1 && board2.label == 12 && board3.label == 13) {
      //QKA特殊判断
      obj.multiple += board1.value * 500
      if(obj.pattern) {
        obj.pattern = '同花顺'
      } else  {
        obj.pattern = '顺子'
      }
    }
    //对子判断
    if(board1.value == board2.value) {
      if(board1.label == 1) {
        obj.multiple += board1.value * 50
      } else {
        obj.multiple += board3.value * 50
      }
      if(!obj.pattern) {
        obj.pattern = '对子'
      }
    } else if(board1.value == board3.value) {
      if(board1.label == 1) {
        obj.multiple += board1.value * 50
      } else {
        obj.multiple += board3.value * 50
      }
      if(!obj.pattern) {
        obj.pattern = '对子'
      }
    } else if(board2.value == board3.value) {
      obj.multiple += board3.value * 50
      if(!obj.pattern) {
        obj.pattern = '对子'
      }
    }
    obj.multiple += board1.value
    obj.multiple += board2.value
    obj.multiple += board3.value
    console.log(obj);
  }
  const changeDeck = (e,val) => {
    console.log(e);
    if(e === 14) {
      decks.value[val].label = 1
    } else {
      decks.value[val].label = e
    }
  }
</script>

<template>
  <div>
    <div>
      <div>
        <el-select v-model="decks[0].value" @change="(e) => changeDeck(e,0)">
          <el-option v-for="item in boards" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="decks[0].color">
          <el-option v-for="item in colors" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div>
        <el-select v-model="decks[1].value" @change="(e) => changeDeck(e,1)">
          <el-option v-for="item in boards" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="decks[1].color">
          <el-option v-for="item in colors" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div>
        <el-select v-model="decks[2].value" @change="(e) => changeDeck(e,2)">
          <el-option v-for="item in boards" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="decks[2].color">
          <el-option v-for="item in colors" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <el-button @click="getWeight(decks)">获取大小</el-button>
      {{ decks }}
    </div>
  </div>
</template>

<style scoped>

</style>
