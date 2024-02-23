import axios from '@/utils/axios'
// 注册
export function register(data) {
  return axios({
    url: 'api/register',
    method: 'post',
    data
  })
}
// 登录
export function login(data) {
  return axios({
    url: 'api/login',
    method: 'post',
    data
  })
}
// 获取基本信息
export function getBasicInfo() {
  return axios({
    url: 'info/userinfo',
    method: 'get'
  })
}
//设置用户名称
export function setNickname(data) {
  return axios({
    url: 'info/setNickname',
    method: 'post',
    data
  })
}
//设置用户头像
export function setAvatar(data) {
  return axios({
    url: 'info/setAvatar',
    method: 'post',
    data
  })
}
