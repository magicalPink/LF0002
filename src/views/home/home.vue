<template>
  <div class="">{{ userInfo.username }}</div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { getBasicInfo } from '@/api/home'
let userInfo = ref({})
const getInfo = async () => {
  let { data } = await getBasicInfo()
  userInfo.value = data.data
  console.log(data.data)
}
onBeforeMount(() => {
  getInfo()
})
</script>

<style scoped></style>
