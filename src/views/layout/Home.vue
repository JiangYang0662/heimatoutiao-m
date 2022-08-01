<template>
  <div class="home-container">
    <!-- 搜索框 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" slot="title" type="info" size="small" 
      round icon="search"  to="/search">搜索
      </van-button >
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <!-- <van-tab title="标签1">内容1</van-tab>
      <van-tab title="标签2">内容2</van-tab>
      <van-tab title="标签3">内容3</van-tab>
      <van-tab title="标签4">内容4</van-tab>
      <van-tab title="标签5">内容5</van-tab>
      <van-tab title="标签6">内容6</van-tab> -->
      <van-tab :title="channel.name" v-for="(channel,index) in channels" :key="index">
         <!-- 文章列表组件 -->
         <!-- 把频道列表的channel传递给组件 -->
        <article-list ref="article-list" :channel="channel" />
      </van-tab>
      <!-- 插槽占位 -->
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isEditChannelShow=true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道弹出层 -->
    <van-popup v-model="isEditChannelShow" 
    class="edit-channel-popup"
    closeable 
    position="bottom" 
    :style="{height: '100%' }"
    >
    <channel-edit 
    :user-channels="channels" 
    :active-index.sync="active"
    @close-popup="isEditChannelShow = false"
    ></channel-edit>
    </van-popup>


  </div>
</template>

<script>
import {getUserChannels} from '@/api/user'
import ArticleList from '../componets/article-list.vue'
import ChannelEdit from '../componets/channel-edit.vue'
import { mapState} from 'vuex'
import { getItem } from '@/utils/storage'


export default {
  name: "HomePage",
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data() {
    return {
      active: 0,
      channels: [], //频道列表
      isEditChannelShow: false, //频道弹出层是否显示
    };
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.loadChannels();
  },
  mounted() {
    window.home = this;
  },
  methods: {
    // 1. 读取用户的频道信息
    // async loadChannels() {
    //   try {
    //     const {data} = await getUserChannels();
    //     this.channels = data.data.channels;
    //   } catch(err) {
    //     this.$toast('获取频道数据失败');
    //     console.log('获取频道数据失败',err)
    //   }
    // }
    async loadChannels() {
      try {
        let channels = [];
        if(this.user) {
          // 已登录状态
          const {data} = await getUserChannels();
          channels = data.data.channels;
        } else {
          const loadChannels = getItem('channels');
          if(loadChannels) {
            channels = loadChannels;
          } else {
              // 没有本地频道数据就默认请求推荐的频道列表
             const {data} = await getUserChannels();
             channels = data.data.channels;
          }
        }
        this.channels = channels;
      } catch(err) {
        this.$toast('获取频道数据失败');
        console.log('获取频道数据失败',err)
      }
    }
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 65px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
      .van-icon {
      font-size: 32px;
      }
  }
  
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
     .placeholder {
      flex-shrink: 0;
      width: 50px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      z-index: 2;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.8);
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 1px;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
  // .edit-channel-popup {
  //   padding-top: 100x;
  //   box-sizing: border-box;
  // }
  
}
</style>