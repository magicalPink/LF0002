import axios from '@/utils/axios'

// 获取基本信息
export function getRouteList(params) {
    return axios({
        url: 'router/getList',
        method: 'get',
        params
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

