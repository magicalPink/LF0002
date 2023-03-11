import axios from '@/utils/axios'

// 获取基本信息
export function getBasicInfo() {
  return axios({
    url: 'info/userinfo',
    method: 'get'
  })
}
