import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载Vant核心组件库+全局样式
import Vant from 'vant'
import 'vant/lib/index.css'
// 导入全局样式
import './style/index.less'
// 导入rem
import 'amfe-flexible'
import './utils/day'

Vue.config.productionTip = false
// 注册使用Vant组件库  Vue的要在import的下面书写！！
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
