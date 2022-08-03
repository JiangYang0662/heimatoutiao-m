import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {path: '/login', name: 'login', component: () => import('@/views/layout/Login.vue')},
  {path: '/', component: () => import('@/views/layout/TabBar.vue'), redirect: '/home',
    children:[
      {path: '/home', name: 'home', component: () => import('@/views/layout/Home.vue')},
      {path: '/qa', name: 'qa', component: () => import('@/views/layout/QA.vue')},
      {path: '/video', name: 'video', component: () => import('@/views/layout/Video.vue')},
      {path: '/mine', name: 'mine', component: () => import('@/views/layout/Mine.vue')}
    ]
  },
  {path: '/search', name: 'search', component: () => import('@/views/layout/Search.vue')},
  {path: '/article/:articleId', name: 'article', component: () => import('@/views/layout/Article.vue'), props: true},
  {path: '/mine/info', name: 'mine-info', component: () => import('@/views/layout/MineInfo.vue')},

]
const router = new VueRouter({
  routes
})

export default router
