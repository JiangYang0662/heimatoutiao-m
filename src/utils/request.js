//  请求模块
import axios from "axios"
import store from "@/store"

const request = axios.create({
    // 接口的基础路径
    baseURL: 'http://toutiao.itheima.net/'
   
})
// 请求拦截器
// config 本次请求的配置对象
request.interceptors.request.use(function(config){
    const {user} = store.state;
    if(user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config; // 放行config
}, function(error){
    return Promise.reject(error)
})
// 响应拦截器

export default request