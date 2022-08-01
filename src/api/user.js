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
// 3. 获取用户细腻些
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user',
        // 发生请求头数据
        // headers: {
        //     // 注意：该接口需要授权才能访问
        //     //  token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
        // 优化header
    })
}
// 4. 获取用户频道信息
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: `/v1_0/user/channels`,
    })
}
// 5. 获取所有的频道列表
export const getAllChannels = () => {
    return request({
      method: 'GET',
      url: '/v1_0/channels'
    })
}
// 6. 添加用户新的频道
export const addUserChannel = channels => {
    return request({
      method: 'PATCH',
      url: '/v1_0/user/channels',
      data: {
        channels
      }
    })
  }
// 7. 删除频道
export const deleteUserChannel = channelId => {
    return request({
      method: 'DELETE',
      url: `v1_0/user/channels/${channelId}`
    })
}

// 8. 获取联想建议
export const getSearchSuggestions = q => {
    return request({
      method: 'GET',
      url: '/v1_0/suggestion',
      params: {
        q
      }
    })
}
// 9. 获取搜索结果
export function getSearch(params) {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}