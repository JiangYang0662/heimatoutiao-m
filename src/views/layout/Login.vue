<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="arrow-left" @click="$router.back()">返回</van-icon>
    </van-nav-bar>

    <!-- form表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field v-model="user.mobile" :rules="userFormRules.mobile" maxlength="11" 
      type="number" name="mobile" placeholder="请输入手机号">
        <!-- 图标 -->
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field v-model="user.code" :rules="userFormRules.code" maxlength="6" 
      type="number" name="code" placeholder="请输入验证码">
        <!-- 图标 -->
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down :time="1000 * 60" format="ss 秒后再获取" v-if="isCountDownShow"
          @finish="isCountDownShow = false" />
          <van-button class="send-sms-btn" round size="small" type="primary" 
          native-type="button" @click="onSendSms" v-else>获取验证码</van-button>
        </template>
      </van-field>

      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// 单独暴露的模块在引入的时候要带大括号
import { login, getSmsCode} from "@/api/user";

export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      // 用户信息
      user: {
        mobile: "", //手机号
        code: "", //验证码
      },
      // 用户信息验证规则
      userFormRules: {
        mobile: [
          {require: true, message: '手机号码不能为空'},
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误'}
        ],
        code: [
          {required: true, message: '验证码不能为空'},
          { pattern: /^\d{6}$/, message: '验证码格式错误'}
        ]
      },
      // 倒计时的显示
      isCountDownShow: false,

    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 登录按钮事件
    async onSubmit() {
      // 1. 获取表单数据
      const user = this.user;

      //2. 表单验证

      // 加载提示--在组件中必须通过this.$toast来调用Toast组件
      // 新toast的调用会关闭之前的toast
      this.$toast.loading({
        duration: 0, //持续时间，0表示持续展示不停止.2000ms为默认值
        message: "登录中...",
        forbidClick: true,  // 是否禁止背景点击
      });
      // 3. 提交表单请求登录
      try {
        const res = await login(user);
        // console.log("登录成功", res);
        this.$store.commit('setUser',res.data.data);
        this.$toast.success('成功登录!');
        this.$router.push('/mine');
      } catch (err) {
        if (err.response.status === 400) {
          // console.log("手机号或验证码错误");
         this.$toast.fail('登录失败，手机号或验证码错误!');
        } else {
          // console.log("登录失败，请稍后重试", err);
         this.$toast.fail('登录失败，请稍后重试!');
        }
      }
    },

    // 获取验证码事件
    async onSendSms() {
      console.log('获取验证码');
      try {
        await this.$refs.loginForm.validate('mobile');
      } catch (err) {
        return this.$toast.fail('验证失败，手机号码不正确!')
      }
      // 验证通过
      try {
        await getSmsCode(this.user.mobile);
        this.isCountDownShow = true;
        this.$toast.success('已发送验证码!');
      } catch (err) {
        this.isCountDownShow = false;
        if(err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试!');
        }
        else{
          this.$toast('发送失败，请稍后重试!')
        }
      }
    }

  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 156px;
    height: 46px;
    line-height: 40px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .van-button--primary {
    border: none;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
