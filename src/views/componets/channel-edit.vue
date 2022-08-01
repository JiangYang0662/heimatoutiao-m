<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道<span>点击进入频道</span></div>
      <van-button size="mini" 
      round type="danger" 
      plain 
      class="edit-btn"
      @click="isEditShow = !isEditShow"
      >{{isEditShow ? '完成' : '编辑'}}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <!-- 给我的频道注册点击事件--转到首页对应的页面/删除频道 -->
      <van-grid-item
        class="channel-item"
        v-for="(channel,index) in userChannels"
        :key="index"
        @click="onUserChannelClick(channel,index)"
      >
      <van-icon slot="icon" name="clear" v-show="isEditShow && channel.name !== '推荐'"></van-icon>
      <span slot="text" class="text" 
      :class="{ active: index === activeIndex}">{{channel.name}}
      </span>
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">推荐频道<span>点击加入频道</span></div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <!-- 给推荐频道中的频道注册点击事件，添加进我的频道 -->
      <van-grid-item
        class="channel-item"
        v-for="(channel,index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels,addUserChannel,deleteUserChannel} from '@/api/user'
import { setItem } from '@/utils/storage';
import { mapState } from 'vuex'

export default {
  name: "ChannelEdit",
  components: {},
  props: {
      userChannels: {
          type: Array,
          required: true
      },
      activeIndex: {
          type: Number,
          required: true
      }
  },
  data() {
    return {
        allChannels: [], //所有的频道列表
        isEditShow: false, //控制编制状态
    };
  },
  computed: {
      ...mapState(['user']),
      // 封装计算属性筛选数据
      recommendChannels() {
          return this.allChannels.filter(item => {
              return this.userChannels.findIndex(userItem => {
                  return userItem.id === item.id
              }) === -1
          })

        // 方法二：
        //   const channels = [];
        //   // 相同
        //   this.allChannels.forEach(channel => {
        //       const ret = this.userChannels.find(item => {
        //           return item.id === channel.id
        //       })
        //       // 不相同
        //       if(!ret) {
        //       channels.push(channel)
        //       }
        //   })
        //   // 把计算结果返回
        //   return channels
          
      }
  },
  watch: {},
  created() {
      // 调用所有频道数据
      this.loadAllChannels();
  },
  mounted() {},
  methods: {
      // 1. 获取所有频道
      async loadAllChannels() {
          try {
            const {data} = await getAllChannels();
            //   console.log(data);
            this.allChannels = data.data.channels;
          } catch(err) {
              console.log('获取所有频道列表失败',err);
              this.$toast('获取所有频道列表数据失败!')
          }
      },

      // 2. 添加频道
      async onAddChannel(channel) {
        try {
          this.userChannels.push(channel);
          if(this.user) {
            // 已登录，存储线上数据
            await addUserChannel([{
              id: channel.id,
              seq: this.userChannels.length
            }])
          } else {
            // 未登录，存储本地数据
            setItem('channels',this.userChannels)
          }
        } catch(err) {
          console.log(err);
          this.$toast('添加频道失败，请稍后重试！')
        }     
      },

      // 3. 进入对应频道文章列表/删除对应文章频道
      onUserChannelClick(channel,index) {
        console.log(channel,index);
      //显示删除图标，则删除频道
        if(this.isEditShow) {
          if(channel.name === '推荐') {
            return true;
          }
          if(index <= this.activeIndex) {
            this.$emit('update:active-index', this.activeIndex -1); //删除自己前面的频道，索引要-1
          }
          this.userChannels.splice(index, 1); // 删除对应索引的频道
          this.deleteChannel(channel); //存储删除数据--数据持久化
        } else { // 转到对应文章列表，并关闭弹窗
          this.$emit('update:active-index',index);
          this.$emit('close-popup');
        }
      },

      // 4. 线上、本地存储删除数据
      async deleteChannel(channel) {
        try {
          if(this.user) {
            await deleteUserChannel(channel.id)
          } else {
            setItem('channels',this.userChannels)
          }
        } catch(err) {
          console.log(err);
          this.$toast('删除频道失败，请稍后重试！')
        }
      }
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 85px;
  .title-text {
    font-size: 32px;
    color: #333;
    span {
        font-size: 24px;
        padding-left: 15px;
        color: #999;
    }
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  .channel-item {
    width: 160px;
    height: 86px;
    /deep/ .van-grid-item__content {
      white-space: nowrap;
      background-color: #f5f5f6;
      .van-grid-item__text, .text {
        color: #222;
        font-size: 28px;
        margin-top: 0;
      }
    }
  }
  .my-grid {
      padding-bottom: 30px;
    .channel-item {
      /deep/.van-icon-clear {
        position: absolute;
        right: -86px;
        top: -32px;
        font-size: 36px;
        color: #cacaca;
        z-index: 2;
      }
      .active {
          color: red;
      }
    }
  }

  .recommend-grid {
    .channel-item {
      /deep/.van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 23px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>