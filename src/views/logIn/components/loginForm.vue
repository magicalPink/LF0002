<template>
  <transition name="el-zoom-in-top">
    <main v-if="login === false" class="loginForm p10 white">
      <h1>注册你的即时账户</h1>
      <p>
        <span>已有账户？</span>
        <span style="color: #ff9d76; cursor: pointer" @click="goAndLogIn(true)">前去登录</span>
      </p>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item prop="userName">
          <el-input placeholder="请输入用户名" v-model="ruleForm.userName" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="accountNumber">
          <el-input placeholder="请输入账号" v-model="ruleForm.accountNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" type="password" v-model.number="ruleForm.password" />
        </el-form-item>
        <el-form-item style="margin-top: 40px">
          <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </main>
  </transition>
  <transition name="el-zoom-in-bottom">
    <main v-if="login === true" class="loginForm p10 white">
      <h1>登录你的即时账户</h1>
      <p>
        <span>没有账户？</span>
        <span style="color: #ff9d76; cursor: pointer" @click="goAndLogIn(false)">免费注册</span>
      </p>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        status-icon
        :rules="rules"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item prop="accountNumber">
          <el-input placeholder="请输入账号" v-model="loginForm.accountNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="loginForm.password" />
        </el-form-item>
        <el-form-item style="margin-top: 40px">
          <el-button type="primary" @click="submitForm(loginFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </main>
  </transition>
</template>

<script setup>
import { ref, reactive } from 'vue'
const login = ref(true)
const ruleFormRef = ref()
const loginFormRef = ref()
const ruleForm = reactive({
  userName: '',
  accountNumber: '',
  password: ''
})
const loginForm = reactive({
  accountNumber: '',
  password: ''
})

const rules = reactive({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '用户名长度 3-5', trigger: 'blur' }
  ],
  accountNumber: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 6, max: 10, message: '账号长度 6-10', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度 6-18', trigger: 'blur' }
  ]
})

const goAndLogIn = (flag) => {
  login.value = null
  setTimeout(() => {
    login.value = flag
  }, 200)
}

const submitForm = async (formEl) => {
  console.log(formEl)
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>
:deep(.el-input__wrapper) {
  /*opacity: 0.8;*/
}
.loginForm {
  color: #ffe0e0;
}
</style>
