<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPost"
    >发布</van-button>
  </div>
</template>

<script>
import {addComment} from '@/api/user'
import {mapState} from 'vuex'

export default {
  name: 'CommentPost',
  components: { },
  props: {
    // 文章的id
    target: {
      type: [Number, String, Object],
      required: true
    },
    // art_id: {
    //   type: [Number, String, Object],
    //   required: true
    // }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {
     ...mapState(['art_id'])
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost() {
      const inputComment = this.message.trim();
      if(!inputComment.length) {
        return this.$toast('发布内容不能为空!');
      }
      this.$toast.loading({
        message: '发布中...',
        duration: 0,
        forbidClick: true
      })
      try {
        const {data} = await addComment({
          target: this.target.toString(),
          content: this.message,
          art_id: this.art_id ? this.art_id : null
        })
        console.log(data);
        this.message = '';
        this.$emit('post-success',data.data);
        this.$toast.success('发布成功!');
      } catch(err) {
        this.$toast.fail('发布评论失败，请重试!');
        console.log('发布评论失败',err);
      }
      this.setId();
    },
     setId() {
      this.$store.commit('setArt_id',null);
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
