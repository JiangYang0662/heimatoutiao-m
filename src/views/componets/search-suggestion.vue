<template>
  <div class="search-suggestion">
    <!-- <van-cell title="黑马程序员..." icon="search"></van-cell> -->
      <van-cell
        icon="search"
        v-for="(text, index) in suggestions"
        :key="index"
        @click="$emit('search', text)"
      >
        <div slot="title" v-html="highlight(text)"></div>
        <!-- <div slot="title">{{text}}</div> -->
      </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/user";
import { debounce } from "lodash";

export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [], // 联想建议数据列表
      htmlStr: 'Hello <span style="color: red">World</span>', //高亮显示
      length: 0,
    };
  },
  computed: {},
  watch: {
    searchText: {
      // 当searchText发生改变的时候调用handle函数，handle的函数名是固定的
      //   handler(val) {
      //       this.loadSearchSuggestions(val);
      //   },

      // 防抖
      // debounce函数，参数1为一个函数，参数2是延迟时间，返回值是防抖之后的函数
      handler: debounce(function (value) {
        console.log(value);
        this.loadSearchSuggestions(value);
      }, 300),
      immediate: true, //该函数
    },
  },
  created() {},
  mounted() {},
  methods: {
    // 1. 获取搜索联想建议
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q);
        console.log(data);
        this.suggestions = data.data.options;
        length = this.suggestions.length;
      } catch (err) {
        this.$toast("获取联想建议失败，请稍后重试!");
        console.log("获取联想建议失败", err);
      }
    },
    // 2. 高亮显示
    highlight(text) {
      if (this.suggestions.length > 0) {
        const highlightStr = `<span style="color: #3296fa">${this.searchText}</span>`;
        const reg = new RegExp(this.searchText, "gi");
        return text.replace(reg, highlightStr);
      }
    }
  },
};
</script>

<style scoped lang="less">
.search-suggestion {
  span.active {
    color: #3296fa;
  }
}
</style>