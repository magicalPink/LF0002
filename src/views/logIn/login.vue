<template>
  <div class="login_c">
    <!--  left  -->
    <main>
      <el-form
        label-position="right"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px;margin-right: 40px"
      >
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="请输入密码" v-model="formLabelAlign.region" />
        </el-form-item>
        <el-form-item label="验证码">
          <el-input placeholder="请输入验证码" v-model="formLabelAlign.type" />
        </el-form-item>
        <el-form-item>
          <el-button style="margin-right: 30px" type="primary" @click="onSubmit">登录</el-button>
          <el-button @click="onSubmit">注册</el-button>
        </el-form-item>
      </el-form>
    </main>
    <!--  right  -->
    <main></main>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: ''
})
const onSubmit = () => {
  console.log('submit!')
}
</script>

<style lang="less" scoped>
:deep(.el-input__wrapper) {
  opacity: 0.5;
  box-shadow: pink 4px 1px 5px;
}
.el-button + .el-button {
  opacity: 0.5;
}

.login_c {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/public/image/login_bg.jpg');
  background-size: cover;
  background-position: center;
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20vw;
    height: 36vh;
    margin: 5vw;
    border-radius: 30px;
    box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126), 0 0.9px 1.7px rgba(0, 0, 0, 0.179),
      0 1.8px 3.5px rgba(0, 0, 0, 0.224), 0 3.7px 7.3px rgba(0, 0, 0, 0.277),
      0 10px 20px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(20px);
    transition: 0.5s ease;

    &:hover {
      box-shadow: 0 0.7px 1px rgba(0, 0, 0, 0.157), 0 1.7px 2.6px rgba(0, 0, 0, 0.224),
        0 3.5px 5.3px rgba(0, 0, 0, 0.28), 0 7.3px 11px rgba(0, 0, 0, 0.346),
        0 20px 30px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
