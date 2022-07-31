<template>
  <div class="layout-container">
      <!-- 子路由组件--首页--问答--视频--我的 -->
      <router-view></router-view>
    <!-- 标签导航栏 -->
    <!--  route: 开启路由模式 -->
    <!-- to: 对应的路由路径 -->
    <van-tabbar class="layout-tabbar" route v-model="active">
      <van-tabbar-item to="/home" >
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa" >
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video" >
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/mine" >
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text" v-if="user">我的</span>
        <span class="text" v-else>未登录</span>
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {
      active: 0,
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
