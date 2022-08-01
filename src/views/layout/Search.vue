<template>
  <div class="search-container">
      <!-- 搜索栏 -->
      <form action="/" class="search-form">
        <van-search 
        v-model="searchText" 
        show-action 
        placeholder="请输入搜索关键字"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"></van-search>
      </form>

      <!-- 搜索结果 -->
      <search-result v-if="isResultShow" :q="q" class="padding"/>

      <!-- 联想建议 -->
      <search-suggestion 
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
      class="padding" />

      <!-- 搜索历史 -->
      <search-history v-else 
      :search-histories="searchHistories" 
       @search="onSearch"
      class="padding"/>
      
  </div>
</template>

<script>
import SearchHistory from '../componets/search-history.vue';
import SearchSuggestion from '../componets/search-suggestion.vue';
import SearchResult from '../componets/search-result.vue';
import { getItem, setItem } from '@/utils/storage';

  export default {
    name: "SearchPage",
    components: {
        SearchHistory, 
        SearchSuggestion, 
        SearchResult
        },
    props: {},
    data() {
      return {
          searchText: '',
          isResultShow: false, //搜索历史
          q: '', //搜索关键字
          searchHistories: getItem('search-histories') || [] //历史搜索记录
      };
    },
    computed: {},
    watch: {
      searchHistories(val) {
        setItem('search-histories',val)
      }
    },
    created() {},
    methods: {
        // 1. 搜索
        onSearch(val) {
            console.log(val);
            this.q = val;
            // 存储历史搜索记录
            const index = this.searchHistories.indexOf(val);
            if(index !== -1) {
              this.searchHistories.splice(index,1)
            }
            this.searchHistories.unshift(val);
            this.isResultShow = true;
        },

        // 2. 取消--返回原路由
        onCancel() {
            this.$router.back();
        }
    }
  };
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
  }
  .padding {
    padding-top: 100px;
  }
}
</style>