<template>
  <div class="w100 h100">
    <css-doodle>
      --color: #fff, #fffde1, #ff9d76, #FB3569; @grid: 20x1 / 100vw 100vh / #270f34; :container {
      perspective: 30vmin; --deg: @p(-180deg, 180deg); } :after, :before { content: ''; background:
      @p(--color); @place: @r(100%) @r(100%); @size: @r(6px); @shape: heart; } @place: center;
      @size: 18vmin; box-shadow: @m2(0 0 50px @p(--color)); background: @m100(
      radial-gradient(@p(--color) 50%, transparent 0) @r(-20%, 120%) @r(-20%, 100%) / 1px 1px
      no-repeat ); will-change: transform, opacity; animation: scale-up 12s linear infinite;
      animation-delay: calc(-12s / @I * @i); @keyframes scale-up { 0%, 95.01%, 100% { transform:
      translateZ(0) rotate(0); opacity: 0; } 10% { opacity: 1; } 95% { transform: translateZ(25vmin)
      rotateZ(var(--deg)); } }
    </css-doodle>
    <!--  left  -->
    <main class="loginMain absolute-t50 right5-1 radius5">
      <LoginForm />
    </main>
  </div>
</template>

<script setup>
import 'css-doodle'
import LoginForm from './components/loginForm.vue'
</script>

<style lang="less" scoped>
.loginMain {
  width: 350px;
  height: 450px;
  box-shadow: 0 0.3px 0.7px rgba(213, 82, 82, 0.13), 0 0.9px 1.7px rgba(146, 39, 39, 0.18),
    0 1.8px 3.5px rgba(130, 39, 39, 0.22), 0 3.7px 7.3px rgba(165, 78, 78, 0.27),
    0 10px 20px rgba(167, 95, 95, 0.4);
  backdrop-filter: blur(20px);
  transition: 0.5s ease;
  overflow: hidden;
}
</style>
