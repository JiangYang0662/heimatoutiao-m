// 加载请求模块
import request from "@/utils/request";

// 1. 验证用户登录信息请求
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}
// 2. 获取验证码
export const getSmsCode = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`,
    })
}