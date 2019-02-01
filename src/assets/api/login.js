import request from '@/assets/utils/request'

export function login(username, password) {
    return request({
        url: '/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}
export function getUserInfo(token) {
    return request({
        url: '/userInfo',
        method: 'get',
        params: { token }
    })
}


