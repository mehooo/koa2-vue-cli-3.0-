import request from '@/assets/utils/request'


export function getDashboardInfo() {
    return request({
        url: '/dashboard',
        method: 'get',
    })
}

