<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/user'

export default {
  name: 'SearchResult',
  components: {},
  props: {
    q: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      //   this.loading = false
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)

      try {
        // 1. 请求数据
      const {data} = await getSearch({
        page: this.page,        //页码
        per_page: this.perPage, //每页的大小
        q: this.q      //搜索关键字
      })
      // 2. 数据渲染
      const { results } = data.data;
      this.list.push(...results);
      this.loading = false;
      if(results.length) {
        this.page ++
      } else {
        this.finished = true;
      }
      } catch(err) {
         this.error = true
         this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less"></style>