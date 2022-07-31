<template>
  <div class="my-container">
    <!-- 已登录页面 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image
            :src="userInfo.photo"
            class="avatar"
            round
            fit="cover"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录页面 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" class="mobile-img" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 宫格导航-start -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item  class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">我的收藏</span>
      </van-grid-item>
     <van-grid-item  class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">浏览历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 宫格导航-end -->

    <van-cell title="消息通知" is-link url="" />
    <van-cell title="实名认证" is-link url="" />
    <van-cell title="用户反馈" is-link url="" />
    <van-cell title="小智同学" is-link url="" />
    <van-cell title="系统设置" is-link url="" />
    <!-- 退出登录按钮 -->
    <van-cell class="logout-cell" title="退出登录" clickable @click="onLogout"  v-if="user"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: "MinePage",
  components: {},
  props: {},
  data() {
    return {
      //当前登录用户的信息
      userInfo: {}
    };
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    // 如果用户登录了，就请求当前用户信息
    if(this.user) {
      this.loadUser();
    }
  },
  mounted() {},
  methods: {
    // 1. 退出登录
    onLogout() {
      // 退出提示
      this.$dialog.confirm({title:'确认退出吗？'}).
      then(() => {
        // 确认执行步骤
        console.log('确认退出');
        this.$store.commit('setUser',null);
      }).catch(() => {
        // 取消执行步骤
        console.log('取消退出');
      })
    },

    // 2. 请求用户细腻些
    async loadUser() {
     try {
        const { data } = await getUserInfo();
        this.userInfo = data.data;
      } catch (err) {
        // console.log(err);
        this.$toast('获取数据失败');
      }
    }
  },
};
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 360px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: auto;
      .mobile-img {
        width: 132px;
        height: 132px;
      }
      .text {
        font-size: 28px;
        color: #fff;
        padding-top: 15px;
      }
    }
  }

  .user-info {
    .base-info {
      height: 230px;
      box-sizing: border-box;
      padding: 75px 32px 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 1px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      height: 130px;
      display: flex;
      .data-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          color: #fff;
        }
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }

  // 宫格导航
  .grid-nav {
    .grid-item {
      height: 140px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        padding: 5px;
        font-size: 28px;
      }
    }
  }

  // 退出按钮
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
}
</style>