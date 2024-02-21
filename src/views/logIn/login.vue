<template>
  <div>
    <LoginDoodle />
    <main style="width: 500px" class="loginMain radius5">
      <LoginForm />
    </main>
  </div>
</template>

<script setup>
import 'css-doodle'
import LoginForm from './com/loginForm.vue'
import LoginDoodle from './com/loginDoodel.vue'
</script>

<style lang="less" scoped>
.loginMain {
  overflow: hidden;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%);
}
/* 在移动端视口宽度小于或等于768px时应用 */
@media (max-width: 768px) {
  .loginMain {
    width: 350px !important;
  }
}
</style>
