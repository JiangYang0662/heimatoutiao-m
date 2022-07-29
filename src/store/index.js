import Vue from 'vue'
import Vuex from 'vuex'
// 加载被封装的本地存储模块
import { getItem, setItem } from "@/utils/storage"

Vue.use(Vuex)

const Token_key = 'TOUTIAO_USER';

export default new Vuex.Store({
  state: {
    // 用户登录状态的信息
    // user: ''刷新的时候会恢复空值，可以在本地localstorage找回
    // 本地存储的是字符串，需要json.pares转换为对象
    // user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))
    // 为了方便维护token，建议把token对象化
    user: getItem(Token_key)
  },
  getters: {
  },
  mutations: {
    setUser(state,user) {
      state.user = user;
      // window.localStorage.setItem('TOUTIAO_USER',JSON.stringify(user))
      setItem(Token_key,state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
