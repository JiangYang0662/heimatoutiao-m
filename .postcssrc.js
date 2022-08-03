// vant是基于375写的，而平常的设计图是根据750写的
// 要根据不同的元素来设置不同的缩小值
// vant --37.5
// 设计图的元素 -- 75
module.exports = {
    plugins: {
    // 和vue的配置重复了，需注释掉
    //   'autoprefixer': {
    //     browsers: ['Android >= 4.0', 'iOS >= 8']
    //   },
    // 1. 把px转换rem
      'postcss-pxtorem': {
        // rootValue支持数字和函数 number | function
        // rootValue: 37.5,
        rootValue ({ file }) {
            return file.indexOf('vant') !== -1 ? 37.5 : 75
          },
          // *表示转换所有样式
        propList: ['*'],
        // 排除不要转换的样式资源
        exclude: 'github-markdown'
      }
    }
  }