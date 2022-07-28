<template>
  <div id="app">
    <h1>黑马头条</h1>
    <div>
      <i class="toutiao toutiao-dianzan"></i><br>
      <van-button type="default">默认按钮</van-button>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>
    <div class="box"></div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less" scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: orange;
}
</style>
