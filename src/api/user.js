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
// 3. 获取用户信息
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
// 10. 根据id获取文章详情信息
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}
// 11. 关注用户
export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
// 12. 取消关注
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`
  })
}
// 合并一起
// export const followAuthor = (authorId, isFollow) => {
//   if (isFollow) {
//     return request({
//       url: '/v1_0/user/followings',
//       method: 'post',
//       data: { target: authorId }
//     })
//   } else {
//     return request({
//       url: '/v1_0/user/followings/' + authorId,
//       method: 'delete'
//     })
//   }
// }
// 13. 收藏文章、取消
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}
export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
//14. 对文章点赞
export const addLike = articleId => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}
export const deleteLike = articleId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${articleId}`
  })
}
// 15. 根据id获取文章的评论列表数据
// export function getComments(params) {
//   return request({
//     method: "GET",
//     url: "/app/v1_0/comments",
//     params
//   });
// }
export const getComments = params => {
  return request({
    method: "GET",
    url: "/v1_0/comments",
    params
  });
}
// 16. 对评论、回复点赞
export function addCommentLike(commentId) {
  return request({
    method: "POST",
    url: "/v1_0/comment/likings",
    data: {
      target: commentId
    }
  });
}
export function deleteCommentLike(commentId) {
  return request({
    method: "DELETE",
    url: `/v1_0/comment/likings/${commentId}`
  });
}
// 17. 发布评论
// export function addComment(data) {
//   return request({
//     method: "POST",
//     url: "/v1_0/comments",
//     data
//   });
// }
export const addComment = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
// 18. 获取个人资料
export const getUserProfile = () => {
  return request({
      method: 'GET',
      url: '/v1_0/user/profile'
  })
}
// 19. 更新用户个人资料--昵称-生日-性别
export const updateUserProfile = data => {
  return request({
      method: 'PATCH',
      url: '/v1_0/user/profile',
      data
  })
}
// 20. 更新用户个人资料--图片
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}