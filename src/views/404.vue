<template>
  <div class="not_found">
    <p>
      页面将在<span>{{ time }}</span>秒后自动跳转首页，<br>
      您也可以点击这里跳转<a href="/">首页</a>
    </p>
  </div>
</template>

<script>
export default {
  name: '',
  // 定义属性
  data() {
    return {
      time: '10',
      time_end: null
    }
  },
  // 方法集合
  methods: {
    GoIndex() {
      let _t = 9
      this.time_end = setInterval(() => {
        if (_t !== 0) {
          this.time = _t--;
        } else {
          this.$router.replace('/')
          clearTimeout(this.time_end)
          this.time_end = null
        }
      }, 1000)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.GoIndex()
  },
  destroyed() {
    clearTimeout(this.time_end)
    this.time_end = null
  }, // 生命周期 - 销毁完成
}
</script>

<style scoped lang='less'>
.not_found {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;

  p {
    position: absolute;
    top: 50%;
    left: 20%;
    transform: translate(-50%, 0);
    span{
      color: orange;
      font-family: '仿宋';
      font-size: 25px;
    }
    a {
      font-size: 30px;
      color: aqua;
      text-decoration: underline;
    }
  }
}
</style>
