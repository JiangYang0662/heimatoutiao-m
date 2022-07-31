<template>
  <div class="article-list">
    <!-- list列表 -->
    <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" :success-text="refreshSuccessText" :success-duration="1500">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
      <!-- 文章列表 :article父组件传递给子组件的数据-->
      <article-item
        v-for="(article, index) in list"
        :key="index"
        :article="article"
      />
      <!-- <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article.js"
import ArticleItem from '@/views/componets/article-item.vue'

export default {
  name: "ArticleList",
  components: {
    ArticleItem
  },
  // 接收数据
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,  // 上拉加载更多
      finished: false, // 是否结束加载
      error: false,    // 是否加载失败
      timestamp: null, // 请求下一页数据的时间戳
      isRefreshLoading: false, //下拉刷新
      refreshSuccessText: '...'
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 1. 加载数据
    async onLoad() {
      try {
        // 1. 请求数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1,
        });
        // 4. 模拟失败情况--报错原理？？？
        // if(Math.random() > 0.4) {
        //   JSON.parse('dsdsdsd');
        // }
        console.log(data);
        // 2. 把数据添加到list，获取的数据要填满内容框，不足就继续获取
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false; // 首次获取10条数据，无法填满内容框第二次加载，然后停止加载等待下一次
        // 3. 判断是否继续加载数据
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (err) {
        console.log("请求失败!", err);
        this.loading = false;
        this.error = true;
      }
    },

    // 2. 下拉刷新
    async onRefresh() {
      try {
        // 1. 请求数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1,
        });
        // 5. 模拟失败情况
        if(Math.random() > 0.4) {
          JSON.parse('dsdsdsd');
        }
        console.log(data);
        // 2. 把数据添加到list的最前面
        const { results } = data.data;
        this.list.unshift(...results);
        this.isRefreshLoading = false; 
        // 3. 下拉成功
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`;
        // 4. 下拉失败
      } catch (err) {
        console.log("下拉刷新失败!", err);
        this.isRefreshLoading = false;
        this.refreshSuccessText = "刷新失败，请重试！"
      }
    }
  },
};
</script>

<style scoped lang="less">
.article-list {
  padding-top: 5px;
  height: 79vh;
  overflow-y: auto;
}
</style>
