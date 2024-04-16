<template>
  <div class="textContent" :style="{background: isMe ? '#82e587' : '#f5f5f5'}">
      {{message.message}}
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: Object,
    default: () => {}
  },
  isMe:{
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.textContent {
  max-width:60%;
  word-break: break-all;
  border-radius: 5px;
  padding: 5px;
  color: black;
}
</style>