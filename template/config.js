// 如果你想用自己创建的实例，在自己单独的js文件里加上：let baseUrl="noNeed" / localStorage.setItem('baseUrl',baseUrl)
let baseMounted = localStorage.getItem('baseUrl')
console.log(baseMounted)

import '../src/style/index.scss' //公用样式

if (baseMounted === 'noNeed') {
  // 组件自己创建了实，将不会再引入下边的资源
  throw new Error("当前组件自己创建了实例,不会引用公用方法、实例");
}
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 动态捕获要挂载实例的.vue文件的路径
var App = resolve => require.ensure([], () => resolve(require("../src/views/" + baseMounted + ".vue")));
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
