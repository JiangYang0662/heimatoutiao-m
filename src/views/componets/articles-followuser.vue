<template>
    <van-button
      v-if="isFollowed"
      class="follow-btn"
      round
      size="small"
      @click="onFollow"
      :loading="FollowLoading"
      >已关注</van-button
    >
    <van-button
      v-else
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      @click="onFollow"
      :loading="FollowLoading"
      >关注</van-button
    >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: "ArticleFollowuser",
  components: {},
  // 自定义v-model数据名称
  model: {
      prop: 'isFollowed',
      event: 'update-is_followed'
  },
  props: {
      isFollowed: {  // 对应model的prop名称
          type: Boolean,
          required: true
      },
      userId: {
          type: [Number,String,Object],
          required: true
      }
  },
  data() {
    return {
        FollowLoading: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
      // 3. 关注
      async onFollow() {
        this.FollowLoading = true;
        try {
          const authorId = this.userId;
          if(this.isFollowed) {
            await deleteFollow(authorId);
          } else {
            await addFollow(authorId)
          }
          // 更新视图
          // this.isFollowed = !this.isFollowed;
          this.$emit('update-is_followed', !this.isFollowed); //v-model自定义数据名称
         //  this.$emit('input', !this.value);  v-moel的原型数据

        } catch(err) {
          let message = '操作失败，请重试!';
          console.log('操作失败',err);
          if(err.response && err.response.status === 400) {
            message = '你不能关注自己的账号!'
          }
          this.$toast(message);
        }
        this.FollowLoading = false;
      }
  },
};
</script>

<style scoped lang="less"></style>
