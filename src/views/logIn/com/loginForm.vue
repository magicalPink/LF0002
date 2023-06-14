<template>
  <transition name="el-zoom-in-top">
    <!--    注册-->
    <main v-if="loginFlag === false" class="loginForm p10">
      <h1>注册你的账户</h1>
      <p>
        <span>已有账户？</span>
        <span style="color: #409EFF; cursor: pointer" @click="goAndLogIn(true)">前去登录</span>
      </p>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="0">
        <el-form-item prop="nickname">
          <el-input
            clearable
            type="text"
            placeholder="请输入用户名"
            v-model="ruleForm.nickname"
            :readonly="readonly"
            @click="readonly = false"
          />
        </el-form-item>
        <el-form-item prop="username">
          <el-input clearable type="text" placeholder="请输入账号" v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            clearable
            placeholder="请输入密码"
            show-password
            type="password"
            autocomplete="off"
            v-model.number="ruleForm.password"
          />
        </el-form-item>
        <el-form-item prop="secondaryConfirmation">
          <el-input
            clearable
            placeholder="请再次输入密码"
            show-password
            type="password"
            v-model.number="ruleForm.secondaryConfirmation"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w100" @click="submitForm(ruleFormRef)">注册</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="w100" @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </main>
  </transition>
  <transition name="el-zoom-in-bottom">
    <!--    登录-->
    <main v-if="loginFlag === true" class="loginForm p10">
      <h1>登录你的账户</h1>
      <p>
        <span>没有账户？</span>
        <span style="color: #409EFF; cursor: pointer" @click="goAndLogIn(false)">免费注册</span>
      </p>
      <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" label-width="0">
        <el-form-item prop="username">
          <el-input clearable placeholder="请输入账号" v-model="loginForm.username" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            clearable
            placeholder="请输入密码"
            type="password"
            v-model="loginForm.password"
          />
        </el-form-item>
        <el-form-item style="margin-top: 40px">
          <el-button type="primary" class="w100" @click="submitForm(loginFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </main>
  </transition>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { register, login } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginFlag = ref(true)
const ruleFormRef = ref()
const loginFormRef = ref()
const readonly = ref(true)
const ruleForm = reactive({
  nickname: '',
  username: '',
  password: '',
  secondaryConfirmation: ''
})
const loginForm = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  nickname: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { min: 2, max: 6, message: '用户名长度 2-6', trigger: 'change' }
  ],
  username: [
    { required: true, message: '请输入账号', trigger: 'change' },
    { min: 6, max: 15, message: '账号长度 6-15', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { min: 6, max: 18, message: '密码长度 6-18', trigger: 'change' }
  ],
  secondaryConfirmation: [
    { required: true, message: '请再次输入密码', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (value !== ruleForm.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
})

const goAndLogIn = (flag) => {
  loginFlag.value = null
  setTimeout(() => {
    loginFlag.value = flag
  }, 200)
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (loginFlag.value) {
        let { data } = await login(loginForm)
        if (data.status == 0) {
          ElMessage.success('登录成功')
          //储存token
          localStorage.setItem('token', data.token)
          //跳转到首页
          router.replace('/')
        }
      } else {
        const { nickname, username, password } = ruleForm

        let { data } = await register({ nickname, username, password })
        if (data.status == 0) {
          ElMessage.success('注册成功')
          loginFlag.value = true
        }
      }
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

<style lang="less" scoped>
:deep(.el-input__wrapper) {
  /*opacity: 0.8;*/
}
</style>
