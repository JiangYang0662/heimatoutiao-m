import Vue from "vue"
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')
// 获取当前时间
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
// 相对时间
console.log(dayjs().from(dayjs('1990-01-01'))); // 33年内
console.log(dayjs().from(dayjs('1990-01-01'), true)); // 33年
console.log(dayjs().fromNow()); // 几秒前
console.log('--------------');
console.log(dayjs().to(dayjs('1990-01-01'))); //33年前
console.log(dayjs().toNow());  //几秒前


// 全局过滤器：处理相对时间
// 参数1： 过滤器名称
// 参数2： 过滤器函数
// 使用方法： {{表达式 | 过滤器名称}}
// 管道符的表达式所返回的值会作为参数传递到过滤器函数中，
// 而过滤器的返回值会渲染到使用过滤器的模板位置上
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})