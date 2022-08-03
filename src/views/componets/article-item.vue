<template>
   <!-- :to="'/article/' + article.art_id" -->
   <!-- :to="`/article/${article.art_id}`" -->
  <van-cell class="article-item" :to="{ name: 'article', params: {articleId: article.art_id}}">
  <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
      <div slot="label">
         <!-- 图片为3时，在标题的下边 slot="label" -->
         <div v-if="article.cover.type === 3" class="cover-wrap">
            <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index" >
              <van-image :src="img" class="cover-item-img" fit="cover" />
            </div>
         </div>
         <div class="label-info-wrap">
           <span>{{ article.aut_name }}</span>
           <span>{{ article.comm_count }}评论</span>
           <span>{{ article.pubdate | relativeTime }}</span>
         </div>
      </div>
      <!-- 图片为1时，在右边 slot="default" -->
      <van-image
      v-if="article.cover.type === 1"
      slot="default"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]"
      />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  // 接收父组件传送过来的article数据
  props: {
    article: {
      type: Object,
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
  methods: {}
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  // 右侧图片的位置
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  // 图片大小
  .right-cover {
    width: 232px;
    height: 146px;
  }
  // 作者信息--评论--时间
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  // 3图片
  .cover-wrap {
    display: flex;
    padding: 25px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>