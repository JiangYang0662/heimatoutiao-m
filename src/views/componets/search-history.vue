<template>
  <div class="search-history">
    <!-- <van-cell title="搜索历史">
      <span>全部删除</span>
      <span>完成</span>
      <van-icon name="delete" />
    </van-cell>
    <van-cell title="hello">
      <van-icon name="close" />
    </van-cell>
    <van-cell title="hello">
      <van-icon name="close" />
    </van-cell>
    <van-cell title="hello">
      <van-icon name="close" />
    </van-cell>
    <van-cell title="hello">
      <van-icon name="close" />
    </van-cell> -->
    
      <van-cell title="搜索记录">
        <template v-if="isDeleteShow">
          <span @click="searchHistories = []">全部删除</span> &nbsp;&nbsp;
          <span @click="isDeleteShow = false">完成</span>
        </template>
        <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
      </van-cell>
      <van-cell :title="item"
      v-for="(item,index) in searchHistories"
      :key="index"
      @click="onHistoryClick(item, index)">
        <van-icon v-show="isDeleteShow" name="close"></van-icon>
      </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false // 删除状态下执行删除操作，否则直接搜索
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
      // onSearchItemClick(item,index) {
      //   if(this.isDeleteShow) {
      //     this.searchHistories.splice(index,1);
      //   } else {
      //     this.$emit('search',item);
      //   }
      // }
      onHistoryClick(item,index) {
        if(this.isDeleteShow) {
          this.searchHistories.splice(index,1);
        } else {
         this.$emit('search',item);
        }
      }
   }
}
</script>

<style scoped lang="less"></style>