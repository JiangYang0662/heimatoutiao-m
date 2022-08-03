<template>
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error="error"
      error-text="加载失败，点击重试"
      @load="onLoad"
    >
      <!-- <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.content"
      /> -->
      <!-- 使用commentList-item组件 -->
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
        @click-replay="$emit('reply-click',$event)"
       />
    </van-list>
</template>

<script>
import { getComments } from "@/api/user";
import CommentItem from './articles-commentList-item.vue'

export default {
  name: "CommentList",
  components: {
      CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    list: {
          type: Array,
          default: () => []
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      error: false,
      offset: null, //获取下一页数据的标记
      limit: 10,
    };
  },
  computed: {},
  watch: {},
  created() {
      this.onLoad();
  },
  mounted() {},
  methods: {
    // 1. 获取文章评论列表数据
    async onLoad() {
      try {
        // 请求获取数据
        const { data } = await getComments({
          type: "a", //评论类型，a是对文章的评论，c是对评论的回复
          source: this.source, //文章的id
          offset: this.offset, //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取。不传值则表示从第一页开始读取数据
          limit: this.limit, //获取评论的数量
        });
        // 数据添加
        console.log(data);
        const { results } = data.data;
        console.log(results);
        this.list.push(...results)
        this.$emit("onload-success", data.data);
        // 加载状态为false
        this.loading = false;
        // 数据是否全部加载完成
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        console.log("加载文章评论列表失败", err);
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped lang="less"></style>
