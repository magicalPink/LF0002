<template>
  <div class="w100 h100">
    <css-doodle>
      --color: #F50303, #FDDB4F, #000000, #8EFF00,#09FF90,#0047FF,pink,#956AFF,#FA22E6; @grid: 15x1
      / 100vw 100vh / #DAD1D1; :container { perspective: 10vmin; --deg: @p(-180deg, 180deg); }
      :after, :before { content: ''; background: @p(--color); @place: @r(100%) @r(100%); @size:
      @r(6px); @shape: heart; } @place: center; @size: 7vmin; box-shadow: @m2(0 0 50px @p(--color));
      background: @m100( radial-gradient(@p(--color) 50%, transparent 0) @r(-20%, 120%) @r(-20%,
      100%) / 1px 1px no-repeat ); will-change: transform, opacity; animation: scale-up 15s linear
      infinite; animation-delay: calc(-15s / @I * @i); @keyframes scale-up { 0%, 95.01%, 100% {
      transform: translateZ(0) rotate(0); opacity: 0; } 10% { opacity: 1; } 95% { transform:
      translateZ(25vmin) rotateZ(var(--deg)); } }
    </css-doodle>
    <!--  left  -->
    <main class="loginMain absolute-t50 radius5 bgc-white">
      <LoginForm />
    </main>
  </div>
</template>

<script setup>
import 'css-doodle'
import LoginForm from './com/loginForm.vue'
</script>

<style lang="less" scoped>
.loginMain {
  width: 350px;
  height: 500px;
  overflow: hidden;
  right: 5%;
}
</style>
