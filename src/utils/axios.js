import Axios from 'axios'
import Message from "./message.js"
import MessageBox from "./messageBox.js"
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
      Message({
        message: response.data.message,
        type:'error',
      })
      return Promise.reject(response.data)
    }

    return response
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response?.data?.message || '系统异常'
      // TODO: 401 Token过期或者账号被其他用户登录
      if (code == 401) {
        //关闭 socket 防止用户不点击确定 一直出现弹窗
        useUserStore().closeWebSocket()
        //删除token 防止socket心跳复苏
        localStorage.removeItem('token')
        MessageBox('alert',{
          title:'系统提示',
          message:msg,
          type:'warning'
        },() => {
          useUserStore().logout()
        })
      } else {
        Message({
          message: msg,
          type:'error',
        })
      }
      console.error(`[Axios Error]`, error.response)
    } else {
      Message({
        message: error,
        type:'error',
      })
    }
    return Promise.reject(error)
  }
)

export default axios
