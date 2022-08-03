<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      src="https://img.yzcdn.cn/vant/cat.jpeg"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{comment.aut_name}}</div>
      <!-- <van-button class="like-btn" icon="good-job-o">{{comment.like_count > 0 ? comment.like_count : '赞'}}</van-button> -->
      <van-button 
        class="like-btn" 
        :class="{liked: comment.is_liking}"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o' "
        @click="onCommentLike"
        :loading="commentLoading"
        >{{comment.like_count || '赞'}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{comment.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{comment.pubdate | relativeTime}}</span>
        <van-button class="reply-btn" round @click="$emit('click-replay',comment)">回复<span>{{comment.reply_count}}</span></van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/user'

export default {
  name: "CommentItem",
  components: {},
  props: {
      comment: {
          type: Object,
          required: true
      }
  },
  data() {
    return {
        commentLoading: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
      async onCommentLike() {
          this.commentLoading = true;
          try {
              if(this.comment.is_liking) {
                  await deleteCommentLike(this.comment.com_id);
                  this.comment.like_count--;
              } else {
                  await addCommentLike(this.comment.com_id);
                  this.comment.like_count++;
              }
              // 更新视图
              this.comment.is_liking = !this.comment.is_liking;
          } catch(err) {
              console.log('操作失败',err);
              this.$toast('操作失败，请重试!');
          }
          this.commentLoading = false;
      }
  },
};
</script>

<style scoped lang="less">
.comment-item {
    .avatar {
        width: 72px;
        height: 72px;
        margin-right: 25px;
    }
    .title-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .user-name {
            color: #406599;
            font-size: 26px;
        }
        .like-btn {
            height: 30px;
            border: none;
            font-size: 20px;
            line-height: 30px;
            margin-right: 10px;
            .van-icon {
                font-size: 30px;
            }
            &.liked {
              color: #e5645f;
            }
        } 
    }
    .comment-content {
        font-size: 32px;
        color: #222;
        word-break: break-all;
        text-align: justify;
        margin: 28px 0 16px;
    }
    .bottom-info {
        display: flex;
        align-items: center;
        .comment-pubdate {
            font-size: 19px;
            color: #222;
            margin-right: 25px;
        }
        .reply-btn {
            height: 45px;
            line-height: 45px;
            font-size: 21px;
            color: #222;
        }
    }
}
</style>
