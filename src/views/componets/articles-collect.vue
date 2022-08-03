<template>
    <van-icon 
      :name="value ? 'star' : 'star-o'"
      :color="value ? '#ffa500' : '#777' "
      @click="onCollect"
    >
    </van-icon>
</template>

<script>
import { addCollect, deleteCollect} from '@/api/user'

export default {
  name: 'CollectArticle',
  components: {},
  props: {
    value: {
      type: Boolean,
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
      async onCollect() {
          this.$toast.loading({
                  duration: 0,
                  message: '正在操作中...',
                  forbidClick: true
            })
          try {
              if(this.value) {
                  await deleteCollect(this.articleId);
                  this.$toast('取消收藏！')
              } else {
                  await addCollect(this.articleId);
                  this.$toast('收藏成功！')
              }
              this.$emit('input', !this.value);
          } catch(err) {
              console.log(err);
              this.$toast.fail('操作失败，请重试!')
          }
      }
  }
}
</script>

<style scoped lang="less">
</style>
