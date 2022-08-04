<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复' ">
      <van-icon slot="left" name="cross" @click="$emit('click-close')" />
    </van-nav-bar>

    <!-- 当前评论项置顶 -->
        <comment-item  :comment="comment"/>

    <div class="scroll-wrap">
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
    <!-- <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
      >写评论</van-button>
    </div> -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="setIdandShow"
      >写评论</van-button>
    </div>
    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post
        :target="comment.com_id"
        @post-success="onPostSuccess"
        @click="setId"
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
import {mapState} from 'vuex'

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
     target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      isPostShow: false,
      commentList: [], // 评论的回复列表
      // art_id: this.target
    };
  },
  computed: {
    ...mapState(['art_id'])
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onPostSuccess(data) {
      this.comment.reply_count++;
      this.isPostShow = false;
      this.commentList.unshift(data.new_obj);
      this.removeId();
    },
     setId() {
      this.$store.commit('setArt_id',this.target);
    },
    removeId() {
      this.$store.commit('setArt_id',null);
    },
    setIdandShow() {
      this.setId();
      this.isPostShow = true;
    }
  },
};
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 280px;
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
