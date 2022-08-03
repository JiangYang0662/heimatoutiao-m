<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复' ">
      <van-icon slot="left" name="cross" @click="$emit('click-close')" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="scroll-wrap">
        <!-- 当前评论项 -->
        <comment-item  :comment="comment"/>
        <!-- /当前评论项 -->

        <van-cell title="所有回复" />
        <!-- 评论的回复列表 -->
        <comment-list
          :list="commentList"
          :source="comment.com_id"
           type="c"
        />
        <!-- /评论的回复列表 -->
    </div>

    <!-- 底部 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
      >写评论</van-button>
    </div>
    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post
        :target="comment.com_id"
        @post-success="onPostSuccess"
      />
    </van-popup>
    <!-- /发布评论 -->
    <!-- /底部 -->
  </div>
</template>

<script>
import CommentList from './articles-commentList.vue'
import CommentItem from './articles-commentList-item.vue'
import CommentPost from './articles-commentpost.vue'

export default {
  name: "CommentReply",
  components: {
      CommentList,
      CommentItem,
      CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isPostShow: false,
      commentList: [] // 评论的回复列表
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
