// 引入vue
import Vue from 'vue'
// 引入app组件
import App from './App.vue'

/* // 引入vue-resource插件用于发起ajax请求的库
import vueResource from 'vue-resource' */

// 引入store
import store from "./store/index"

// 关闭默认生产提示
Vue.config.productionTip = false

/* // 使用vueResource插件，即发ajax请求的插件
Vue.use(vueResource) */

// 此为简写
/* new Vue({
  render: h => h(App),
}).$mount('#app') */

new Vue({
  el: "#app",
  render: (createElement) => createElement(App),
  // store: store,
  store,
})