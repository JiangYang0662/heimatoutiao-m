<template>
    <van-icon 
    :color="value === 1 ? '#e5645f': '#777'" 
    :name="value === 1 ? 'good-job': 'good-job-o'"
    @click="onLike">
    </van-icon>
</template>

<script>
import { addLike, deleteLike } from '@/api/user'

export default {
  name: 'ArticleLike',
  components: {},
  props: {
    value: {
        type: Number,
        required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
      async onLike() {
        this.$toast.loading({
                    duration: 0,
                    message: '正在操作中...',
                    forbidClick: true
        })
          try {
              let status = -1;
              if(this.value === 1) {
                  await deleteLike(this.articleId);
                  this.$toast('取消点赞！');
              } else {
                  await addLike(this.articleId);
                  this.$toast('点赞成功！');
                  status = 1;
              }
              this.$emit('input', status);
          } catch(err) {
              console.log(err);
              this.$toast.fail('操作失败，请重试!')
          }
      }
  }
}
</script>

<style scoped lang="less"></style>
