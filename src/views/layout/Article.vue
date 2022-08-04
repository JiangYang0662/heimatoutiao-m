<template>
  <div class="article-container">
    <!-- 导航栏 start -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- 导航栏 end -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>

        <!-- 用户信息 -->
        <!-- 点击头像跳转到用户信息页面 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
            @click="toUser"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>

          <!-- 组件封装 -->
          <!-- <article-followuser
            class="follow-btn"
            :is-followed="article.is_followed"
            :user-id="article.aut_id"
            @update-is_followed="article.is_followed = $event"
          /> -->
          <!-- 改进关注组件 -->
          <!-- 
            v-model的操作原理 
            绑定value值：value="article.is_followed"
            监听事件@input="article.is_followed = $event"
            $event 是模板事件的传参
            一个组件只能使用一次v-model，想要多个数据实现该类功能则使用属性.sync修饰符
          -->
          <article-followuser
            class="follow-btn"
            v-model="article.is_followed"
            :user-id="article.aut_id"
          />
          <!-- <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            @click="onFollow"
            :loading="FollowLoading"
          >已关注</van-button>
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
          >关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 文章评论列表组件 -->
        <comment-list
          :source="article.art_id"
          :list="commentList"
          @reply-click="onReplyClick"
          @onload-success="totalCommentCount = $event.total_count"
        />
        <!-- 文章评论列表组件 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <!-- <van-icon name="comment-o" :badge="article.comm_count" color="#777" /> -->
          <van-icon name="comment-o" :badge="totalCommentCount" color="#777" />

          <!-- 一键三连 -->
          <article-collect
            v-model="article.is_collected"
            :articleId="article.art_id"
          ></article-collect>
          <!-- 此时的is_collected还未有数据，可以把底部区域放入到加载完成里 -->
          <!-- <van-icon color="#777" name="star-o"></van-icon> -->

          <!-- <van-icon color="#777" name="good-job-o"></van-icon> -->
          <article-like
            v-model="article.attitude"
            :articleId="article.art_id"
          ></article-like>
          <van-icon name="share" color="#777777"></van-icon>
        </div>

        <!-- 评论书写区域 -->
        <van-popup v-model="isPostShow" position="bottom">
          <comment-post
            :target="article.art_id"
            @post-success="onPostSuccess"
          />
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
    </div>

    <!-- 评论回复弹层 -->
        <van-popup
          v-model="isReplayShow"
          position="bottom"
          style="height: 100%"
        >
         <comment-reply 
           v-if="isReplayShow"
           @click-close="isReplayShow = false" 
           :comment="currentComment"
           :target="article.art_id"
           />
        </van-popup>
  </div>
</template>

<script>
import { getArticleById } from "@/api/user";
import { ImagePreview } from "vant";
import { mapState} from 'vuex'
// 封装组件--关注-收藏-点赞--评论
import ArticleFollowuser from "@/views/componets/articles-followuser.vue";
import ArticleCollect from "@/views/componets/articles-collect.vue";
import ArticleLike from "@/views/componets/articles-like.vue";
import CommentList from "@/views/componets/articles-commentList.vue";
import CommentPost from "@/views/componets/articles-commentpost.vue";
import CommentReply from "@/views/componets/articles-commentReply.vue";
// ImagePreview({
//     图片的src地址
//     images:[
//         'https://img.yzcdn.cn/1.jpg',
//         'https://img.yzcdn.cn/2.jpg',
//     ],
//     第一张的预览图片，从0开始
//     startPosition: 1,
//     退出事件
//     onClose() {
//         console.log('onclose')
//     }
// })

export default {
  name: "ArticleIndex",
  components: {
    ArticleFollowuser,
    ArticleCollect,
    ArticleLike,
    CommentList,
    CommentPost,
    CommentReply
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      article: {}, //文章详情信息
      loading: true, //加载
      errStatus: 0, // 失败的状态码
      FollowLoading: false, //关注的加载状态
      totalCommentCount: 0,
      commentList: [],
      isPostShow: false, // 文章发布弹层
      isReplayShow: false, // 评论回复弹层
      currentComment: {} // 点击回复的那个评论对象
    };
  },
  computed: {
    // ...mapState(['art_id'])
  },
  watch: {},
  created() {
    this.loadArticle();
  },
  mounted() {},
  methods: {
    // 1. 根据id获取文章详情
    async loadArticle() {
      try {
        const { data } = await getArticleById(this.articleId);
        this.article = data.data;
        console.log(this.article);
        // 初始化图片点击预览--在文章加载的时候就要得到预览的图片
        // console.log(this.$refs['article-content'])
        setTimeout(() => {
          this.previewImage(); //调用方法
        }, 0);
        this.setId();
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 404) {
          this.errStatus = 404;
        }
      }
      this.loading = false;
    },

    // 2. 预览图片
    previewImage() {
      const articleContent = this.$refs["article-content"];
      const imgs = articleContent.querySelectorAll("img");
      const images = [];
      imgs.forEach((img, index) => {
        images.push(img.src);
        // 给每个图片注册点击事件
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
          });
        };
      });
    },

    // 3. 关闭弹层和评论置顶
    onPostSuccess(data) {
      this.isPostShow = false;
      this.commentList.unshift(data.new_obj);
      this.totalCommentCount++;
    },
    // 4. 评论回复弹层
    onReplyClick(comment) {
      console.log(comment);
      this.currentComment = comment;
      // 显示评论回复弹出层
      this.isReplayShow = true;
    },
    // 跳转到用户界面
    toUser() {
      const target =Number(this.article.aut_id);

      this.$router.push(`/users/${target}`);
    }
    // 5. 更新当前文章的id--为后续回复评论传值
    // setId() {
    //   this.$store.commit('setArt_id',this.atrticleId);
    // },
    // 6.
    // removeId() {
    //   this.$store.commit('setArt_id',null);
    // },
    // 7.后退
    // goback() {
    //   this.removeId();
    //   this.$router.back();
    // }

  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
        z-index: 2;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
