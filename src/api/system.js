import axios from '@/utils/axios'

// 获取基本信息
export function getRouteList(params) {
  return axios({
    url: 'router/getList',
    method: 'get',
    params
  })
}
// 获取基本信息
export function getMenuList() {
  return axios({
    url: 'router/getMenuList',
    method: 'get'
  })
}
//新增路由
export function addRouter(data) {
  return axios({
    url: 'router/addRouter',
    method: 'post',
    data
  })
}

//新增路由
export function deleteRouter(id) {
  return axios({
    url: `router/deleteRouter?id=${id}`,
    method: 'get'
  })
}
