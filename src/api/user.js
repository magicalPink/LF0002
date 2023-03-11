import axios from '@/utils/axios'
// 注册
export function register(data) {
  return axios({
    url: 'api/api/register',
    method: 'post',
    data
  })
}
// 登录
export function login(data) {
  return axios({
    url: 'api/api/login',
    method: 'post',
    data
  })
}
