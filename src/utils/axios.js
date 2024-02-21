import Axios from 'axios'
import { ElMessage } from 'element-plus'
import {baseURL} from '@/config.js'
import { useUserStore } from "@/store/userStore.js";
const axios = Axios.create({
  baseURL,
  timeout: 20000, // 请求超时 20s
  withCredentials: true // 允许携带 cookie
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (response) => {
    /**
     * 根据你的项目实际情况来对 config 做处理
     * 这里对 config 不做任何处理，直接返回
     */
    response.headers.Authorization = localStorage.getItem('token')
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    if (response.data.status == 1) {
      ElMessage.error(response.data.message)
    }

    return response
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response?.data?.message || '系统异常'
      ElMessage.error(msg)
      if (code == 401) {
        useUserStore().logout()
        // location.href = '/#/login'
        //解决 白屏问题
        // location.reload()
      }
      console.error(`[Axios Error]`, error.response)
    } else {
      ElMessage.error(`${error}`)
    }
    return Promise.reject(error)
  }
)

export default axios
