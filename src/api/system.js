import axios from '@/utils/axios'

// 获取基本信息
export function getRouteList() {
    return axios({
        url: 'router/getList',
        method: 'get'
    })
}